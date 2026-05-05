import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

// During SSR/build-time prerendering there's no browser, so we return a safe stub.
// At runtime the real client is always used.
function createSsrStub(): SupabaseClient {
  const noop = async () => ({});
  const stub = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signOut: noop,
      signInWithPassword: async () => ({ data: {}, error: null }),
      updateUser: async () => ({ data: {}, error: null }),
      resetPasswordForEmail: noop,
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: noop } } }),
    },
    from: () => ({
      select: () => ({ eq: () => ({ order: () => Promise.resolve({ data: [], count: 0, error: null }) }), count: "exact" }),
      insert: async () => ({ data: null, error: null }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
    }),
    storage: { from: () => ({ createSignedUrl: async () => ({ data: null, error: null }) }) },
    channel: () => ({
      on: () => ({ subscribe: () => ({}) }),
    }),
    removeChannel: noop,
  };
  return stub as unknown as SupabaseClient;
}

export function createClient(): SupabaseClient {
  if (typeof window === "undefined") return createSsrStub();
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
