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

// Color mapping for display
const colorMap: Record<string, { bg: string; text: string; border: string; label: string }> = {
  green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: '✅' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', label: '⚠️' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', label: '🔶' },
  red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: '🔴' },
  gray: { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200', label: '⚪' }
}

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const t = translations[language]
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [report, setReport] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

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
    setError(null)
    setReport(null)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: finalUrl }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setReport(data)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      console.error('API Error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const getColorStyle = (color: string) => {
    return colorMap[color] || colorMap.gray
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 border-[12px] border-[#2f7a4f]"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-3xl bg-[#fcfaf5] rounded-3xl p-8 relative"
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

          <div className="flex justify-center items-center gap-6 mt-8 text-lg text-gray-700 flex-wrap">
            <span className="px-4 py-1 whitespace-nowrap"
              style={{
                border: '2px dashed #2f7a4f',
                borderRadius: '30px',
                backgroundColor: 'rgba(47, 122, 79, 0.05)'
              }}
            >
              {t.free}
            </span>
            <span className="px-4 py-1 whitespace-nowrap"
              style={{
                border: '2px dashed #2f7a4f',
                borderRadius: '30px',
                backgroundColor: 'rgba(47, 122, 79, 0.05)'
              }}
            >
              {t.instant}
            </span>
            <span className="px-4 py-1 whitespace-nowrap"
              style={{
                border: '2px dashed #2f7a4f',
                borderRadius: '30px',
                backgroundColor: 'rgba(47, 122, 79, 0.05)'
              }}
            >
              {t.private}
            </span>
            <span className="px-4 py-1 whitespace-nowrap"
              style={{
                border: '2px dashed #2f7a4f',
                borderRadius: '30px',
                backgroundColor: 'rgba(47, 122, 79, 0.05)'
              }}
            >
              {t.global}
            </span>
          </div>

          {isLoading && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-lg">Analyzing charity website...</p>
              <div className="mt-2 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#2f7a4f] border-t-transparent"></div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 border-2 border-red-300 rounded-lg bg-red-50 text-red-700">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {report && report.checks && (
            <div className="mt-8">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  🔍 {report.domain}
                </h3>
                <p className="text-sm text-gray-500">Report generated at {new Date().toLocaleString()}</p>
              </div>

              <div className="grid gap-3">
                {report.checks.map((check: any, index: number) => {
                  const style = getColorStyle(check.color)
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border ${style.border} ${style.bg}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{style.label}</span>
                        <div>
                          <p className={`font-semibold ${style.text}`}>
                            {check.category}: {check.name}
                          </p>
                          <p className="text-sm text-gray-600">{check.meaning}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`font-bold ${style.text}`}>
                          {check.value}
                        </span>
                        {check.details && (
                          <p className="text-xs text-gray-400">{check.details}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <button
                onClick={() => setReport(null)}
                className="mt-6 text-[#2f7a4f] text-lg font-bold hover:underline"
              >
                Clear Results
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