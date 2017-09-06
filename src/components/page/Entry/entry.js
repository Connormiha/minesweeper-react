// @flow

import {connect} from 'react-redux';
import Pure from './entry-pure';

export default connect(
    ({game}) => ({game})
)(Pure);
