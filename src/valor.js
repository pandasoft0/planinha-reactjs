import React from 'react';
import {Centavos} from './centavos'
  
class ValorDescrito extends React.Component{

    render(){
        return (
        <div className="planinha-valorDescrito row">
            <div className="col-9">{this.props.desc}</div> 
            <div className="col-3">
                <Centavos value={this.props.valor} style="currency" currency="BRL"/>    
            </div>
        </div>
        )
    }
}

export {ValorDescrito}
