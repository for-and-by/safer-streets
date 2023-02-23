import type {Report} from '~/types/db';
import type {StateCreator} from 'zustand';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {createSerializableStorage} from '~/lib/zustand';

interface State {
	opened: Set<Report['id']>;
	voted: Map<Report['id'], 1 | 0 | -1>;
}

interface Actions {
	open: (id: Report['id']) => void;
	voteUp: (id: Report['id']) => void;
	voteDown: (id: Report['id']) => void;
	voteClear: (id: Report['id']) => void;
}

interface Store extends Actions, State {
}

const initialState: State = {
	opened: new Set(),
	voted: new Map()
};

const store: StateCreator<Store, [['zustand/persist', unknown]]> = (set) => ({
	...initialState,
	open: (id) => {
		if (!id) return;

		set((prev) => {
			return {
				opened: new Set(prev?.opened).add(id),
				voted: new Map(prev?.voted).set(id, 0),
			};
		});
	},
	voteUp: (id) => {
		if (!id) return;
		set((prev) => ({
			voted: new Map(prev?.voted).set(id, 1),
		}));
	},
	voteDown: (id) => {
		if (!id) return;
		set((prev) => ({
			voted: new Map(prev?.voted).set(id, -1),
		}));
	},
	voteClear: (id) => {
		if (!id) return;
		if (!id) return;
		set((prev) => ({
			voted: new Map(prev?.voted).set(id, 0),
		}));
	}
});

export const useReportStore = create<Store>()(
	persist(store, {
		name: 'reports',
		storage: createSerializableStorage()
	})
);