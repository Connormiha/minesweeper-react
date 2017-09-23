// @flow

import style from './cell.styl';
import {bindMethods} from 'helpers/utils';
import bem from 'bem-css-modules';

import type {CellType} from 'flux/types.js.flow';

const b = bem(style);

type PropsType = {
    cell: CellType,
    onClick: (number) => void,
    onClickMark: (number) => void,
    onClickQuickOpen: (number) => void,
};

export default class Cell extends React.PureComponent<PropsType> {
    constructor(props: PropsType) {
        super(props);

        bindMethods(this, ['hanldeClick']);
    }

    props: PropsType;

    hanldeClick(e: Event) {
        e.preventDefault();
        const {isOpened, id} = this.props.cell;

        if (e.ctrlKey || e.altKey) {
            if (isOpened) {
                this.props.onClickQuickOpen(id);
            } else {
                this.props.onClickMark(id);
            }
        } else if (!isOpened) {
            this.props.onClick(id);
        }
    }

    render() {
        const {isBomb, isOpened, isFlag, isUnknown, aroundBombCount} = this.props.cell;

        const cssMods: any = {
            open: isOpened,
            close: !isOpened,
            bomb: isOpened && isBomb,
            flag: isFlag,
            question: isUnknown,
        };

        if (aroundBombCount && isOpened && !isBomb) {
            cssMods.count = aroundBombCount;
        }

        return (
            <div
                onClick={this.hanldeClick}
                className={b('', cssMods)}
            >
                {isOpened && !isBomb && aroundBombCount ? aroundBombCount : ''}
            </div>
        );
    }
}
