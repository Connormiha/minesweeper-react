// @flow

import style from './cell.styl';
import {bindMethods} from 'helpers/utils';
import bem from 'bem-css-modules';

import type {CellType} from 'flux/types.js.flow';

const b = bem(style);

type PropsType = {
    cell: CellType,
    isShowBomb: boolean,
    onClick: (number) => void,
    onClickMark: (number) => void,
    onClickQuickOpen: (number) => void,
};

export default class Cell extends React.PureComponent<PropsType> {
    constructor(props: PropsType) {
        super(props);

        bindMethods(this, ['hanldeClick', 'handleContextMenu', 'hanldeDoubleClick']);
    }

    props: PropsType;

    hanldeClick(e: Event) {
        e.preventDefault();
        const {
            cell: {isOpened, isFlag, isUnknown, id},
            onClick, onClickMark, onClickQuickOpen,
        } = this.props;

        if (e.ctrlKey || e.altKey) {
            if (isOpened) {
                onClickQuickOpen(id);
            } else {
                onClickMark(id);
            }
        } else if (!isOpened && !isFlag && !isUnknown) {
            onClick(id);
        }
    }

    hanldeDoubleClick(e: Event) {
        e.preventDefault();
        const {
            cell: {isOpened, aroundBombCount, id},
            onClickQuickOpen,
        } = this.props;

        if (isOpened && aroundBombCount) {
            onClickQuickOpen(id);
        }
    }

    handleContextMenu(e: Event) {
        e.preventDefault();

        const {cell: {isOpened, id}, onClickQuickOpen, onClickMark} = this.props;

        if (isOpened) {
            onClickQuickOpen(id);
        } else {
            onClickMark(id);
        }
    }

    render() {
        const {isBomb, isOpened, isDead, isFlag, isUnknown, aroundBombCount} = this.props.cell;
        const {isShowBomb} = this.props;

        const cssMods: any = {
            open: isOpened || (isShowBomb && isBomb),
            close: !isOpened && (!isShowBomb || !isBomb),
            bomb: (isOpened || isShowBomb) && isBomb,
            dead: isDead,
            flag: isFlag,
            question: isUnknown,
        };

        if (aroundBombCount && isOpened && !isBomb) {
            cssMods.count = aroundBombCount;
        }

        return (
            <div
                onClick={isShowBomb ? null : this.hanldeClick}
                onContextMenu={isShowBomb ? null : this.handleContextMenu}
                onDoubleClick={isShowBomb ? null : this.hanldeDoubleClick}
                className={b('', cssMods)}
            >
                {isOpened && !isBomb && aroundBombCount ? aroundBombCount : ''}
            </div>
        );
    }
}
