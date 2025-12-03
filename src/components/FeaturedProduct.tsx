import { useState } from 'react'
import { Play, CheckCircle, Shield, Zap, Smartphone, Wifi } from 'lucide-react'

const productImages = [
  '/images/photo 1.jpeg',
  '/images/photo2.jpeg',
  '/images/photo3.jpeg',
  '/images/photo4.jpeg',
  '/images/photo5.jpeg',
  '/images/photo6.jpeg'
]

const productFeatures = [
  {
    icon: Shield,
    title: 'Sécurité Renforcée',
    description: 'Protection complète de votre domicile avec surveillance 24/7'
  },
  {
    icon: Zap,
    title: 'Contrôle Intelligent',
    description: 'Gérez tous vos appareils depuis une seule application'
  },
  {
    icon: Smartphone,
    title: 'Application Mobile',
    description: 'Contrôle à distance depuis votre smartphone iOS ou Android'
  },
  {
    icon: Wifi,
    title: 'Connexion Fiable',
    description: 'Réseau sécurisé et stable pour tous vos équipements'
  }
]

export default function FeaturedProduct() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="featured-product">
      <div className="container">
        <div className="featured-product-header">
          <div className="featured-badge">
            <Zap className="icon-small" />
            <span>Produit Phare</span>
          </div>
          <h2 className="featured-product-title">
            Solution Domotique <span className="gradient-text">Complète</span>
          </h2>
          <p className="featured-product-description">
            Découvrez notre solution domotique tout-en-un qui transforme votre maison en véritable 
            espace intelligent. Une technologie de pointe au service de votre confort et de votre sécurité.
          </p>
        </div>

        <div className="featured-product-content">
          <div className="featured-product-media">
            <div className="featured-video-container">
              {!isVideoPlaying ? (
                <div className="video-preview">
                  <img 
                    src={productImages[selectedImage]} 
                    alt="Produit domotique"
                    className="video-preview-image"
                  />
                  {selectedImage === 0 && (
                    <button 
                      className="play-button"
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      <Play className="play-icon" />
                    </button>
                  )}
                </div>
              ) : (
                <video
                  className="featured-video"
                  controls
                  autoPlay
                  onEnded={() => {
                    setIsVideoPlaying(false)
                    setSelectedImage(0)
                  }}
                >
                  <source src="/video/produit.mp4" type="video/mp4" />
                </video>
              )}
            </div>
            
            <div className="product-images-grid">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`product-image-thumb ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedImage(index)
                    setIsVideoPlaying(false)
                  }}
                >
                  <img src={image} alt={`Produit ${index + 1}`} />
                  {index === 0 && (
                    <div className="video-indicator">
                      <Play className="video-indicator-icon" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="featured-product-info">
            <div className="product-highlights">
              <h3>Pourquoi choisir cette solution ?</h3>
              <ul className="highlights-list">
                <li>
                  <CheckCircle className="check-icon" />
                  <span>Installation professionnelle garantie</span>
                </li>
                <li>
                  <CheckCircle className="check-icon" />
                  <span>Compatible avec tous vos appareils existants</span>
                </li>
                <li>
                  <CheckCircle className="check-icon" />
                  <span>Support technique 24/7 inclus</span>
                </li>
                <li>
                  <CheckCircle className="check-icon" />
                  <span>Mises à jour automatiques et gratuites</span>
                </li>
                <li>
                  <CheckCircle className="check-icon" />
                  <span>Garantie 3 ans sur tous les équipements</span>
                </li>
              </ul>
            </div>

            <div className="product-features-grid">
              {productFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="product-feature-item">
                    <div className="product-feature-icon">
                      <Icon />
                    </div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                )
              })}
            </div>

          </div>
        </div>

        <div className="product-specs-full">
          <h3>Caractéristiques techniques</h3>
          <div className="specs-grid-full">
            <div className="spec-item-full">
              <div className="spec-icon-wrapper">
                <Wifi className="spec-icon" />
              </div>
              <div className="spec-content">
                <strong>Protocole</strong>
                <span>Wi-Fi 6, Zigbee, Z-Wave</span>
              </div>
            </div>
            <div className="spec-item-full">
              <div className="spec-icon-wrapper">
                <Smartphone className="spec-icon" />
              </div>
              <div className="spec-content">
                <strong>Compatibilité</strong>
                <span>iOS, Android, Web</span>
              </div>
            </div>
            <div className="spec-item-full">
              <div className="spec-icon-wrapper">
                <Shield className="spec-icon" />
              </div>
              <div className="spec-content">
                <strong>Stockage</strong>
                <span>Cloud sécurisé inclus</span>
              </div>
            </div>
            <div className="spec-item-full">
              <div className="spec-icon-wrapper">
                <Zap className="spec-icon" />
              </div>
              <div className="spec-content">
                <strong>Alimentation</strong>
                <span>Électrique + Batterie de secours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


