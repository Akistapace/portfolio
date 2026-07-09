import { pdf } from '@react-pdf/renderer'
import { Download, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { ResumeDocument } from './ResumeDocument'

type DownloadResumeButtonProps = {
	className?: string
	variant?: React.ComponentProps<typeof Button>['variant']
	size?: React.ComponentProps<typeof Button>['size']
	iconOnly?: boolean
}

const languageSuffixes: Record<string, string> = {
	en: 'EN',
	'pt-BR': 'PT',
	es: 'ES',
}

export const DownloadResumeButton = ({ className, variant, size, iconOnly = false }: DownloadResumeButtonProps) => {
	const { t, i18n } = useTranslation()
	const [loading, setLoading] = useState(false)

	const handleDownload = async () => {
		setLoading(true)
		try {
			const blob = await pdf(<ResumeDocument />).toBlob()
			const url = URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			const langSuffix = languageSuffixes[i18n.language] ?? i18n.language.toUpperCase()
			link.download = `Fernando-Aquistapace-CV-${langSuffix}.pdf`
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
			URL.revokeObjectURL(url)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Button
			onClick={handleDownload}
			disabled={loading}
			variant={variant}
			size={iconOnly ? 'icon' : size}
			className={iconOnly ? className : `gap-2 ${className ?? ''}`}
			title={t('resume.aria')}
			aria-label={t('resume.aria')}
		>
			{loading ? <Loader2 className='size-4 animate-spin' /> : <Download className='size-4' />}
			{!iconOnly && (loading ? t('resume.generating') : t('resume.download'))}
		</Button>
	)
}
