import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { searchHotels, updateCriteria } from '../../features/search/searchSlice'
import { selectSearchDomain } from '../../store'
import { DatePickerField } from './DatePickerField'

export function HotelSearchForm({ compact = false }) {
  const dispatch = useDispatch()
  const { criteria, status } = useSelector((state) => selectSearchDomain(state, 'hotels'))
  const [formValues, setFormValues] = useState(criteria)

  useEffect(() => {
    setFormValues(criteria)
  }, [criteria])

  const handleChange = (event) => {
    const { name, value } = event.target
    const numericFields = ['guests', 'rooms']
    const nextValue = numericFields.includes(name) ? Number(value) : value
    setFormValues((prev) => ({ ...prev, [name]: nextValue }))
  }

  const handleCheckInChange = (nextDate) => {
    setFormValues((prev) => {
      const nextState = { ...prev, checkIn: nextDate }
      if (prev.checkOut && new Date(nextDate) > new Date(prev.checkOut)) {
        nextState.checkOut = nextDate
      }
      return nextState
    })
  }

  const handleCheckOutChange = (nextDate) => {
    setFormValues((prev) => ({ ...prev, checkOut: nextDate }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(updateCriteria({ domain: 'hotels', criteria: formValues }))
    dispatch(searchHotels(formValues))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid gap-4 md:items-end ${compact ? 'md:grid-cols-5' : 'md:grid-cols-6'}`}
    >
      <div className="md:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="hotel-destination">
          Where to?
        </label>
        <input
          id="hotel-destination"
          name="destination"
          className="input"
          placeholder="City or landmark"
          value={formValues.destination}
          onChange={handleChange}
          required={!compact}
        />
      </div>
      <div className="md:col-span-2">
        <DatePickerField
          id="check-in"
          name="checkIn"
          label="Check-in"
          value={formValues.checkIn}
          min={new Date().toISOString().slice(0, 10)}
          onChange={handleCheckInChange}
        />
      </div>
      <div className="md:col-span-2">
        <DatePickerField
          id="check-out"
          name="checkOut"
          label="Check-out"
          value={formValues.checkOut}
          min={formValues.checkIn || new Date().toISOString().slice(0, 10)}
          onChange={handleCheckOutChange}
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="hotel-guests">
          Guests
        </label>
        <input
          id="hotel-guests"
          type="number"
          name="guests"
          min={1}
          className="input"
          value={formValues.guests}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="hotel-rooms">
          Rooms
        </label>
        <input
          id="hotel-rooms"
          type="number"
          name="rooms"
          min={1}
          className="input"
          value={formValues.rooms}
          onChange={handleChange}
        />
      </div>
      <div className="md:col-span-2 md:flex md:items-end">
        <button type="submit" className="btn-primary w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Searching…' : compact ? 'Update results' : 'Search stays'}
        </button>
      </div>
    </form>
  )
}
