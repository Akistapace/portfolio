import { cn } from '@/lib/utils'

function Table({ className, ...props }: React.ComponentProps<'table'>) {
	return (
		<div data-slot='table-container' className='relative w-full overflow-x-auto rounded-lg'>
			<table
				data-slot='table'
				className={cn('w-full min-w-[640px] caption-bottom text-sm border-collapse table-fixed', className)}
				{...props}
			/>
		</div>
	)
}
function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
	return <thead data-slot='table-header' className={cn('[&_tr]:border-b', className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
	return <tbody data-slot='table-body' className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
	return (
		<tfoot
			data-slot='table-footer'
			className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
			{...props}
		/>
	)
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
	return (
		<tr
			data-slot='table-row'
			className={cn('transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted border-b', className)}
			{...props}
		/>
	)
}
function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
	return (
		<th
			data-slot='table-head'
			className={cn(
				'h-10 px-4  text-left align-middle font-semibold whitespace-nowrap border-b bg-emerald-700 text-white [&:has([role=checkbox])]:pr-0',
				className
			)}
			{...props}
		/>
	)
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
	return (
		<td
			data-slot='table-cell'
			className={cn('px-4 py-2 whitespace-nowrap border-b align-middle [&:has([role=checkbox])]:pr-0', className)}
			{...props}
		/>
	)
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
	return (
		<caption data-slot='table-caption' className={cn('text-muted-foreground mt-4 text-sm', className)} {...props} />
	)
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
