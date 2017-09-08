// @flow

import {connect} from 'react-redux';
import Pure from './entry-pure';

export default connect(
    ({game, field}) => ({game, field})
)(Pure);
