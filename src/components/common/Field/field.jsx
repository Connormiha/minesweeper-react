// @flow

import React from 'react';
import Cell from 'components/common/Cell';
import bem from 'bem-css-modules';

import type {CellType, FieldType} from 'flux/types';

import style from './field.styl';

const b = bem(style);

type PropsType = {|
    field: FieldType,
    isDead: boolean,
    rowWidth: number,
    onClickCell: (number) => void,
    onClickMarkCell: (number) => void,
    onClickQuickOpenCell: (number) => void,
|};

export default class Field extends React.PureComponent<PropsType> {
    _handleEvent: (e: SyntheticMouseEvent<HTMLDivElement>) => void;

    constructor(props: PropsType) {
        super(props);
        this._handleEvent = this.handleEvent.bind(this);
    }

    handleEvent(e: SyntheticMouseEvent<HTMLDivElement>) {
        e.preventDefault();
        const current = e.target;

        if (!(current instanceof HTMLDivElement)) {
            return;
        }

        const parent = current.parentElement;

        if (!parent) {
            return;
        }

        const id = Array.prototype.indexOf.call(parent.children, current);

        switch (e.type) {
            case 'click':
                this.hanldeClick(e, id);
                break;
            case 'dblclick':
                this.hanldeDoubleClick(id);
                break;
            case 'contextmenu':
                this.handleContextMenu(id);
                break;
            case 'mouseup':
                this.handleMouseUp(e, id);
                break;
        }
    }

    hanldeClick(e: SyntheticMouseEvent<HTMLDivElement>, id: number) {
        const {
            onClickCell, onClickMarkCell, onClickQuickOpenCell,
        } = this.props;
        const {isOpened, isFlag, isUnknown} = this.getCell(id);

        if (e.ctrlKey || e.altKey) {
            if (isOpened) {
                onClickQuickOpenCell(id);
            } else {
                onClickMarkCell(id);
            }
        } else if (!isOpened && !isFlag && !isUnknown) {
            onClickCell(id);
        }
    }

    hanldeDoubleClick(id: number) {
        this.quickOpen(id);
    }

    handleContextMenu(id: number) {
        if (this.getCell(id).isOpened) {
            this.props.onClickQuickOpenCell(id);
        } else {
            this.props.onClickMarkCell(id);
        }
    }

    handleMouseUp(e: SyntheticMouseEvent<HTMLDivElement>, id: number) {
        // $FlowFixMe
        if (e.nativeEvent.which === 2) {
            this.quickOpen(id);
        }
    }

    quickOpen(id: number) {
        const {isOpened, aroundBombCount} = this.getCell(id);

        if (isOpened && aroundBombCount) {
            this.props.onClickQuickOpenCell(id);
        }
    }

    getCell(id: number): Cell {
        return this.props.field[id];
    }

    renderCells() {
        const {field, isDead} = this.props;

        return field.map((cell: CellType, id: number) =>
            (
                <Cell
                    cell={cell}
                    isShowBomb={isDead}
                    key={id}
                />
            )
        );
    }

    render() {
        const {rowWidth, isDead} = this.props;

        return (
            <section
                className={b({locked: isDead})}
                onClick={this._handleEvent}
                onContextMenu={this._handleEvent}
                onDoubleClick={this._handleEvent}
                onMouseUp={this._handleEvent}
                style={{width: `${rowWidth * 34}px`}}
            >
                {this.renderCells()}
            </section>
        );
    }
}
