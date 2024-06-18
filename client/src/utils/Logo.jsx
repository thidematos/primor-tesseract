function Logo({ width = "w-full", position = "" }) {
  return (
    <div
      className={`${width} ${position} flex flex-col items-center justify-center gap-16`}
    >
      <img src="/logo.png" />
    </div>
  );
}

export default Logo;
