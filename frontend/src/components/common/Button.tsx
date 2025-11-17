import '../../styles.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...rest }) => {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-outline';
  return (
    <button className={`${baseClass} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
