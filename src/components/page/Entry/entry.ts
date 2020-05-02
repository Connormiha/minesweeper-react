import {connect} from 'react-redux';
import Pure from './entry-pure';
import * as fieldActions from 'flux/field';
import * as gameActions from 'flux/game';
import {batchActions} from 'redux-batched-actions';

import type {Dispatch} from 'redux';
import type {FieldFillParams} from 'flux/types';
import { SchemaType } from 'reducers/schema';

export default connect(
  ({game, field}: SchemaType) => ({game, field}),
  (dispatch: Dispatch) => ({
    onClickCell(id: number): void {
      dispatch(fieldActions.openCell(id));
    },

    onFirstClickCell(id: number, field: FieldFillParams): void {
      dispatch(
        batchActions([
          fieldActions.fill(field, id),
          fieldActions.openCell(id),
        ])
      );
    },

    onClickMarkCell(id: number): void {
      dispatch(fieldActions.markCell(id));
    },

    onClickQuickOpenCell(id: number): void {
      dispatch(fieldActions.quickOpen(id));
    },

    onChangeFieldWidth(value: number): void {
      dispatch(gameActions.updateWidth(value));
    },

    onChangeFieldHeight(value: number): void {
      dispatch(gameActions.updateHeight(value));
    },

    onChangeFieldMinesCount(value: number): void {
      dispatch(gameActions.updateMinesCount(value));
    },

    onFinishGame(isFail: boolean): void {
      dispatch(gameActions.finish(isFail));
    },

    onStartGame(field: FieldFillParams): void {
      dispatch(
        batchActions([
          fieldActions.fillEmpty(field),
          gameActions.start(),
        ])
      );
    },
  }),
)(Pure);
