import clsx from "clsx"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  required?: boolean
  className?: string
  label: string
  error?: string
}

const Input: React.FC<InputProps> = ({
  id,
  required,
  className,
  label,
  error,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-medium text-white">
        {label}
        {required && " *"}
      </label>
      <input
        id={id}
        className={clsx(
          className,
          "w-full rounded bg-white/[0.02] p-2 text-white focus:outline-none focus:outline-white/5"
        )}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}

export default Input
