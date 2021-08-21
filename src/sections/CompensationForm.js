export default function CompensationForm({ children, onSubmit }) {
  return (
    <form className="compensation-form" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
