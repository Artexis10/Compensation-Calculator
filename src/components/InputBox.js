export default function InputBox({ children, inline }) {
  return (
    <div className={`input-box ${inline ? "inline" : ""}`}>{children}</div>
  );
}
