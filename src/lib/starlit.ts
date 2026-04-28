import { supabase } from "@/integrations/supabase/client";

export type StarlitMode = "summarize" | "search" | "readme" | "tags";

export async function askStarlit<T = any>(mode: StarlitMode, payload: any): Promise<T> {
  const { data, error } = await supabase.functions.invoke("starlet", {
    body: { mode, payload },
  });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data.result as T;
}
