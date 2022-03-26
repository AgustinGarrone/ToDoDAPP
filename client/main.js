App = {

    contracts:{}, //contrato vacio para luego pasarle nuestros contratos al cargarlo con trufflecontract
    init:async()=> {
        console.log("loaded");
        await App.loadMetamask();
        await App.loadAccount();
        await App.loadContracts();
    },
    loadMetamask:async () => {
        if (window.ethereum){
            App.web3Provider=window.ethereum;
            await window.ethereum.request({method:'eth_requestAccounts'})  //traemos las cuentas que conecta el usuario 
        } else if (window.web3) {  //SI NO TIENE METAMASK COMPRUEBA SI TIENE ALGUN PROOVEDOR DE WEB3
            web3=new Web3(window.web3.currentProvider)
        }
        else {
            alert("instala metamask");
        }
    },

    loadAccount:async()=> {  //Traemos las cuentas dfel usuario y guardamos la que usa en la variable App.account
        const accounts=await window.ethereum.request({method:'eth_requestAccounts'}) 
        App.account=accounts[0]; 
        App.render();
    },

    loadContracts:async ()=> {
        const response=await fetch ("TaskContract.json");
        const tasksContractJSON = await response.json()  //CARGAMOS LOS CONTRATOS
        App.contracts.tasksContract=TruffleContract(tasksContractJSON) //Al objeto trufflecontract le damos el contract json nuestro. es como deployarlo
        App.contracts.tasksContract.setProvider(App.web3Provider) //Conectamos nuestro contrato a metamask
        App.tasksContract=await App.contracts.tasksContract.deployed() //deployamos y guardamos el contrato finalizado a utilizar en la propiedad App.tasksContract
    
    },
    createTask:async (title,description)=>{  //hacemos la funcion asyncrona xq va a interactuar con el smart contract
        const result=await App.tasksContract.createTask(title,description,{from:App.account});
        console.log(result.logs[0].args)
        App.renderTask()
    },
    render: () => {
        document.getElementById("account").innerText=App.account
    },
    renderTask:async ()=> {
        const taskCounter=await App.tasksContract.taskCounter()
        const taskCounterNumber=taskCounter.toNumber()
        console.log(taskCounterNumber)
        document.querySelector(".maincontainer__right").innerHTML=""
        for (let i=1;i<taskCounterNumber;i++) {
            let tarea=await App.tasksContract.tasks(i)
            console.log(tarea)
            document.querySelector(".maincontainer__right").innerHTML+=`
                <div class="maincontainer__right--task">
                <div class="taskName">
                    <p>${tarea[1]}</p>
                    <img src="input.png" class="imageninput" alt="">
                </div>
                <div class="maincontainer__right--taskdata">
                    <p>${tarea[2]}</p>
                    <p>Task was created ${new Date(tarea[4]*1000).toLocaleString()}</p>
                </div>
            `
            /* tareaInput(taskCounter-1);  */
        }
    }
}

/* function tareaInput(t) {
    document.querySelectorAll(".imageninput")[t].addEventListener("click",()=>{
        alert("Hola")
    })
} */