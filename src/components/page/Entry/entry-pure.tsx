import React from 'react';
import Field from 'components/common/Field';
import Settings from 'components/common/Settings';
// import Gamepad from 'components/common/gamepad';
import GameStatus from 'components/common/game-status';

import './entry.styl';

import type {FieldStoreType, GameType, FieldFillParams} from 'flux/types';

type PropsType = {
    field: FieldStoreType;
    game: GameType;
    onClickCell: (id: number) => void;
    onFirstClickCell: (id: number, field: FieldFillParams) => void;
    onClickMarkCell: (id: number) => void;
    onClickQuickOpenCell: (id: number) => void;
    onChangeFieldWidth: (id: number) => void;
    onChangeFieldHeight: (id: number) => void;
    onChangeFieldMinesCount: (id: number) => void;
    onStartGame: (params: FieldFillParams) => void;
    onFinishGame: (isFail: boolean) => void;
};

export default class PageEntryPure extends React.PureComponent<PropsType> {
    _handleCellClick: (id: number) => void;

    constructor(props: PropsType) {
      super(props);
      this._handleCellClick = this.handleCellClick.bind(this);
    }

    componentDidMount(): void {
      const {game, onStartGame} = this.props;

      onStartGame({
        width: game.width,
        height: game.height,
        minesCount: game.minesCount,
      });
    }

    componentDidUpdate(prevProps: PropsType): void {
      const {field, game} = this.props;

      if (field.showAllBombs && !prevProps.field.showAllBombs) {
        this.props.onFinishGame(true);
      } else if (
        game.state === 'in-progress' &&
          (
            field.flagsCount + field.openedCount === field.field.length ||
              (
                field.field.length === field.openedCount + game.minesCount &&
                  !field.showAllBombs
              )
          )
      ) {
        this.props.onFinishGame(false);
      }
    }

    handleCellClick(id: number): void {
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

    render(): React.ReactNode {
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
            isWin={game.state === 'win'}
            onClickCell={this._handleCellClick}
            onClickMarkCell={onClickMarkCell}
            onClickQuickOpenCell={onClickQuickOpenCell}
          />
          <GameStatus
            minesLeftCount={game.minesCount - field.flagsCount}
            state={game.state}
          />
          {/* <Gamepad /> */}
        </div>
      );
    }
}
