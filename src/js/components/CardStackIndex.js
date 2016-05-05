import React, {Component} from 'react';
import { Link } from 'react-router';
import { fetchJson } from '../utils';

export default class CardStackIndex extends Component {
    state = {index: {stacks: []}};

    componentDidMount() {
        fetchJson('data/index.json')
            .then(index => this.setState({index}))
    }

    render() {
        const stacks = this.state.index.stacks.sort(
            (a, b) => moment(a.modification.date).valueOf() - moment(b.modification.date).valueOf()
        );

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

