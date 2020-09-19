import React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { Slider, Rail, Handles, Ticks, Tracks, HandlesObject } from 'react-compound-slider';
import { RailObject } from 'react-compound-slider/Rail/Rail';
import { TicksObject } from 'react-compound-slider/Ticks/Ticks';
import { TrackItem, TracksObject } from 'react-compound-slider/Tracks/Tracks';

import './MultiSlider.scss';

interface IOwnProps {
	from: number;
	to: number;
	step: number;
	tickerStep: number;
	value: number[] | null;
	inputValue: string;
	onChange(values: number[]): void;
	onUpdate?(values: number[]): void;
}

interface IState {
	min: number;
	max: number;
}

const b = block('multi-slider');

class MultiSlider extends React.PureComponent<IOwnProps, IState> {
	public state: IState = {
		min: 0,
		max: 0,
	};

	public render() {
		const { from, to, step, tickerStep, value, onChange, onUpdate } = this.props;
		const domain = [from, to];
		return (
			<div className={b()}>
				<Slider
					mode={2}
					step={step}
					domain={domain}
					reversed={false}
					className={b('slider').toString()}
					onChange={onChange}
					onUpdate={onUpdate}
					values={value || domain}
				>
					<Rail>{this.renderRail}</Rail>
					<Handles>{this.renderHandles}</Handles>
					<Tracks left={false} right={false}>
						{this.renderMiddleTrack}
					</Tracks>
					<Ticks count={to / tickerStep}>{this.renderTicks}</Ticks>
				</Slider>
			</div>
		);
	}

	@bind
	private renderRail(railObject: RailObject) {
		return (
			<>
				<div className={b('rail')} {...railObject.getRailProps()}>
					<div className={b('rail-slider')} />
				</div>
			</>
		);
	}

	@bind
	private renderHandles(props: HandlesObject) {
		const { from, to } = this.props;
		const { handles, getHandleProps } = props;
		return (
			<div className={b('handles')}>
				{handles.map((handle, index: number) => (
					<div
						className={b('handles-container')}
						key={`handle-${index}`}
						style={{
							left: `${handle.percent}%`,
						}}
						{...getHandleProps(handle.id)}
					>
						<div
							role="slider"
							aria-valuemin={from}
							aria-valuemax={to}
							aria-valuenow={handle.value}
							className={b('handles-hand')}
							style={{
								left: `${handle.percent}%`,
							}}
						/>
					</div>
				))}
			</div>
		);
	}

	@bind
	private renderMiddleTrack(trackObject: TracksObject) {
		const { tracks, getTrackProps } = trackObject;
		return (
			<div className={b('track')}>
				{tracks.map((track: TrackItem, index: number) => (
					<div
						className={b('track-item')}
						key={`track-${index}`}
						style={{
							left: `${track.source.percent}%`,
							width: `${track.target.percent - track.source.percent}%`,
						}}
						{...getTrackProps()}
					/>
				))}
			</div>
		);
	}

	@bind
	private renderTicks(ticksObject: TicksObject) {
		const { ticks } = ticksObject;
		return (
			<div className={b('ticks')}>
				{ticks.map((tick, index) => {
					return (
						<div
							className={b('ticks-value')}
							key={`track-${index}`}
							style={{
								marginLeft: `${-(100 / ticks.length) / 2}%`,
								width: `${100 / ticks.length}%`,
								left: `${tick.percent}%`,
							}}
						>
							{tick.value}
						</div>
					);
				})}
			</div>
		);
	}
}

export default MultiSlider;
