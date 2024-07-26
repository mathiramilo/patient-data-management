import { IconAlertTriangle } from "@tabler/icons-react"

interface ErrorProps {
  message: string
}

function Error({ message }: ErrorProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 lg:col-span-2">
      <IconAlertTriangle size={32} className="stroke-lime" />
      <p className="text-sm font-medium text-white">{message}</p>
    </div>
  )
}

export default Error
