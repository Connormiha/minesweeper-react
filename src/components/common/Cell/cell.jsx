// @flow

import style from './cell.styl';
import bem from 'helpers/bem';

import type {CellType} from 'flux/types';

const b = bem(style, 'cell');

type PropsType = {
    cell: CellType,
    onClick: Function,
    id: number,
};

export default class Cell extends React.PureComponent<PropsType> {
    constructor(props: PropsType) {
        super(props);

        this.hanldeClick = this.hanldeClick.bind(this);
    }

    props: PropsType;
    hanldeClick: Function;

    hanldeClick() {
        this.props.onClick(this.props.id);
    }

    render() {
        const {isBomb, isOpened} = this.props.cell;

        return (
            <div
                className={
                    b('', {
                        open: isOpened,
                        close: !isOpened,
                        bomb: isOpened && isBomb,
                    })
                }
            />
        );
    }
}
