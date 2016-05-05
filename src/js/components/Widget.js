import React, { Component } from 'react';
import { fetchJson } from '../utils';
import moment from 'moment';

export default class Widget extends Component {
    render() {
        let content = null;

        switch (this.props.type) {
            case 'vote':
                content = <VoteWidget {...this.props} />;
            default:
                console.error(`unknown widget type: ${this.props.type}`);
        }

        return (
            <div className="widget">
                {content}
            </div>
        );
    }
}

class VoteWidget extends Component {
    state = {};

    componentWillMount() {
        if (this.props.id) {
            fetchJson(`https://www.holderdeord.no/api/votes/${this.props.id}`)
                .then(data => this.setState({data}))
            }

    }

    render() {
        if (!this.state.data) {
            return null;
        }

        return (
            <div>
                <p className="lead">Her kommer en widget med info om avstemningen {this.state.data.subject} fra {moment(this.state.data.time).format('LL')}.</p>
                {/*<pre>{JSON.stringify(this.state.data, null, 2)}</pre>*/}
            </div>
        )
    }
}