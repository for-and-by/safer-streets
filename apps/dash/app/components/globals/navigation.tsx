import Logo from "~/components/elements/logo";
import { Link } from "@remix-run/react";

export default function Navigation() {
  return (
    <nav className="flex flex-col items-center justify-between">
      <Link to="/" className="btn btn-white">
        <Logo />
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/content/about" className="hidden md:block">
          About
        </Link>
        <Link to="/contact" className="hidden md:block">
          Get in Touch
        </Link>
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
