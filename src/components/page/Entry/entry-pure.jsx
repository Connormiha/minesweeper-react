// @flow

import './entry.styl';

import React from 'react';

export default class PageEntryPure extends React.PureComponent {
    render() {
        return (
            <div className="test">
                Test
            </div>
        );
    }
}
