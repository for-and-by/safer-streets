import {createClient, SupabaseClientOptions} from '@supabase/supabase-js'

import {Database} from '~/types/generated'
import {config} from '~/config'

export const SupabaseClient = createClient<Database>(config.url, config.key)

export function createSupabaseClient(options: SupabaseClientOptions<'public'>) {
  return createClient<Database>(config.url, config.key, options)
}
