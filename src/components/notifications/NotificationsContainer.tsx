import useNotifications from "../../store/useNotifications"
import Notification from "./Notification"

function NotificationsContainer() {
  const { notifications } = useNotifications()

  return (
    <div className="notifications-container fixed top-6 flex flex-col-reverse gap-2">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  )
}

export default NotificationsContainer
