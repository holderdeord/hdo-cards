import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import CardStack from './CardStack';

export default class CardStackIndex extends Component {
    state = {};

    componentDidMount() {
        fetch('https://data.holderdeord.no/api/issues')
            .then(res => res.ok ? res.json() : Promise.reject(`status: ${res.status}`))
            .then(data => this.setState({issues: data._embedded.issues}))
    }

    render() {
        if (!this.state.issues) {
            return null;
        }

        return (
            <div className="row">
                {this.state.issues.map(i => (
                    <div className="col-md-4" key={i.slug}>
                        <CardStack title={i.title} description={i.description} />
                    </div>
                ))}
            </div>
        )
    }
}

