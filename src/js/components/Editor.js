import React, { Component } from 'react';
import Markdown from 'react-markdown';

export default class Editor extends Component {
    state = {text: ''};

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <textarea
                        value={this.state.text}
                        onChange={(e) => this.setState({text: e.target.value})}
                        style={{width: "100%"}} />
                </div>

                <div className="col-md-6">
                    <Markdown source={this.state.text} allowNode={::this.allowNode} />
                </div>
            </div>
        );
    }

    allowNode(node) {
        console.log(node);
        return true;
    }
}