async function generateTaskHTML(element, i) {
    return /*html*/ `
        <div  onclick="openTask(${i})" id="${i}" class="task draggable">
            <div>
                <div class="task-category"> ${element['category']}</div>
                <div class="task-title">${element['title']}</div>
                <div class="task-description"> ${element['description']}</div>
            </div>
            <div id="task-subtasks" >  
                        <div class="d-flex">
                            <div id="progressBarContainer" style="width: 100%; background-color: #ddd;    border-radius: 10px;">
                                <div id="progressBar${i}" class="progress-bar"></div>     
                            </div>
                            <div id="progressStatus${i}" class="d-flex"></div>
                       </div>
                    </div> 

                <div class="d-flex align-items-center">
                <div id="prio-img${i}"></div>
                  <div class="task-users-prio" id="task-users${i}"></div>
                </div> 
        </div>
    `;
}

function renderTaskTemplate(task, i) {
    return `
        <div class="task-detail">
            <div class="task-detail-content-container">
                <div class="task-detail-top">
                    <div class="task-detail-category">${task['category']}</div>
                    <img onclick="closeWindow('popup-container')" src="./img/close.svg" alt="close">
                </div>
                <div class="task-detail-content">
                    <div class="task-detail-title">
                        <h1>${task['title']}</h1>
                    </div>
                    <div class="task-description">
                        ${task['description']}
                    </div>
                    <div class="task-detail-flex">
                        <div class="task-detail-font-color">Due date:</div>
                        <div>${task['date']}</div>
                    </div>
                    <div class="task-detail-flex">
                        <div class="task-detail-font-color">Priority:</div>
                        <div>${task['priority']}</div>
                    </div>
                    <div class="width-100P">
                        <div class="margin-bottom10 task-detail-font-color width-100P">
                            <span>Assigned To:</span>
                            <div id="AssignedTo" class="width-100P"></div>
                        </div>
                    </div>
                    <div>
                        <span id="subtaskText">Subtasks</span>
                        <div id="subtask-checking"></div>
                    </div>
                    <div id="task-detail-subtasks">  
                        <div class="d-flex">
                            <div id="progressBarContainer" style="width: 100%; background-color: #ddd; border-radius: 10px;">
                                <div id="progressBar" class="progress-bar"></div>     
                            </div>
                            <div id="progressStatus" class="d-flex"></div>
                       </div>
                    </div> 
                </div>         
            </div>
            <div class="task-detail-bottom ">
                <div onclick="deleteTask(${i})" class="d-flex cursor-pointer">
                    <img src="./img/subTaskDelete.svg" alt="">
                    <span>Delete</span>
                </div>
                <div onclick="editTask(${i})" class="d-flex cursor-pointer"> 
                    <img src="./img/PenAddTask 1=edit.svg" alt="">
                    <span>Edit</span>      
                </div>     
            </div>
        </div>`;

}