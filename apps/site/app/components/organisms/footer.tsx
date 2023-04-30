import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <div className="mb-2 flex items-center justify-between bg-gray-100 p-4 text-gray-500">
      <div className="flex items-center gap-6">
        <Link to="/">Terms & Conditions</Link>
        <Link to="/">Privacy</Link>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/">&copy; Attribution</Link>
      </div>
    </div>
  );
}
