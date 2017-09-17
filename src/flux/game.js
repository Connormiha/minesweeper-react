// @flow

import schema from 'reducers/schema';
import immutable from 'helpers/immutable';
import {GAME_SET_WIDTH} from 'flux/constants';
import type {GameType} from 'flux/types';

const getDefaultState = (): GameType =>
    schema.game;

export const updateWidth = (value: number) =>
    ({type: GAME_SET_WIDTH, value});

export default (state: GameType = getDefaultState(), {type, value}: any) => {
    switch (type) {
        case GAME_SET_WIDTH:
            return immutable.set(state, 'width', value);
    }

    return state;
};
