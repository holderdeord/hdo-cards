import React, { Component } from 'react';
import { fetchJson } from '../utils';

export default class RelatedServices extends Component {
    state = { services: [] };

    componentWillMount() {
        const service = window.location.host.includes('localhost') ? 'local' : 'enighet';

        fetchJson(`https://files.holderdeord.no/data/hdo/services.json?service=${service}`)
            .then(services => this.setState({services}));
    }

    render() {
        debugger
        const services = this.state.services.filter(s =>
            s.enabled &&
                s.url.indexOf('enighet.holderdeord.no') === -1 &&
                s.title.indexOf('Løftedatabasen') === -1
        );

        if (!services.length) {
            return null;
        }

        return (
            <div className="other-services hdo-card">
                <div className="hdo-card-header text-xs-center">
                    <h3>Andre tjenester fra Holder de ord</h3>
                </div>

                <div className="row no-gutters text-xs-center">
                    {services.map(service => (
                        <div className="col-md-6 service" key={service.title}>
                            <a href={service.url}>
                                <div className="img" style={service.style || {backgroundImage: `url(${service.img})`}} />

                                <div className="p-a-2">
                                    <h4>{service.title}</h4>

                                    <p className="lead">{service.description}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}