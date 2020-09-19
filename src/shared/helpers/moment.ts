import moment from 'moment';

export const $moment = (left: moment.Moment) => {
	return {
		lessThan: (right: moment.Moment) => {
			return left && right ? left.diff(right) < 0 : null;
		},
		lessOrEqualsThan: (right: moment.Moment) => {
			return left && right ? left.diff(right) <= 0 : null;
		},
		moreThan: (right: moment.Moment) => {
			return left && right ? left.diff(right) > 0 : null;
		},
		moreOrEqualsThan: (right: moment.Moment) => {
			return left && right ? left.diff(right) >= 0 : null;
		},
		equals: (right: moment.Moment) => {
			return left && right ? left.diff(right) === 0 : null;
		},
		daysBetween: (right: moment.Moment) => {
			return left && right ? left.diff(right, 'd') : null;
		},
		inRange: (from: moment.Moment, to: moment.Moment) => {
			return left && from && to ? left.isBetween(from, to, undefined, '[]') : null;
		},
		isNull: () => !left,
	};
};
