import React, { useState, useEffect } from 'react'
import ShieldLogo from './components/ShieldLogo'
import HowItWorks from './pages/HowItWorks'
import Contact from './pages/Contact'

type Language = 'en' | 'ar'
type Page = 'home' | 'howitworks' | 'contact'

const translations = {
  en: {
    title: 'CharityShield',
    subtitle: 'Verify before you donate',
    description: 'Check if a charity website is legitimate',
    placeholder: 'Enter charity website URL',
    button: 'Check Charity',
    checking: 'Checking...',
    howItWorks: 'How it works',
    contact: 'Contact',
    language: 'العربية',
    reportGenerated: 'Report generated at',
    clearResults: 'Clear Results',
    analyzing: 'Analyzing charity website...',
    error: 'Error',
    commentsTitle: '💬 Community Comments',
    commentsPlaceholder: 'Share your experience with this charity...',
    commentsName: 'Your name',
    commentsEmail: 'Your email',
    commentsOrganization: 'Organization (optional)',
    commentsButton: 'Submit Comment',
    commentsSending: 'Submitting...',
    commentsSent: '✅ Your comment has been submitted.',
    commentsError: 'Failed to submit comment. Please try again.',
    commentsEmpty: 'No comments yet. Be the first to share your experience.',
    commentsLoadError: 'Failed to load comments.',
    commentsEmailInvalid: 'Please enter a valid email address.',
    commentsLengthError: 'Comment must be at least 10 characters.',
    commentsNameRequired: 'Please enter your name.',
    disclaimer: "This tool helps you verify charities. It should not stop you from donating. Protect yourself AND protect legitimate charities. We may make mistakes — always verify independently."
  },
  ar: {
    title: 'درع المتبرع',
    subtitle: 'تحقق قبل التبرع',
    description: 'تأكد من شرعية موقع الجمعية الخيرية',
    placeholder: 'أدخل رابط موقع الجمعية الخيرية',
    button: 'فحص الجمعية',
    checking: 'جاري الفحص...',
    howItWorks: 'كيف يعمل',
    contact: 'اتصل بنا',
    language: 'English',
    reportGenerated: 'تم إنشاء التقرير في',
    clearResults: 'مسح النتائج',
    analyzing: 'جاري تحليل موقع الجمعية الخيرية...',
    error: 'خطأ',
    commentsTitle: '💬 تعليقات المجتمع',
    commentsPlaceholder: 'شارك تجربتك مع هذه الجمعية الخيرية...',
    commentsName: 'الاسم',
    commentsEmail: 'البريد الإلكتروني',
    commentsOrganization: 'المنظمة (اختياري)',
    commentsButton: 'إرسال التعليق',
    commentsSending: 'جاري الإرسال...',
    commentsSent: '✅ تم إرسال تعليقك بنجاح.',
    commentsError: 'فشل إرسال التعليق. يرجى المحاولة مرة أخرى.',
    commentsEmpty: 'لا توجد تعليقات بعد. كن أول من يشارك تجربته.',
    commentsLoadError: 'فشل تحميل التعليقات.',
    commentsEmailInvalid: 'يرجى إدخال بريد إلكتروني صحيح.',
    commentsLengthError: 'يجب أن يكون التعليق 10 أحرف على الأقل.',
    commentsNameRequired: 'يرجى إدخال اسمك.',
    disclaimer: "هذه الأداة تساعدك في التحقق من الجمعيات الخيرية. لا ينبغي أن تمنعك من التبرع. احمِ نفسك واحمِ الجمعيات الخيرية الحقيقية. قد نخطئ — تحقق دائماً بشكل مستقل."
  }
}

const colorMap: Record<string, { label: string; bg: string; text: string }> = {
  green: { label: '🟢', bg: 'bg-green-50', text: 'text-green-700' },
  yellow: { label: '🟡', bg: 'bg-yellow-50', text: 'text-yellow-700' },
  orange: { label: '🟠', bg: 'bg-orange-50', text: 'text-orange-700' },
  red: { label: '🔴', bg: 'bg-red-50', text: 'text-red-700' },
  gray: { label: '⚪', bg: 'bg-gray-50', text: 'text-gray-500' }
}

// Category translations
const categoryTranslations: Record<string, { en: string; ar: string }> = {
  'Domain': { en: 'Domain', ar: 'النطاق' },
  'Security': { en: 'Security', ar: 'الأمان' },
  'Presence': { en: 'Presence', ar: 'الحضور' },
  'Registration': { en: 'Registration', ar: 'التسجيل' },
  'Content': { en: 'Content', ar: 'المحتوى' }
}

// Check name translations
const checkNameTranslations: Record<string, { en: string; ar: string }> = {
  'Domain Age': { en: 'Domain Age', ar: 'عمر النطاق' },
  'SSL Certificate': { en: 'SSL Certificate', ar: 'شهادة SSL' },
  'Safe Browsing': { en: 'Safe Browsing', ar: 'التصفح الآمن' },
  'Online Presence': { en: 'Online Presence', ar: 'الحضور الرقمي' },
  'Charity Registration': { en: 'Charity Registration', ar: 'التسجيل الخيري' },
  'Language Analysis': { en: 'Language Analysis', ar: 'تحليل اللغة' }
}

// Check value translations
const checkValueTranslations: Record<string, { en: string; ar: string }> = {
  'Unknown': { en: 'Unknown', ar: 'غير معروف' },
  'Valid': { en: 'Valid', ar: 'صالح' },
  'Invalid': { en: 'Invalid', ar: 'غير صالح' },
  'Clean': { en: 'Clean', ar: 'نظيف' },
  'Issues Detected': { en: 'Issues Detected', ar: 'تم اكتشاف مشاكل' },
  'Complete': { en: 'Complete', ar: 'كامل' },
  'Address Only': { en: 'Address Only', ar: 'عنوان فقط' },
  'Contact Only': { en: 'Contact Only', ar: 'اتصال فقط' },
  'None': { en: 'None', ar: 'لا يوجد' },
  'Registered': { en: 'Registered', ar: 'مسجل' },
  'Mentioned': { en: 'Mentioned', ar: 'مذكور' },
  'Not Found': { en: 'Not Found', ar: 'غير موجود' },
  'Legitimate': { en: 'Legitimate', ar: 'شرعي' },
  'Suspicious': { en: 'Suspicious', ar: 'مريب' },
  'Unreachable': { en: 'Unreachable', ar: 'لا يمكن الوصول' },
  'Insufficient Content': { en: 'Insufficient Content', ar: 'محتوى غير كاف' }
}

// Check meaning translations
const checkMeaningTranslations: Record<string, { en: string; ar: string }> = {
  'Well-established domain, good sign': { en: 'Well-established domain, good sign', ar: 'نطاق راسخ، علامة جيدة' },
  'Moderately aged domain': { en: 'Moderately aged domain', ar: 'نطاق متوسط العمر' },
  'New domain - proceed with caution': { en: 'New domain - proceed with caution', ar: 'نطاق جديد - توخ الحذر' },
  'Very new domain - common in scams': { en: 'Very new domain - common in scams', ar: 'نطاق جديد جداً - شائع في عمليات الاحتيال' },
  'Could not verify domain age': { en: 'Could not verify domain age', ar: 'تعذر التحقق من عمر النطاق' },
  'Website is secure': { en: 'Website is secure', ar: 'الموقع آمن' },
  'Website is not secure - do not enter any data': { en: 'Website is not secure - do not enter any data', ar: 'الموقع غير آمن - لا تدخل أي بيانات' },
  'Could not verify SSL certificate': { en: 'Could not verify SSL certificate', ar: 'تعذر التحقق من شهادة SSL' },
  'No security issues detected': { en: 'No security issues detected', ar: 'لم يتم اكتشاف مشاكل أمنية' },
  'Security issues detected - proceed with extreme caution': { en: 'Security issues detected - proceed with extreme caution', ar: 'تم اكتشاف مشاكل أمنية - توخ الحذر الشديد' },
  'Could not verify reputation': { en: 'Could not verify reputation', ar: 'تعذر التحقق من السمعة' },
  'Physical address and contact information found': { en: 'Physical address and contact information found', ar: 'تم العثور على عنوان ومعلومات الاتصال' },
  'Physical address found but no phone or email': { en: 'Physical address found but no phone or email', ar: 'تم العثور على عنوان ولكن لا يوجد هاتف أو بريد' },
  'Contact info found but no physical address': { en: 'Contact info found but no physical address', ar: 'تم العثور على معلومات اتصال ولكن لا يوجد عنوان' },
  'No contact information or address found - suspicious': { en: 'No contact information or address found - suspicious', ar: 'لا توجد معلومات اتصال أو عنوان - مريب' },
  'Could not verify online presence': { en: 'Could not verify online presence', ar: 'تعذر التحقق من الحضور الرقمي' },
  'Charity registration number found': { en: 'Charity registration number found', ar: 'تم العثور على رقم التسجيل الخيري' },
  'Charity mentioned but no registration number found': { en: 'Charity mentioned but no registration number found', ar: 'تم ذكر الجمعية ولكن لا يوجد رقم تسجيل' },
  'No registration information found on website': { en: 'No registration information found on website', ar: 'لم يتم العثور على معلومات التسجيل' },
  'Could not verify charity registration': { en: 'Could not verify charity registration', ar: 'تعذر التحقق من التسجيل الخيري' },
  'No scam patterns detected': { en: 'No scam patterns detected', ar: 'لم يتم اكتشاف أنماط احتيال' },
  'Normal charity website': { en: 'Normal charity website', ar: 'موقع خيري عادي' },
  'Could not analyze language': { en: 'Could not analyze language', ar: 'تعذر تحليل اللغة' },
  'Could not interpret AI response': { en: 'Could not interpret AI response', ar: 'تعذر تفسير استجابة الذكاء الاصطناعي' },
  'Not enough content to analyze': { en: 'Not enough content to analyze', ar: 'لا يوجد محتوى كاف للتحليل' }
}

interface Comment {
  id: number;
  name: string;
  email: string;
  organization: string | null;
  comment: string;
  created_at: string;
}

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [page, setPage] = useState<Page>('home')
  const t = translations[language]
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [report, setReport] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const [comments, setComments] = useState<Comment[]>([])
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [commentsError, setCommentsError] = useState<string | null>(null)
  const [commentName, setCommentName] = useState('')
  const [commentEmail, setCommentEmail] = useState('')
  const [commentOrganization, setCommentOrganization] = useState('')
  const [commentText, setCommentText] = useState('')
  const [commentSubmitting, setCommentSubmitting] = useState(false)
  const [commentSubmitted, setCommentSubmitted] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  useEffect(() => {
    if (report?.domain) {
      fetchComments(report.domain)
    }
  }, [report])

  const fetchComments = async (domain: string) => {
    setCommentsLoading(true)
    setCommentsError(null)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/comments?domain=${domain}`)
      if (!response.ok) {
        throw new Error('Failed to fetch comments')
      }
      const data = await response.json()
      setComments(data.comments || [])
    } catch (err) {
      setCommentsError(t.commentsLoadError)
      console.error('Comments error:', err)
    } finally {
      setCommentsLoading(false)
    }
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
    setComments([])
    setCommentSubmitted(false)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: finalUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `API error: ${response.status}`)
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

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!commentName.trim()) {
      alert(t.commentsNameRequired)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(commentEmail)) {
      alert(t.commentsEmailInvalid)
      return
    }
    if (commentText.trim().length < 10) {
      alert(t.commentsLengthError)
      return
    }

    setCommentSubmitting(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: report.domain,
          name: commentName.trim(),
          email: commentEmail.trim(),
          organization: commentOrganization.trim() || '',
          comment: commentText.trim()
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit comment')
      }

      setCommentSubmitted(true)
      setCommentName('')
      setCommentEmail('')
      setCommentOrganization('')
      setCommentText('')
      await fetchComments(report.domain)

    } catch (err) {
      alert(err instanceof Error ? err.message : t.commentsError)
    } finally {
      setCommentSubmitting(false)
    }
  }

  const getCategoryTranslation = (category: string): string => {
    const cat = categoryTranslations[category]
    if (!cat) return category
    return language === 'ar' ? cat.ar : cat.en
  }

  const getTranslatedCheckName = (name: string): string => {
    const trans = checkNameTranslations[name]
    if (!trans) return name
    return language === 'ar' ? trans.ar : trans.en
  }

  const getTranslatedValue = (value: string): string => {
    const trans = checkValueTranslations[value]
    if (!trans) return value
    return language === 'ar' ? trans.ar : trans.en
  }

  const getTranslatedMeaning = (meaning: string): string => {
    const trans = checkMeaningTranslations[meaning]
    if (!trans) return meaning
    return language === 'ar' ? trans.ar : trans.en
  }

  const formatDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return dateStr
    }
  }

  // --- PAGE ROUTING ---
  if (page === 'howitworks') {
    return <HowItWorks language={language} onBack={() => setPage('home')} />
  }
  if (page === 'contact') {
    return <Contact language={language} onBack={() => setPage('home')} />
  }

  // --- HOME PAGE ---
  return (
    <>
      <style>{`
        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 30px rgba(47, 122, 79, 0.15), 0 0 60px rgba(47, 122, 79, 0.05);
          }
          50% {
            box-shadow: 0 0 50px rgba(47, 122, 79, 0.3), 0 0 80px rgba(47, 122, 79, 0.1);
          }
        }
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

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

            <div 
              className="mt-8 p-5 border-2 border-[#2f7a4f] rounded-xl bg-[#f0f9f2] relative overflow-hidden"
              style={{
                animation: 'glowPulse 3s ease-in-out infinite',
                boxShadow: '0 0 30px rgba(47, 122, 79, 0.15), 0 0 60px rgba(47, 122, 79, 0.05), inset 0 0 30px rgba(47, 122, 79, 0.03)'
              }}
            >
              <div 
                className="absolute top-0 left-0 w-full h-1"
                style={{
                  background: 'linear-gradient(90deg, #2f7a4f, #4CAF50, #2f7a4f)',
                  backgroundSize: '200% 100%',
                  animation: 'gradientMove 3s ease-in-out infinite'
                }}
              ></div>

              <div className="relative z-10 flex items-start gap-3">
                <span className="text-3xl flex-shrink-0 mt-0.5">🛡️</span>
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {t.disclaimer}
                  </p>
                  <div className="mt-3">
                    <button
                      onClick={() => setPage('howitworks')}
                      className="text-sm text-[#2f7a4f] font-bold hover:underline inline-flex items-center gap-1 transition-colors hover:text-[#1e5a38]"
                    >
                      {t.howItWorks} →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {isLoading && (
              <div className="mt-8 text-center">
                <p className="text-gray-600 text-lg">{t.analyzing}</p>
                <div className="mt-2 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#2f7a4f] border-t-transparent"></div>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-8 p-4 border-2 border-red-300 rounded-lg bg-red-50 text-red-700">
                <p className="font-bold">{t.error}</p>
                <p>{error}</p>
              </div>
            )}

            {report && report.checks && (
              <div className="mt-8">
                <div className="mb-4 text-center">
                  <h3 className="text-xl font-bold text-gray-800">
                    🔍 {report.domain}
                  </h3>
                  <p className="text-sm text-gray-500">{t.reportGenerated} {new Date().toLocaleString()}</p>
                </div>

                <div className="space-y-2">
                  {report.checks.map((check: any, index: number) => {
                    const style = colorMap[check.color] || colorMap.gray
                    const categoryTrans = getCategoryTranslation(check.category)
                    const nameTrans = getTranslatedCheckName(check.name)
                    const valueTrans = getTranslatedValue(check.value)
                    const meaningTrans = getTranslatedMeaning(check.meaning)

                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg border ${style.bg}`}
                        style={{ border: '2px dashed #2f7a4f' }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{style.label}</span>
                          <div>
                            <p className={`font-semibold ${style.text}`}>
                              {categoryTrans}: {nameTrans}
                            </p>
                            <p className="text-sm text-gray-600">{meaningTrans}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold ${style.text}`}>
                            {valueTrans}
                          </span>
                          {check.details && (
                            <p className="text-xs text-gray-400">{check.details}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 p-6 border-2 border-dashed border-[#2f7a4f] rounded-lg bg-white">
                  <h4 className="text-lg font-bold text-gray-800 mb-1">
                    {t.commentsTitle}
                  </h4>

                  {commentsLoading ? (
                    <p className="text-gray-500 text-sm">Loading comments...</p>
                  ) : commentsError ? (
                    <p className="text-red-500 text-sm">{commentsError}</p>
                  ) : comments.length === 0 ? (
                    <p className="text-gray-500 text-sm">{t.commentsEmpty}</p>
                  ) : (
                    <div className="max-h-60 overflow-y-auto mb-4 space-y-3">
                      {comments.map((c) => (
                        <div key={c.id} className="border-b border-gray-100 pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-800">{c.name}</p>
                              <p className="text-xs text-gray-400">{c.email}</p>
                              {c.organization && (
                                <p className="text-xs text-gray-400">{c.organization}</p>
                              )}
                            </div>
                            <span className="text-xs text-gray-400">
                              {formatDate(c.created_at)}
                            </span>
                          </div>
                          <p className="text-gray-700 mt-1">{c.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {commentSubmitted ? (
                    <p className="text-green-600 font-bold">{t.commentsSent}</p>
                  ) : (
                    <form onSubmit={handleCommentSubmit} className="mt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          value={commentName}
                          onChange={(e) => setCommentName(e.target.value)}
                          placeholder={t.commentsName}
                          className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f7a4f]"
                          required
                          disabled={commentSubmitting}
                        />
                        <input
                          type="email"
                          value={commentEmail}
                          onChange={(e) => setCommentEmail(e.target.value)}
                          placeholder={t.commentsEmail}
                          className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f7a4f]"
                          required
                          disabled={commentSubmitting}
                        />
                      </div>
                      <input
                        type="text"
                        value={commentOrganization}
                        onChange={(e) => setCommentOrganization(e.target.value)}
                        placeholder={t.commentsOrganization}
                        className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f7a4f] mb-3"
                        disabled={commentSubmitting}
                      />
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder={t.commentsPlaceholder}
                        className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f7a4f]"
                        rows={3}
                        required
                        disabled={commentSubmitting}
                      />
                      <button
                        type="submit"
                        disabled={commentSubmitting || !commentName.trim() || !commentEmail.trim() || commentText.trim().length < 10}
                        className="mt-3 px-6 py-2 bg-[#2f7a4f] text-white font-bold rounded-lg hover:bg-[#1e5a38] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {commentSubmitting ? t.commentsSending : t.commentsButton}
                      </button>
                    </form>
                  )}
                </div>

                <button
                  onClick={() => setReport(null)}
                  className="mt-6 text-[#2f7a4f] text-lg font-bold hover:underline w-full text-center"
                >
                  {t.clearResults}
                </button>
              </div>
            )}
          </main>

          <footer className="mt-8 pt-4 text-center text-gray-600 text-lg"
            style={{
              borderTop: '2px dashed #ccc'
            }}
          >
            <button
              onClick={() => setPage('howitworks')}
              className="text-[#2f7a4f] mx-2 font-bold hover:underline cursor-pointer"
            >
              {t.howItWorks}
            </button>
            <span className="text-[#2f7a4f]">✦</span>
            <button
              onClick={() => setPage('contact')}
              className="text-[#2f7a4f] mx-2 font-bold hover:underline cursor-pointer"
            >
              {t.contact}
            </button>
          </footer>
        </div>
      </div>
    </>
  )
}

export default App