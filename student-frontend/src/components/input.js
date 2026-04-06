function InputField({ label, name, onChange,options }) {
  return (
    <div className="input-group">
      <label>{label}</label>

      {options ? (
        <select name={name} onChange={onChange} required>
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input type="number" name={name} onChange={onChange} required />
      )}
    </div>
  );
}

export default InputField;