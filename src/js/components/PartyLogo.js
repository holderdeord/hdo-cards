import React, { Component } from 'react';

export default class PartyLogo extends Component {
    render() {
        if (!(this.props.url || this.props.slug)) {
            return null;
        }

        const url = this.props.url || `https://data.holderdeord.no/api/parties/${this.props.slug}/logo?version=medium`;

        return (
            <img
                src={url}
                alt={`Partilogo`}
                width="48px" />
        );
    }
}