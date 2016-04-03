import React from 'react'
import ReactDOM from 'react-dom'
import Pattern from './components/patterns/hex'
// import Test1 from './test1'
// import Test2 from './components/test2'

// let Test = React.createClass({

//     getInitialState: function () {
//         return {
//           data: [],
//         }
//     },

//     componentWillMount: function () {
//         console.log('componentWillMount', this)
//     },

//     componentWillRecieveProps: function (nextProps) {
//         console.log('componentWillRecieveProps', nextProps)
//     },

//     render: function () {
//         return <h1>Hey-ho, world!</h1>
//     },
// })

ReactDOM.render(
    <div>
        <img className="u" src="u.jpg" alt="Angelstone Universal Delight" />
        <Pattern edge="30" />
    </div>,
    document.getElementById('app')
)
