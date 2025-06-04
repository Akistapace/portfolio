import { LucideLoader2 } from 'lucide-react'

export const Loader = () => {
	return (
		<div className='flex justify-center items-center h-full min-h-[350px]'>
			<LucideLoader2 className='animate-spin w-6 h-6 text-muted-foreground' />
		</div>
	)
}
