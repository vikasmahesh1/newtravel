import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { searchHolidays, updateCriteria } from '../../features/search/searchSlice'
import { selectSearchDomain } from '../../store'

const themes = [
  'Romantic retreats',
  'Culture & heritage',
  'Family adventures',
  'Epic expeditions',
  'Wellness escapes',
]

export function HolidaySearchForm({ compact = false }) {
  const dispatch = useDispatch()
  const { criteria, status } = useSelector((state) => selectSearchDomain(state, 'holidays'))
  const [formValues, setFormValues] = useState(criteria)
  const hasStartDate = Boolean(formValues.startDate)
  const hasEndDate = Boolean(formValues.endDate)
  const formattedStart = hasStartDate
    ? new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(
        new Date(formValues.startDate)
      )
    : 'Select start date'
  const formattedEnd = hasEndDate
    ? new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(
        new Date(formValues.endDate)
      )
    : 'Select end date'

  useEffect(() => {
    setFormValues(criteria)
  }, [criteria])

  const handleChange = (event) => {
    const { name, value } = event.target
    const numericFields = ['travelers', 'budget']
    const nextValue = numericFields.includes(name) ? Number(value) : value
    setFormValues((prev) => ({ ...prev, [name]: nextValue }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(updateCriteria({ domain: 'holidays', criteria: formValues }))
    dispatch(searchHolidays(formValues))
  }

  return (
    <form onSubmit={handleSubmit} className={`grid gap-4 ${compact ? 'md:grid-cols-6' : 'md:grid-cols-7'}`}>
      <div className="md:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="holiday-theme">
          Theme
        </label>
        <select
          id="holiday-theme"
          name="theme"
          className="input"
          value={formValues.theme}
          onChange={handleChange}
        >
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="holiday-destination">
          Destination
        </label>
        <input
          id="holiday-destination"
          name="destination"
          className="input"
          placeholder="Region or city"
          value={formValues.destination}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="holiday-start">
          Start date
        </label>
        <p className={`date-preview ${hasStartDate ? 'date-preview--active' : ''}`} aria-live="polite">
          <span aria-hidden="true">📅</span>
          {formattedStart}
        </p>
        <input
          id="holiday-start"
          type="date"
          name="startDate"
          className="input input-date"
          value={formValues.startDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="holiday-end">
          End date
        </label>
        <p className={`date-preview ${hasEndDate ? 'date-preview--active' : ''}`} aria-live="polite">
          <span aria-hidden="true">📅</span>
          {formattedEnd}
        </p>
        <input
          id="holiday-end"
          type="date"
          name="endDate"
          className="input input-date"
          value={formValues.endDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="holiday-travelers">
          Travelers
        </label>
        <input
          id="holiday-travelers"
          type="number"
          min={1}
          name="travelers"
          className="input"
          value={formValues.travelers}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="holiday-budget">
          Budget (total)
        </label>
        <input
          id="holiday-budget"
          type="number"
          min={0}
          step={100}
          name="budget"
          className="input"
          value={formValues.budget}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-2 md:flex md:items-end">
        <button type="submit" className="btn-primary w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Curating…' : compact ? 'Update results' : 'Find packages'}
        </button>
      </div>
    </form>
  )
}
