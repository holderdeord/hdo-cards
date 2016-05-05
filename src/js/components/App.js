import '../../styles/main.scss';
import 'babel-polyfill';

import React, { Component } from 'react';
import { Router, Route, hashHistory as history, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import moment from 'moment';

moment.locale('nb');

import Header from './Header';
import Footer from './Footer';
import CardStackIndex from './CardStackIndex';
import CardStack from './CardStack';

const NoMatch = (props) => <p className="lead text-xs-center">Siden ble ikke funnet.</p>;

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <main>
                    {this.props.children}
                </main>
                <Footer />
            </div>
        )
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
