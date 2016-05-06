import React, {Component} from 'react';
import { Link } from 'react-router';
import { fetchJson } from '../utils';
import moment from 'moment';

export default class CardStackIndex extends Component {
    state = {index: {stacks: []}};

    componentDidMount() {
        const url = process.env.LOCAL_INDEX ? 'data/index.json' : 'https://kort.holderdeord.no/data/index.json';

        fetchJson(url)
            .then(index => this.setState({index}))
    }

    render() {
        const query = (this.props.query || '').trim();

        const stacks = this.state.index.stacks
            .filter(s => s.title.toLowerCase().includes(query))
            .sort(
                (a, b) => moment(b.modification.date).valueOf() - moment(a.modification.date).valueOf()
            );

        return (
            <div className="container">
                <div className="card-stack-index row">
                    {stacks.length ? this.renderStacks(stacks) : <p className="lead text-xs-center p-a-3">Ingen kort funnet.</p>}
                </div>
            </div>
        )
    }

    renderStacks(stacks) {
        return stacks.map((i, idx) => (
            <div className="col-md-4" key={i.id + idx}>
                <Link to={`/stacks/${i.id}`}>
                    <div className="hdo-card">
                        <h2 className="hdo-card-header p-a-2">{i.title}</h2>
                        <p className="p-x-1">{i.description.slice(0, 100)}…</p>
                    </div>
                </Link>
            </div>
        ));
    }
}

