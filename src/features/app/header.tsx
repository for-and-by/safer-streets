export default function AppHeader() {
  return (
    <div className="pointer-events-auto flex w-full flex-row divide-x divide-base-200 border-b border-base-200 bg-base-100">
      {/* <InfoModal className="flex h-full items-center px-2">
        <i className="ri-information-fill text-base text-brand-700" />
      </InfoModal> */}
      <div className="flex flex-grow flex-row space-x-4 py-1 px-2">
        <p className="text-sm font-medium text-base-900">
          Endorsed By Jonathon Sri
        </p>
      </div>
      <div className="flex flex-row items-center space-x-2 px-2">
        <p className="text-sm text-base-800 underline underline-offset-1">
          Privacy
        </p>
        <p className="text-sm text-base-800 underline underline-offset-1">
          Terms
        </p>
      </div>
    </div>
  );
}
