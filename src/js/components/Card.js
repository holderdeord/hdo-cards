import React, { Component } from 'react';
import Widget from './Widget';
import { slugify, renderText } from '../utils';
import cn from 'classnames';

export default class Card extends Component {
    state = { expanded: false }

    render() {
        return (
            <div id={slugify(this.props.title)} className="hdo-card">
                <div className="p-x-2 p-y-1" style={{borderBottom: '1px solid #eee'}}>
                    <h4>{this.props.index}. {renderText(this.props.title)}</h4>
                </div>

                <div className="p-a-2 hidden-sm-down">
                    {this.props.body ? this.props.body.map(::this.renderBodyElement) : null}
                </div>

                <div className="p-a-1 hidden-md-up">
                    <div className="read-more" onClick={::this.expand}>
                        <div className={cn({'read-more-text': !this.state.expanded})}>
                            {this.props.body ? this.props.body.map(::this.renderBodyElement) : null}
                        </div>

                        {this.state.expanded ? null : <div className="read-more-link">Les mer</div>}
                    </div>
                </div>
            </div>
        )
    }

    renderBodyElement(t, i) {
        switch (t.type) {
            case 'text':
                return <p key={i}>{renderText(t.value)}</p>;
            case 'subtitle':
                return <h5 key={i}>{renderText(t.value)}</h5>;
            case 'widget':
                return <Widget key={i} {...t.value} />;
            default:
                console.log(`unknown type: ${t.type}`);
                return null;
        }
    }

    expand() {
        this.setState({expanded: true});
    }

}

