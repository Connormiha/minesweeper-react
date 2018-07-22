// @flow

import React from 'react';
import {bindMethods} from 'helpers/utils';
import bem from 'bem-css-modules';
import style from './settings.styl';

import type {GameType, FieldFillParams} from 'flux/types.js.flow';

const b = bem(style);

type PropsType = {|
    game: GameType,
    onChangeFieldWidth: (number) => void,
    onChangeFieldHeight: (number) => void,
    onChangeFieldMinesCount: (number) => void,
    onStartGame: (FieldFillParams) => void,
|};

export default class Settings extends React.PureComponent<PropsType> {
    constructor(props: PropsType) {
        super(props);

        bindMethods(this, ['hanldeChangeWidth', 'hanldeChangeHeight', 'hanldeChangeMinesCount', 'handleSubmit']);
    }

    hanldeChangeWidth(e: SyntheticInputEvent<HTMLInputElement>) {
        this.props.onChangeFieldWidth(parseInt(e.target.value, 10));
    }

    hanldeChangeHeight(e: SyntheticInputEvent<HTMLInputElement>) {
        this.props.onChangeFieldHeight(parseInt(e.target.value, 10));
    }

    hanldeChangeMinesCount(e: SyntheticInputEvent<HTMLInputElement>) {
        this.props.onChangeFieldMinesCount(parseInt(e.target.value, 10));
    }

    handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
        const {game: {width, height, minesCount}, onStartGame} = this.props;

        e.preventDefault();
        onStartGame({width, height, minesCount});
    }

    render() {
        const {width, height, minesCount} = this.props.game;

        return (
            <form
                className={b()}
                onSubmit={this.handleSubmit}
            >
                <label className={b('label')}>
                    <span className={b('label-text')}>
                        {'Cols'}
                    </span>
                    <input
                        type="number"
                        min="1"
                        max="100"
                        value={width}
                        onChange={this.hanldeChangeWidth}
                    />
                </label>
                <label className={b('label')}>
                    <span className={b('label-text')}>
                        {'Rows'}
                    </span>
                    <input
                        type="number"
                        min="1"
                        max="100"
                        value={height}
                        onChange={this.hanldeChangeHeight}
                    />
                </label>
                <label className={b('label')}>
                    <span className={b('label-text')}>
                        {'Mines count'}
                    </span>
                    <input
                        type="number"
                        min="1"
                        max="10000"
                        value={minesCount}
                        onChange={this.hanldeChangeMinesCount}
                    />
                </label>

                <input
                    type="submit"
                    value="Apply"
                />
            </form>
        );
    }
}
