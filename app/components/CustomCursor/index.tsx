"use client";

import AnimatedCursor from "react-animated-cursor";

export const CustomCursor = () => {
	return <AnimatedCursor
		clickables={['a', 'input', 'texarea', 'button', 'select']}
		color="#fff"
		innerSize={8}
		outerSize={35}
		innerScale={1}
		outerScale={1.7}
		outerAlpha={0}
		outerStyle={{
			width: '60px',
			height: '60px',
			background: '#fff',
			mixBlendMode: 'exclusion'
		}}
		innerStyle={{
			background: '#fff',
			mixBlendMode: 'exclusion'
		}}
	/>
}

