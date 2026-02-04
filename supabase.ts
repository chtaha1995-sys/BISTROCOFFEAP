import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kqogqronicwjjgzzcicd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtxb2dxcm9uaWN3ampnenpjaWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNDQxNTksImV4cCI6MjA4NTcyMDE1OX0.LDofnQ_2bynQ7rjH2Gpt7w1z8Xefk_tTd5nY98LV04M";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
