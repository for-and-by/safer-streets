import {createClient} from '@supabase/supabase-js'

import {Database} from '~/types/generated'
import {config} from '~/config'

export const SupabaseClient = createClient<Database>(config.url, config.key)
