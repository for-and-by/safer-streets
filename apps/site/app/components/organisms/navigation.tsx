import Logo from "~/components/atoms/logo";
import { Link } from "@remix-run/react";

export default function Navigation() {
  return (
    <nav className="mt-2 flex items-center justify-between bg-gray-100 p-2">
      <Link to="/" className="btn btn-light">
        <Logo />
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/">About</Link>
        <Link to="/">Support</Link>
        <Link
          to="https://app.saferstreets.info"
          className="btn btn-primary btn-inline"
        >
          Open App
        </Link>
      </div>
    </nav>
  );
}
