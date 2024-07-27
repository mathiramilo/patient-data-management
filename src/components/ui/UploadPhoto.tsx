import { IconCamera } from "@tabler/icons-react"

interface UploadPhotoProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  className?: string
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  src: string
  alt: string
  labelText: string
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({
  id,
  className,
  onFileChange,
  src,
  alt,
  labelText,
  ...props
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="group flex w-max cursor-pointer items-center gap-4"
      >
        <img
          src={src}
          alt={alt}
          className="h-20 w-20 rounded-full border-2 border-lime"
        />
        <div className="flex items-center gap-2">
          <IconCamera className="stroke-white" />
          <span className="font-medium text-white group-active:underline lg:group-hover:underline">
            {labelText}
          </span>
        </div>
      </label>
      <input
        type="file"
        className="hidden"
        id={id}
        onChange={onFileChange}
        {...props}
      />
    </div>
  )
}

export default UploadPhoto
