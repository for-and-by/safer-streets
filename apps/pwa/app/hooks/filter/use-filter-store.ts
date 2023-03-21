import type {Severity, Type} from '~/types/db';
import type {StateCreator} from 'zustand';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface State {
	severities: Severity[];
	types: Type[];
}

interface Actions {
	setSeverities: (severities: Severity[]) => void;
	setTypes: (types: Type[]) => void;
}

interface Store extends Actions, State {
}

const initialState: State = {
	severities: [],
	types: [],
};

const store: StateCreator<Store, [['zustand/persist', unknown]]> = (
	set,
) => ({
	...initialState,
	setSeverities: (severities) => {
		set({severities});
	},
	setTypes: (types) => {
		set({types});
	},
});

export const useFilterStore = create<Store>()(
	persist(store, {
		name: 'filter',
	})
);
