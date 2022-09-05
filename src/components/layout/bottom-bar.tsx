export default function BottomBar() {
  return (
    <div className="pointer-events-auto flex w-full flex-row bg-base-100">
      <div className="flex w-full flex-row justify-between text-base-700">
        <a
          className="px-2 py-1 text-sm"
          href="~/features/layout/footer"
          target="_blank"
        >
          &copy; MapTiler
        </a>
        <a
          className="px-2 py-1 text-sm"
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
        >
          &copy; OpenStreetMap Contributors
        </a>
      </div>
    </div>
  );
}