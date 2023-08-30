export default class kanban {
      static getTask(columnId){
            const data = read().find(column =>{
                 return column.columnId === columnId;
            });
            if(!data){
                  return [];
            }
            return data.tasks;
      }

      static insertTask(columnID , content){
            const data = read();
            const column = data.find(column => {
                  return column.columnId == columnID;
            });
            const task = {
                  taskId:Math.floor(Math.random()*10000),
                  content:content
            };
            console.log(column);
            column.tasks.push(task);
            console.log(data);
            save(data);
            return task;
      }

      static updateTask(taskId , updateInformation){
            const data = read();
            function findColumnTask(){
                  for (const column of data){
                  const task = column.tasks.find( item => {
                        return item.taskId == taskId;
                  });
                  if(task){
                        return [task , column];
                  }
            }
            }
            
            const [task , currentColumn] = findColumnTask();
            const targetColumne = data.find(column =>{
                  return column.columnId == updateInformation.columnId;
            });
            task.content = updateInformation.content;
            currentColumn.tasks.splice(currentColumn.tasks.indexOf(task),1);
            targetColumne.tasks.push(task);
            save(data);            
      }

      static deleteTask(taskId){
            const data = read();
            for(const column of data ){
                  const task = column.tasks.find(item => {
                        return item.taskId == taskId ;
                  });
                  if(task){
                        column.tasks.splice(column.tasks.indexOf(task),1);
                  }
                  
            }
            save(data);
            
      }

      static getAllTask(){
            const data = read();
            columnCount();
            return [data[0].tasks , data[1].tasks , data[2].tasks];
      }
}

function read(){
      const data = localStorage.getItem("data");
      if(!data){
            return [
                  {columnId : 0 , tasks:[]},
                  {columnId : 1 , tasks:[]},
                  {columnId : 2 , tasks:[]},
            ];
      }
      return JSON.parse(data);
}

function columnCount(){
      const data = read();

      const todoEl = document.querySelector("span.todo");
      todoEl.textContent = data[0].tasks.length;
      const pendingEl = document.querySelector("span.pending");
      pendingEl.textContent = data[1].tasks.length;
      const completedEl = document.querySelector("span.completed");
      completedEl.textContent = data[2].tasks.length;
}

function save(data){
      localStorage.setItem("data" , JSON.stringify(data));
      columnCount();
}


