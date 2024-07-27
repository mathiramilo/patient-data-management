import { animated, useSpring } from "@react-spring/web"
import clsx from "clsx"
import {
  IconAlertCircle,
  IconInfoCircle,
  IconCircleCheck
} from "@tabler/icons-react"

import useNotifications from "../../store/useNotifications"
import { Notification as NotificationType } from "../../types"

interface NotificationProps {
  notification: NotificationType
}

function Notification({ notification }: NotificationProps) {
  const { removeNotification } = useNotifications()

  const handleRemove = () => {
    removeNotification(notification.id)
  }

  const springs = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 150 }
  })

  const bgColor = () => {
    switch (notification.type) {
      case "info":
        return "bg-lime"
      case "success":
        return "bg-lime"
      case "warning":
        return "bg-yellow-300"
      case "error":
        return "bg-red-400"
    }
  }

  const Icon: React.FC = () => {
    switch (notification.type) {
      case "info":
        return <IconInfoCircle size={20} />
      case "success":
        return <IconCircleCheck size={20} />
      case "warning":
        return <IconAlertCircle size={20} />
      case "error":
        return <IconAlertCircle size={20} />
    }
  }

  return (
    <animated.div
      onClick={handleRemove}
      className={clsx(
        bgColor(),
        "notification flex w-72 cursor-pointer items-center gap-2 rounded border-2 border-white/60 p-4 text-black shadow-md"
      )}
      style={springs}
    >
      <Icon />
      <span className="text-sm font-medium">{notification.message}</span>
    </animated.div>
  )
}

export default Notification
