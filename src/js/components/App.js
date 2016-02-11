import qs from 'querystring';

import '../../styles/main.scss';

import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';


export default class App extends Component {
    componentWillMount() {
        this.setState({
            query: qs.parse(window.location.search.slice(1))
        })
    }

    render() {
        return (
            <div className="container">
                <Header />
                <Main {...this.state} />
                <Footer />
            </div>
        )
    }
}

render(<App />, document.getElementById('content'));