import { useEffect, useRef, useState } from "react"
import { IconDeviceFloppy, IconUserPlus } from "@tabler/icons-react"
import { z } from "zod"

import { Patient } from "../../types"
import useModal from "../../store/useModal"
import usePatients from "../../store/usePatients"
import useNotifications from "../../store/useNotifications"
import { createObjectURLFromPath } from "../../lib/createObjectURLFromPath"
import Input from "../ui/Input"
import Textarea from "../ui/Textarea"
import UploadPhoto from "../ui/UploadPhoto"

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
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string"
    })
    .min(10, { message: "Description must be at least 20 characters long" })
    .max(1000, { message: "Description must be at most 1000 characters long" }),
  website: z
    .string()
    .url({ message: "Website must be a valid URL" })
    .or(z.literal(""))
})

function AddEditModal() {
  const [patientData, setPatientData] = useState({} as Patient)
  // We use this state to store the avatar file and its URL, so we can preview it
  const [avatar, setAvatar] = useState<FileInput>({
    file: null,
    url: ""
  })
  // Keep track of the form errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const { isOpen, patientId, close } = useModal()
  const { patients, addPatient, updatePatient } = usePatients()
  const { addNotification } = useNotifications()

  // If there isn't a patientId, then the user is adding a new patient
  const isEdit = patientId !== undefined

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const { name, description, website } = Object.fromEntries(
      formData.entries()
    )

    // We validate the form data
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

    // If the user is editing a patient, we use existing data, otherwise we use the new data
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
      // Update the patient
      updatePatient(patientId, payload)
      addNotification.success("Patient data updated successfully")
    } else {
      // Add the patient
      addPatient(payload)
      addNotification.success("Patient added successfully")
    }

    setAvatar({ file: null, url: "" })
    form.reset()
    close()
  }

  // Executed when the user selects a file
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  // Executed when the modal is closed
  const handleClose = () => {
    setAvatar({ file: null, url: "" })
    setFormErrors({})
    formRef.current?.reset()
    close()
  }

  // When the modal is rendered, we check if the user is editing a patient, so we can find the patient data
  useEffect(() => {
    if (isEdit) {
      const patient = patients.find((patient) => patient.id === patientId)
      if (patient) {
        setPatientData(patient)
      }
    }
  }, [patientId, patients, isEdit])

  if (!isOpen) return null

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white/[0.02] backdrop-blur-lg">
      {/* Modal */}
      <section className="h-screen w-screen bg-darkblue p-5 lg:h-max lg:w-[65%] lg:max-w-[700px] lg:rounded-lg lg:border-[1px] lg:border-white/10 lg:p-10 lg:shadow-2xl">
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
              src={
                isEdit
                  ? avatar.url || patientData.avatar
                  : avatar.url || "/user-placeholder.jpg"
              }
              alt={isEdit ? patientData.name : "Placeholder Avatar"}
              labelText={isEdit ? "Change Photo" : "Upload a Photo"}
              onFileChange={handleChangeFile}
              name="avatar"
            />

            {/* Name */}
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter the Patient's Name"
              defaultValue={isEdit ? patientData.name : ""}
              required
              label="Name"
              {...(formErrors.name && { error: formErrors.name })}
            />

            {/* Description */}
            <Textarea
              id="description"
              name="description"
              placeholder="Write about the Patient"
              defaultValue={isEdit ? patientData.description : ""}
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
              defaultValue={isEdit ? patientData.website : ""}
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
              onClick={handleClose}
              className="rounded p-3 text-lg font-bold text-lime active:bg-white/5 lg:hover:bg-white/5 lg:active:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddEditModal
