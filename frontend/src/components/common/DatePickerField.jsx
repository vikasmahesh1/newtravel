import { useEffect, useMemo, useRef, useState } from 'react'

const weekdayFormatter = new Intl.DateTimeFormat('en-IN', { weekday: 'short' })
const monthFormatter = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' })
const longDateFormatter = new Intl.DateTimeFormat('en-IN', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const weekdays = Array.from({ length: 7 }).map((_, index) => {
  const referenceDate = new Date(Date.UTC(2024, 1, 4 + index))
  return weekdayFormatter.format(referenceDate)
})

const toIsoDate = (date) => date.toISOString().slice(0, 10)
const parseIsoDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

const coerceDate = (input) => {
  if (!input) return null
  if (typeof input === 'string') {
    return parseIsoDate(input)
  }
  return new Date(input)
}

const isBeforeMin = (date, min) => {
  if (!min) return false
  const minDate = coerceDate(min)
  minDate.setHours(0, 0, 0, 0)
  const compare = new Date(date)
  compare.setHours(0, 0, 0, 0)
  return compare.getTime() < minDate.getTime()
}

const isAfterMax = (date, max) => {
  if (!max) return false
  const maxDate = coerceDate(max)
  maxDate.setHours(0, 0, 0, 0)
  const compare = new Date(date)
  compare.setHours(0, 0, 0, 0)
  return compare.getTime() > maxDate.getTime()
}

export function DatePickerField({
  id,
  label,
  name,
  value,
  onChange,
  min,
  max,
  placeholder = 'Select a date',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMonth, setActiveMonth] = useState(() => {
    if (value) return parseIsoDate(value)
    return new Date()
  })
  const popoverRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!value) return
    setActiveMonth(parseIsoDate(value))
  }, [value])

  useEffect(() => {
    if (!isOpen) return

    const handleClickAway = (event) => {
      if (!popoverRef.current || !buttonRef.current) return
      if (
        !popoverRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickAway)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickAway)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const monthDays = useMemo(() => {
    const firstDay = new Date(Date.UTC(activeMonth.getFullYear(), activeMonth.getMonth(), 1))
    const startOffset = firstDay.getUTCDay()
    const gridStart = new Date(firstDay)
    gridStart.setUTCDate(firstDay.getUTCDate() - startOffset)

    const days = []
    for (let index = 0; index < 42; index += 1) {
      const current = new Date(gridStart)
      current.setUTCDate(gridStart.getUTCDate() + index)
      days.push(current)
    }

    return days
  }, [activeMonth])

  const handleSelect = (date) => {
    if (isBeforeMin(date, min) || isAfterMax(date, max)) return
    onChange?.(toIsoDate(date))
    setIsOpen(false)
    buttonRef.current?.focus()
  }

  const goToPreviousMonth = () => {
    const next = new Date(activeMonth)
    next.setMonth(activeMonth.getMonth() - 1)
    setActiveMonth(next)
  }

  const goToNextMonth = () => {
    const next = new Date(activeMonth)
    next.setMonth(activeMonth.getMonth() + 1)
    setActiveMonth(next)
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const selectedDate = value ? parseIsoDate(value) : null

  const formattedSelection = value ? longDateFormatter.format(parseIsoDate(value)) : placeholder
  const buttonLabel = label ? `Open calendar for ${label}` : 'Open calendar'

  return (
    <div className="date-field">
      <label className="date-field__label" htmlFor={id}>
        {label}
      </label>
      <button
        type="button"
        ref={buttonRef}
        className={`date-field__button ${value ? 'date-field__button--value' : ''} ${isOpen ? 'date-field__button--open' : ''}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={buttonLabel}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={`date-field__value ${value ? 'date-field__value--set' : ''}`}>{formattedSelection}</span>
        <span aria-hidden className="date-field__icon" title={placeholder}>
          📅
        </span>
      </button>
      <input id={id} name={name} type="hidden" value={value || ''} readOnly />
      {isOpen && (
        <div className="date-field__popover" ref={popoverRef} role="dialog" aria-modal="false">
          <div className="date-field__header">
            <button type="button" className="date-field__nav" onClick={goToPreviousMonth} aria-label="Previous month">
              ‹
            </button>
            <p className="date-field__month">{monthFormatter.format(activeMonth)}</p>
            <button type="button" className="date-field__nav" onClick={goToNextMonth} aria-label="Next month">
              ›
            </button>
          </div>
          <div className="date-field__weekdays" aria-hidden>
            {weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="date-field__grid">
            {monthDays.map((day) => {
              const isOutsideMonth = day.getUTCMonth() !== activeMonth.getMonth()
              const isToday = day.getTime() === today.getTime()
              const isSelected = selectedDate && day.getTime() === selectedDate.getTime()
              const disabled = isBeforeMin(day, min) || isAfterMax(day, max)

              const classNames = ['date-field__cell']
              if (isOutsideMonth) classNames.push('date-field__cell--muted')
              if (isToday) classNames.push('date-field__cell--today')
              if (isSelected) classNames.push('date-field__cell--selected')
              if (disabled) classNames.push('date-field__cell--disabled')

              return (
                <button
                  type="button"
                  key={day.toISOString()}
                  className={classNames.join(' ')}
                  onClick={() => handleSelect(day)}
                  disabled={disabled}
                >
                  {day.getUTCDate()}
                </button>
              )
            })}
          </div>
          <p className="date-field__selection" aria-live="polite">
            {value ? longDateFormatter.format(parseIsoDate(value)) : 'No date selected yet'}
          </p>
        </div>
      )}
    </div>
  )
}
