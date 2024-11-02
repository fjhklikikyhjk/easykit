import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_Supabase_BASE_URL,
  import.meta.env.VITE_Supabase_API_KEY
);
