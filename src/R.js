export function getRootElementFontSize( ) {

    return parseFloat(
        getComputedStyle(
            document.documentElement
        ).fontSize
    );
}

export function getViewportMaxSize( ) {

	let { width, height } = screen
    return Math.max(width, height);
}

export var convert = {

	rem: function(value) {
    	return value * getRootElementFontSize();
	},
	vmax: function(value) {
		return value * getViewportMaxSize() / 100;
	}
}
