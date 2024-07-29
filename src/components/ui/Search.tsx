import { useEffect, useState } from "react"
import { useSpring, animated } from "@react-spring/web"
import clsx from "clsx"
import {
  IconArrowsSort,
  IconSearch,
  IconArrowBarDown,
  IconArrowBarUp
} from "@tabler/icons-react"

import { Order, OrderBy } from "../../types"
import usePatients from "../../store/usePatients"
import useDebounce from "../../hooks/useDebounce"

const buttons: Array<{
  field: OrderBy
  order: Order
  label: string
}> = [
  { field: "id", order: "asc", label: "Patient ID" },
  { field: "id", order: "desc", label: "Patient ID" },
  { field: "name", order: "asc", label: "Name" },
  { field: "name", order: "desc", label: "Name" },
  { field: "createdAt", order: "asc", label: "Created At" },
  { field: "createdAt", order: "desc", label: "Created At" }
]

function Search() {
  const [search, setSearch] = useState("")
  const [orderBy, setOrderBy] = useState({
    field: "id",
    order: "asc"
  })
  const [orderByOpen, setOrderByOpen] = useState(false)

  const debouncedSearch = useDebounce(search, 500)

  const { filterPatients, patients, filteredPatients } = usePatients()

  const handleOrderBy = (field: OrderBy, order: Order) => {
    if (field === orderBy.field && order === orderBy.order)
      return setOrderByOpen(false)
    setOrderBy({ field, order })
    filterPatients(search, field, order)
    setOrderByOpen(false)
  }

  useEffect(() => {
    filterPatients(
      debouncedSearch,
      orderBy.field as OrderBy,
      orderBy.order as Order
    )
  }, [debouncedSearch]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (JSON.stringify(filteredPatients) === JSON.stringify(patients)) {
      setSearch("")
      setOrderBy({ field: "id", order: "asc" })
    }
  }, [filteredPatients, patients])

  const springOrderBy = useSpring({
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: {
      opacity: orderByOpen ? 1 : 0,
      transform: orderByOpen ? "translateY(0)" : "translateY(-10px)"
    },
    config: { duration: 150 }
  })

  return (
    <>
      <div className="relative mt-10 flex items-center gap-2">
        {/* Search Input */}
        <div className="flex items-center gap-2 rounded border-2 border-transparent bg-white/[0.02] p-2 focus-within:border-2 focus-within:border-white/5">
          <label htmlFor="search" className="cursor-text">
            <IconSearch size={20} className="stroke-lime" />
          </label>
          <input
            type="text"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for patients"
            className="max-w-36 bg-transparent text-sm text-white focus:outline-none"
          />
        </div>

        {/* Sort Button */}
        <button
          className="flex items-center justify-center rounded bg-lime p-2 transition-all active:bg-lime/80"
          onClick={() => setOrderByOpen((prev) => !prev)}
        >
          <IconArrowsSort size={20} />
        </button>

        {/* Select Sort Option */}
        {orderByOpen && (
          <animated.div
            className="divide absolute left-0 right-0 top-12 flex flex-col items-start divide-y divide-white/10 rounded border border-white/5 bg-[#282C3A] p-2 shadow-sm"
            style={springOrderBy}
          >
            {/* Buttons */}
            {buttons.map((item, index) => (
              <button
                key={index}
                className={clsx(
                  orderBy.field === item.field &&
                    orderBy.order === item.order &&
                    "bg-white/10",
                  "flex w-full justify-between rounded px-2 py-3 hover:bg-white/10 active:bg-white/15"
                )}
                onClick={() => handleOrderBy(item.field, item.order)}
              >
                <span className="text-sm font-medium text-white/80">
                  {item.label}
                </span>
                {item.order === "asc" ? (
                  <IconArrowBarDown size={20} className="stroke-lime" />
                ) : (
                  <IconArrowBarUp size={20} className="stroke-lime" />
                )}
              </button>
            ))}
          </animated.div>
        )}
      </div>

      {/* Current Sorting */}
      <div className="mt-2 flex items-center gap-2 self-start pl-1">
        <span className="text-xs text-white/20">Order by: {orderBy.field}</span>
        {orderBy.order === "asc" ? (
          <IconArrowBarDown size={14} className="stroke-lime" />
        ) : (
          <IconArrowBarUp size={14} className="stroke-lime" />
        )}
      </div>
    </>
  )
}

export default Search
