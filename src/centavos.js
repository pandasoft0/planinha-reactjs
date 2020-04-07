import React from 'react';
import {FormattedNumber} from 'react-intl';

class Centavos extends React.Component{

    render() {
        return (
            <FormattedNumber 
                value={this.props.value/100}
                style={this.props.style} 
                currency={this.props.currency}/>    
        );
    }
}

export {Centavos};