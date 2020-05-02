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

const KEY_ENTER = 13;
const KEY_SPACE = 32;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const allowedKeys = new Set([KEY_ENTER, KEY_SPACE, KEY_DOWN, KEY_UP, KEY_LEFT, KEY_RIGHT]);

type PropsType = {
    field: FieldType;
    isDead: boolean;
    isWin: boolean;
    rowWidth: number;
    onClickCell: (number) => void;
    onClickMarkCell: (number) => void;
    onClickQuickOpenCell: (number) => void;
};

export default class Field extends React.PureComponent<PropsType> {
    _handleEvent: (e: React.MouseEvent<HTMLDivElement>) => void;
    _handleKeyPress: (e: KeyboardEvent) => void;
    _fieldRef: {current: null | HTMLElement};
    _isLockedEvents: boolean;
    _timer!: NodeJS.Timeout;

    constructor(props: PropsType) {
      super(props);
      this._handleEvent = this.handleEvent.bind(this);
      this._handleKeyPress = this.handleKeyPress.bind(this);
      this._isLockedEvents = false;
      this._fieldRef = React.createRef();
    }

    componentDidMount(): void {
      if (this._fieldRef.current) {
        this._fieldRef.current.addEventListener('keydown', this._handleKeyPress);
      }
    }

    componentWillUnmount(): void {
      if (this._fieldRef.current) {
        this._fieldRef.current.removeEventListener('keydown', this._handleKeyPress);
      }
    }

    lockEvents(): void {
      this._isLockedEvents = true;
    }

    unlockEvents(): void {
      this._isLockedEvents = false;
    }

    handleEvent(e: React.MouseEvent<HTMLDivElement>): void {
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

    hanldeClick(e: React.MouseEvent<HTMLDivElement>, id: number): void {
      this.openCellEvent(id, e.ctrlKey || e.altKey);
    }

    openCellEvent(id: number, isMetaKey: boolean): void {
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

    handleKeyPress(e: KeyboardEvent): void {
      const {keyCode} = e;

      if (!allowedKeys.has(keyCode)) {
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
      let nextId = -1;

      switch (keyCode) {
      case KEY_SPACE:
        this.handleContextMenu(id);
        break;

      case KEY_ENTER:
        this.openCellEvent(id, false);
        break;

      case KEY_LEFT:
        nextId = this.getPrevAvailableId(id - 1);
        break;

      case KEY_RIGHT:
        nextId = this.getNextAvailableId(id + 1);
        break;

      case KEY_UP:
        nextId = this.getPrevAvailableId(id - this.props.rowWidth);
        break;

      case KEY_DOWN:
        nextId = this.getNextAvailableId(id + this.props.rowWidth);
        break;
      }

      if (parent.children[nextId]) {
        (parent.children[nextId] as HTMLButtonElement).focus();
      }

      this._timer = setTimeout(() => this.unlockEvents(), 100);
    }

    hanldeDoubleClick(id: number): void {
      this.quickOpen(id);
    }

    handleContextMenu(id: number): void {
      if (this.getCell(id) & IS_OPENED_BIT_FLAG) {
        this.props.onClickQuickOpenCell(id);
      } else {
        this.props.onClickMarkCell(id);
      }
    }

    handleMouseUp(e: React.MouseEvent<HTMLDivElement>, id: number): void {
      if (e.nativeEvent.which === 2) {
        this.quickOpen(id);
      }
    }

    quickOpen(id: number): void {
      const cell = this.getCell(id);

      if ((cell & IS_OPENED_BIT_FLAG) && (cell >> 8) !== 0) {
        this.props.onClickQuickOpenCell(id);
      }
    }

    getCell(id: number): CellType {
      return this.props.field[id];
    }

    getNextAvailableId(id: number): number {
      while (id < this.props.field.length) {
        if (
          !(this.props.field[id] & IS_OPENED_BIT_FLAG) ||
                (this.props.field[id] >> 8) !== 0
        ) {
          break;
        }
        id++;
      }

      return id;
    }

    getPrevAvailableId(id: number): number {
      while (id >= 0) {
        if (
          !(this.props.field[id] & IS_OPENED_BIT_FLAG) ||
                (this.props.field[id] >> 8) !== 0
        ) {
          break;
        }
        id--;
      }

      return id;
    }

    renderCells(): React.ReactNode {
      const {field, isDead} = this.props;

      return Array.prototype.map.call(field, (cell: CellType, id: number) =>
        (
          <Cell
            cell={cell}
            isShowBomb={isDead}
            key={id}
          />
        )
      );
    }

    render(): React.ReactNode {
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
