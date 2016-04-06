import React from 'react'
import ReactDOM from 'react-dom'

import path from 'path'
import Pattern from './components/pattern/hex'
import Grid from './components/grid/grid.js'

ReactDOM.render(
    <div>
		<Grid />
        <Pattern edge="2" padding=".1" />
    </div>,
    document.getElementById('app')
)
