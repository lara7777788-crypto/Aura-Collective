-- Allow 'crypto' as a valid environment value
ALTER TABLE public.subscriptions DROP CONSTRAINT IF EXISTS subscriptions_environment_check;
ALTER TABLE public.subscriptions ADD CONSTRAINT subscriptions_environment_check
  CHECK (environment = ANY (ARRAY['sandbox'::text, 'live'::text, 'crypto'::text]));

-- Crypto payment records
CREATE TABLE public.crypto_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tx_hash TEXT NOT NULL UNIQUE,
  chain TEXT NOT NULL,
  token TEXT NOT NULL DEFAULT 'USDC',
  from_address TEXT NOT NULL,
  to_address TEXT NOT NULL,
  amount_usd NUMERIC(10,2) NOT NULL,
  tier TEXT NOT NULL,
  duration_months INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  verified_at TIMESTAMPTZ
);

ALTER TABLE public.crypto_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view their own crypto payments"
  ON public.crypto_payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX crypto_payments_user_idx ON public.crypto_payments(user_id);