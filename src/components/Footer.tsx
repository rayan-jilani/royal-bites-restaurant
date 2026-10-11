import React from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About Us', path: '/about' },
    { name: 'Order Online', path: '/order' },
    { name: 'Track Order', path: '/track' },
    { name: 'Contact & Location', path: '/contact' },
  ];

  return (
    <footer id="contact" className="relative bg-[#040b06] text-[#ded8cb] border-t border-[#c59b27]/25 pt-20 pb-12 overflow-hidden">
      {/* Decorative ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#dfb743]/50 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#c59b27]/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#c59b27]/15">
          {/* Brand Column (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-full border border-[#c59b27]/50 bg-gradient-to-br from-[#0e3324] to-[#04100b] flex items-center justify-center shadow-lg">
                <UtensilsCrossed className="w-5 h-5 text-[#dfb743]" />
              </div>
              <div>
                <span className="font-royal-brand tracking-[0.2em] text-2xl font-bold text-gold-gradient block">
                  ROYAL BITES
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#c59b27]/80 uppercase block font-medium">
                  The Royal Taste of Pakistan
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#b1a99a] leading-relaxed">
              Authentic flavours, traditional Pakistani hospitality, and freshly prepared desi delicacies cooked in seasoned iron karahis and live charcoal tandoors.
            </p>

            {/* Social Media Placeholders */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-[#0a1b12] border border-[#c59b27]/30 flex items-center justify-center text-[#dfb743] hover:text-white hover:border-[#dfb743] hover:bg-[#123624] transition-all"
                aria-label="Instagram placeholder"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-[#0a1b12] border border-[#c59b27]/30 flex items-center justify-center text-[#dfb743] hover:text-white hover:border-[#dfb743] hover:bg-[#123624] transition-all"
                aria-label="Facebook placeholder"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a
                href="#whatsapp"
                className="w-9 h-9 rounded-full bg-[#0a1b12] border border-[#c59b27]/30 flex items-center justify-center text-[#dfb743] hover:text-white hover:border-[#dfb743] hover:bg-[#123624] transition-all"
                aria-label="WhatsApp placeholder"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links (Cols 5-6) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#faf6eb] tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#a49d8e] hover:text-[#dfb743] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (Cols 7-9) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#faf6eb] tracking-wide">
              Contact & Location
            </h4>
            <div className="space-y-3 text-sm text-[#a49d8e]">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#dfb743] shrink-0 mt-1" />
                <div>
                  <div className="text-[#faf6eb] font-medium">{RESTAURANT_INFO.contact.address}</div>
                  <div className="text-xs text-[#8a8374]">{RESTAURANT_INFO.contact.city}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#dfb743] shrink-0" />
                <span>{RESTAURANT_INFO.contact.phonePrimary}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#dfb743] shrink-0" />
                <span>{RESTAURANT_INFO.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Opening Hours (Cols 10-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#faf6eb] tracking-wide flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#dfb743]" />
              <span>Opening Hours</span>
            </h4>
            <div className="space-y-2 text-sm text-[#a49d8e]">
              {RESTAURANT_INFO.contact.openingHours.map((schedule, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-[#07150c] border border-[#c59b27]/15">
                  <div className="text-xs text-[#dfb743] font-semibold">{schedule.days}</div>
                  <div className="text-sm font-medium text-[#faf6eb]">{schedule.hours}</div>
                </div>
              ))}
              <p className="text-[11px] text-[#787163] italic pt-1">
                {RESTAURANT_INFO.contact.deliveryNote}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7d7668]">
          <div>
            © 2026 <strong className="text-[#c59b27]">ROYAL BITES</strong>. All rights reserved. The Royal Taste of Pakistan.
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/admin" className="text-[#dfb743] hover:underline font-semibold flex items-center space-x-1">
              <span>Kitchen & Orders Portal</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#0a1e13] border border-[#c59b27]/30 text-[#dfb743] hover:text-white hover:bg-[#123624] transition-all cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
