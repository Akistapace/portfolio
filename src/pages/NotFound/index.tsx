import { useTranslation } from 'react-i18next'

export default function NotFound() {
	const { t } = useTranslation()

	return (
		<div className='home-page mx-auto w-full flex flex-col items-center justify-center px-4 py-8'>
			<h1 className='text-4xl font-bold text-center'>{t('notFound.title')}</h1>
		</div>
	)
}
