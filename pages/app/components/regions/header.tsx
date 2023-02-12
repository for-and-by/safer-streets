import React, { ReactNode } from 'react';
import Portal from '~/components/elements/portal';

const REGION_ID = 'header';

interface PropsRoot {
  children: ReactNode;
}

function Root({ children }: PropsRoot) {
	return <Portal selector={`#${REGION_ID}`}>{children}</Portal>;
}

function Container() {
	return (
		<div
			className="pointer-events-auto flex flex-col overflow-hidden rounded-b"
			id={REGION_ID}
		/>
	);
}

const Header = Object.assign(Root, { Container });

export default Header;
