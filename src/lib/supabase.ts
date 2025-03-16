
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xtqzwooocduuanvlfpgn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cXp3b29vY2R1dWFudmxmcGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNjM3NTQsImV4cCI6MjA1NzYzOTc1NH0.Xv4cl_CPu7T1H_LHCzXhKj4wQkVpjrCxuK-YtutWnNA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
