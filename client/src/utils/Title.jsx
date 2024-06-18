function Title({
  children,
  fontSize = "",
  bold = false,
  gridProperty = "",
  margin = "",
}) {
  return (
    <h1
      className={`${fontSize || "text-xl"} ${bold ? "font-bold" : ""} ${gridProperty || ""} ${margin || ""} font-montserrat text-gray-800 drop-shadow`}
    >
      {children}
    </h1>
  );
}

export default Title;
