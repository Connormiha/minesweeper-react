// @flow

import schema from 'reducers/schema';

import {
    GAME_SET_WIDTH, GAME_SET_HEIGHT, GAME_SET_MINES_COUNT, GAME_START,
    GAME_RESET, GAME_FINISH,
} from 'flux/constants';
import type {GameType} from 'flux/types';

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

export const finish = (isFail: boolean) =>
    ({type: GAME_FINISH, isFail});

export const reset = () =>
    ({type: GAME_RESET});

export default (state: GameType = getDefaultState(), {type, value, isFail}: any) => {
    switch (type) {
        case GAME_SET_WIDTH:
            return {...state, width: value};

        case GAME_SET_HEIGHT:
            return {...state, height: value};

        case GAME_SET_MINES_COUNT:
            return {...state, minesCount: value};

        case GAME_RESET:
            return {...state, state: 'not-started'};

        case GAME_FINISH:
            return {...state, state: isFail ? 'fail' : 'win'};

        case GAME_START:
            return {...state, state: 'in-progress'};
    }

    return state;
};
