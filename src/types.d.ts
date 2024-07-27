export type Patient = {
  createdAt: string
  name: string
  avatar: string
  description: string
  website: string
  id: string
}

type Notification = {
  id: string
  message: string
  type: "info" | "success" | "warning" | "error"
}

export type FileInput = {
  file: File | null
  url: string
}
