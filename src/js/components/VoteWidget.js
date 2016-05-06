import React, { Component } from 'react';
import { fetchJson } from '../utils';
import moment from 'moment';

const keyTitles = {
    for: 'For',
    against: 'Mot',
    absent: 'Fraværende'
}

export default class VoteWidget extends Component {
    state = {};

    componentWillMount() {
        if (this.props.id) {
            fetchJson(`https://data.holderdeord.no/api/votes/${this.props.id}`)
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
                <div className="row">
                    <div className="col-md-12">
                        <h5>
                            {vote.subject}
                        </h5>

                        <small className="text-muted pull-right">
                            {moment(vote.time).format('LL')}
                        </small>
                    </div>
                </div>

                <div className="row">
                    {groupKeys.map(key => (
                        <div key={key} className={`col-md-${colSize} text-xs-center`}>
                            <p>{keyTitles[key]}</p>

                            {vote.counts.groups[key].map(p => (
                                <img key={p.slug}
                                    src={`https://data.holderdeord.no/api/parties/${p.slug}/logo?version=medium`}
                                    alt={`${p.name}s logo`}
                                    width="48px" />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
