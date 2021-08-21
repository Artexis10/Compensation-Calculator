export default function Input(props) {
  const { suffix } = props;

  return suffix ? (
    <div className="type-wrapper">
      <input {...props} />
      <p className="type">{suffix}</p>
    </div>
  ) : (
    <input {...props} />
  );
}
