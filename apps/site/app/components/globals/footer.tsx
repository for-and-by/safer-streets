import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <div className="flex items-center justify-between rounded-md bg-gray-900 p-4 text-gray-400">
      <p className="text-white">
        Built by{" "}
        <span className="font-medium text-brand-500">Jordan Accinelli</span>
      </p>
      <div className="flex items-center gap-6">
        <Link to="/">Terms & Conditions</Link>
        <Link to="/">Privacy</Link>
        <Link to="/">&copy; Attribution</Link>
      </div>
    </div>
  );
}
