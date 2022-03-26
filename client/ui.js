
document.addEventListener("DOMContentLoaded",()=>{
    document.querySelector(".metamask").addEventListener("click",()=>{
        App.init()
    })
})

const taskForm=document.querySelector("#taskForm")
taskForm.addEventListener("submit",e=>{
    e.preventDefault() //evitamos q la pagina se refresque
    App.createTask(taskForm["title"].value,taskForm["description"].value)
})
