import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { fetchJson, slugify } from '../utils';
import { Sticky } from 'react-sticky';
import { Link } from 'react-router';
import { AnchorLink, AnchorElement, ScrollPanel } from 'react-spy-scroll';

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
        const { pathname } = this.props.location;

        return (
            <div className="container">
                <div className="hdo-card card-stack">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="hdo-card-header p-a-2">
                                <h2>
                                    {data.title}
                                </h2>

                                <small className="text-muted">
                                    Publisert {moment(data.published).format('LL')}, sist oppdatert {moment(modification.date).format('LL')}
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4">
                            <Sticky>
                                <ul className="list-unstyled card-stack-nav p-x-1 p-y-1">
                                    {data.cards.map((c, i) => (
                                        <li key={i}>
                                            <AnchorLink href={`${slugify(c.title)}`} activeClass="strong">
                                                {i + 1}. {c.title}
                                            </AnchorLink>
                                        </li>
                                    ))}
                                </ul>
                            </Sticky>
                        </div>

                        <div className="col-lg-8 col-sm-12">
                            <div className="p-y-1">
                                {data.cards.map((c, i) => (
                                    <AnchorElement id={`${slugify(c.title)}`} container={document.body} key={i}>
                                        <Card {...c} index={i + 1} />
                                    </AnchorElement>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

