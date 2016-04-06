import React from 'react'
import classnames from 'classnames'
import Cell from '../cell/cell'
import { HexGrid } from '../pattern/hex'
import _ from 'lodash'

let Grid = React.createClass({

  getInitialState: function() {
    
    return {
      slideIndex: 0,
      hexGrid: null,
      slideMap: [],
      sourceCell: null,
    }
  },

  componentDidMount: function() {
    
    let hG = new HexGrid(
      this.refs.root.offsetWidth,
      this.refs.root.offsetHeight
    )
    let slideMap = [...Array(hG.length)].fill(this.state.slideIndex)
    let sourceCell = hG.width * Math.floor(hG.height * .618) - 3
    console.log(sourceCell)

    this.setState({
      hexGrid: hG,
      slideMap: slideMap,
      sourceCell: sourceCell,
    })
  },

  buildCellKey: (index) => 'cell' + index,

  onCellClick: function(index) {
    
    let slideMap = this.state.slideMap
    let slideIndex = slideMap[index] + 1

    slideMap[index] = slideIndex
    this.setState({
      slideMap: slideMap,
      slideIndex: slideIndex,
      sourceCell: index,
    })
    this.setInterval(this.tick)
  },

  setInterval: function(callback, delay = 80) {

    this.interval && this.clearInterval()
    this.interval = setInterval(callback, delay)
  },
  clearInterval: function() {

    clearInterval(this.interval)
    this.interval = null
  },

  tick: function() {

    let { hexGrid: hG, slideIndex: globalSlideIndex, slideMap } = this.state
    let updated = false

    slideMap = _(slideMap)
      .map((slideIndex, cellIndex) => {

        if (slideIndex != globalSlideIndex
          && _(hG.getNeighbourIndexes(cellIndex))
            .some(ci => slideMap[ci] == globalSlideIndex)) {

          updated = true
          return globalSlideIndex
        }
        return slideIndex
      }).value()
    if (updated) {

      this.setState({
        slideMap: slideMap,
      })
    } else {
      this.clearInterval()
    }
  },

  getComponentClasses: function() {
    return classnames('grid')
  },
  
  renderCells: function(discreteWidth, discreteHeight) {

    let hG = this.state.hexGrid
    return hG && [...Array(hG.length)].map((x, index) => {
    
      let coordinate = hG.getCoordinate(index)
      let slideIndex = this.state.slideMap[index]

      return <Cell key={ 'cell' + index }
        coordinate={ coordinate }
        slideIndex={ slideIndex }
        slideCount={ 5 }
        isSource={ index == this.state.sourceCell }
        onClick={ this.onCellClick.bind(this, index) } />
    })
  },

  render: function() {

    return <div className={ this.getComponentClasses() } ref="root" >
      { this.renderCells(this.state.discreteWidth, this.state.discreteHeight) }
    </div>
  },
})

export default Grid
