// @flow

import Field from 'components/common/Field';
import Settings from 'components/common/Settings';

import './entry.styl';

import type {FieldType, GameType} from 'flux/types';

type PropsType = {
    field: FieldType,
    game: GameType,
    onClickCell: (number) => void,
    onChangeFieldWidth: (number) => void,
};

export default class PageEntryPure extends React.PureComponent<PropsType> {
    props: PropsType;

    render() {
        const {game, onChangeFieldWidth} = this.props;

        return (
            <div className="test">
                <Settings
                    game={game}
                    onChangeFieldWidth={onChangeFieldWidth}
                />
                <Field
                    field={this.props.field}
                    onClickCell={this.props.onClickCell}
                />
            </div>
        );
    }
}
