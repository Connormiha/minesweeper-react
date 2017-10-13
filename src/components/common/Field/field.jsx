// @flow

import React from 'react';
import Cell from 'components/common/Cell';
import bem from 'bem-css-modules';

import type {CellType, FieldType} from 'flux/types.js.flow';

import style from './field.styl';

const b = bem(style);

type PropsType = {
    field: FieldType,
    isDead: boolean,
    onClickCell: (number) => void,
    onClickMarkCell: (number) => void,
    onClickQuickOpenCell: (number) => void,
};

const handleEvent = (e: SyntheticEvent<*>) => {
    e.preventDefault();
};

export default class Field extends React.PureComponent<PropsType> {
    props: PropsType;

    render() {
        const {isDead, onClickCell, onClickMarkCell, onClickQuickOpenCell} = this.props;

        return (
            <div
                className={b('', {locked: isDead})}
                onContextMenu={handleEvent}
            >
                {
                    this.props.field.map((item: CellType[], i) =>
                        (
                            <div
                                key={i}
                                className={b('row')}
                            >
                                {
                                    item.map((cell: CellType) =>
                                        (
                                            <Cell
                                                cell={cell}
                                                onClick={onClickCell}
                                                onClickMark={onClickMarkCell}
                                                onClickQuickOpen={onClickQuickOpenCell}
                                                isShowBomb={isDead}
                                                key={cell.id}
                                            />
                                        )
                                    )
                                }
                            </div>
                        )
                    )
                }
            </div>
        );
    }
}
