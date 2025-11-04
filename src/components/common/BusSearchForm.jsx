import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { searchBuses, updateCriteria } from '../../features/search/searchSlice'
import { selectSearchDomain } from '../../store'
import { DatePickerField } from './DatePickerField'

export function BusSearchForm({ compact = false }) {
  const dispatch = useDispatch()
  const { criteria, status } = useSelector((state) => selectSearchDomain(state, 'buses'))
  const [formValues, setFormValues] = useState(criteria)

  useEffect(() => {
    setFormValues(criteria)
  }, [criteria])

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextValue = name === 'passengers' ? Number(value) : value
    setFormValues((prev) => ({ ...prev, [name]: nextValue }))
  }

  const handleDateChange = (nextDate) => {
    setFormValues((prev) => ({ ...prev, date: nextDate }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(updateCriteria({ domain: 'buses', criteria: formValues }))
    dispatch(searchBuses(formValues))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid gap-4 md:items-end ${compact ? 'md:grid-cols-4' : 'md:grid-cols-5'}`}
    >
      <div className="md:col-span-1">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="bus-origin">
          From
        </label>
        <input
          id="bus-origin"
          name="origin"
          className="input"
          placeholder="Departure city"
          value={formValues.origin}
          onChange={handleChange}
          required={!compact}
        />
      </div>
      <div className="md:col-span-1">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="bus-destination">
          To
        </label>
        <input
          id="bus-destination"
          name="destination"
          className="input"
          placeholder="Arrival city"
          value={formValues.destination}
          onChange={handleChange}
          required={!compact}
        />
      </div>
      <div className="md:col-span-2">
        <DatePickerField
          id="bus-date"
          name="date"
          label="Travel date"
          value={formValues.date}
          min={new Date().toISOString().slice(0, 10)}
          onChange={handleDateChange}
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="bus-passengers">
          Travelers
        </label>
        <input
          id="bus-passengers"
          type="number"
          name="passengers"
          min={1}
          className="input"
          value={formValues.passengers}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-2 md:flex md:items-end">
        <button type="submit" className="btn-primary w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Searching…' : compact ? 'Update results' : 'Find buses'}
        </button>
      </div>
    </form>
  )
}
