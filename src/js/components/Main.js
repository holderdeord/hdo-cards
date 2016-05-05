import 'babel-polyfill';

import React, {Component} from 'react';

import CardStackIndex from './CardStackIndex';
import CardStack from './CardStack';
import Editor from './Editor';

export default class Main extends Component {
    render() {
        return (
            <main>
                <CardStackIndex />
            </main>
        )
    }
}

