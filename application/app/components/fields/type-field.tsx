import React from 'react';
import {useController, useFormContext} from 'react-hook-form';

import {useFilterTypes} from '~/hooks/filter/use-filter-types';

import Select from '~/components/inputs/select';

export default function TypeField() {
	const [types] = useFilterTypes();

	const {control} = useFormContext();
	const {
		field,
		fieldState: {error},
	} = useController({
		name: 'type',
		control,
		rules: {
			required: 'A report type is required',
		},
	});

	return (
		<Select
			label="Type"
			options={types?.map((result) => ({
				label: result.title,
				value: result.handle,
			}))}
			error={error}
			{...field}
		/>
	);
}
