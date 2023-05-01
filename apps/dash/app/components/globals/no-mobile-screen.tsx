export default function NoMobileScreen() {
  return (
    <div className="fixed inset-0 md:hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur" />
      <div className="absolute left-1/2 top-1/2 flex w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded bg-white p-8 shadow-2xl">
        <p className="text-xl font-medium">Oh no, there's a problem!</p>
        <p className="text-gray-500">
          It looks like you're viewing this page on a device that this site was
          not designed for! Please load up this page on a desktop computer,
          laptop or tablet.
        </p>
      </div>
    </div>
  );
}
