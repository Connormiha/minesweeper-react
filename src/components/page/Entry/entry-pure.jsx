// @flow

import React from 'react';
import Field from 'components/common/Field';
import Settings from 'components/common/Settings';
import GameStatus from 'components/common/game-status';

import './entry.styl';

import type {FieldStoreType, GameType, FieldFillParams} from 'flux/types.js.flow';

type PropsType = {|
    field: FieldStoreType,
    game: GameType,
    onClickCell: (number) => void,
    onFirstClickCell: (id: number, field: FieldFillParams) => void,
    onClickMarkCell: (number) => void,
    onClickQuickOpenCell: (number) => void,
    onChangeFieldWidth: (number) => void,
    onChangeFieldHeight: (number) => void,
    onChangeFieldMinesCount: (number) => void,
    onStartGame: (FieldFillParams) => void,
|};

export default class PageEntryPure extends React.PureComponent<PropsType> {
    _handleCellClick: (id: number) => void;

    constructor(props: PropsType) {
        super(props);
        this._handleCellClick = this.handleCellClick.bind(this);
    }

    componentDidMount() {
        const {game, onStartGame} = this.props;

        onStartGame({
            width: game.width,
            height: game.height,
            minesCount: game.minesCount,
        });
    }

    handleCellClick(id: number) {
        const {game, field, onFirstClickCell, onClickCell} = this.props;

        if (field.isGenerated) {
            onClickCell(id);
        } else {
            onFirstClickCell(
                id,
                {
                    width: game.width,
                    height: game.height,
                    minesCount: game.minesCount,
                }
            );
        }
    }

    render() {
        const {
            game, field, onChangeFieldWidth, onChangeFieldHeight, onChangeFieldMinesCount,
            onStartGame, onClickMarkCell, onClickQuickOpenCell,
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
                    field={field.field}
                    rowWidth={field.rowWidth}
                    isDead={field.showAllBombs}
                    onClickCell={this._handleCellClick}
                    onClickMarkCell={onClickMarkCell}
                    onClickQuickOpenCell={onClickQuickOpenCell}
                />
                <GameStatus
                    text="Test"
                    type="fail"
                />
            </div>
        );
    }
}
