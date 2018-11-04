// @flow

import style from './cell.styl';
import React from 'react';
import bem from 'bem-css-modules';

import type {CellType} from 'flux/types';

const b = bem(style);

type PropsType = {|
    cell: CellType,
    isShowBomb: boolean,
|};

export default React.memo((props: PropsType) => {
    const {isBomb, isOpened, isDead, isFlag, isUnknown, aroundBombCount} = props.cell;
    const {isShowBomb} = props;

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
