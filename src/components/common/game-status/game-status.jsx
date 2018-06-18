// @flow

import style from './game-status.styl';
import React from 'react';

import bem from 'bem-css-modules';

const b = bem(style);

const MINES_LEFT_TEXT = 'Mines left: ';

type PropsType = {|
    minesLeftCount: number,
    state: 'fail' | 'win' | 'in-progress' | 'not-started';
|};

export default class GameStatus extends React.PureComponent<PropsType> {
    renderMinesCount() {
        return (
            <span>
                <span>
                    {MINES_LEFT_TEXT}
                </span>
                {this.props.minesLeftCount}
            </span>
        );
    }

    render() {
        const {state} = this.props;

        return (
            <div className={b('', {state})}>
                {this.renderMinesCount()}
            </div>
        );
    }
}
