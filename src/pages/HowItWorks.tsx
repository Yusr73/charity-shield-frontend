import React from 'react'
import ShieldLogo from '../components/ShieldLogo'

interface HowItWorksProps {
  language: 'en' | 'ar'
  onBack: () => void
}

const translations = {
  en: {
    title: 'How CharityShield Works',
    subtitle: 'Check charity websites before you donate',
    back: '← Back to home',
    section1: 'What We Check',
    section2: 'Community Comments',
    section3: 'What We DON\'T Do',
    section4: 'How to Use',
    section5: 'Important',
    check1: 'How old is the website',
    check1Desc: 'Scammers create new websites every day. Real charities usually have websites that have been around for years.',
    check2: 'Is the website safe to use',
    check2Desc: 'We check if your connection to the website is secure. If it\'s not, don\'t enter any personal or payment information.',
    check3: 'Has this website been reported',
    check3Desc: 'We check if Google has flagged this website for scams, viruses, or stealing information.',
    check4: 'Can you contact them',
    check4Desc: 'We check if the website has a physical address, phone number, email address, and social media accounts. Real charities want you to find them. Scammers hide.',
    check5: 'Are they a registered charity',
    check5Desc: 'We check if the website shows a charity registration number. Legitimate charities usually display this on their website.',
    check6: 'Is the language suspicious',
    check6Desc: 'We use AI to read the website and check for scam patterns like asking for cryptocurrency, gift cards, pressure tactics, or not telling you where your money goes.',
    green: '🟢 Good sign',
    yellow: '🟡 Neutral',
    orange: '🟠 Be careful',
    red: '🔴 Warning',
    commentsDesc: 'After you check a charity, you can see what other users have said about it. You can also share your own experience.',
    commentsBullet1: 'Read other users\' comments — learn from others who have donated to this charity',
    commentsBullet2: 'Share your experience — help other people decide',
    commentsBullet3: 'See who commented — users share their name and organization',
    dont1: 'We don\'t tell you to donate or not donate',
    dont2: 'We don\'t guarantee a charity is 100% safe',
    dont3: 'We don\'t store your personal data',
    howToUse: '1. Enter the charity website URL\n2. Click "Check Charity"\n3. Look at the colors (🟢 = good, 🟡 = okay, 🟠 = caution, 🔴 = warning)\n4. Read each check\n5. Read what other people have said\n6. Share your own experience\n7. Decide for yourself',
    important1: 'We may make mistakes — always do your own research',
    important2: 'This tool helps you donate safely, it does not stop you from donating',
    important3: 'Real charities deserve protection from false accusations too',
    important4: 'Comments are from users, not verified by us'
  },
  ar: {
    title: 'كيف يعمل درع المتبرع',
    subtitle: 'تحقق من مواقع الجمعيات الخيرية قبل التبرع',
    back: '← العودة للرئيسية',
    section1: 'ماذا نفحص',
    section2: 'تعليقات المجتمع',
    section3: 'ما لا نفعله',
    section4: 'كيفية الاستخدام',
    section5: 'مهم',
    check1: 'عمر الموقع',
    check1Desc: 'المحتالون يصنعون مواقع جديدة كل يوم. الجمعيات الحقيقية عادةً ما تكون مواقعها قديمة بسنوات.',
    check2: 'هل الموقع آمن للاستخدام',
    check2Desc: 'نتحقق إذا كان اتصالك بالموقع مشفراً وآمناً. إذا لم يكن آمناً، لا تدخل أي معلومات شخصية أو بنكية.',
    check3: 'هل تم الإبلاغ عن هذا الموقع',
    check3Desc: 'نتحقق إذا كان Google قد أبلغ عن هذا الموقع للاحتيال أو الفيروسات أو سرقة المعلومات.',
    check4: 'هل يمكنك التواصل معهم',
    check4Desc: 'نتحقق إذا كان الموقع يوفر عنواناً فعلياً ورقم هاتف وبريد إلكتروني وحسابات على وسائل التواصل. الجمعيات الحقيقية تريد أن تجدهم. المحتالون يختبئون.',
    check5: 'هل هي جمعية مسجلة',
    check5Desc: 'نتحقق إذا كان الموقع يعرض رقم تسجيل خيري. الجمعيات الحقيقية عادةً تعرض هذا الرقم على موقعها.',
    check6: 'هل اللغة مريبة',
    check6Desc: 'نستخدم الذكاء الاصطناعي لقراءة الموقع والبحث عن أنماط الاحتيال مثل طلب العملات الرقمية أو بطاقات الهدايا أو التكتيكات الضاغطة أو عدم إخبارك أين تذهب أموالك.',
    green: '🟢 علامة جيدة',
    yellow: '🟡 محايد',
    orange: '🟠 احترس',
    red: '🔴 تحذير',
    commentsDesc: 'بعد فحص الجمعية، يمكنك رؤية ما قاله المستخدمون الآخرون عنها. يمكنك أيضاً مشاركة تجربتك.',
    commentsBullet1: 'قراءة تعليقات الآخرين — تعلم من الآخرين الذين تبرعوا لهذه الجمعية',
    commentsBullet2: 'مشاركة تجربتك — ساعد الآخرين في اتخاذ القرار',
    commentsBullet3: 'معرفة من علق — يشارك المستخدمون اسمهم ومنظمتهم',
    dont1: 'لا نخبرك بالتبرع أو عدم التبرع',
    dont2: 'لا نضمن أن الجمعية آمنة 100%',
    dont3: 'لا نخزن بياناتك الشخصية',
    howToUse: '1. أدخل رابط موقع الجمعية\n2. اضغط "فحص الجمعية"\n3. انظر إلى الألوان (🟢 = جيد، 🟡 = مقبول، 🟠 = احترس، 🔴 = تحذير)\n4. اقرأ كل فحص\n5. اقرأ ما قاله الآخرون\n6. شارك تجربتك\n7. قرر بنفسك',
    important1: 'قد نخطئ — تحقق دائماً بنفسك',
    important2: 'هذه الأداة تساعدك على التبرع بأمان، لا تمنعك من التبرع',
    important3: 'الجمعيات الحقيقية تستحق الحماية من الاتهامات الكاذبة أيضاً',
    important4: 'التعليقات من المستخدمين، وليست موثقة من قبلنا'
  }
}

export default function HowItWorks({ language, onBack }: HowItWorksProps) {
  const t = translations[language]

  return (
    <div className="min-h-screen bg-[#fcfaf5] p-4 border-[12px] border-[#2f7a4f]">
      <div className="max-w-3xl mx-auto">
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

        {/* Section 1: What We Check */}
        <h2 className="text-2xl font-bold text-[#2f7a4f] mb-4">{t.section1}</h2>
        <div className="space-y-6 mb-8">
          {/* Check 1 */}
          <div className="p-4 border-2 border-[#2f7a4f] rounded-lg bg-white">
            <h3 className="text-lg font-bold text-gray-800">1. {t.check1}</h3>
            <p className="text-gray-600 mt-1">{t.check1Desc}</p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <span className="text-green-700">{t.green}</span>
              <span className="text-yellow-600">{t.yellow}</span>
              <span className="text-orange-600">{t.orange}</span>
              <span className="text-red-600">{t.red}</span>
            </div>
          </div>

          {/* Check 2 */}
          <div className="p-4 border-2 border-[#2f7a4f] rounded-lg bg-white">
            <h3 className="text-lg font-bold text-gray-800">2. {t.check2}</h3>
            <p className="text-gray-600 mt-1">{t.check2Desc}</p>
          </div>

          {/* Check 3 */}
          <div className="p-4 border-2 border-[#2f7a4f] rounded-lg bg-white">
            <h3 className="text-lg font-bold text-gray-800">3. {t.check3}</h3>
            <p className="text-gray-600 mt-1">{t.check3Desc}</p>
          </div>

          {/* Check 4 */}
          <div className="p-4 border-2 border-[#2f7a4f] rounded-lg bg-white">
            <h3 className="text-lg font-bold text-gray-800">4. {t.check4}</h3>
            <p className="text-gray-600 mt-1">{t.check4Desc}</p>
          </div>

          {/* Check 5 */}
          <div className="p-4 border-2 border-[#2f7a4f] rounded-lg bg-white">
            <h3 className="text-lg font-bold text-gray-800">5. {t.check5}</h3>
            <p className="text-gray-600 mt-1">{t.check5Desc}</p>
          </div>

          {/* Check 6 */}
          <div className="p-4 border-2 border-[#2f7a4f] rounded-lg bg-white">
            <h3 className="text-lg font-bold text-gray-800">6. {t.check6}</h3>
            <p className="text-gray-600 mt-1">{t.check6Desc}</p>
          </div>
        </div>

        {/* Section 2: Community Comments */}
        <h2 className="text-2xl font-bold text-[#2f7a4f] mb-4">{t.section2}</h2>
        <div className="p-4 border-2 border-[#2f7a4f] rounded-lg bg-white mb-8">
          <p className="text-gray-600 mb-3">{t.commentsDesc}</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>{t.commentsBullet1}</li>
            <li>{t.commentsBullet2}</li>
            <li>{t.commentsBullet3}</li>
          </ul>
        </div>

        {/* Section 3: What We DON'T Do */}
        <h2 className="text-2xl font-bold text-[#2f7a4f] mb-4">{t.section3}</h2>
        <div className="p-4 border-2 border-[#2f7a4f] rounded-lg bg-white mb-8">
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>{t.dont1}</li>
            <li>{t.dont2}</li>
            <li>{t.dont3}</li>
          </ul>
        </div>

        {/* Section 4: How to Use */}
        <h2 className="text-2xl font-bold text-[#2f7a4f] mb-4">{t.section4}</h2>
        <div className="p-4 border-2 border-[#2f7a4f] rounded-lg bg-white mb-8">
          <div className="text-gray-600 whitespace-pre-line">
            {t.howToUse}
          </div>
        </div>

        {/* Section 5: Important */}
        <h2 className="text-2xl font-bold text-[#2f7a4f] mb-4">{t.section5}</h2>
        <div className="p-4 border-2 border-orange-300 rounded-lg bg-orange-50 mb-8">
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>{t.important1}</li>
            <li>{t.important2}</li>
            <li>{t.important3}</li>
            <li>{t.important4}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}