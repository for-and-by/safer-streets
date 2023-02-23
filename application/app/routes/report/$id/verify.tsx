import type {ActionFunction} from '@remix-run/router';
import {verifyReport} from '~/lib/supabase';
import {redirect} from '@remix-run/cloudflare';

export const action: ActionFunction = async ({params}) => {
	if (!params.id) return null;
	await verifyReport(parseInt(params.id));
	return redirect('/');
};
