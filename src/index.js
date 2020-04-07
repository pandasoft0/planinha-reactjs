import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';

import {ValorDescrito} from './valor';
import {ExtratoComp} from './extrato';

import './index.css';


class ValoresDoDia extends React.Component{
  constructor(props){
    super(props);
    console.log("Criando ValoresDoDia");

    this.state={
      dia: props.dia,
      lancamentos: props.lancamentos
    };
  }

  componentDidMount(){
    console.log("ValoresDoDia did mount")
  }

  render(){
    const {dia,lancamentos} = this.props;

    console.log("Renderizando ValoresDoDia (" + lancamentos.length + " elementos)");

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
      error: null,
      isLoaded: false,
      dia: null,
      lancamentos: [],
    }
  }

  componentDidMount(){
    fetch('http://localhost:8080/planinha/operacoes?mes=2015-04')
        .then(res => res.json())
        .then(
            (operacoes) => {
              var diasValores = 
                operacoes.map(
                  operacao => {
                    return {
                      dia: operacao.fato.dia,
                      valor: operacao.movimentacoes.map(m => m.valor).reduce((subt,v)=>subt+v)
                    }
                  }
                ) ;
              console.log(diasValores);
   
              this.setState({
                  lancamentos: diasValores,
                  isLoaded: true
              });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            }
        );
  }


  render(){
    const {dia, lancamentos} = this.state;
    console.log("Rendering " + lancamentos.length + " elements.")
    return (
      <IntlProvider locale="pt">
        <ValoresDoDia dia={dia} lancamentos={lancamentos}/>
      </IntlProvider>
      );
  }
}


ReactDOM.render(
  <IntlProvider locale="pt">
    <ExtratoComp conta="2" id="2015-03-01-31" />
  </IntlProvider>,
  document.getElementById('root')
);