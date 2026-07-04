import React, { useState } from 'react'
import ShieldLogo from './components/ShieldLogo'

type Language = 'en' | 'ar'

const translations = {
  en: {
    title: 'CharityShield',
    subtitle: 'Verify before you donate',
    description: 'Check if a charity website is legitimate',
    placeholder: 'Enter charity website URL',
    button: 'Check Charity',
    checking: 'Checking...',
    free: '100% free',
    instant: 'Instant check',
    private: 'No data stored',
    global: 'Global',
    howItWorks: 'How it works',
    privacy: 'Privacy',
    contact: 'Contact',
    language: 'العربية'
  },
  ar: {
    title: 'درع الخيرية',
    subtitle: 'تحقق قبل التبرع',
    description: 'تأكد من شرعية موقع الجمعية الخيرية',
    placeholder: 'أدخل رابط موقع الجمعية الخيرية',
    button: 'فحص الجمعية',
    checking: 'جاري الفحص...',
    free: 'مجاني 100%',
    instant: 'فحص فوري',
    private: 'لا يتم تخزين البيانات',
    global: 'عالمي',
    howItWorks: 'كيف يعمل',
    privacy: 'الخصوصية',
    contact: 'اتصل بنا',
    language: 'English'
  }
}

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const t = translations[language]
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [report, setReport] = useState<{url: string; status: string; message: string} | null>(null)

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedUrl = url.trim()
    if (!trimmedUrl) {
      alert('Please enter a URL')
      return
    }
    let finalUrl = trimmedUrl
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
      finalUrl = 'https://' + trimmedUrl
    }
    try {
      new URL(finalUrl)
    } catch {
      alert('Please enter a valid URL')
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: finalUrl }),
      })
      
      const data = await response.json()
      
      setIsLoading(false)
      setReport({
        url: data.url,
        status: 'Checked',
        message: `Risk Score: ${data.riskScore}/100 - ${data.summary}`
      })
    } catch (error) {
      setIsLoading(false)
      alert('Error checking charity. Please try again.')
      console.error('API Error:', error)
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 border-[12px] border-[#2f7a4f]"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-2xl bg-[#fcfaf5] rounded-3xl p-8 relative"
        style={{
          boxShadow: '8px 8px 0 #2f7a4f',
          border: '3px solid #2f7a4f'
        }}
      >
        <header className="flex justify-between items-center mb-6 relative">
          <div className="flex items-center gap-3">
            <ShieldLogo className="w-8 h-8" />
            <h1 className="text-3xl font-bold text-[#2f7a4f]">
              {t.title}
            </h1>
          </div>
          <button
            onClick={toggleLanguage}
            className="px-4 py-1 text-[#2f7a4f] text-lg"
            style={{
              border: '2px dashed #2f7a4f',
              borderRadius: '20px'
            }}
          >
            {t.language}
          </button>
        </header>

        <main>
          <h2 className="text-2xl text-gray-800 mb-1">
            {t.subtitle}
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            {t.description}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
            <div className="relative w-full max-w-md">
              <span className="absolute left-4 top-3 text-xl text-[#2f7a4f]">🔍</span>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t.placeholder}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 bg-white text-lg"
                style={{
                  border: '3px dashed #2f7a4f',
                  borderRadius: '16px',
                  outline: 'none',
                  boxShadow: '4px 4px 0 rgba(47, 122, 79, 0.2)'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-[#2f7a4f] text-white text-xl font-bold"
              style={{
                borderRadius: '50px',
                border: '3px solid #1e5a38',
                boxShadow: '6px 6px 0 #1e5a38'
              }}
            >
              {isLoading ? t.checking : t.button}
            </button>
          </form>

          <div className="flex justify-center items-center gap-6 mt-8 text-lg text-gray-700">
            <span
              className="px-4 py-1 whitespace-nowrap"
              style={{
                border: '2px dashed #2f7a4f',
                borderRadius: '30px',
                backgroundColor: 'rgba(47, 122, 79, 0.05)'
              }}
            >
              {t.free}
            </span>
            <span
              className="px-4 py-1 whitespace-nowrap"
              style={{
                border: '2px dashed #2f7a4f',
                borderRadius: '30px',
                backgroundColor: 'rgba(47, 122, 79, 0.05)'
              }}
            >
              {t.instant}
            </span>
            <span
              className="px-4 py-1 whitespace-nowrap"
              style={{
                border: '2px dashed #2f7a4f',
                borderRadius: '30px',
                backgroundColor: 'rgba(47, 122, 79, 0.05)'
              }}
            >
              {t.private}
            </span>
            <span
              className="px-4 py-1 whitespace-nowrap"
              style={{
                border: '2px dashed #2f7a4f',
                borderRadius: '30px',
                backgroundColor: 'rgba(47, 122, 79, 0.05)'
              }}
            >
              {t.global}
            </span>
          </div>

          {report && (
            <div className="mt-8 p-6 bg-white"
              style={{
                border: '3px dashed #2f7a4f',
                borderRadius: '16px',
                boxShadow: '4px 4px 0 rgba(47, 122, 79, 0.15)'
              }}
            >
              <p className="text-lg text-gray-700">
                <span className="font-bold">URL:</span> {report.url}
              </p>
              <p className="text-lg text-gray-700 mt-2">
                <span className="font-bold">Status:</span> {report.status}
              </p>
              <p className="text-lg text-gray-700 mt-2">
                <span className="font-bold">Message:</span> {report.message}
              </p>
              <button
                onClick={() => setReport(null)}
                className="mt-4 text-[#2f7a4f] text-lg font-bold"
              >
                Clear
              </button>
            </div>
          )}
        </main>

        <footer className="mt-8 pt-4 text-center text-gray-600 text-lg"
          style={{
            borderTop: '2px dashed #ccc'
          }}
        >
          <a href="#" className="text-[#2f7a4f] mx-2 font-bold">
            {t.howItWorks}
          </a>
          <span className="text-[#2f7a4f]">✦</span>
          <a href="#" className="text-[#2f7a4f] mx-2 font-bold">
            {t.privacy}
          </a>
          <span className="text-[#2f7a4f]">✦</span>
          <a href="#" className="text-[#2f7a4f] mx-2 font-bold">
            {t.contact}
          </a>
        </footer>
      </div>
    </div>
  )
}

export default App