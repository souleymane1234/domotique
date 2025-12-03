import { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const testimonials = [
  {
    name: 'Franck Kouassi',
    location: 'Abidjan, Cocody',
    rating: 5,
    text: 'J\'ai été très satisfait de la qualité de service et de la rapidité de la livraison. Je recommande vivement cette entreprise.',
    image: '/images/photo 1.jpeg'
  },
  {
    name: 'Amede Koffi',
    location: 'Abidjan, Cocody',
    rating: 5,
    text: 'Excellent service client et produits de qualité. La caméra de sécurité m\'a déjà permis d\'éviter un cambriolage. Je recommande vivement leurs solutions domotiques.',
    image: '/images/photo2.jpeg'
  },
  {
    name: 'Christian Koffi',
    location: 'Abidjan, Marcory',
    rating: 5,
    text: 'Transformation complète de notre maison ! L\'éclairage intelligent et le thermostat nous font économiser beaucoup d\'énergie. L\'application est intuitive et facile à utiliser.',
    image: '/images/photo3.jpeg'
  },
  {
    name: 'Michel Koffi',
    location: 'Abidjan, Cocody',
    rating: 5,
    text: 'J\'ai été très satisfait de la qualité de service et de la rapidité de la livraison. Je recommande vivement cette entreprise.',
    image: '/images/photo4.jpeg'
  },
  {
    name: 'Serge Komlan',
    location: 'Abidjan, Cocody',
    rating: 5,
    text: 'J\'ai été très satisfait de la qualité de service et de la rapidité de la livraison. Je recommande vivement cette entreprise.',
    image: '/images/photo6.jpeg'
  }
]

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  // Ajuster le nombre d'éléments par vue selon la taille de l'écran
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Auto-play du carrousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 5000) // Change toutes les 5 secondes

    return () => clearInterval(interval)
  }, [maxIndex])

  return (
    <section id="testimonials" className="testimonials" ref={ref}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="section-title">
            Ce que disent nos <span className="gradient-text">clients</span>
          </h2>
          <p className="section-description">
            Découvrez les témoignages de nos clients satisfaits qui ont transformé leur maison
          </p>
        </div>

        <div className="testimonials-slider">
          <button 
            className="slider-button slider-button-prev"
            onClick={prevSlide}
            aria-label="Témoignage précédent"
          >
            <ChevronLeft />
          </button>

          <div className="testimonials-slider-container">
            <div 
              className="testimonials-slider-track"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="testimonial-card-slide"
                  style={{
                    flex: `0 0 calc(${100 / itemsPerView}% - ${(2 * (itemsPerView - 1)) / itemsPerView}rem)`,
                    minWidth: 0
                  }}
                >
                  <div className="testimonial-card">
                    <div className="testimonial-header">
                      <div className="testimonial-avatar">
                        <img src={testimonial.image} alt={testimonial.name} />
                      </div>
                      <div className="testimonial-info">
                        <h4 className="testimonial-name">{testimonial.name}</h4>
                        <p className="testimonial-location">{testimonial.location}</p>
                      </div>
                      <Quote className="quote-icon" />
                    </div>
                    
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="star-icon" fill="currentColor" />
                      ))}
                    </div>

                    <p className="testimonial-text">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="slider-button slider-button-next"
            onClick={nextSlide}
            aria-label="Témoignage suivant"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="slider-indicators">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`slider-indicator ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}


