// @flow

import style from './cell.styl';
import bem from 'bem-css-modules';

import type {CellType} from 'flux/types';

const b = bem(style);

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
        this.props.onClick(this.props.cell.id);
    }

    render() {
        const {isBomb, isOpened, aroundBombCount} = this.props.cell;

        return (
            <div
                onClick={isOpened ? null : this.hanldeClick}
                className={
                    b('', {
                        open: isOpened,
                        close: !isOpened,
                        bomb: isOpened && isBomb,
                    })
                }
            >
                {isOpened && aroundBombCount ? aroundBombCount : ''}
            </div>
        );
    }
}
