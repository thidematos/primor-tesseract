import { Link } from "react-router-dom";

function Logo({ width = "w-full", position = "", useLink = true }) {
  return (
    <div
      className={`${width} ${position} flex flex-col items-center justify-center gap-16`}
    >
      <Link
        to={useLink ? "/overview/relatorios" : ""}
        className={`${useLink ? "" : "cursor-default"}`}
      >
        <img src="/logo.png" />
      </Link>
    </div>
  );
}

export default Logo;
