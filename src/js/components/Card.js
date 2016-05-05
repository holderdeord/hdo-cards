import React, {Component} from 'react';
import Widget from './Widget';

export default class Card extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h3>{this.props.index}. {this.props.head}</h3>
                    {this.props.body.map(::this.renderBodyElement)}
                </div>

                <hr />
            </div>
        )
    }

    renderBodyElement(t, i) {
        switch (t.type) {
            case 'text':
                return <p key={i}>{t.value}</p>;
            case 'subhead':
                return <h5 key={i}>{t.value}</h5>;
            case 'widget':
                return <Widget key={i} {...t.value} />;
            default:
                console.log(`unknown type: ${t.type}`);
                return null;
        }
    }
}

