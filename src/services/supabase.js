
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://werzimvqxvevbueriehf.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcnppbXZxeHZldmJ1ZXJpZWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjIzNzUsImV4cCI6MjA3NzgzODM3NX0.cFBEb5Iq4diUKBpFEULhGrOQ47quGVrKOpKpRsolGpo";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

// this is our client setup with key which has RLS enabled so we can now use this supabase client across our app to interact with the db securelyand read the data