// @flow

import Cell from 'components/common/Cell';
import bem from 'bem-css-modules';

import type {CellType, FieldType} from 'flux/types.js.flow';

import style from './field.styl';

const b = bem(style);

type PropsType = {
    field: FieldType,
    onClickCell: (number) => void,
    onClickMarkCell: (number) => void,
    onClickQuickOpenCell: (number) => void,
};

export default class Field extends React.PureComponent<PropsType> {
    props: PropsType;

    render() {
        const {onClickCell, onClickMarkCell, onClickQuickOpenCell} = this.props;

        return (
            <div className={b()}>
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
