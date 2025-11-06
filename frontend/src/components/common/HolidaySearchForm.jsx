import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { searchHolidays, updateCriteria } from '../../features/search/searchSlice'
import { selectSearchDomain } from '../../store'
import { DatePickerField } from './DatePickerField'
import { MarketSelector } from './MarketSelector'

const themes = [
  'Romantic retreats',
  'Culture & heritage',
  'Family adventures',
  'Wellness escapes',
  'Adventure quests',
  'Nature retreats',
  'Beach escapes',
  'Spiritual journeys',
  'Gourmet getaways',
  'Epic expeditions',
]

export function HolidaySearchForm({ compact = false }) {
  const dispatch = useDispatch()
  const { criteria, status } = useSelector((state) => selectSearchDomain(state, 'holidays'))
  const [formValues, setFormValues] = useState(criteria)

  useEffect(() => {
    setFormValues(criteria)
  }, [criteria])

  const handleChange = (event) => {
    const { name, value } = event.target
    const numericFields = ['travelers', 'budget']
    const nextValue = numericFields.includes(name) ? Number(value) : value
    setFormValues((prev) => ({ ...prev, [name]: nextValue }))
  }

  const handleStartDateChange = (nextDate) => {
    setFormValues((prev) => {
      const nextState = { ...prev, startDate: nextDate }
      if (prev.endDate && new Date(nextDate) > new Date(prev.endDate)) {
        nextState.endDate = nextDate
      }
      return nextState
    })
  }

  const handleEndDateChange = (nextDate) => {
    setFormValues((prev) => ({ ...prev, endDate: nextDate }))
  }

  const handleMarketChange = (nextValue) => {
    setFormValues((prev) => ({ ...prev, market: nextValue }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(updateCriteria({ domain: 'holidays', criteria: formValues }))
    dispatch(searchHolidays(formValues))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid gap-4 md:items-end ${compact ? 'md:grid-cols-6' : 'md:grid-cols-7'}`}
    >
      <div className="col-span-full">
        <MarketSelector
          value={formValues.market}
          onChange={handleMarketChange}
          idPrefix="holiday-market"
          label="Holiday focus"
        />
      </div>
      <div className="md:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="holiday-theme">
          Theme
        </label>
        <select
          id="holiday-theme"
          name="theme"
          className="input input--select"
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
      <div className="md:col-span-2">
        <DatePickerField
          id="holiday-start"
          name="startDate"
          label="Start date"
          value={formValues.startDate}
          min={new Date().toISOString().slice(0, 10)}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="md:col-span-2">
        <DatePickerField
          id="holiday-end"
          name="endDate"
          label="End date"
          value={formValues.endDate}
          min={formValues.startDate || new Date().toISOString().slice(0, 10)}
          onChange={handleEndDateChange}
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
          step={1000}
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
