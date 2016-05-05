import React, {Component} from 'react';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';

export default class CardStackIndex extends Component {
    state = {index: {stacks: []}};

    componentDidMount() {
        fetch('data/index.json')
            .then(res => res.ok ? res.json() : Promise.reject(`failed to fetch index: ${res.status}`))
            .then(index => this.setState({index}))
    }

    render() {
        return (
            <div className="card-stack-index row">
                {this.state.index.stacks.map(i => (
                    <div className="col-md-4" key={i.id}>
                        <Link to={`/stacks/${i.id}`}>
                            <div className="hdo-card">
                                <h2 className="hdo-card-header p-a-2">{i.title}</h2>
                                <p className="p-a-1">{i.description.slice(0, 100)}…</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        )
    }
}

