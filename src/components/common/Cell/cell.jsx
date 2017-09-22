// @flow

import style from './cell.styl';
import {bindMethods} from 'helpers/utils';
import bem from 'bem-css-modules';

import type {CellType} from 'flux/types.js.flow';

const b = bem(style);

type PropsType = {
    cell: CellType,
    onClick: (number) => void,
};

export default class Cell extends React.PureComponent<PropsType> {
    constructor(props: PropsType) {
        super(props);

        bindMethods(this, ['hanldeClick']);
    }

    props: PropsType;

    hanldeClick() {
        this.props.onClick(this.props.cell.id);
    }

    render() {
        const {isBomb, isOpened, isFlag, isUnknown, aroundBombCount} = this.props.cell;

        const cssMods: any = {
            open: isOpened,
            close: !isOpened,
            bomb: isOpened && isBomb,
            flag: isFlag,
            unknown: isUnknown,
        };

        if (aroundBombCount && isOpened && !isBomb) {
            cssMods.count = aroundBombCount;
        }

        return (
            <div
                onClick={isOpened ? null : this.hanldeClick}
                className={b('', cssMods)}
            >
                {isOpened && !isBomb && aroundBombCount ? aroundBombCount : ''}
            </div>
        );
    }
}
