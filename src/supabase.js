
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://nwfhxbyljklxfqidrxth.supabase.co';
//const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = "sb_publishable_ouPNKNRwtvX0M9DVPbVYsg_ZxL57ebq";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;