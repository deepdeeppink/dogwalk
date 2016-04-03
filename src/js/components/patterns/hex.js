import React from 'react'

const Pattern = props =>
	<svg>
		<defs>
			<clipPath id="pattern">
				<path d={ getPath(props.edge) } />
			</clipPath>
		</defs>
	</svg>

export default Pattern

function getPath(edge) {

	let a = edge
	let x = a * Math.cos(Math.PI/6)
	let y = a * Math.sin(Math.PI/6)

	return [
		'm', [x, 0].join(','),
		'l', [x, y].join(','),
		'v', a,
		'l', [-x, y].join(','),
		'l', [-x, -y].join(','),
		'v', -a,
		'z',
	].join('')
}
