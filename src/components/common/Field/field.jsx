// @flow

import Cell from 'components/common/Cell';
import bem from 'bem-css-modules';

import type {CellType, FieldType} from 'flux/types';

import style from './field.styl';

const b = bem(style);

type PropsType = {
    field: FieldType,
    onClickCell: (number) => void,
};

export default class Field extends React.PureComponent<PropsType> {
    props: PropsType;

    render() {
        const {onClickCell} = this.props;

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
