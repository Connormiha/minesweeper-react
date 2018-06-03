// @flow

import style from './game-status.styl';
import React from 'react';

import bem from 'bem-css-modules';

const b = bem(style);

type PropsType = {|
    text: string;
    type: string;
|};

export default class GameStatus extends React.PureComponent<PropsType> {
    render() {
        const {text, type} = this.props;

        return (
            <div className={b({type})}>
                {text}
            </div>
        );
    }
}
