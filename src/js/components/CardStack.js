import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import moment from 'moment';

import Card from './Card';

export default class CardStack extends Component {
    state = { stack: null };

    componentWillMount() {
        const { params: { id } } = this.props;

        fetch(`https://files.holderdeord.no/gdrive/${id}.styled.json`)
            .then(res => res.ok ? res.json() : Promise.reject(new Error(`unable to fetch card stack ${id}: ${res.status} ${res.statusText} ${res.type}`)))
            .then(stack => this.setState({stack}));
    }

    render() {
        if (!this.state.stack) {
            return null;
        }

        const { stack: { data, modification } } = this.state;

        return (
            <div className="hdo-card">
                <div className="row">
                    <div className="col-md-12">
                        <div className="hdo-card-header p-a-2">
                            <h2>
                                {data.title}
                            </h2>

                            <small className="text-muted">Publisert {moment(data.published).format('LL')}, sist oppdatert {moment(modification.date).format('LL')}</small>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 p-a-2">
                        {data.cards.map((c, i) => <p key={i}>{i + 1}. {c.head}</p>)}
                    </div>

                    <div className="col-md-6 p-a-2">
                        {data.cards.map((c, i) => <Card key={i} {...c} index={i + 1} />)}
                    </div>
                </div>
            </div>
        );
    }
}

