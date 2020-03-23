import React from 'react';
import ReactDOM from 'react-dom';
import {FormattedNumber,IntlProvider} from 'react-intl';


import './index.css';

class ValorDescrito extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      desc: props.desc,
      valor: props.valor
    };
  }

  render(){
    return (
      <div>
        <span>{this.state.desc}</span> 
        <span>
          <FormattedNumber value={this.state.valor} style="currency" currency="BRL"/> 
        </span>
      </div>
    )
  }
}




// ========================================
class Planinha extends React.Component{

  render(){
    return (
      <IntlProvider locale="pt">
        <ValorDescrito desc="Almoço" valor="123"/>
      </IntlProvider>
      );
  }
}

ReactDOM.render(
  <IntlProvider locale="pt">
    <Planinha/>
  </IntlProvider>,
  document.getElementById('root')
);