import { pdf } from '@react-pdf/renderer'
import { Download, Loader2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { ResumeDocument } from './ResumeDocument'

type DownloadResumeButtonProps = {
	className?: string
	variant?: React.ComponentProps<typeof Button>['variant']
	size?: React.ComponentProps<typeof Button>['size']
	iconOnly?: boolean
}

export const DownloadResumeButton = ({ className, variant, size, iconOnly = false }: DownloadResumeButtonProps) => {
	const [loading, setLoading] = useState(false)

	const handleDownload = async () => {
		setLoading(true)
		try {
			const blob = await pdf(<ResumeDocument />).toBlob()
			const url = URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.download = 'Fernando-Aquistapace-CV.pdf'
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
			title='Baixar Currículo'
			aria-label='Baixar Currículo'
		>
			{loading ? <Loader2 className='size-4 animate-spin' /> : <Download className='size-4' />}
			{!iconOnly && (loading ? 'Gerando PDF...' : 'Baixar Currículo')}
		</Button>
	)
}
