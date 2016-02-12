import React, {Component} from 'react';

import Card from './Card';

export default class CardStack extends Component {
    render() {
        return (
            <div className="hdo-card">
                <h2 className="hdo-card-header p-a-2">{this.props.title}</h2>
                <p className="p-a-1">{this.props.description.slice(0, 100)}…</p>
            </div>
        )
    }
}

