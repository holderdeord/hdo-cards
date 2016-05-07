import '../../styles/main.scss';
import 'babel-polyfill';

import React, { Component } from 'react';
import { Router, Route, hashHistory as history, IndexRoute } from 'react-router';
import { render } from 'react-dom';

import { StickyContainer, Sticky } from 'react-sticky';

import moment from 'moment';
moment.locale('nb');

import Header from './Header';
import Footer from './Footer';
import CardStackIndex from './CardStackIndex';
import CardStack from './CardStack';

const NoMatch = (props) => <p className="lead text-xs-center">Siden ble ikke funnet.</p>;

export default class App extends Component {
    render() {
        const query = this.props.location.query.q;

        return (
            <StickyContainer>
                <Header query={query} />

                <main>
                    {React.cloneElement(this.props.children, { query })}
                </main>

                <Footer />
            </StickyContainer>
        );
    }
}

render((
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={CardStackIndex} />

            <Route path="/stacks" component={CardStackIndex} />
            <Route path="/stacks/:id" component={CardStack}/>

            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
), document.getElementById('content'));
