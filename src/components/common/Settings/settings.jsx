// @flow

import {bindMethods} from 'helpers/utils';
import bem from 'bem-css-modules';
import style from './settings.styl';

import type {GameType, FieldFillParams} from 'flux/types.js.flow';

const b = bem(style);

type PropsType = {
    game: GameType,
    onChangeFieldWidth: (number) => void,
    onChangeFieldHeight: (number) => void,
    onChangeFieldMinesCount: (number) => void,
    onStartGame: (FieldFillParams) => void,
};

export default class Settings extends React.PureComponent<PropsType> {
    constructor(props: PropsType) {
        super(props);

        bindMethods(this, ['hanldeChangeWidth', 'hanldeChangeHeight', 'hanldeChangeMinesCount', 'handleSubmit']);
    }

    props: PropsType;

    hanldeChangeWidth(e: any) {
        this.props.onChangeFieldWidth(parseInt(e.target.value, 10));
    }

    hanldeChangeHeight(e: any) {
        this.props.onChangeFieldHeight(parseInt(e.target.value, 10));
    }

    hanldeChangeMinesCount(e: any) {
        this.props.onChangeFieldMinesCount(parseInt(e.target.value, 10));
    }

    handleSubmit(e: any) {
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
                    {'Cols'}
                    <input
                        type="number"
                        min="1"
                        max="100"
                        value={width}
                        onChange={this.hanldeChangeWidth}
                    />
                </label>
                <label className={b('label')}>
                    {'Rows'}
                    <input
                        type="number"
                        min="1"
                        max="100"
                        value={height}
                        onChange={this.hanldeChangeHeight}
                    />
                </label>
                <label className={b('label')}>
                    {'Mines count'}
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
