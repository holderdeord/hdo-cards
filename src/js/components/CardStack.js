import React, {Component} from 'react';
import moment from 'moment';
import { fetchJson } from '../utils';

import Card from './Card';

export default class CardStack extends Component {
    state = { stack: null };

    componentWillMount() {
        const { params: { id } } = this.props;

        fetchJson(`https://files.holderdeord.no/gdrive/${id}.styled.json`)
            .then(stack => this.setState({stack}));
    }

    render() {
        if (!this.state.stack) {
            return null;
        }

        const { stack: { data, modification } } = this.state;

        return (
            <div className="container">
                <div className="hdo-card card-stack">
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
                        <div className="col-lg-4">
                            <div className="card-stack-nav p-x-2 p-y-1">
                                {data.cards.map((c, i) => <p key={i}>{i + 1}. {c.head}</p>)}
                            </div>
                        </div>

                        <div className="col-lg-8 col-sm-12">
                            <div className="p-y-1">
                                {data.cards.map((c, i) => <Card key={i} {...c} index={i + 1} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

