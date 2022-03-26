const TasksContract=artifacts.require("TaskContract");

contract("TasksContract",accounts=> {
    
/*     before(async ()=>{
        this.tasksContract=await TasksContract.deployed()
    }) */

    /* it ("create task",async ()=>{
        let instance=Taskc.deployed();
        const agregar= await instance.crear("Lavar ropa","Lavar la ropa paraa el dia escolar de mañana")
    }) */

    it ('migrate deployed succes',async ()=> {
        let instance=await TasksContract.deployed();
        const address=await instance.address;
        assert.notEqual(address,null);
    })
    it ('get tasks list',async ()=> {
        let instance=await TasksContract.deployed();
        const tarea=await instance.tasks(0);
        assert.equal(tarea.id.toNumber(),0)
    })
    it ('create task',async ()=> {
        let instance=await TasksContract.deployed();
        const crear=await instance.createTask("Mi segunda tarea","tarea de prueba2");
        const tarea1=await instance.tasks(0);
        const tarea2=await instance.tasks(1);
        console.log(tarea1.description)
        console.log(tarea2.description)
        assert.equal(tarea2.title,"Mi segunda tarea")
    })

   /*  it ('task cambiada de valor',async()=>{
            let instance=await TasksContract.deployed();
            const tarea1=await instance.tasks(0);
            console.log(tarea1);
            const resultado=await instance.toggleDone(0);
            const update=resultado.logs[0].args
            assert.equal(update,true) 
            const cambiar=await instance.toggleDone(0);
            const tareaCambiada=await instance.tasks(0);
            assert.equal(tareaCambiada,true) 
    })*/

})