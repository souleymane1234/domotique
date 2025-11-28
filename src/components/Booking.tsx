import { useState, useEffect } from 'react'
import { X, MapPin, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react'
import CalendarComponent from './CalendarComponent'
import { getAvailableSlots, bookAppointment, type AvailabilitySlot } from '../config/availability'

interface BookingProps {
  isOpen: boolean
  onClose: () => void
}

type AppointmentType = 'bureau' | 'chantier'

export default function Booking({ isOpen, onClose }: BookingProps) {
  const [step, setStep] = useState(1)
  const [appointmentType, setAppointmentType] = useState<AppointmentType | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  // Charger les disponibilités au montage du composant
  useEffect(() => {
    if (isOpen) {
      loadAvailability()
    }
  }, [isOpen])

  const loadAvailability = async () => {
    setLoading(true)
    try {
      const slots = await getAvailableSlots()
      setAvailableSlots(slots)
    } catch (error) {
      console.error('Erreur lors du chargement des disponibilités:', error)
    } finally {
      setLoading(false)
    }
  }

  // Obtenir les horaires disponibles pour la date sélectionnée
  const getAvailableTimes = (): string[] => {
    if (!selectedDate) return []
    const slot = availableSlots.find(s => 
      s.date.toDateString() === selectedDate.toDateString()
    )
    return slot?.times || []
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!appointmentType || !selectedDate || !selectedTime) return

    setSubmitting(true)
    try {
      const result = await bookAppointment({
        type: appointmentType,
        date: selectedDate,
        time: selectedTime,
        ...formData
      })
      
      if (result.success) {
        alert(result.message || 'Rendez-vous réservé avec succès! Nous vous contacterons bientôt.')
        handleClose()
      } else {
        alert('Une erreur est survenue. Veuillez réessayer.')
      }
    } catch (error) {
      console.error('Erreur lors de la réservation:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setStep(1)
    setAppointmentType(null)
    setSelectedDate(null)
    setSelectedTime('')
    setFormData({ name: '', phone: '', email: '', message: '' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="booking-overlay" onClick={handleClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="booking-close" onClick={handleClose}>
          <X />
        </button>

        <div className="booking-header">
          <h2>Prendre rendez-vous</h2>
          <p>Choisissez le type de rendez-vous qui vous convient</p>
        </div>

        {step === 1 && (
          <div className="booking-step">
            <div className="appointment-types">
              <div
                className={`appointment-type-card ${appointmentType === 'bureau' ? 'active' : ''}`}
                onClick={() => setAppointmentType('bureau')}
              >
                <MapPin className="appointment-icon" />
                <h3>Au bureau</h3>
                <p>Venez nous rencontrer dans nos locaux pour discuter de votre projet</p>
              </div>
              <div
                className={`appointment-type-card ${appointmentType === 'chantier' ? 'active' : ''}`}
                onClick={() => setAppointmentType('chantier')}
              >
                <MapPin className="appointment-icon" />
                <h3>Sur chantier</h3>
                <p>Nous nous déplaçons directement sur votre lieu pour une visite personnalisée</p>
              </div>
            </div>
            {appointmentType && (
              <button
                className="btn btn-primary btn-full"
                onClick={() => setStep(2)}
              >
                Continuer
              </button>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="booking-step">
            <div className="booking-calendar-section">
              <h3>Sélectionnez une date</h3>
              <CalendarComponent
                selectedDate={selectedDate}
                onDateSelect={(date) => {
                  setSelectedDate(date)
                  setSelectedTime('') // Réinitialiser l'horaire lors du changement de date
                }}
                availableSlots={availableSlots}
              />
            </div>
            {selectedDate && (
              <div className="booking-time-section">
                <h3>Sélectionnez un horaire</h3>
                {loading ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Chargement des disponibilités...</p>
                  </div>
                ) : (
                  <div className="time-slots">
                    {getAvailableTimes().length > 0 ? (
                      getAvailableTimes().map((time) => (
                        <button
                          key={time}
                          className={`time-slot ${selectedTime === time ? 'active' : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          <Clock className="time-icon" />
                          {time}
                        </button>
                      ))
                    ) : (
                      <p className="no-slots">Aucun créneau disponible pour cette date</p>
                    )}
                  </div>
                )}
              </div>
            )}
            {selectedDate && selectedTime && (
              <div className="booking-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setStep(1)}
                >
                  Retour
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setStep(3)}
                >
                  Continuer
                </button>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="booking-step">
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-group">
                <label>
                  <User className="form-icon" />
                  Nom complet
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Votre nom"
                />
              </div>
              <div className="form-group">
                <label>
                  <Phone className="form-icon" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="06 12 34 56 78"
                />
              </div>
              <div className="form-group">
                <label>
                  <Mail className="form-icon" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre@email.com"
                />
              </div>
              <div className="form-group">
                <label>
                  <MessageSquare className="form-icon" />
                  Message (optionnel)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Décrivez votre projet ou vos besoins..."
                  rows={4}
                />
              </div>
              <div className="booking-summary">
                <div className="summary-item">
                  <strong>Type:</strong> {appointmentType === 'bureau' ? 'Au bureau' : 'Sur chantier'}
                </div>
                <div className="summary-item">
                  <strong>Date:</strong> {selectedDate?.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="summary-item">
                  <strong>Horaire:</strong> {selectedTime}
                </div>
              </div>
              <div className="booking-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStep(2)}
                >
                  Retour
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? (
                    <>
                      <div className="spinner-small"></div>
                      Réservation en cours...
                    </>
                  ) : (
                    'Confirmer le rendez-vous'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

