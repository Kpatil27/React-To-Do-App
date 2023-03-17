import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

import './App.css';

function App() {
  //Tasks

  const [toDo,setToDo]=useState([ ]);

  const [newTask,setNewTask]=useState('');
  const [updateData,setUpdatedData]=useState('');

  //Add task

  const addTask=()=>{
if (newTask){
  let num=toDo.length+1;
  let newEntry={id:num,title:newTask,status:false}
  setToDo([...toDo,newEntry])
  setNewTask('');
}
  }
  //Delete task

  const deleteTask=(id)=>{
let newTasks=toDo.filter(task=>task.id!==id)
setToDo(newTasks)
  }

  const markDone=(id)=>{
const newTask=toDo.map(task=>{
  if(task.id===id)
  {
    return({...task,status:!task.status})
  }
  return task;
})
setToDo(newTask)
  }

  const cancleUpdate=()=>{
setUpdatedData('')
  }

  const changeTask=(e)=>{
let newEntry={
  id:updateData.id,
  title:e.target.value,
  status:updateData.status?true:false
}
setUpdatedData(newEntry)
  }

  const updateTask=()=>{
let filterRecords = [...toDo].filter(task=>task.id!==updateData.id);
let updatedObject=[...filterRecords,updateData]
setToDo(updatedObject)
setUpdatedData('');
  }



  return (
    <div className="container App">
      <br/><br/>
      <h2>To Do List App(ReactJS)</h2>
      <br/><br/>
{/* update task */}





{updateData && updateData ? (
 <>
 <div className='row'>
  <div className='col'>
    <input value={updateData && updateData.title}
    onChange={(e)=>changeTask(e)}
    className='form-control form-control-lg'/>
  </div>
  <div className='col-auto'>
    <button onClick={updateTask} className='btn btn-lg btn-success mr-20'>Update</button>
    <button className='btn btn-lg btn-warning' onClick={cancleUpdate}>Cancle</button>
  </div>
</div>
<br></br>
 </>
):(
  <>
{/* Add task */}
<div className='row'>
  <div className='col'>
    <input value={newTask}
    onChange={(e)=>setNewTask(e.target.value)}
    className='form-control form-control-lg'/>
  </div>
  <div className='col-auto'>
    <button onClick={addTask} className='btn btn-lg btn-success'>Add Task</button>
  </div>
</div>
<br></br>
  </>
)}
     




      {/* Display ToDo's */}
      {toDo && toDo.length?'':'No Tasks.....'}
      {toDo && toDo.sort((a,b)=>a.id>b.id?1:-1).map((task,index)=>{
        return (
          <React.Fragment key={task.id}>
            <div className='col taskBg'>
              <div className={task.status?'done':''}>
              <span className='taskNumber'>{index+1}</span>
            <span className='tasktext'>{task.title}</span>
              </div>
              <div className='iconsWrap'>
                <span title='Completed / Not Completed' onClick={(e)=>markDone(task.id)}>
                  <FontAwesomeIcon icon={faCircleCheck}/>
                </span>
                {task.status?null:(
                  <span title='Edit' onClick={()=> setUpdatedData({
                    id:task.id,
                    title:task.title,
                    status:task.status?true:false
                  }) }>
                  <FontAwesomeIcon icon={faPen}/>
                  </span>
                )}
                
                <span title='Delete' onClick={()=>deleteTask(task.id)}>
                <FontAwesomeIcon icon={faTrashCan}/>
                </span>
                
              </div>
            </div>
           
          </React.Fragment>
        )
      })}
    </div>
  );
}

export default App;
