// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

contract TaskContract {

    /* constructor () {
        createTask("mi primer tarea de ejemplo","habia que poner algo");
    }
 */
    uint public taskCounter ;
    event TaskCreated (
        uint id,
        string title,
        string description,
        bool done,
        uint createdAt
    );
    struct Task {
        uint id;
        string title;
        string description;
        bool done;
        uint createdAt;
    }

    mapping (uint =>Task) public tasks;

    function createTask(string memory _title,string memory _description ) public {
        tasks[taskCounter]=Task(taskCounter,_title,_description,false,block.timestamp);
        taskCounter++;
        emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
    }
    function toggleDone (uint _id) public {
        Task memory _task=tasks[_id];
        _task.done=!_task.done;
        tasks[_id]=_task;
    }
    

}