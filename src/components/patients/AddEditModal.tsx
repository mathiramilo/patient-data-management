import { useEffect, useRef, useState } from "react"
import { IconDeviceFloppy, IconUserPlus } from "@tabler/icons-react"
import { z } from "zod"

import { Patient } from "../../types"
import useAddEditModal from "../../store/useAddEditModal"
import usePatients from "../../store/usePatients"
import useNotifications from "../../store/useNotifications"
import { createObjectURLFromPath } from "../../lib/createObjectURLFromPath"
import Input from "../ui/Input"
import Textarea from "../ui/Textarea"
import UploadPhoto from "../ui/UploadPhoto"
import Modal from "../ui/Modal"

type FileInput = {
  file: File | null
  url: string
}

const FormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string"
    })
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string"
    })
    .trim()
    .min(10, { message: "Description must be at least 20 characters long" })
    .max(1000, { message: "Description must be at most 1000 characters long" }),
  website: z
    .string()
    .trim()
    .url({ message: "Website must be a valid URL" })
    .or(z.literal(""))
})

function AddEditModal() {
  const [patientData, setPatientData] = useState({
    name: "",
    description: "",
    website: "",
    avatar: ""
  })
  const [avatar, setAvatar] = useState<FileInput>({
    file: null,
    url: ""
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const { isOpen, patientId, close } = useAddEditModal()
  const { patients, addPatient, updatePatient } = usePatients()
  const { addNotification } = useNotifications()

  const isEdit = patientId !== undefined

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, description, website } = patientData

    const parsedFormData = FormSchema.safeParse({
      name,
      description,
      website
    })

    if (!parsedFormData.success) {
      const error = parsedFormData.error
      let newErrors = {}
      for (const issue of error.issues) {
        newErrors = { ...newErrors, [issue.path[0]]: issue.message }
      }
      setFormErrors(newErrors)
      setTimeout(() => setFormErrors({}), 5000)
      return
    }

    const payload: Pick<
      Patient,
      "avatar" | "name" | "description" | "website"
    > = {
      avatar:
        avatar.url ||
        patientData.avatar ||
        (await createObjectURLFromPath("/user-placeholder.jpg")),
      name: parsedFormData.data.name,
      description: parsedFormData.data.description,
      website: parsedFormData.data.website
    }

    if (isEdit) {
      updatePatient(patientId, payload)
      addNotification.success("Patient data updated successfully")
    } else {
      addPatient(payload)
      addNotification.success("Patient added successfully")
    }

    setAvatar({ file: null, url: "" })
    setFormErrors({})
    setPatientData({
      name: "",
      description: "",
      website: "",
      avatar: ""
    })
    formRef.current?.reset()
    close()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPatientData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCancel = () => {
    setAvatar({ file: null, url: "" })
    setFormErrors({})
    formRef.current?.reset()
    close()
  }

  useEffect(() => {
    if (isEdit) {
      const patient = patients.find((patient) => patient.id === patientId)
      if (patient) {
        setPatientData(patient)
      }
    } else {
      setPatientData({
        name: "",
        description: "",
        website: "",
        avatar: ""
      })
    }
  }, [patientId, patients, isEdit])

  return (
    <Modal isOpen={isOpen}>
      {/* Header */}
      <div className="mb-10 flex items-center gap-4 border-b-[1px] border-white/10 pb-3">
        <IconUserPlus size={42} className="stroke-lime" />
        <h2 className="text-2xl font-bold text-white">
          {isEdit ? "Edit Patient's Data" : "Add New Patient"}
        </h2>
      </div>

      {/* Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex h-[90%] flex-col justify-between gap-10 lg:h-max"
      >
        {/* Inputs */}
        <div className="flex flex-col gap-4">
          {/* Avatar Photo */}
          <UploadPhoto
            id="avatar"
            className="mb-4"
            src={avatar.url || patientData.avatar || "/user-placeholder.jpg"}
            alt={isEdit ? patientData.name : "Placeholder Avatar"}
            labelText={isEdit ? "Change Photo" : "Upload a Photo"}
            onFileChange={handleFileChange}
            name="avatar"
          />

          {/* Name */}
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="Enter the Patient's Name"
            value={patientData.name}
            onChange={handleInputChange}
            required
            label="Name"
            {...(formErrors.name && { error: formErrors.name })}
          />

          {/* Description */}
          <Textarea
            id="description"
            name="description"
            placeholder="Write about the Patient"
            value={patientData.description}
            onChange={handleInputChange}
            required
            label="Description"
            {...(formErrors.description && { error: formErrors.description })}
          />

          {/* Website */}
          <Input
            type="text"
            id="website"
            name="website"
            placeholder="Enter the Patient's Website URL"
            value={patientData.website}
            onChange={handleInputChange}
            label="Website"
            {...(formErrors.website && { error: formErrors.website })}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="flex items-center justify-center gap-1 rounded bg-lime p-2 transition-all active:bg-lime/80 lg:hover:shadow-lg lg:hover:shadow-lime/25"
          >
            <IconDeviceFloppy size={36} className="stroke-black" />
            <span className="text-lg font-bold">Save</span>
          </button>
          <button
            onClick={handleCancel}
            className="rounded p-3 text-lg font-bold text-lime active:bg-white/5 lg:hover:bg-white/5 lg:active:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditModal
