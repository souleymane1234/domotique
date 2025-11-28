import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Domotique Pro</h3>
            <p>Votre partenaire de confiance pour transformer votre maison en maison intelligente.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin />
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+225 07 23 45 67 89</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>contact@domotique-pro.fr</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>123 Rue de la Domotique<br />75000 Abidjan, Cote d'Ivoire</span>
              </div>
            </div>
          </div>
          <div className="footer-section">
            <h4>Liens rapides</h4>
            <ul className="footer-links">
              <li><a href="#products">Nos solutions</a></li>
              <li><a href="#features">Pourquoi nous choisir</a></li>
              <li><a href="#booking">Prendre rendez-vous</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Domotique Pro. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

