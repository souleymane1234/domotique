import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format, isSameDay, isBefore, startOfDay } from 'date-fns'
import { fr } from 'date-fns/locale/fr'
import type { AvailabilitySlot } from '../config/availability'

interface CalendarComponentProps {
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
  availableSlots?: AvailabilitySlot[]
}

export default function CalendarComponent({ selectedDate, onDateSelect, availableSlots = [] }: CalendarComponentProps) {
  // Utilise les dates disponibles depuis les slots
  const getAvailableDates = (): Date[] => {
    return availableSlots.map(slot => slot.date)
  }

  const availableDates = getAvailableDates()

  const tileDisabled = ({ date }: { date: Date }) => {
    const dateStart = startOfDay(date)
    const today = startOfDay(new Date())
    
    // Désactive les dates passées
    if (isBefore(dateStart, today)) {
      return true
    }
    
    // Désactive les dates non disponibles
    return !availableDates.some(availableDate => isSameDay(availableDate, date))
  }

  const tileClassName = ({ date }: { date: Date }) => {
    if (selectedDate && isSameDay(date, selectedDate)) {
      return 'selected-date'
    }
    if (availableDates.some(availableDate => isSameDay(availableDate, date))) {
      return 'available-date'
    }
    return ''
  }

  return (
    <div className="calendar-wrapper">
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            onDateSelect(value)
          }
        }}
        value={selectedDate || undefined}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
        locale="fr"
        minDate={new Date()}
        next2Label={null}
        prev2Label={null}
        formatShortWeekday={(_, date) => format(date, 'EEE', { locale: fr }).charAt(0).toUpperCase()}
      />
    </div>
  )
}

