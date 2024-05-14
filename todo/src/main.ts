import data from "./json/tasks.json" assert { type: "json" };
import { INPUT_INITIAL, PRIORITY_FORMS, STATUS, PRIORITY, ERRORS } from "./constants";
import { TASK_FORMS, TASK_CARD } from "./dom";

class Task {
    name: string;
    status: string;
    priority: string;

    constructor(name: string, priority: string) {
        this.name = name;
        this.status = STATUS.TO_DO;
        this.priority = priority;
    }
}

const toDo: Task[] = [];

const log = (value: string | null) => console.log(value);

const initialPage = (): void => {
    data.tasks.forEach((task) => toDo.push(task));

    showTasks(PRIORITY.HIGH, PRIORITY_FORMS.HIGH_PRIORITY_FORM);
    showTasks(PRIORITY.LOW, PRIORITY_FORMS.LOW_PRIORITY_FORM);

    TASK_CARD?.addEventListener("click", removeElementTask);
    TASK_CARD?.addEventListener("click", changeElementStatus);

    TASK_FORMS.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formId = form.id;
            const taskInput = form['task'].value;
            try {
                wrongQantityText(taskInput.length);
                if(formId === "form-high-task") {
                    createTask(form, taskInput, STATUS.TO_DO);
                    addTask(taskInput, PRIORITY.HIGH);
                }
                if(formId === "form-low-task") {
                    createTask(form, taskInput, STATUS.TO_DO);
                    addTask(taskInput, PRIORITY.LOW);
                }
                form['task'].value = INPUT_INITIAL;
            } catch {
                form['task'].value = INPUT_INITIAL;
                alert(errorInput(taskInput));
            }
        });
    });
}

initialPage();

const errorInput = (text: string): string => ERRORS.ERROR_INPUT_TASK + ` Ввели ${text.length}.`;

const wrongQantityText = (lengthText: number): void => {
    if(lengthText < 3 || lengthText > 30){
        throw new Error(ERRORS.ERROR_LENGTH);
    }
};

function showTasks(priority: string, formPriority: number): void{
    const priorityTask = toDo.filter(element => element.priority === priority);
    if(!priorityTask.length) {
        log('No tasks!');
        return;
    }
    priorityTask.forEach(element => createTask(TASK_FORMS[formPriority], element.name,  element.status));
    
} 

const addTask = (title: string, taskPriority: string): void => {
    const task = new Task(title, taskPriority);
    toDo.push(task);
};

function createTask(priorityForm: HTMLElement, nameTask: string, status: string): void {
    const taskBlock = document.createElement('div');
    const taskCheckbox = document.createElement('input');
    const taskText = document.createElement('p');
    const taskDelete = document.createElement('button');
    taskBlock.className = 'todo__task';
    taskCheckbox.type = 'checkbox';
    if(status === STATUS.DONE) {
        taskCheckbox.checked = true;
    }
    taskCheckbox.className = 'todo__status';
    taskText.className = 'task__text';
    taskText.textContent = nameTask;
    taskDelete.className = 'btn btn__delete';
    taskBlock.appendChild(taskCheckbox);
    taskBlock.appendChild(taskText);
    taskBlock.appendChild(taskDelete);
    priorityForm.parentNode?.insertBefore(taskBlock, priorityForm.nextSibling);
}

function deleteTask(task: string) {
    if(!task) {
        console.log(ERRORS.NOT_FOUND_TASK);
        return;
    }
    const indexTask = toDo.findIndex(element => element.name === task);
    toDo.splice(indexTask, 1);
}

function removeElementTask(event: Event): void {
    const clickedResult = event.target as HTMLElement;

    if (clickedResult.classList.contains('btn__delete')) {
        const taskElementClicked = clickedResult.parentElement;
        if (!taskElementClicked) return;
        const taskElement = taskElementClicked.querySelector('.task__text') as HTMLElement;
        const task = taskElement?.innerText;
        if (task) {
            deleteTask(task);
            TASK_CARD?.removeChild(clickedResult.parentElement);
        }
    }
}

function changeStatus(task: string): void {
    if(!task){
        console.log(ERRORS.NOT_FOUND_TASK);
        return;
    }
    const foundTask = toDo.find(element => element.name === task);
    if (foundTask) {
        foundTask.status = foundTask.status === STATUS.TO_DO ? STATUS.DONE : STATUS.TO_DO;
    }
}

function changeElementStatus(event: Event) {
    const clickedResult = event.target as HTMLElement;
    if(!clickedResult) return;
    if (clickedResult.classList.contains('todo__status')) {
        const parentElementClicked = clickedResult.parentElement;
        if (parentElementClicked) {
            const taskElement = parentElementClicked.querySelector('.task__text') as HTMLElement;
            const task = taskElement?.innerText;
            if (task) {
                changeStatus(task);
            }
        }
    }
}