import '../../styles.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', ...rest }) => {
  return (
    <label className="block mb-4">
      {label && <span className="input-label">{label}</span>}
      <input className={`input-base ${className}`} {...rest} />
    </label>
  );
};

export default Input;
