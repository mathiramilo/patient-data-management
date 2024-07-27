import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

import { Notification } from "../types"

interface NotificationsStore {
  notifications: Notification[]
  addNotification: {
    info: (message: string) => void
    success: (message: string) => void
    warning: (message: string) => void
    error: (message: string) => void
  }
  removeNotification: (id: string) => void
}

const useNotifications = create<NotificationsStore>((set) => ({
  notifications: [],
  addNotification: {
    info: (message) => {
      const id = uuidv4()
      set((state) => {
        let newNotifications = state.notifications
        if (state.notifications.length >= 5) {
          newNotifications = state.notifications.slice(1)
        }
        return {
          notifications: [...newNotifications, { id, message, type: "info" }]
        }
      })
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id)
        }))
      }, 5000)
    },
    success: (message) => {
      const id = uuidv4()
      set((state) => {
        let newNotifications = state.notifications
        if (state.notifications.length >= 5) {
          newNotifications = state.notifications.slice(1)
        }
        return {
          notifications: [...newNotifications, { id, message, type: "success" }]
        }
      })
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id)
        }))
      }, 5000)
    },
    warning: (message) => {
      const id = uuidv4()
      set((state) => {
        let newNotifications = state.notifications
        if (state.notifications.length >= 5) {
          newNotifications = state.notifications.slice(1)
        }
        return {
          notifications: [...newNotifications, { id, message, type: "warning" }]
        }
      })
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id)
        }))
      }, 5000)
    },
    error: (message) => {
      const id = uuidv4()
      set((state) => {
        let newNotifications = state.notifications
        if (state.notifications.length >= 5) {
          newNotifications = state.notifications.slice(1)
        }
        return {
          notifications: [...newNotifications, { id, message, type: "error" }]
        }
      })
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id)
        }))
      }, 5000)
    }
  },
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    }))
}))

export default useNotifications
