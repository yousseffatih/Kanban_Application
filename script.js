import kanban from "./kanban.js";

const todoEl = document.querySelector(".cards.todo");
const pendingEl = document.querySelector(".cards.pending");
const completedEl = document.querySelector(".cards.completed");

const taskbox = [todoEl ,pendingEl ,completedEl];

function addTaskCard(task ,index){
      const element = document.createElement("form");
      element.className = "card";
      element.draggable = true;
      element.dataset.id = task.taskId;
      element.innerHTML = `
            <input type="text" name="task" autocomplete="off" disabled="disabled" value="${task.content}"/>
            <div>
                  <span class="task-id">#${task.taskId}</span>
                  <span>
                        <button class="bi bi-pencil edit" data-id="${task.taskId}"></button>
                        <button class="bi bi-check-lg update hide" data-id="${task.taskId}" data-column="${index}"></button>
                        <button class="bi bi-trash3 delete" data-id="${task.taskId}"></button>
                  </span>
            </div>
      `;
      taskbox[index].appendChild(element);
}

kanban.getAllTask().forEach((tasks,index) =>{
      tasks.forEach(task =>{
            addTaskCard(task,index);
      });
});

const addForm = document.querySelectorAll(".add");
addForm.forEach(form =>{
      form.addEventListener("submit",event => {
            event.preventDefault();
            if(form.task.value){
                  console.log(`${form.submit.dataset.id} , ${form.task.value}`);
                  const task = kanban.insertTask(form.submit.dataset.id , form.task.value.trim());
                              addTaskCard(task ,form.submit.dataset.id);
                              form.reset();
            }
            
      });
})

taskbox.forEach(column =>{
      column.addEventListener("click", (event)=>{
            event.preventDefault();
            const formInput = event.target.parentElement.parentElement.previousElementSibling;
            if(event.target.classList.contains("edit"))
            {
                  formInput.removeAttribute("disabled");
                  event.target.classList.add("hide");
                  event.target.nextElementSibling.classList.remove("hide");
            }
            if(event.target.classList.contains("update"))
            {
                  formInput.setAttribute("disabled","disabled     ");
                  event.target.classList.add("hide");
                  event.target.previousElementSibling.classList.remove("hide");
                  const taskId = event.target.dataset.id;
                  const columnId = event.target.dataset.column;
                  const content = formInput.value;
                  console.log(taskId , columnId ,content);
                  kanban.updateTask(taskId , {
                        columnId : columnId,
                        content : content
                  });
            }

            if(event.target.classList.contains("delete")){
                  event.preventDefault();
                  formInput.parentElement.remove();
                  kanban.deleteTask(event.target.dataset.id);
            }
      });
      column.addEventListener("dragstart" ,event => {
            if(event.target.classList.contains("card"))
            {
                  event.target.classList.add("dragging");
            }
      });

      column.addEventListener("dragover",event =>{
            const card = document.querySelector(".dragging");
            column.appendChild(card);
      });

      column.addEventListener("dragend",event =>{
            if(event.target.classList.contains("card")){
                  event.target.classList.remove("dragging");
                  const taskId = event.target.dataset.id;
                  const columnId = event.target.parentElement.dataset.id;
                  const content = event.target.task.value;
                  kanban.updateTask(taskId ,{
                        columnId:columnId,
                        content:content
                  });
            }
      });
})


//console.log(kanban.getAllTask());
//console.log(kanban.insertTask(1,"Edit Kanban"));
//kanban.deleteTask(7445);
//console.log(kanban.getAllTask(0));
// console.log(kanban.updateTask(97555,{columnId :1 ,content :"This mine content_4"}));
// console.log(kanban.getAllTask());

