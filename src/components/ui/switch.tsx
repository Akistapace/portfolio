import { cn } from '@/lib/utils'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { LucideMoon, LucideSun } from 'lucide-react'
import { useState } from 'react'

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
	const [checked, setChecked] = useState(false)

	return (
		<SwitchPrimitive.Root
			checked={checked}
			onCheckedChange={setChecked}
			data-slot='switch'
			className={cn(
				'peer relative inline-flex h-6 w-12 shrink-0 items-center rounded-full border  shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
				'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
				className
			)}
			{...props}
		>
			<span className='absolute left-1 text-muted-foreground transition-opacity duration-200 ease-in-out data-[state=checked]:opacity-0 data-[state=unchecked]:opacity-100'>
				<LucideSun className='h-4 w-4' color='white' />
			</span>
			<span className='absolute right-1 text-primary-foreground transition-opacity duration-200 ease-in-out data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0'>
				<LucideMoon className='h-4 w-4' color='black' />
			</span>
			<SwitchPrimitive.Thumb
				data-slot='switch-thumb'
				className={cn(
					'pointer-events-none block h-5 w-5 rounded-full bg-emerald-900 shadow transition-transform duration-200',
					'data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0.5',
					'dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground'
				)}
			/>
		</SwitchPrimitive.Root>
	)
}

export { Switch }
