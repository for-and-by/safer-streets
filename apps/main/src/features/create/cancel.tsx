import React from "react";
import view from "~/store/view/actions";

import useTypedDispatch from "~/hooks/use-typed-dispatch";

import WarningModal from "~/features/modals/warning";

interface Props {
  children?: React.ReactNode;
}

export default function CreateCancel({ children }: Props) {
  const dispatch = useTypedDispatch();

  const handleExit = () => {
    // TODO: add the store here
    // dispatch(resetCreateData());
    dispatch(view.active.reset());
  };

  return (
    <WarningModal
      className="hover:cursor-pointer"
      heading="Cancel Submission"
      body="Are sure you want to cancel this submission? You'll lose all the data you've submitted up to this point."
      onConfirm={handleExit}
    >
      {children}
    </WarningModal>
  );
}
