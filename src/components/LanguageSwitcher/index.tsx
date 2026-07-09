import { useTranslation } from 'react-i18next'

import { languages, type LanguageCode } from '@/i18n'
import { Button } from '../ui/button'
import { FlagBR, FlagES, FlagUS } from './flags'

const flags: Record<LanguageCode, () => React.ReactNode> = {
	en: FlagUS,
	'pt-BR': FlagBR,
	es: FlagES,
}

export const LanguageSwitcher = () => {
	const { i18n, t } = useTranslation()

	const currentIndex = languages.findIndex(lang => lang.code === i18n.language)
	const currentLanguage = languages[currentIndex === -1 ? 0 : currentIndex]
	const CurrentFlag = flags[currentLanguage.code]

	const cycleLanguage = () => {
		const nextIndex = (currentIndex === -1 ? 0 : currentIndex + 1) % languages.length
		i18n.changeLanguage(languages[nextIndex].code)
	}

	return (
		<Button
			className='cursor-pointer'
			variant='ghost'
			size={'sm'}
			onClick={cycleLanguage}
			aria-label={t('language.select')}
			title={currentLanguage.label}
			data-testid='language-switcher'
		>
			<CurrentFlag />
		</Button>
	)
}
