// @flow

import {connect} from 'react-redux';
import Pure from './entry-pure';
import * as fieldActions from 'flux/field';
import * as gameActions from 'flux/game';

import type {Dispatch} from 'redux';

export default connect(
    ({game, field}) => ({game, field}),
    (dispatch: Dispatch<*>) => ({
        onClickCell(id: number) {
            dispatch(fieldActions.openCell(id));
        },

        onChangeFieldWidth(value: number) {
            dispatch(gameActions.updateWidth(value));
        },
    }),
)(Pure);
