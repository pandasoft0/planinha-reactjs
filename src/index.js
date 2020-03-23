import React from 'react';
import ReactDOM from 'react-dom';
import {FormattedNumber,IntlProvider} from 'react-intl';


import './index.css';

class Valor extends Number{
  constructor(centavos){
    super(centavos/100);
    this.rawValue = centavos;
  }
}

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

class ValoresDoDia extends React.Component{
  constructor(props){
    super(props);

    this.state={
      dia: props.dia,
      lancamentos: props.lancamentos
    };
  }

  render(){
    const {dia,lancamentos} = this.state;

    return (
      <div>
        <div>{dia}</div>
        {lancamentos.map(
          l => 
            <ValorDescrito dia={l.desc} valor={l.valor}/>
        )}
      </div>
    );
  }


}


// ========================================
class Planinha extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      dia: '2020-03-01',
      lancamentos: [
        {desc:'Almoço',valor:new Valor(1234)},
        {desc:'Ônibus',valor:new Valor(420)},
      ]
    }
  }

  render(){
    const {dia, lancamentos} = this.state;
    return (
      <IntlProvider locale="pt">
        <ValoresDoDia dia={dia} lancamentos={lancamentos}/>
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