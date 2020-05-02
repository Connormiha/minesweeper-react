import style from './game-status.styl';
import React from 'react';

import bem from 'bem-css-modules';

const b = bem(style);

const MINES_LEFT_TEXT = 'Mines left: ';
const WIN_STATUS_TEXT = 'You Winner!!!';

type PropsType = {
    minesLeftCount: number;
    state: 'fail' | 'win' | 'in-progress' | 'not-started';
};

export default class GameStatus extends React.PureComponent<PropsType> {
  renderMinesCount(): React.ReactNode {
    return (
      [
        <span key={0}>
          {MINES_LEFT_TEXT}
        </span>,
        this.props.minesLeftCount,
      ]
    );
  }

  renderWinStatus(): React.ReactNode {
    return (
      [
        <span key={0}>
          {WIN_STATUS_TEXT}
        </span>,
        this.renderMinesCount(),
      ]
    );
  }

  renderInProgress(): React.ReactNode {
    return this.renderMinesCount();
  }

  renderFail(): React.ReactNode {
    return this.renderMinesCount();
  }

  renderNotStarted(): React.ReactNode {
    return this.renderMinesCount();
  }

  renderInfo(): React.ReactNode {
    const {state} = this.props;

    if (state === 'win') {
      return this.renderWinStatus();
    }

    if (state === 'in-progress') {
      return this.renderInProgress();
    }

    if (state === 'fail') {
      return this.renderFail();
    }

    return this.renderNotStarted();
  }

  render(): React.ReactNode {
    const {state} = this.props;

    return (
      <div className={b('', {state})}>
        {this.renderInfo()}
      </div>
    );
  }
}
