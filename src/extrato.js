import React from 'react';
import { ValorDescrito } from './valor';


class ItemsDia extends React.Component{
    render(){
        return this.props.items.map(
            item => <ValorDescrito desc={item.desc} valor={item.valor}/>
        );
    }
}

class ItemsExtrato extends React.Component {
    render(){
        return this.props.items.map(
            (item => (
                <div className="planinha-itemExtrato">
                    <div>{item.dia}</div>
                    <ItemsDia items={item.valoresDoDia}/>
                </div>
            )
        )); 
    }
}

export class ExtratoComp extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            extrato: null,
            loaded: false,
            error: null
        };
    }

    render(){
        const {extrato, extratosDiarios, loaded, error} = this.state;
        return loaded
                ? error !== null
                    ? this.renderError(error) 
                    : this.renderExtrato(extrato, extratosDiarios) 
                : this.renderWait()
        ;
    }

    renderWait(){
        return <span>Loading...</span>;
    }

    renderError(error){
        return <span>{error}</span>;
    }

    renderExtrato(extrato,extratosDiarios){
        return (
            <div className="planinha-extrato">
                <h1>{extrato.conta.nome}</h1>
                <ValorDescrito desc="Saldo Anterior" valor={extrato.saldoAnterior}/>
                <ItemsExtrato items={extratosDiarios}/>
            </div>
        );
    }

    salvaErro(error){
        this.setState({
            loaded: true,
            error: error
        });
    }

    salvaExtrato(extrato){

        const extratosDiarios = [];

        let ultimoDia = null;
        let valoresDoDia = null;

        extrato.items.forEach(item => {
            if(ultimoDia !== item.fato.dia){
                ultimoDia = item.fato.dia;
                valoresDoDia = [];
                extratosDiarios.push({
                    dia: ultimoDia,
                    valoresDoDia: valoresDoDia
                });
            }

            valoresDoDia.push({
                desc: item.fato.descricao,
                valor: item.valor
            });
        });

        this.setState({
            loaded: true,
            extrato: extrato,
            extratosDiarios: extratosDiarios
        });
    }

    componentDidMount(){
        fetch('http://localhost:8080/planinha/contas/' + this.props.conta + '/extratos/' + this.props.id)
        .then(res => res.json())
        .then(
            e => this.salvaExtrato(e),
            err => this.salvaErro(err)
        );
    }

}