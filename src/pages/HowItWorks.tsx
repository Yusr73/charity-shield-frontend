import React from 'react'
import ShieldLogo from '../components/ShieldLogo'

interface HowItWorksProps {
  language: 'en' | 'ar'
}

const translations = {
  en: {
    title: 'How CharityShield Works',
    subtitle: 'Check charity websites before you donate',
    back: '← Back to home',
    // ... full English content from above
  },
  ar: {
    title: 'كيف يعمل درع المتبرع',
    subtitle: 'تحقق من مواقع الجمعيات الخيرية قبل التبرع',
    back: '← العودة للرئيسية',
    // ... full Arabic content from above
  }
}

export default function HowItWorks({ language }: HowItWorksProps) {
  const t = translations[language]

  return (
    <div className="min-h-screen bg-[#fcfaf5] p-4 border-[12px] border-[#2f7a4f]">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="text-[#2f7a4f] font-bold hover:underline inline-block mb-6">
          {t.back}
        </a>

        <div className="flex items-center gap-3 mb-4">
          <ShieldLogo className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-[#2f7a4f]">{t.title}</h1>
        </div>
        <p className="text-gray-600 text-lg mb-8">{t.subtitle}</p>

        {/* Content sections - we'll add the full content here */}
      </div>
    </div>
  )
}