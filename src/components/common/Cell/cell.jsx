// @flow

import style from './cell.styl';
import React from 'react';
import bem from 'bem-css-modules';
import {
    IS_OPENED_BIT_FLAG,
    IS_BOMB_BIT_FLAG,
    IS_DEAD_BIT_FLAG,
    IS_FLAG_BIT_FLAG,
    IS_UNKNOWN_BIT_FLAG,
} from 'helpers/utils';

import type {CellType} from 'flux/types';

const b = bem(style);

type PropsType = {|
    cell: CellType,
    isShowBomb: boolean,
|};

export default React.memo((props: PropsType) => {
    const {cell, isShowBomb} = props;
    const isBomb = Boolean(cell & IS_BOMB_BIT_FLAG);
    const isOpened = Boolean(cell & IS_OPENED_BIT_FLAG);
    const isDead = Boolean(cell & IS_DEAD_BIT_FLAG);
    const isFlag = Boolean(cell & IS_FLAG_BIT_FLAG);
    const isUnknown = Boolean(cell & IS_UNKNOWN_BIT_FLAG);
    const aroundBombCount = cell >> 8;

    const cssMods: any = {
        open: isOpened || (isShowBomb && isBomb),
        close: !isOpened && (!isShowBomb || !isBomb),
        bomb: (isOpened || isShowBomb) && isBomb,
        dead: isDead,
        flag: isFlag && !isOpened,
        question: isUnknown && !isOpened,
    };

    if (aroundBombCount && isOpened && !isBomb) {
        cssMods.count = aroundBombCount;
    }

    return (
        <button
            type="button"
            className={b(cssMods)}
            disabled={isOpened && aroundBombCount === 0}
        >
            {isOpened && !isBomb && aroundBombCount ? aroundBombCount : ''}
        </button>
    );
});
