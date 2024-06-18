function InteractionButton({
  action,
  children,
  disabled = false,
  width = "",
  fontSize = "",
  className = "",
}) {
  return (
    <button
      disabled={disabled}
      onClick={action}
      className={`${className || ``} duration-200`}
    >
      {children}
    </button>
  );
}

export default InteractionButton;
