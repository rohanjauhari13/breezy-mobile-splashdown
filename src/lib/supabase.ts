
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables set by the Lovable Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock client if the credentials are missing
const isConfigured = supabaseUrl && supabaseAnonKey;

if (!isConfigured) {
  console.warn('Supabase integration not configured. Using mock client. Some features will not work correctly.');
}

// Create Supabase client - either real or mock depending on configuration
export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

// Create a mock client that doesn't throw errors but logs actions
function createMockClient() {
  return {
    from: (table: string) => ({
      insert: (data: any) => {
        console.log(`Mock insert to ${table}:`, data);
        return Promise.resolve({ error: null, data });
      },
      select: (columns: string = '*') => {
        console.log(`Mock select from ${table}`);
        // Return a query builder with chained methods instead of a direct Promise
        return {
          eq: (column: string, value: any) => {
            console.log(`Mock filter ${table} where ${column} = ${value}`);
            return {
              single: () => {
                console.log(`Mock single result from ${table}`);
                return Promise.resolve({ error: null, data: null });
              },
              get: () => {
                console.log(`Mock get results from ${table}`);
                return Promise.resolve({ error: null, data: [] });
              }
            };
          },
          neq: () => {
            return {
              single: () => Promise.resolve({ error: null, data: null }),
              get: () => Promise.resolve({ error: null, data: [] })
            };
          },
          single: () => {
            console.log(`Mock single result from ${table}`);
            return Promise.resolve({ error: null, data: null });
          }
        };
      },
      update: (data: any) => {
        console.log(`Mock update to ${table}:`, data);
        return {
          eq: (column: string, value: any) => {
            console.log(`Mock update ${table} where ${column} = ${value}`);
            return Promise.resolve({ error: null, data });
          }
        };
      },
      delete: () => {
        console.log(`Mock delete from ${table}`);
        return {
          eq: (column: string, value: any) => {
            console.log(`Mock delete from ${table} where ${column} = ${value}`);
            return Promise.resolve({ error: null });
          }
        };
      }
    }),
    auth: {
      signUp: () => Promise.resolve({ error: null, data: { user: null } }),
      signIn: () => Promise.resolve({ error: null, data: { user: null } }),
      signInWithPassword: (credentials: { email: string, password: string }) => {
        console.log(`Mock sign in with password for email: ${credentials.email}`);
        return Promise.resolve({ 
          error: null, 
          data: { 
            user: { 
              id: 'mock-user-id', 
              email: credentials.email 
            },
            session: { 
              access_token: 'mock-access-token',
              refresh_token: 'mock-refresh-token'
            }
          } 
        });
      },
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ error: null, data: { session: null } }),
    }
  };
}
