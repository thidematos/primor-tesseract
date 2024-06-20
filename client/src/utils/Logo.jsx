import { Link } from "react-router-dom";

function Logo({ width = "w-full", position = "" }) {
  return (
    <div
      className={`${width} ${position} flex flex-col items-center justify-center gap-16`}
    >
      <Link to={"/overview/relatorios"}>
        <img src="/logo.png" />
      </Link>
    </div>
  );
}

export default Logo;
