// @flow

import React from 'react';
import Cell from 'components/common/Cell';
import bem from 'bem-css-modules';
import {
    IS_OPENED_BIT_FLAG,
    IS_FLAG_BIT_FLAG,
    IS_UNKNOWN_BIT_FLAG,
} from 'helpers/utils';

import type {CellType, FieldType} from 'flux/types';

import style from './field.styl';

const b = bem(style);

type PropsType = {|
    field: FieldType,
    isDead: boolean,
    isWin: boolean,
    rowWidth: number,
    onClickCell: (number) => void,
    onClickMarkCell: (number) => void,
    onClickQuickOpenCell: (number) => void,
|};

export default class Field extends React.PureComponent<PropsType> {
    _handleEvent: (e: SyntheticMouseEvent<HTMLDivElement>) => void;
    _handleKeyPress: (e: KeyboardEvent) => void;
    _fieldRef: {current: null | HTMLElement};
    _isLockedEvents: boolean;
    _timer: TimeoutID;

    constructor(props: PropsType) {
        super(props);
        this._handleEvent = this.handleEvent.bind(this);
        this._handleKeyPress = this.handleKeyPress.bind(this);
        this._isLockedEvents = false;
        this._fieldRef = React.createRef();
    }

    componentDidMount() {
        if (this._fieldRef.current) {
            this._fieldRef.current.addEventListener('keypress', this._handleKeyPress);
        }
    }

    componentWillUnmount() {
        if (this._fieldRef.current) {
            this._fieldRef.current.removeEventListener('keypress', this._handleKeyPress);
        }
    }

    lockEvents() {
        this._isLockedEvents = true;
    }

    unlockEvents() {
        this._isLockedEvents = false;
    }

    handleEvent(e: SyntheticMouseEvent<HTMLDivElement>) {
        e.preventDefault();
        if (this._isLockedEvents) {
            return;
        }

        const current = e.target;

        if (!(current instanceof HTMLButtonElement)) {
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
        this.openCellEvent(id, e.ctrlKey || e.altKey);
    }

    openCellEvent(id: number, isMetaKey: boolean) {
        const {
            onClickCell, onClickMarkCell, onClickQuickOpenCell,
        } = this.props;
        const cell = this.getCell(id);
        const isOpened = Boolean(cell & IS_OPENED_BIT_FLAG);
        const isFlag = Boolean(cell & IS_FLAG_BIT_FLAG);
        const isUnknown = Boolean(cell & IS_UNKNOWN_BIT_FLAG);

        if (isMetaKey) {
            if (isOpened) {
                onClickQuickOpenCell(id);
            } else {
                onClickMarkCell(id);
            }
        } else if (!isOpened && !isFlag && !isUnknown) {
            onClickCell(id);
        }
    }

    handleKeyPress(e: KeyboardEvent) {
        const {keyCode} = e;
        if (keyCode !== 32 && keyCode !== 13) {
            return;
        }

        const current = document.activeElement;

        if (!(current instanceof HTMLButtonElement)) {
            return;
        }

        const parent = current.parentElement;

        if (!parent) {
            return;
        }

        e.preventDefault();
        this.lockEvents();
        clearTimeout(this._timer);

        const id = Array.prototype.indexOf.call(parent.children, current);

        if (keyCode === 32) {
            this.handleContextMenu(id);
        } else {
            this.openCellEvent(id, false);
        }

        this._timer = setTimeout(() => this.unlockEvents(), 100);
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
        const cell = this.getCell(id);

        if ((cell & IS_OPENED_BIT_FLAG) && (cell >> 8) !== 0) {
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
        const {rowWidth, isDead, isWin} = this.props;

        return (
            <section
                className={b({locked: isDead || isWin})}
                onClick={this._handleEvent}
                onContextMenu={this._handleEvent}
                onDoubleClick={this._handleEvent}
                onMouseUp={this._handleEvent}
                style={{width: `${rowWidth * 34}px`}}
                ref={this._fieldRef}
            >
                {this.renderCells()}
            </section>
        );
    }
}
