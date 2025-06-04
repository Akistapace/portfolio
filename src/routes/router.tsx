import { Layout } from '@/layout'
import { Pages } from '@/pages'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

export const ROUTES = {
	notFound: '*',
	index: '/',
}

export const Router = () => {
	return (
		<Suspense fallback={<></>}>
			<Routes>
				<Route path={ROUTES.index} element={<Layout />}>
					<Route index element={<Pages.Home />} />
					<Route path={ROUTES.notFound} element={<Pages.NotFound />} />
				</Route>
			</Routes>
		</Suspense>
	)
}
