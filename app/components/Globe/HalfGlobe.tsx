'use client'

import { useEffect, useRef, useState } from 'react'

const HollowGlobe = () => {
	const globeRef = useRef<HTMLDivElement>(null)
	const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: 500 })

	const initialX = 0
	const initialY = -50
	const initialZ = 0
	const initialLat = 0
	const initialLng = 0

	useEffect(() => {
		if (typeof window === 'undefined') return

		const handleResize = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight * 0.4,
			})
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (typeof window === 'undefined') return
		if (!globeRef.current) return

		const loadGlobe = async () => {
			const globeModule = await import('globe.gl')
			const THREE = await import('three')
			const topojson = await import('topojson-client')
			const Globe = globeModule.default
			const { feature } = topojson

			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			const world = new Globe(globeRef.current!)
				.backgroundColor('rgba(0,0,0,0)')
				.showGlobe(true)
				.showAtmosphere(true)
				.atmosphereColor('#ebebeb')
				.atmosphereAltitude(0.18)

			world.scene().scale.set(1.5, 1.5, 1.5)

			const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
			world.globeMaterial(whiteMaterial)

			const landDataModule = await import('./globe.json')
			const landData = landDataModule.default
			const landFeatureCollection = feature(
				landData as unknown as import('topojson-specification').Topology,
				landData.objects.land as import('topojson-specification').GeometryObject
			)
			const landFeatures =
				landFeatureCollection && 'features' in landFeatureCollection ? landFeatureCollection.features : []

			world
				.polygonsData(landFeatures as object[])
				.polygonCapMaterial(new THREE.MeshLambertMaterial({ color: 'black', side: THREE.DoubleSide }))
				.polygonSideColor(() => 'rgba(0,0,0,0)')

			const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
			directionalLight.position.set(1, 1, 1).normalize()
			world.scene().add(directionalLight)

			world.scene().position.set(initialX, initialY, initialZ)
			world.controls().autoRotate = true
			world.controls().autoRotateSpeed = 1.5
			world.controls().enableZoom = false
			world.controls().enablePan = false
			world.controls().enableRotate = false

			world.pointOfView({ lat: initialLat, lng: initialLng }, 1000)
		}

		loadGlobe()
	}, [dimensions])

	return (
		<div
			ref={globeRef}
			style={{ width: '100%', height: `${dimensions.height}px`, overflow: 'hidden', margin: '0 auto' }}
		/>
	)
}

export default HollowGlobe
