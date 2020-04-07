import React from 'react';
import {Centavos} from './centavos'
  
class ValorDescrito extends React.Component{

    render(){
        return (
        <div className="planinha-valorDescrito">
            <span>{this.props.desc}</span> 
            <span>
                <Centavos value={this.props.valor} style="currency" currency="BRL"/>    
            </span>
        </div>
        )
    }
}

export {ValorDescrito}
