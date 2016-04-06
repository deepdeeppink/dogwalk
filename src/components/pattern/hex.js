import React from 'react'
import { convert } from '../../R'
import _ from 'lodash'

// TODO: css dep here
export const EDGE = convert.rem(6)
export const PADDING = -1

const horProjection = (a) => a * Math.cos(Math.PI / 6)
const verProjection = (a) => a * Math.sin(Math.PI / 6)

function getPath (edge, padding) {

  let a = edge - padding
  let h = horProjection(a)
  let v = verProjection(a)

  return [
    'm', [horProjection(edge), padding].join(','),
    'l', [h, v].join(','),
    'v', a,
    'l', [-h, v].join(','),
    'l', [-h, -v].join(','),
    'v', -a,
    'z',
  ].join('')
}

export default function Pattern (props) {

  return <svg height="0" width="0">
    <defs>
      <clipPath id="pattern">
        <path d={ getPath(EDGE, PADDING) } />
      </clipPath>
      <clipPath id="pattern_inset">
        <path d={ getPath(EDGE, .2) } />
      </clipPath>
    </defs>
  </svg>
}

export function HexGrid(nativeWidth = 0, nativeHeight = 0) {

  let cellWidth = 2 * horProjection(EDGE)
  let cellHeight = verProjection(EDGE) + EDGE

  this.width = Math.ceil(nativeWidth / cellWidth) + 2
  this.height = Math.ceil(nativeHeight / cellHeight) + 2
  this.length = this._wh2index([this.width - 1, this.height - 1]) + 1
}

HexGrid.prototype.getCoordinate = function(index) {
  return this._wh2coordinate(
    this._index2wh(index))
}

HexGrid.prototype.getIndex = function(coordinate) {

  let [w, h] = this._coordinate2wh(coordinate)
  return _isInRange(w, this.width)
    && _isInRange(h, this.height)
    ? this._wh2index([w, h])
    : -1
}

HexGrid.prototype.isIndexValid = function(index) {
  return 0 <= index && index < this.length
}

HexGrid.prototype.getNeighbourCoordinates = ([x, y]) =>
  [
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
  ]

HexGrid.prototype.getNeighbourIndexes = function(index) {

  return _(this.getNeighbourCoordinates(
    this.getCoordinate(index)))
    .map(coordinate => this.getIndex(coordinate))
    .filter(index => index > -1)
    .value()
}

HexGrid.prototype._wh2index = function([w, h]) {
  return h * this.width + w
}
HexGrid.prototype._index2wh = function(index) {
  return [index % this.width, Math.floor(index / this.width)]
}
HexGrid.prototype._wh2coordinate = function([w, h]) {
  return [Math.floor(w - h / 2), h]
}
HexGrid.prototype._coordinate2wh = function([x, y]) {
  return [x + Math.ceil(y / 2), y]
}
function _isInRange(index, rangeLength) {
  return 0 <= index && index < rangeLength
}