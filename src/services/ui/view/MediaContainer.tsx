import * as React from 'react';

interface IOwnProps {
	callback: () => void;
}

class MediaContainer extends React.PureComponent<IOwnProps> {
	public componentDidMount() {
		this.props.callback();
	}

	public render() {
		return null;
	}
}

export default MediaContainer;
