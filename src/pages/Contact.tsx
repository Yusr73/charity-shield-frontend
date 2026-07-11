import { useState } from 'react'
import ShieldLogo from '../components/ShieldLogo'

interface ContactProps {
  language: 'en' | 'ar'
  onBack: () => void
}

const translations = {
  en: {
    title: 'Contact Us',
    subtitle: 'Have questions or feedback? We\'d love to hear from you.',
    back: '← Back to home',
    name: 'Your Name',
    email: 'Your Email',
    message: 'Your Message',
    send: 'Send Message',
    sending: 'Sending...',
    success: '✅ Thank you! Your message has been sent.',
    error: 'Failed to send message. Please try again.',
    or: 'Or email us directly:',
    emailLabel: 'Send us an email'
  },
  ar: {
    title: 'اتصل بنا',
    subtitle: 'لديك أسئلة أو ملاحظات؟ يسعدنا سماع رأيك.',
    back: '← العودة للرئيسية',
    name: 'اسمك',
    email: 'بريدك الإلكتروني',
    message: 'رسالتك',
    send: 'إرسال الرسالة',
    sending: 'جاري الإرسال...',
    success: '✅ شكراً لك! تم إرسال رسالتك.',
    error: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    or: 'أو تواصل معنا مباشرة عبر البريد الإلكتروني:',
    emailLabel: 'أرسل لنا بريداً إلكترونياً'
  }
}

export default function Contact({ language, onBack }: ContactProps) {
  const t = translations[language]
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in all fields')
      return
    }

    setSending(true)
    setError(null)

    try {
      // TODO: Add your email sending logic here
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSent(true)
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setError(t.error)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfaf5] p-4 border-[12px] border-[#2f7a4f]">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="text-[#2f7a4f] font-bold hover:underline inline-block mb-6 cursor-pointer text-lg"
        >
          {t.back}
        </button>

        <div className="flex items-center gap-3 mb-4">
          <ShieldLogo className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-[#2f7a4f]">{t.title}</h1>
        </div>
        <p className="text-gray-600 text-lg mb-8">{t.subtitle}</p>

        {sent ? (
          <div className="p-6 border-2 border-green-200 rounded-lg bg-green-50">
            <p className="text-green-700 font-bold">{t.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">{t.name}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f7a4f]"
                required
                disabled={sending}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">{t.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f7a4f]"
                required
                disabled={sending}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">{t.message}</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f7a4f]"
                required
                disabled={sending}
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={sending}
              className="px-6 py-3 bg-[#2f7a4f] text-white font-bold rounded-lg hover:bg-[#1e5a38] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? t.sending : t.send}
            </button>
          </form>
        )}

        <div className="mt-8 p-6 border-2 border-dashed border-[#2f7a4f] rounded-lg text-center">
          <p className="text-gray-600 mb-2">{t.or}</p>
          <a href="mailto:yrbouslahi@gmail.com" className="text-[#2f7a4f] font-bold text-lg hover:underline">
            {t.emailLabel} →
          </a>
        </div>
      </div>
    </div>
  )
}