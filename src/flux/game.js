// @flow

import schema from 'reducers/schema';
import immutable from 'helpers/immutable';
import {
    GAME_SET_WIDTH, GAME_SET_HEIGHT, GAME_SET_MINES_COUNT, GAME_START,
} from 'flux/constants';
import type {GameType} from 'flux/types.js.flow';

const getDefaultState = (): GameType =>
    schema.game;

export const updateWidth = (value: number) =>
    ({type: GAME_SET_WIDTH, value});

export const updateHeight = (value: number) =>
    ({type: GAME_SET_HEIGHT, value});

export const updateMinesCount = (value: number) =>
    ({type: GAME_SET_MINES_COUNT, value});

export const start = () =>
    ({type: GAME_START});

export default (state: GameType = getDefaultState(), {type, value}: any) => {
    switch (type) {
        case GAME_SET_WIDTH:
            return immutable.set(state, 'width', value);

        case GAME_SET_HEIGHT:
            return immutable.set(state, 'height', value);

        case GAME_SET_MINES_COUNT:
            return immutable.set(state, 'minesCount', value);

        // case GAME_START:
        //     return immutable.set(state, 'minesCount', value);
    }

    return state;
};
