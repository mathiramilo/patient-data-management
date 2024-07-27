export type Patient = {
  createdAt: string
  name: string
  avatar: string
  description: string
  website: string
  id: string
}

export type Notification = {
  id: string
  message: string
  type: "info" | "success" | "warning" | "error"
}
