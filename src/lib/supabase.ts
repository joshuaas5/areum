
import { createClient } from "@supabase/supabase-js";

// URL e chave anon são identificadores públicos do cliente. A proteção dos
// contatos é feita por RLS: visitantes só podem inserir, nunca ler a tabela.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uklfuchpniyfiaksxivm.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_LezuGDijOSxbCMCBwLBhKg_LgO78ehD';

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

