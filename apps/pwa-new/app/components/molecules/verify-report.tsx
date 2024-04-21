import { Warning, useWarning } from "~/components/composites/warning";

type Props = {
  onVerify: () => void;
};

export function VerifyReport(props: Props) {
  const { onVerify } = props;

  const [isShow, { showWarning, hideWarning, confirmWarning }] =
    useWarning(onVerify);

  return (
    <div className="flex flex-row items-center justify-between rounded bg-gray-900 p-3">
      <p className="font-medium text-white">This report is getting old.</p>
      <Warning.Trigger onShow={showWarning} className="text-brand-400">
        <p className="btn-text">Verify</p>
      </Warning.Trigger>
      <Warning.Panel
        heading="Verify Report"
        body="This report is getting close to it's expiry date. If you know that this report is still relevant, please either verify this report here, or update the information."
        isShow={isShow}
        onHide={hideWarning}
        onConfirm={confirmWarning}
      />
    </div>
  );
}
