// @flow

import Field from 'components/common/Field';

import './entry.styl';

type PropsType = {
    field: any,
    onClickCell: (number) => void,
};

export default class PageEntryPure extends React.PureComponent<PropsType> {
    props: PropsType;

    render() {
        return (
            <div className="test">
                {'Test'}
                <Field
                    field={this.props.field}
                    onClickCell={this.props.onClickCell}
                />
            </div>
        );
    }
}
