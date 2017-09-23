// @flow

import Field from 'components/common/Field';
import Settings from 'components/common/Settings';

import './entry.styl';

import type {FieldType, GameType, FieldFillParams} from 'flux/types.js.flow';

type PropsType = {
    field: FieldType,
    game: GameType,
    onClickCell: (number) => void,
    onMarkCell: (number) => void,
    onChangeFieldWidth: (number) => void,
    onChangeFieldHeight: (number) => void,
    onChangeFieldMinesCount: (number) => void,
    onStartGame: (FieldFillParams) => void,
};

export default class PageEntryPure extends React.PureComponent<PropsType> {
    componentWillMount() {
        const {game, onStartGame} = this.props;

        onStartGame({
            width: game.width,
            height: game.height,
            minesCount: game.minesCount,
        });
    }

    props: PropsType;

    render() {
        const {
            game, field, onChangeFieldWidth, onChangeFieldHeight, onChangeFieldMinesCount,
            onStartGame, onMarkCell, onClickCell,
        } = this.props;

        return (
            <div className="test">
                <Settings
                    game={game}
                    onChangeFieldWidth={onChangeFieldWidth}
                    onChangeFieldHeight={onChangeFieldHeight}
                    onChangeFieldMinesCount={onChangeFieldMinesCount}
                    onStartGame={onStartGame}
                />
                <Field
                    field={field}
                    onClickCell={onClickCell}
                    onMarkCell={onMarkCell}
                />
            </div>
        );
    }
}
