// @flow

import {connect} from 'react-redux';
import Pure from './entry-pure';
import * as fieldActions from 'flux/field';

import type {Dispatch} from 'redux';

export default connect(
    ({game, field}) => ({game, field}),
    (dispatch: Dispatch<*>) => ({
        onClickCell(id: number) {
            dispatch(fieldActions.openCell(id));
        },
    }),
)(Pure);
