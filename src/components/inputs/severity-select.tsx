import React from 'react';

import Select from '~/components/inputs/select';
import useAsync from '~/hooks/use-async';
import fetchSeverities from '~/lib/fetch-severities';

export function SeveritySelect() {
	const { data, isLoading } = useAsync(fetchSeverities);
	if (data && data.length <= 0) return null;
	return <Select label="Severity" options={} onChange={} value={} name={} />;
}
