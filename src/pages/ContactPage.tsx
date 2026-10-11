import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  Calendar,
  Users
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 bg-[#050e07] min-h-screen text-[#ede7dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c59b27]/30 bg-[#0c2217]/60 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#dfb743]" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-gradient font-semibold">
              Get in Touch & Dine With Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif-title text-4xl sm:text-6xl font-bold text-[#faf6eb] mb-4"
          >
            Contact & Location
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#bfb7a6]"
          >
            Have a question, catering request, or looking to reserve a royal family dining table? Reach out to our hospitality team.
          </motion.p>
        </div>

        {/* Contact Information & Inquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards & Opening Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Location Card */}
            <div className="p-6 rounded-3xl bg-[#081910]/85 border border-[#c59b27]/30 shadow-xl space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#faf6eb] flex items-center space-x-2.5">
                <MapPin className="w-5 h-5 text-[#dfb743]" />
                <span>Our Restaurant Location</span>
              </h3>
              <p className="text-sm text-[#ded7c8]">
                {RESTAURANT_INFO.contact.address}
              </p>
              <p className="text-xs text-[#a29b8c]">
                {RESTAURANT_INFO.contact.city}
              </p>
              <div className="p-3 rounded-xl bg-[#051108] border border-[#c59b27]/20 text-xs text-[#dfb743]">
                Valet parking available for all guests.
              </div>
            </div>

            {/* Phone & Email */}
            <div className="p-6 rounded-3xl bg-[#081910]/85 border border-[#c59b27]/30 shadow-xl space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#faf6eb] flex items-center space-x-2.5">
                <Phone className="w-5 h-5 text-[#dfb743]" />
                <span>Direct Contact</span>
              </h3>
              <div className="space-y-2 text-sm text-[#ded7c8]">
                <div className="flex justify-between items-center py-1 border-b border-[#c59b27]/10">
                  <span className="text-[#a29b8c]">Primary Hotline:</span>
                  <span className="font-semibold text-[#faf6eb]">{RESTAURANT_INFO.contact.phonePrimary}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-[#c59b27]/10">
                  <span className="text-[#a29b8c]">WhatsApp Support:</span>
                  <span className="font-semibold text-[#faf6eb]">{RESTAURANT_INFO.contact.phoneSecondary}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#a29b8c]">Email:</span>
                  <span className="font-semibold text-[#faf6eb]">{RESTAURANT_INFO.contact.email}</span>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 rounded-3xl bg-[#081910]/85 border border-[#c59b27]/30 shadow-xl space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#faf6eb] flex items-center space-x-2.5">
                <Clock className="w-5 h-5 text-[#dfb743]" />
                <span>Royal Dining Hours</span>
              </h3>
              <div className="space-y-2 text-sm">
                {RESTAURANT_INFO.contact.openingHours.map((sched, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#051108] border border-[#c59b27]/15 flex justify-between items-center">
                    <span className="text-xs font-semibold text-[#dfb743]">{sched.days}</span>
                    <span className="text-xs text-[#faf6eb] font-medium">{sched.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Table Reservation & Inquiry Form */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-10 bg-[#091a11]/90 border border-[#c59b27]/30 shadow-2xl backdrop-blur-md">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf6eb] mb-2">
              Reserve a Table or Inquire
            </h3>
            <p className="text-xs sm:text-sm text-[#a29b8c] mb-8">
              Fill out this form and our reservations manager will confirm your arrangement.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-[#0b2618] border border-[#dfb743] text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-[#123624] border border-[#dfb743] flex items-center justify-center mx-auto text-[#dfb743]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#faf6eb]">
                  Thank You, {name}!
                </h4>
                <p className="text-sm text-[#ccc4b3] max-w-md mx-auto">
                  Your inquiry for {guests} guest(s) has been received. Our team will contact you at <strong className="text-[#faf6eb]">{phone}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-[#08110b] font-bold text-xs uppercase tracking-wider"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-[#d6cebe] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Asad Ali"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#06130b] border border-[#c59b27]/30 text-[#faf6eb] placeholder-[#6d675b] text-sm focus:outline-none focus:border-[#dfb743]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-[#d6cebe] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0300 1234567"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#06130b] border border-[#c59b27]/30 text-[#faf6eb] placeholder-[#6d675b] text-sm focus:outline-none focus:border-[#dfb743]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-[#d6cebe] mb-2 flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-[#dfb743]" />
                      <span>Number of Guests</span>
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#06130b] border border-[#c59b27]/30 text-[#faf6eb] text-sm focus:outline-none focus:border-[#dfb743]"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="4">4 Persons (Family Table)</option>
                      <option value="6">6 Persons (Royal Suite)</option>
                      <option value="10+">10+ Persons (Large Banquet)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-[#d6cebe] mb-2 flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#dfb743]" />
                      <span>Preferred Date / Time</span>
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="e.g. Tomorrow 8:30 PM"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#06130b] border border-[#c59b27]/30 text-[#faf6eb] placeholder-[#6d675b] text-sm focus:outline-none focus:border-[#dfb743]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-[#d6cebe] mb-2">
                    Special Requests or Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g., Birthday dinner setup, indoor seating near fountain..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#06130b] border border-[#c59b27]/30 text-[#faf6eb] placeholder-[#6d675b] text-sm focus:outline-none focus:border-[#dfb743] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gold-gradient text-[#08110b] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#08110b]" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
