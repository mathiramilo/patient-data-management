import clsx from "clsx"

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string
  required?: boolean
  className?: string
  label: string
  error?: string
}

const Textarea: React.FC<TextareaProps> = ({
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
      <textarea
        id={id}
        className={clsx(
          className,
          "h-36 w-full resize-none rounded bg-white/[0.02] p-2 text-white focus:outline-none focus:outline-white/5"
        )}
        {...props}
      ></textarea>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}

export default Textarea
