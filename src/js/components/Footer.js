import React, { Component } from 'react';
import RelatedServices from './RelatedServices';

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div>
                    <a href="https://www.holderdeord.no/">
                        <div className="hdo-logo" />
                    </a>

                    <h4>Holder de ord &copy; {new Date().getFullYear()}</h4>

                    <div>
                        <small>
                            <div>Kildekode på <a href="https://github.com/holderdeord/hdo-cards">GitHub</a> lisensiert under <a href="http://opensource.org/licenses/BSD-3-Clause">BSD</a>.</div>
                            <div>Spørsmål? Ta <a href="mailto:kontakt@holderdeord.no" style={{textDecoration: 'underline'}}>kontakt</a>.</div>
                        </small>
                    </div>

                    <p className="links">
                        <a href="https://www.holderdeord.no/" alt="Holder de ord">holderdeord.no</a>
                        &nbsp;&middot;&nbsp;
                        <a href="https://twitter.com/holderdeord/" alt="Holder de ord på Twitter">@holderdeord</a>
                    </p>
                </div>
            </footer>
        );
    }
}

