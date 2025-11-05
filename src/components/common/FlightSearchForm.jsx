import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { searchFlights, updateCriteria } from '../../features/search/searchSlice'
import { selectSearchDomain } from '../../store'
import { DatePickerField } from './DatePickerField'
import { MarketSelector } from './MarketSelector'

export function FlightSearchForm({ compact = false }) {
  const dispatch = useDispatch()
  const { criteria, status } = useSelector((state) => selectSearchDomain(state, 'flights'))
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

  const handleMarketChange = (nextValue) => {
    setFormValues((prev) => ({ ...prev, market: nextValue }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(updateCriteria({ domain: 'flights', criteria: formValues }))
    dispatch(searchFlights(formValues))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid gap-4 md:items-end ${compact ? 'md:grid-cols-5' : 'md:grid-cols-6'}`}
    >
      <div className="col-span-full">
        <MarketSelector
          value={formValues.market}
          onChange={handleMarketChange}
          idPrefix="flight-market"
          label="Journey focus"
        />
      </div>
      <div className="md:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="flight-origin">
          From
        </label>
        <input
          id="flight-origin"
          name="origin"
          className="input"
          placeholder="City or airport"
          value={formValues.origin}
          onChange={handleChange}
          required={!compact}
        />
      </div>
      <div className="md:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="flight-destination">
          To
        </label>
        <input
          id="flight-destination"
          name="destination"
          className="input"
          placeholder="City or airport"
          value={formValues.destination}
          onChange={handleChange}
          required={!compact}
        />
      </div>
      <div className="md:col-span-2">
        <DatePickerField
          id="flight-date"
          name="date"
          label="Depart"
          value={formValues.date}
          min={new Date().toISOString().slice(0, 10)}
          onChange={handleDateChange}
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="flight-passengers">
          Travelers
        </label>
        <input
          id="flight-passengers"
          type="number"
          name="passengers"
          min={1}
          className="input"
          value={formValues.passengers}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-1">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="flight-cabin">
          Cabin
        </label>
        <select id="flight-cabin" name="cabin" className="input" value={formValues.cabin} onChange={handleChange}>
          <option>Economy</option>
          <option>Premium Economy</option>
          <option>Business</option>
          <option>First</option>
        </select>
      </div>
      <div className="md:col-span-2 md:flex md:items-end">
        <button type="submit" className="btn-primary w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Searching…' : compact ? 'Update results' : 'Search flights'}
        </button>
      </div>
    </form>
  )
}
