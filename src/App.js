import React, { Component } from 'react'
import Lending from '../build/contracts/Lending.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class Loan {
    constructor(id) {
	this.id = id
    }
}

class LoanView extends Component {
    constructor(props) {
	super(props)
    }
    render() {
	return(<p>Loan {this.props.loan.id} </p>)
    }
}

class LoanList extends Component {
    constructor(props) {
	super(props)
    }
    render() {
	return (
		<div>
		{this.props.loans.map( function(loan) {
		    return <LoanView key={loan.id} loan={loan} />
		}.bind(this))}
	    </div>
	)
    }
}


class LoanCreator extends Component {
    constructor(props) {
	super(props)
    }
    render() {
	return (<div>Create here <button onClick={() => {this.props.addNewLoan()}}>Add New Loan</button></div> )
    }
}


class App extends Component {
    constructor(props) {
	super(props)

	this.state = {
	    storageValue: 0,
	    web3: null
	}
    }

    componentWillMount() {
	// Get network provider and web3 instance.
	// See utils/getWeb3 for more info.

	getWeb3
	    .then(results => {
		this.setState({
		    web3: results.web3
		})

		// Instantiate contract once web3 provided.
		this.instantiateContract()
	    })
	    .catch(() => {
		console.log('Error finding web3.')
	    }).then( (result) => {
		// Instantiate contract once web3 provided.
		console.log("getting contract")
		return this.getContract()
	    }).then( (result) => {
		// Start watching for bet changes
		var getLoans = function() {
		    console.log("lending change event triggered")
		    this.getAllLoans()
		}.bind(this)
		this.event = this.lendingContractInst.LendingContractChange()
		return this.event.watch(getLoans)
	    }).then( (result) => {
		// Create a function that regularly checks for changes to account
		this.currAccount = this.state.web3.eth.accounts[0]
		console.log(this.currAccount, this.state.web3.eth.accounts)
		this.getCurrAccount = function() {
		    if (this.state.web3.eth.accounts[0] !== this.currAccount) {
			this.currAccount = this.state.web3.eth.accounts[0];
			this.getAllLoans()
		    }
		}.bind(this)
		setInterval(this.getCurrAccount, 100)
		return this.getAllLoans()
	    })
    }

    async getContract() {
	console.log("getting contract")
	const contract = require('truffle-contract')
	this.lendingContract = contract(Lending)
	this.lendingContract.setProvider(this.state.web3.currentProvider)
	this.lendingContractInst = await this.lendingContract.deployed()
    }

    async getAllLoans() {
	console.log("getting loans")
	console.log(await this.lendingContractInst.getLendingIds())
    }

    addNewLoan() {
	this.lendingContractInst.borrowFunds(1, 2, 1, 1, {from:this.currAccount}) 
    }

    render() {
	return (
		<div className="App">
		<nav className="navbar pure-menu pure-menu-horizontal">
		<a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
		</nav>

		<main className="container">
		<div className="pure-g">
		<div className="pure-u-1-1">
		<LoanCreator addNewLoan={this.addNewLoan.bind(this)}/>
		</div>
		</div>
		</main>
		</div>
	);
    }
}

export default App
