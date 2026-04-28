import { supabase } from "@/integrations/supabase/client";

export type StarletMode = "summarize" | "search" | "readme" | "tags";

export async function askStarlet<T = any>(mode: StarletMode, payload: any): Promise<T> {
  const { data, error } = await supabase.functions.invoke("starlet", {
    body: { mode, payload },
  });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data.result as T;
}
