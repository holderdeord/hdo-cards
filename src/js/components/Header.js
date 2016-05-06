import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
// import SharingLinks from './SharingLinks';

export default class Header extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        return (
            <header className="container">
                <div className="row">
                    <div className="col-md-4">
                        <Link to="/">
                            <div className="hdo-logo">
                                <strong>Holder de ord</strong>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-4 text-xs-center fadeInDown">
                        <h1><mark>Kort</mark> om norsk politikk</h1>
                    </div>

                    <div className="col-md-3 col-md-offset-1 text-xs-right">
                        <input
                            type="search"
                            className="search"
                            tabIndex="1"
                            placeholder="Søk"
                            onChange={::this.handleChange}
                            value={this.props.query || ''}
                        />
                    </div>
                </div>
            </header>
        )
    }

    handleChange(e) {
        const obj = {
            pathname: '/',
            query: { q: e.target.value }
        };

        this.context.router.replace(obj);
    }
}


