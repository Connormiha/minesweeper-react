// @flow

import Cell from 'components/common/Cell';

import type {CellType, FieldType} from 'flux/types';

type PropsType = {
    field: FieldType,
};

export default class Field extends React.PureComponent<PropsType> {
    props: PropsType;

    render() {
        return (
            <div>
                {
                    this.props.field.map((item: CellType[], i) =>
                        (
                            <div key={i}>
                                {
                                    item.map((cell: CellType) =>
                                        (
                                            <Cell
                                                cell={cell}
                                                onClick={Function}
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
