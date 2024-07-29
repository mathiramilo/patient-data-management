import useNotifications from "../../store/useNotifications"
import Notification from "./Notification"

function NotificationsContainer() {
  const { notifications } = useNotifications()

  return (
    <div className="fixed left-0 right-0 top-6 flex flex-col-reverse items-center justify-center gap-2">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  )
}

export default NotificationsContainer
