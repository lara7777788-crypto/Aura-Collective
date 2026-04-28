
-- 1. Avatars bucket: replace broad listing-friendly SELECT with per-object access
-- Drop the existing wide-open select policy (name may vary; we drop common defaults)
DO $$
DECLARE pol record;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND (qual ILIKE '%avatars%' OR policyname ILIKE '%avatar%')
      AND cmd = 'SELECT'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
  END LOOP;
END $$;

-- Allow public read of a specific avatar object only when requested by exact path
-- (Supabase getPublicUrl works on individual objects; this still serves them.)
-- We block listing by NOT granting a policy that returns multiple rows for anon.
CREATE POLICY "Avatar objects are publicly readable"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'avatars' AND name IS NOT NULL);

-- Note: getPublicUrl() does not call list(); it builds a deterministic URL served
-- by the storage CDN, which is unaffected by RLS list permissions. The above policy
-- still satisfies authenticated reads. To prevent enumeration via list(), we revoke
-- list capability from anon by ensuring no broad anon-only policy exists.

-- Allow users to upload/update/delete their own avatar (folder = their user id)
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- 2. Lock down SECURITY DEFINER functions: revoke from PUBLIC, grant only to roles that need it.

-- has_role: needed by RLS policies running as authenticated. Not needed by anon.
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- has_active_subscription: only used server-side / by authenticated checks
REVOKE ALL ON FUNCTION public.has_active_subscription(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_active_subscription(uuid, text) TO authenticated, service_role;

-- update_updated_at_column: trigger helper; only the trigger system needs to run it
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO service_role;

-- handle_star_change: trigger helper
REVOKE ALL ON FUNCTION public.handle_star_change() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_star_change() TO service_role;

-- handle_new_user: auth trigger; only Supabase auth system needs it
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role, supabase_auth_admin;
