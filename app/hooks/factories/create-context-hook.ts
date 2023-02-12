import React from 'react';

export default function createContextHook<ContextValue>(contextObj: {
  [key: string]: React.Context<ContextValue>;
}) {
	return function () {
		const contextName = Object.keys(contextObj)[0];
		const context = React.useContext(contextObj[contextName]);

		if (!context) {
			throw new Error(
				`This hook or component needs to be used within it's context: ${contextName}`
			);
		}

		return context;
	};
}
