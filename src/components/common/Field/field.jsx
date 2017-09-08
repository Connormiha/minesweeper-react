// @flow
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
                    this.props.field.map((item: CellType[], i) => {
                        return (
                            <div key={i}>
                                {
                                    item.map((cell: CellType, j) => {
                                        return (
                                            <span key={j}>
                                                {cell.isBomb ? '[x]' : '[ ]'}
                                            </span>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
