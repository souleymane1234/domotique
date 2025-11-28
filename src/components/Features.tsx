import { CheckCircle, Clock, Headphones, Award } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const features = [
  {
    icon: CheckCircle,
    title: 'Installation Professionnelle',
    description: 'Nos experts certifiés installent et configurent tous vos équipements pour un fonctionnement optimal.'
  },
  {
    icon: Clock,
    title: 'Support 24/7',
    description: 'Une équipe disponible à tout moment pour répondre à vos questions et résoudre vos problèmes.'
  },
  {
    icon: Headphones,
    title: 'Formation Personnalisée',
    description: 'Nous vous formons à l\'utilisation de tous vos équipements pour une prise en main rapide.'
  },
  {
    icon: Award,
    title: 'Garantie Qualité',
    description: 'Tous nos produits sont garantis et nous assurons un suivi post-installation complet.'
  }
]

export default function Features() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="features" className="features" ref={ref}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="section-title">
            Pourquoi nous <span className="gradient-text">choisir</span>
          </h2>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index} 
                className={`feature-card ${isVisible ? 'animate-in' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="feature-icon">
                  <Icon />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

