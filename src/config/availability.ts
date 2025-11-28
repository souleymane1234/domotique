// Configuration des disponibilités
// À remplacer par un appel API vers votre backoffice

export interface AvailabilitySlot {
  date: Date
  times: string[]
}

// Configuration de l'API (à personnaliser selon votre backoffice)
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Fonction à remplacer par un appel API réel
export async function getAvailableSlots(): Promise<AvailabilitySlot[]> {
  try {
    // Exemple d'appel API - Décommentez et adaptez selon votre backoffice
    /*
    const response = await fetch(`${API_BASE_URL}/availability`)
    if (!response.ok) throw new Error('Erreur lors du chargement des disponibilités')
    const data = await response.json()
    return data.map((slot: any) => ({
      date: new Date(slot.date),
      times: slot.times
    }))
    */
    
    // Code temporaire pour la démo - À supprimer une fois l'API connectée
    const today = new Date()
    const slots: AvailabilitySlot[] = []
    
    // Génère des créneaux pour les 30 prochains jours (hors week-end)
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Exclut les dimanches (0) et samedis (6)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        slots.push({
          date,
          times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
        })
      }
    }
    
    return slots
  } catch (error) {
    console.error('Erreur lors du chargement des disponibilités:', error)
    throw error
  }
}

// Fonction pour réserver un rendez-vous
export async function bookAppointment(data: {
  type: 'bureau' | 'chantier'
  date: Date
  time: string
  name: string
  phone: string
  email: string
  message?: string
}): Promise<{ success: boolean; message: string }> {
  try {
    // Exemple d'appel API - Décommentez et adaptez selon votre backoffice
    /*
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: data.type,
        date: data.date.toISOString(),
        time: data.time,
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.message
      })
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Erreur lors de la réservation')
    }
    
    const result = await response.json()
    return {
      success: true,
      message: result.message || 'Rendez-vous réservé avec succès!'
    }
    */
    
    // Code temporaire pour la démo - À supprimer une fois l'API connectée
    console.log('Réservation:', data)
    
    // Simule un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Rendez-vous réservé avec succès! Nous vous contacterons bientôt.'
        })
      }, 1000)
    })
  } catch (error) {
    console.error('Erreur lors de la réservation:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Une erreur est survenue'
    }
  }
}

