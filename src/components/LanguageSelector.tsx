'use client'

import { Languages } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Language } from '@/lib/i18n'

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-[#11161E] px-3 py-2 rounded-xl transition-all duration-200 hover:bg-[#1A1F2E]"
      title={language === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}
    >
      <Languages className="w-4 h-4 text-[#F97316]" />
      <span className="text-sm font-medium uppercase">{language}</span>
    </button>
  )
}
