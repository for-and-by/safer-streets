import {createClient} from '@supabase/supabase-js'
import {createServerClient} from '@supabase/auth-helpers-remix'

import {Database} from '~/types/generated'
import {config} from '~/config'

export const SupabaseClient = createClient<Database>(config.url, config.key)

export const createSupabaseServerClient = (params: Parameters<typeof createServerClient>[2]) =>
  createServerClient<Database>(config.url, config.key, params)
