import React, {Component} from 'react';

import CardStackIndex from './CardStackIndex';
import CardStack from './CardStack';
import Editor from './Editor';

import qs from 'querystring';

export default class Main extends Component {
    render() {
        const { query: { type } } = this.props;

        return (
            <main>
                { type === 'editor' ? <Editor /> : <CardStackIndex /> }
            </main>
        )
    }
}

