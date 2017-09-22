// @flow

import {connect} from 'react-redux';
import Pure from './entry-pure';
import * as fieldActions from 'flux/field';
import * as gameActions from 'flux/game';
import {batchActions} from 'redux-batched-actions';

import type {Dispatch} from 'redux';
import type {FieldFillParams} from 'flux/types.js.flow';

export default connect(
    ({game, field}) => ({game, field}),
    (dispatch: Dispatch<*>) => ({
        onClickCell(id: number) {
            dispatch(fieldActions.openCell(id));
        },

        onChangeFieldWidth(value: number) {
            dispatch(gameActions.updateWidth(value));
        },

        onChangeFieldHeight(value: number) {
            dispatch(gameActions.updateHeight(value));
        },

        onChangeFieldMinesCount(value: number) {
            dispatch(gameActions.updateMinesCount(value));
        },

        onStartGame(field: FieldFillParams) {
            dispatch(
                batchActions([
                    fieldActions.fill(field),
                    gameActions.start(),
                ])
            );
        },
    }),
)(Pure);
