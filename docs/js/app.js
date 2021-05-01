
const App = {  
	web3: null,  
	myaccount: null,
	contracts: {},  
	voting: null, 
	load: async () => {
		await App.loadWeb3();
		await App.loadAccount();
		await App.loadContract();
		await App.start();
	  },
	start: async function() {

   
  },
	saveToBC :async ()=>{
		var name=$("#username").val();
		var salary=$("#usersalry").val();
	  await App.sample.addEmployee(parseInt(salary),name,{from:App.myaccount});
	},
	readFromBC :async ()=>{
		var count=await App.sample.totalEmployees();
		$("#emps").empty();
		for(var i=1;i<=count;i++){
			var employee=await App.sample.employees(i);
			var id=employee[0];
			var name=employee[2];
			var salary=employee[1];
			var str="<tr><td>"+id+"</td><td>"+name+"</td><td>"+salary+"</td></tr>";
			$("#emps").append(str);
		}
	
	},

		loadWeb3: async () => {
			//var Web3 = require('web3')  ;  
			if (typeof web3 !== 'undefined') {
			  App.web3Provider = web3.currentProvider
			  web3 = new Web3(web3.currentProvider)
			} else {
		
			  //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
		
			  window.alert("Please connect to Metamask.")
			}
			// Modern dapp browsers...
			if (window.ethereum) {
			  window.web3 = new Web3(ethereum)
			  try {
				// Request account access if needed
				App.acc=await ethereum.enable()
				// Acccounts now exposed
				web3.eth.sendTransaction({/* ... */})
			  } catch (error) {
				// User denied account access...
			  }
			}
			// Legacy dapp browsers...
			else if (window.web3) {
			  App.web3Provider = web3.currentProvider
			  window.web3 = new Web3(web3.currentProvider)
			  // Acccounts always exposed
			  web3.eth.sendTransaction({/* ... */})
			}
			// Non-dapp browsers...
			else {
			  console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
			}
		  },
		
		  loadAccount: async () => {
		
			  App.myaccount = App.acc[0]; 
			
			
		  },
		  loadContract: async () => {
			// Create a JavaScript version of the smart contract
			const Sample = await $.getJSON('Sample.json')
			App.contracts.Sample = TruffleContract(Sample)
			App.contracts.Sample.setProvider(App.web3Provider)
			// Hydrate the smart contract with values from the blockchain
			App.sample = await App.contracts.Sample.deployed()
		  },
}; 


$(window).on('load', function(){ App.load();})