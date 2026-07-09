import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import es from './locales/es.json'
import ptBR from './locales/pt-BR.json'

export const languages = [
	{ code: 'en', label: 'English' },
	{ code: 'pt-BR', label: 'Português' },
	{ code: 'es', label: 'Español' },
] as const

export type LanguageCode = (typeof languages)[number]['code']

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: { translation: en },
			'pt-BR': { translation: ptBR },
			es: { translation: es },
		},
		fallbackLng: 'en',
		supportedLngs: languages.map(lang => lang.code),
		detection: {
			order: ['localStorage', 'navigator'],
			lookupLocalStorage: 'vite-ui-language',
			caches: ['localStorage'],
		},
		interpolation: {
			escapeValue: false,
		},
	})

export default i18n
