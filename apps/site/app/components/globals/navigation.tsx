import Logo from "~/components/elements/logo";
import { Link } from "@remix-run/react";

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between bg-white p-2">
      <Link to="/" className="btn btn-white">
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
