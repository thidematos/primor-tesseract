function Title({ children, fontSize = "", bold = false }) {
  return (
    <h1
      className={`${fontSize || "text-xl"} ${bold ? "font-bold" : ""} font-montserrat text-gray-800 drop-shadow`}
    >
      {children}
    </h1>
  );
}

export default Title;
