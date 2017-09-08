// @flow

import Field from 'components/common/Field';

import './entry.styl';

type PropsType = {
    field: any,
};

export default class PageEntryPure extends React.PureComponent<PropsType> {
    props: PropsType;

    render() {
        return (
            <div className="test">
                Test
                <Field field={this.props.field} />
            </div>
        );
    }
}
