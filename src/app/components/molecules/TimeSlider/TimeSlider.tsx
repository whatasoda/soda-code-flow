import * as React from 'react';
import startTimeSlide, { PositionUpdater, SlideTerminator } from '../../../effects/sequence/startTimeSlide';
import styleHelper from '../../../util/styleHelper';
import style = require('./TimeSlider.css');

const s = styleHelper(style);

interface TimeSliderProps {
  time: number;
}

class TimeSlider extends React.Component<TimeSliderProps> {
  private container: HTMLDivElement | null = null;
  private updater: PositionUpdater | null = null;
  private terminator: SlideTerminator | null = null;

  constructor(props: TimeSliderProps) {
    super(props);
    this.refContainer = this.refContainer.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onTerminate = this.onTerminate.bind(this);
  }

  public render() {
    const { time } = this.props;
    return (
      <div className={s(['container'])}>
        <div ref={this.refContainer} className={s(['bar'])}>
          <div onMouseDown={this.onMouseDown} className={s(['knob'])} style={{ left: `${time * 100}%` }} />
        </div>
      </div>
    );
  }

  private refContainer(elem: HTMLDivElement | null) {
    this.container = elem;
  }

  private onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    this.onTerminate();
    if (this.container && e.target instanceof HTMLElement) {
      const containerRect = this.container.getBoundingClientRect();
      const knobRect = e.target.getBoundingClientRect();
      const start = e.clientX;
      const { onTerminate } = this;
      const { updater, terminator } = startTimeSlide({
        containerRect,
        knobRect,
        start,
        onTerminate,
      });
      this.updater = updater;
      this.terminator = terminator;
      this.assignHandlers();
    }
  }

  private assignHandlers() {
    if (this.updater && this.terminator) {
      window.addEventListener('mousemove', this.updater);
      window.addEventListener('mouseleave', this.terminator);
      window.addEventListener('mouseup', this.terminator);
    }
  }

  private onTerminate() {
    if (this.updater) {
      window.removeEventListener('mousemove', this.updater);
      this.updater = null;
    }
    if (this.terminator) {
      window.removeEventListener('mouseleave', this.terminator);
      window.removeEventListener('mouseup', this.terminator);
      this.terminator = null;
    }
  }
}

export default TimeSlider;
