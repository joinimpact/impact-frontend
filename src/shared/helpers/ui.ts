const domCss = require('dom-css');

function interopRequireDefault(obj: any) {
	return obj && obj.__esModule ? obj : { default: obj };
}

const domCss2 = interopRequireDefault(domCss);

export function getScrollbarWidth(): number {
	let scrollbarWidth = 0;
	if (typeof document !== 'undefined') {
		const div = document.createElement('div');
		domCss2.default(div, {
			width: 100,
			height: 100,
			position: 'absolute',
			top: -9999,
			overflow: 'scroll',
			MsOverflowStyle: 'scrollbar',
		});
		document.body.appendChild(div);
		scrollbarWidth = div.offsetWidth - div.clientWidth;
		document.body.removeChild(div);
	} else {
		scrollbarWidth = 0;
	}

	return scrollbarWidth || 0;
}
