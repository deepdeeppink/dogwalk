import React from 'react'
import classnames from 'classnames'

let Cell = React.createClass({
	
	getInitialState: function() {
		return {
			slideIndex: 0,
			changing: false,
		}
	},

	componentWillReceiveProps: function(nextProps) {

		let nextSlideNumber = nextProps.slideIndex % this.props.slideCount
		if (nextSlideNumber != this.state.slideIndex) {

			this.setState({
				changing: true,
			})
			this.setTimeout(function() {

				this.setState({
					slideIndex: nextSlideNumber,
				})
				this.setTimeout(function() {

					this.setState({
						changing: false,
					})
				}, 300)
			})
		}
	},

	setTimeout: function(callback, delay = 0) {
		
		this.timeout && this.clearTimeout()
		this.timeout = setTimeout(callback.bind(this), delay)
	},

	clearTimeout: function() {
		
		clearTimeout(this.timeout)
		this.timeout = null;
	},

	getOuterClasses: function() {

		return classnames(
			'cell',
			'fretted',
			['cell'].concat(this.props.coordinate).join('_'),
			'cell_slide_' + (this.props.slideIndex % this.props.slideCount),
			{
				'fretted_inset': this.state.changing,
				'cell_source': this.props.isSource,
			})
	},

	getInnerClasses: function() {

		return classnames(
			'cell--inner',
			'variable',
			'variable_' + this.state.slideIndex,
			{})
	},

	render: function() {
		
		return <div className={ this.getOuterClasses() } onClick={ this.props.onClick }>
			<div className={ this.getInnerClasses() } />
			{ this.props.isSource && <div className="cell--text">
					{ (this.props.slideIndex % this.props.slideCount + 1) }/{ this.props.slideCount }
			</div> }
		</div>
	},
})

export default Cell
