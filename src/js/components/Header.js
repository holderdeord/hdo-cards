import React, { Component } from 'react';
import { Link } from 'react-router';
// import SharingLinks from './SharingLinks';

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="row">
                    <div className="col-md-2">
                        <Link to="/">
                            <div className="hdo-logo">
                                <strong>Holder de ord</strong>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-8 text-xs-center fadeInDown">
                        <h1><mark>Kort</mark> om norsk politikk</h1>
                    </div>

                    <div className="col-md-2 text-xs-right">
                        <input type="search" className="search" placeholder="Søk" />
                    </div>
                </div>
            </header>
        )
    }
}


