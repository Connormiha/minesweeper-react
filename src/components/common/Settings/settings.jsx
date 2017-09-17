// @flow

import style from './settings.styl';
import bem from 'bem-css-modules';

import type {GameType} from 'flux/types';

const b = bem(style);

type PropsType = {
    game: GameType,
    onChangeFieldWidth: (number) => void,
};

export default class Settings extends React.PureComponent<PropsType> {
    constructor(props: PropsType) {
        super(props);

        this.hanldeChangeWidth = this.hanldeChangeWidth.bind(this);
    }

    props: PropsType;
    hanldeChangeWidth: Function;

    hanldeChangeWidth(e: any) {
        this.props.onChangeFieldWidth(parseInt(e.target.value, 10));
    }

    render() {
        const {width, height, minesCount} = this.props.game;

        return (
            <div className={b()}>
                <label className={b('label')}>
                    {'Rows'}
                    <input
                        type="number"
                        min="1"
                        value={width}
                        onChange={this.hanldeChangeWidth}
                    />
                </label>
                <label className={b('label')}>
                    {'Cols'}
                    <input
                        type="number"
                        min="1"
                        value={height}
                    />
                </label>
                <label className={b('label')}>
                    {'Mines count'}
                    <input
                        type="number"
                        min="1"
                        value={minesCount}
                    />
                </label>
            </div>
        );
    }
}
