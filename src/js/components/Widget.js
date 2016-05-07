import React, { Component } from 'react';
import VoteWidget from './VoteWidget';
import PromisesWidget from './PromisesWidget';

export default class Widget extends Component {
    render() {
        let content = null;

        switch (this.props.type) {
            case 'vote':
                content = <VoteWidget {...this.props} />;
                break;
            case 'promises':
                content = <PromisesWidget {...this.props} />;
                break;
            default:
                console.error(`unknown widget type: ${JSON.stringify(this.props.type)}`);
        }

        return (
            <div className="widget">
                {content}
            </div>
        );
    }
}

