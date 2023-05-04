import {createClient, SupabaseClientOptions} from '@supabase/supabase-js'

import {Database} from '~/types/generated'
import {config} from '~/config'

export function createSupabaseClient(options?: SupabaseClientOptions<'public'>) {
  return createClient<Database>(config.url, config.key, options)
}
