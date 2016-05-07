import React, {Component} from 'react';
import Widget from './Widget';

export default class Card extends Component {
    render() {
        return (
            <div className="hdo-card m-b-1 m-r-1 m-t-0">
                <div className="p-x-2 p-y-1" style={{borderBottom: '1px solid #eee'}}>
                    <h4>{this.props.index}. {this.props.title}</h4>
                </div>

                <div className="p-a-2">
                    {this.props.body.map(::this.renderBodyElement)}
                </div>



            </div>
        )
    }

    renderBodyElement(t, i) {
        switch (t.type) {
            case 'text':
                return <p key={i}>{t.value}</p>;
            case 'subtitle':
                return <h5 key={i}>{t.value}</h5>;
            case 'widget':
                return <Widget key={i} {...t.value} />;
            default:
                console.log(`unknown type: ${t.type}`);
                return null;
        }
    }
}

