import React, { Component } from 'react';
import { fetchHdoApi } from '../utils';
import moment from 'moment';

import PartyLogo from './PartyLogo';

const keyTitles = {
    for: 'For',
    against: 'Mot',
    absent: 'Fraværende'
}

export default class VoteWidget extends Component {
    state = {};

    componentWillMount() {
        if (this.props.id) {
            fetchHdoApi(`votes/${this.props.id}`)
                .then(vote => this.setState({vote}))
        }
    }

    render() {
        if (!this.state.vote) {
            return null;
        }

        const { vote } = this.state;

        const groupKeys = Object.keys(vote.counts.groups);
        const colSize = 12 / groupKeys.length;

        return (
            <div className="vote-widget">
                <div className="row vote-header">
                    <div className="col-md-12">
                        <h5>
                            {vote.subject}
                        </h5>

                        <small className="text-muted pull-right">
                            {moment(vote.time).format('LL')}. {vote.enacted ? 'Vedtatt' : 'Ikke vedtatt'}.
                        </small>
                    </div>
                </div>

                <div className="row">
                    {groupKeys.map(key => (
                        <div key={key} className={`col-md-${colSize} text-xs-center`}>
                            <p>{keyTitles[key]}</p>

                            {vote.counts.groups[key].map(p => (
                                <PartyLogo key={p.slug} slug={p.slug} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
