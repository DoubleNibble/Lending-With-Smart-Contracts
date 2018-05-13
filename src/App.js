import React, { Component } from 'react'
import Lending from '../build/contracts/Lending.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class Loan {
    constructor(id, timePeriod, amount, interestRatePremium, assetID) {
	this.id = id
	this.timePeriod = timePeriod
	this.amount = amount
	this.interestRatePremium = interestRatePremium
	this.assetID = assetID
    }
}

class LoanView extends Component {
    constructor(props) {
	super(props)
    }
    render() {
	var pStyle = function(width) {
	    return {display:"inline-block", width:width+"px", "text-align":"center"}
	}	
	return(<div>
	       <p style={pStyle(this.props.idWidth)}>{this.props.loan.id}</p>
	       <p style={pStyle(this.props.assetIdWidth)}>{this.props.loan.assetID}</p>
	       <p style={pStyle(this.props.amountWidth)}>{this.props.loan.amount}</p>
	       <p style={pStyle(this.props.interestPremWidth)}>{this.props.loan.interestRatePremium}</p>
	       </div>)
    }
}

class LoanList extends Component {
    constructor(props) {
	super(props)
    }
    render() {
	var idWidth = 80
	var assetIdWidth = 80
	var interestPremWidth = 150
	var amountWidth = 110
	var columnHeader = function(text, width) {
	    return (<h4 style={{display:"inline-block", width:width+"px", "text-align":"center"}}>{text}</h4>)
	}
	return (
		<div>
		<h4>{this.props.header}</h4>
		{columnHeader("ID", idWidth)}
	    {columnHeader("Asset ID", assetIdWidth)}
	    {columnHeader("Amount", amountWidth)}
	    {columnHeader("Interest Premium", interestPremWidth)}
		{this.props.loans.map( function(loan) {
		    return <LoanView key={loan.id} loan={loan} idWidth={idWidth} assetIdWidth={assetIdWidth} amountWidth={amountWidth} interestPremWidth={interestPremWidth}/>
		}.bind(this))}
	    </div>
	)
    }
}


class LoanCreator extends Component {
    constructor(props) {
	super(props)
	this.state = {amount:0, interestRate:0}
    }
    setInterest(premium) {
	if (parseFloat(premium)) {
	    this.setState({interestRate: this.props.baseRate+parseFloat(premium)})
	}
    }
    setAmount(amount) {
	if (parseFloat(amount)) {
	    this.setState({amount: parseFloat(amount)})
	}
    }
    render() {
	return (
		<div>
		Create here
		<input placeholder={"Amount"} onChange={(e) => this.setAmount(e.target.value)}></input>
		<input placeholder={"Interest Rate Premium"} onChange={(e) => this.setInterest(e.target.value)}></input>
		<p>Requesting a loan for {this.state.amount} with interest rate {this.state.interestRate}</p>
		<button onClick={() => {this.props.addNewLoan(this.state.amount, this.state.interestRatePremium, this.state.lendingPeriod, this.state.assetId)}}>Request Loan</button>
	    </div> )
    }
}


class App extends Component {
    constructor(props) {
	super(props)

	this.state = {
	    storageValue: 0,
	    web3: null,
	    boeInterestRate: 0.2
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
		    console.log("event triggered")
		    this.getAllLoans()
		}.bind(this)
		this.event = this.lendingContractInst.AssetChange()
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
	console.log(await this.lendingContractInst.getAssetIds())
    }

    async addNewLoan(amount, premium, lendingPeriod, assetId) {
	console.log("hi")
	console.log((await this.lendingContractInst.getAssetIds()))
	this.lendingContractInst.borrowFunds(1000, 1, 1, 1, {from:this.currAccount}) 
    }

    async addNewAsset(value) {
	console.log(this.currAccount);
	await this.lendingContractInst.addAsset(this.currAccount, value, {from:this.currAccount});
	console.log((await this.lendingContractInst.getAssetIds()))
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
		<LoanCreator addNewLoan={this.addNewLoan.bind(this)} baseRate={this.state.boeInterestRate}/>
		<button onClick={() => {this.addNewAsset(1)}}>Add New Asset </button>
		<LoanList loans={[new Loan(1,2,1,1,1001)]} header={"List 1"}/>
		</div>
		</div>
		</main>
		</div>
	);
    }
}

export default App


/* Plan:
 * - Show the BOE interest rate somewhere
 * - New loan creator 
*/
