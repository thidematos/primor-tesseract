import { useExtract } from "../context/ExtractProvider";

function Logo({ width = "w-full", position = "" }) {
  const { extractPDFData } = useExtract();

  return (
    <div
      className={`${width} ${position} flex flex-col items-center justify-center gap-16`}
    >
      <label htmlFor="input">
        <img src="/logo.png" />
      </label>
      <input
        type="file"
        id="input"
        className="hidden"
        multiple={false}
        onChange={(e) => extractPDFData(e.target.files[0])}
      />
    </div>
  );
}

export default Logo;
