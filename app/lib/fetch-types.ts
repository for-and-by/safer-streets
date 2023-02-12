import supabase from '~/lib/supabase-client';
import { Type } from '~/types/db';

export default async function fetchTypes(handle?: string) {
	const query = supabase.from<Type>('types').select('*');

	if (handle) query.match({ handle });

	const types = await query;
	if (types.error) throw types.error;
	if (!types.data) throw 'No data was returned from fetch';

	return types.data;
}
