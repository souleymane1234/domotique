import { Home, Camera, Shield, Zap } from 'lucide-react'

interface HeroProps {
  onBookClick: () => void
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-background">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video/presentation.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-particles"></div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <Zap className="icon-small" />
          <span>Solutions Domotiques Intelligentes</span>
        </div>
        <h1 className="hero-title">
          Transformez votre maison en
          <span className="gradient-text"> maison intelligente</span>
        </h1>
        <p className="hero-description">
          Découvrez nos solutions de domotique haut de gamme : caméras de sécurité,
          automatisation complète, contrôle à distance et bien plus encore.
          Faites de votre domicile un espace connecté, sécurisé et confortable.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={onBookClick}>
            Prendre rendez-vous
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <Home className="stat-icon" />
            <div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Maisons équipées</div>
            </div>
          </div>
          <div className="stat-item">
            <Camera className="stat-icon" />
            <div>
              <div className="stat-number">24/7</div>
              <div className="stat-label">Surveillance</div>
            </div>
          </div>
          <div className="stat-item">
            <Shield className="stat-icon" />
            <div>
              <div className="stat-number">100%</div>
              <div className="stat-label">Sécurisé</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

