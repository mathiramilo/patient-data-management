import { useState } from "react"
import clsx from "clsx"
import {
  IconEdit,
  IconChevronDown,
  IconWorldWww,
  IconClock
} from "@tabler/icons-react"

import { Patient } from "../../types"
import useModal from "../../store/useModal"

interface PatientCardProps {
  patient: Patient
}

function PatientCard({ patient }: PatientCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { open, setPatientId } = useModal()
  const { createdAt, name, avatar, description, website, id } = patient

  const handleOpenEditModal = () => {
    setPatientId(id)
    open()
  }

  return (
    <div
      className={clsx(
        isExpanded ? "max-h-[1200px]" : "max-h-[107px]",
        "flex flex-col gap-7 overflow-hidden border-[1px] border-white/5 bg-white/[0.01] p-5 transition-all"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-5">
          <img
            src={avatar}
            alt={name}
            className="h-16 w-16 rounded-full border-2 border-lime"
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-white">{name}</h2>
            <span className="text-gray">Patient ID: {id}</span>
          </div>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenEditModal}
            className="rounded-full bg-white/5 p-2 active:bg-white/10"
          >
            <IconEdit className="stroke-lime" />
          </button>
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="rounded-full p-2 active:bg-white/5"
          >
            <IconChevronDown
              className={clsx(
                isExpanded && "-rotate-180",
                "stroke-lime transition-all"
              )}
            />
          </button>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-white">Description: </h3>
        <p className="text-sm text-white/50">{description}</p>
      </div>

      {/* Website & Timestamp */}
      <div className="flex flex-wrap items-center gap-3">
        {website && (
          <div className="flex items-center gap-2">
            <IconWorldWww size={20} className="stroke-lime" />
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-white active:underline lg:hover:underline"
            >
              {website}
            </a>
          </div>
        )}
        <div className="flex items-center gap-2">
          <IconClock size={20} className="stroke-lime" />
          <span className="text-sm font-medium text-white">
            {new Date(createdAt).toDateString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PatientCard
