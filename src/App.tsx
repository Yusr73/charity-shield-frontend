import React, { useState, useEffect } from 'react'
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
    howItWorks: 'How it works',
    privacy: 'Privacy',
    contact: 'Contact',
    language: 'العربية',
    reportGenerated: 'Report generated at',
    clearResults: 'Clear Results',
    analyzing: 'Analyzing charity website...',
    error: 'Error',
    // Comments section
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
    // Disclaimer
    disclaimer: "This tool helps you verify charities. It should not stop you from donating. Protect yourself AND protect legitimate charities. We may make mistakes — always verify independently."
  },
  ar: {
    title: 'درع الخيرية',
    subtitle: 'تحقق قبل التبرع',
    description: 'تأكد من شرعية موقع الجمعية الخيرية',
    placeholder: 'أدخل رابط موقع الجمعية الخيرية',
    button: 'فحص الجمعية',
    checking: 'جاري الفحص...',
    howItWorks: 'كيف يعمل',
    privacy: 'الخصوصية',
    contact: 'اتصل بنا',
    language: 'English',
    reportGenerated: 'تم إنشاء التقرير في',
    clearResults: 'مسح النتائج',
    analyzing: 'جاري تحليل موقع الجمعية الخيرية...',
    error: 'خطأ',
    // Comments section
    commentsTitle: '💬 تعليقات المجتمع',
    commentsPlaceholder: 'شارك تجربتك مع هذه الجمعية الخيرية...',
    commentsName: 'اسمك',
    commentsEmail: 'بريدك الإلكتروني',
    commentsOrganization: 'المنظمة (اختياري)',
    commentsButton: 'إرسال التعليق',
    commentsSending: 'جاري الإرسال...',
    commentsSent: '✅ تم إرسال تعليقك.',
    commentsError: 'فشل إرسال التعليق. يرجى المحاولة مرة أخرى.',
    commentsEmpty: 'لا توجد تعليقات بعد. كن أول من يشارك تجربته.',
    commentsLoadError: 'فشل تحميل التعليقات.',
    commentsEmailInvalid: 'يرجى إدخال بريد إلكتروني صحيح.',
    commentsLengthError: 'يجب أن يكون التعليق 10 أحرف على الأقل.',
    commentsNameRequired: 'يرجى إدخال اسمك.',
    // Disclaimer
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

const categoryTranslations: Record<string, { en: string; ar: string }> = {
  'Domain': { en: 'Domain', ar: 'المجال' },
  'Security': { en: 'Security', ar: 'الأمان' },
  'Presence': { en: 'Presence', ar: 'الحضور' },
  'Registration': { en: 'Registration', ar: 'التسجيل' },
  'Content': { en: 'Content', ar: 'المحتوى' }
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
  const t = translations[language]
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [report, setReport] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Comments state
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

  // Fetch comments when report is loaded
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

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate
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
      // Refresh comments
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

          {/* Disclaimer Section - Replaces trust badges */}
          <div className="mt-8 p-4 border-2 border-[#2f7a4f] rounded-lg bg-[#fcfaf5]">
            <p className="text-center text-sm text-gray-700 leading-relaxed">
              {t.disclaimer}
            </p>
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
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${style.bg}`}
                      style={{
                        border: '2px dashed #2f7a4f'
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{style.label}</span>
                        <div>
                          <p className={`font-semibold ${style.text}`}>
                            {categoryTrans}: {check.name}
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

              {/* ============================================================
                  COMMENTS SECTION
                  ============================================================ */}
              <div className="mt-6 p-6 border-2 border-dashed border-[#2f7a4f] rounded-lg bg-white">
                <h4 className="text-lg font-bold text-gray-800 mb-1">
                  {t.commentsTitle}
                </h4>

                {/* Comments list */}
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

                {/* Add comment form */}
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