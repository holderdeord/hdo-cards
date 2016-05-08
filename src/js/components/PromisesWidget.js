import React, { Component } from 'react';
import { fetchHdoApi } from '../utils';
import PartyLogo from './PartyLogo';
import { uniq } from 'lodash';

export default class PromisesWidget extends Component {
    state = { promises: [] };

    componentWillMount() {
        if (this.props.ids) {
            fetchHdoApi(`promises?ids=${encodeURIComponent(this.props.ids)}`)
                .then(res => this.setState({ promises: res._embedded.promises }))
        }
    }

    render() {
        const partiesByPromisorName = {};
        const promisesByPromisorName = {};

        this.state.promises.forEach(promise => {
            const pn = promise.promisor_name;

            partiesByPromisorName[pn] = partiesByPromisorName[pn] || promise._links.parties;
            promisesByPromisorName[pn] = promisesByPromisorName[pn] || [];

            promisesByPromisorName[pn].push(promise);
        });

        const sources = uniq(this.state.promises.map(p => `${p.source} ${p.parliament_period_name}`));

        return (
            <div className="promise-widget">
                {Object.keys(promisesByPromisorName).sort().map(pn => (
                    <div className="row" key={pn}>
                        <div className="col-md-12">
                            <h5>
                                <span className="p-r-1">
                                    {partiesByPromisorName[pn].map(e => <PartyLogo key={e.slug} slug={e.slug} />)}
                                </span>

                                {pn}
                            </h5>

                            <ul>
                                {promisesByPromisorName[pn].map((promise, i) => (
                                    <li key={promise._links.self.href}>
                                        {promise.body} ({promise.parliament_period_name})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}

                <div className="row">
                    <div className="col-xs-7">
                        <small>Kilder: {sources.join(', ')}</small>
                    </div>

                    <div className="col-xs-5 text-xs-right">
                        <small>Søk i hele <a href="https://data.holderdeord.no/promises">løftedatabasen</a></small>
                    </div>
                </div>
            </div>
        );
    }
}