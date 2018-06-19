// @flow

import style from './cell.styl';
import React from 'react';
import bem from 'bem-css-modules';

import type {CellType} from 'flux/types.js.flow';

const b = bem(style);

type PropsType = {|
    cell: CellType,
    isShowBomb: boolean,
|};

export default class Cell extends React.PureComponent<PropsType> {
    render() {
        const {isBomb, isOpened, isDead, isFlag, isUnknown, aroundBombCount} = this.props.cell;
        const {isShowBomb} = this.props;

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
            <div
                className={b(cssMods)}
            >
                {isOpened && !isBomb && aroundBombCount ? aroundBombCount : ''}
            </div>
        );
    }
}
