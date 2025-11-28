import { Camera, Lock, Lightbulb, Thermometer, Wifi, Smartphone } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const products = [
  {
    icon: Camera,
    title: 'Caméras de Sécurité',
    description: 'Surveillance HD 4K avec vision nocturne, détection de mouvement et notifications en temps réel sur votre smartphone.',
    features: ['Vision nocturne', 'Détection intelligente', 'Stockage cloud']
  },
  {
    icon: Lock,
    title: 'Serrure Connectée',
    description: 'Contrôlez l\'accès à votre domicile à distance. Verrouillez et déverrouillez depuis votre téléphone.',
    features: ['Ouverture à distance', 'Codes d\'accès', 'Historique complet']
  },
  {
    icon: Lightbulb,
    title: 'Éclairage Intelligent',
    description: 'Créez des ambiances parfaites avec des ampoules connectées contrôlables via application ou commande vocale.',
    features: ['16 millions de couleurs', 'Programmation', 'Détection présence']
  },
  {
    icon: Thermometer,
    title: 'Thermostat Intelligent',
    description: 'Optimisez votre consommation d\'énergie avec un système de chauffage intelligent qui s\'adapte à vos habitudes.',
    features: ['Économie d\'énergie', 'Programmation', 'Contrôle à distance']
  },
  {
    icon: Wifi,
    title: 'Réseau Domotique',
    description: 'Infrastructure réseau robuste pour connecter tous vos appareils intelligents de manière sécurisée et fiable.',
    features: ['Haute performance', 'Sécurité renforcée', 'Support multi-appareils']
  },
  {
    icon: Smartphone,
    title: 'Application Mobile',
    description: 'Contrôlez toute votre maison depuis une seule application intuitive disponible sur iOS et Android.',
    features: ['Interface intuitive', 'Notifications push', 'Scénarios personnalisés']
  }
]

export default function Products() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="products" className="products" ref={ref}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'animate-in' : ''}`}>
          <h2 className="section-title">
            Nos <span className="gradient-text">Solutions</span>
          </h2>
          <p className="section-description">
            Découvrez notre gamme complète de produits domotiques pour transformer votre maison
          </p>
        </div>
        <div className="products-grid">
          {products.map((product, index) => {
            const Icon = product.icon
            return (
              <div 
                key={index} 
                className={`product-card ${isVisible ? 'animate-in' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="product-icon">
                  <Icon />
                </div>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <ul className="product-features">
                  {product.features.map((feature, idx) => (
                    <li key={idx} style={{ animationDelay: `${(index * 0.1) + (idx * 0.05)}s` }}>
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

