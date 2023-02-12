import { decode } from 'base64-arraybuffer';

import supabase from '~/lib/supabase-client';

export default async function uploadFile(image?: string) {
	if (!image) return;

	const timestamp = Date.now();
	const filename = `report-img-${timestamp}.jpeg`;
	const base64 = image.split(',')[1];

	const upload = await supabase.storage
		.from('users')
		.upload(`reports/${filename}`, decode(base64), {
			contentType: 'image/jpeg',
		});

	if (upload.error) throw upload.error;
	if (!upload.data) throw 'No data returned';

	const url = supabase.storage.from('users').getPublicUrl(upload.data.Key);
	if (url.error) throw url.error;
	if (!url.data) throw 'No url generated';

	return url.data.publicURL;
}
