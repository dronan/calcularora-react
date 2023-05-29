import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0', // valor que aparece no display
    clearDisplay: false, // indica se o display precisa ser limpo
    operation: null, // operação que está sendo executada
    values: [0, 0], // valores que serão utilizados na operação
    current: 0 // indica qual dos valores está sendo manipulado
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory () {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            // processa a operação
            const equals = operation === '='
            const currentOperation = this.state.operation.replace('X', '*')
            // clona o array de valores
            const values = [...this.state.values]
            
            try {
                // executa a operação e atribui o resultado ao primeiro valor
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)                
            }
            catch(e) {
                // se houver erro, atribui o primeiro valor ao resultado
                values[0] = this.state.values[0]
            }

            values[1] = 0 // zera o segundo valor
            this.setState({
                displayValue: values[0], // exibe o resultado
                operation: equals ? null : operation, // se for igual, limpa a operação
                current: equals ? 0 : 1, // se for igual, volta para o primeiro valor
                clearDisplay: !equals, // se for igual, limpa o display
                values // atualiza o array de values
            })

        }
    }

    addDigit(n) {
        // regra para não permitir que o usuário digite mais de um ponto
        if(n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        // regra para limpar o display quando o valor for 0 ou quando o display
        // precisar ser limpo
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current // pega o índice do valor atual
            const newValue = parseFloat(displayValue) // converte o valor para float
            const values = [...this.state.values] // clona o array de valores
            values[i] = newValue // atribui o novo valor ao índice atual
            this.setState({ values }) // atualiza o estado
            console.log(values)
        }
    }


    render () { 
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory } triple />
                <Button label="/" click={this.setOperation } operation />
                <Button label="7" click={this.addDigit } />
                <Button label="8" click={this.addDigit } />
                <Button label="9" click={this.addDigit } />
                <Button label="X" click={this.setOperation } operation />
                <Button label="4" click={this.addDigit } />
                <Button label="5" click={this.addDigit } />
                <Button label="6" click={this.addDigit } />
                <Button label="-" click={this.addDigit } operation />
                <Button label="1" click={this.addDigit } />
                <Button label="2" click={this.addDigit } />
                <Button label="3" click={this.addDigit } />
                <Button label="+" click={this.setOperation } operation />
                <Button label="0" click={this.addDigit } double />
                <Button label="." click={this.addDigit } />
                <Button label="=" click={this.setOperation } operation />
            </div>
        )
    }
}