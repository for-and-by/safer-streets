import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <div className="item-start flex flex-col justify-between gap-2 rounded-md bg-brand-700 p-4 text-white md:flex-row md:items-center">
      <p>Built by Jordan Accinelli</p>
      <div className="flex items-center gap-6">
        <Link to="/">&copy; Attribution</Link>
      </div>
    </div>
  );
}
