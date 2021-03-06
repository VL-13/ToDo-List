const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('todo-add');
const todoList = document.getElementById('todolist');
const inputCount = document.getElementById('input-count');
const listItemCount = document.getElementById('total');
const doneItemCount = document.getElementById('total-done');

let tempStorage = getTodosFromLocalStorage();
tempStorage === null ? tempStorage = [] : tempStorage;
setTodosToLocalStorage(tempStorage);

addButton.addEventListener('click', handleAddTodoItem);
todoList.addEventListener('click', handleItemClick);
todoInput.addEventListener('keydown', handleInputCount);
addButton.addEventListener('click', handleListItemCount);
todoList.addEventListener('click', handleListItemCount);
todoList.addEventListener('change', handleDoneItemCount);

function handleItemClick(event) {
    let tempStorage = getTodosFromLocalStorage();
    const itemId = parseInt(event.target.closest('li').dataset.todoid);
    if (event.target.dataset.action === 'remove') {
        let newStorageArray = [];
        for (let i = 0; i < tempStorage.length; i++) {
            if (itemId !== tempStorage[i].id) {
                newStorageArray.push(tempStorage[i]);
            }
        }
        setTodosToLocalStorage(newStorageArray);
        event.target.closest('li').remove();
    }
    if (event.target.dataset.action === 'status') {
        let newStorageArray = [];
        for (let i = 0; i < tempStorage.length; i++) {
            if (itemId === tempStorage[i].id) {
                tempStorage[i].status = !tempStorage[i].status;
            }
            newStorageArray.push(tempStorage[i]);
        }
        setTodosToLocalStorage(newStorageArray);
        event.target.closest('li').classList.toggle('complete');
    }
}

for (let i = 0; i < tempStorage.length; i++) {
    renderTodoItem(tempStorage[i].text, tempStorage[i].status, tempStorage[i].id);
}

function handleInputCount(event) {
    const count = event.target.value.length;

    if (count === 0) {
        inputCount.innerText = '';
        return;
    }

    inputCount.innerText = 'Characters count: ' + count;
}

function handleAddTodoItem() {
    let tempStorage = getTodosFromLocalStorage();
    let id = tempStorage.length;

    tempStorage.push({
        id: id,
        text: todoInput.value,
        status: false,
    })
    setTodosToLocalStorage(tempStorage);
    renderTodoItem(todoInput.value, false, id);
    todoInput.value = '';
    inputCount.innerText = '';
}

function renderTodoItem(text, status, id) {
    if(!text) return;
    const listItem = document.createElement('li');
    const listItemRemoveBtn = document.createElement('button');
    const listCheckboxStatus = document.createElement('input');
    const listTextSpan = document.createElement('span');
    listItem.classList.add('todolist__item');
    listItemRemoveBtn.innerText = 'x';
    listItemRemoveBtn.setAttribute('data-action', 'remove');
    listTextSpan.innerText = text;
    listCheckboxStatus.type = 'checkbox';
    listCheckboxStatus.checked = status;
    if (status) {
        listItem.classList.add('complete');
    }
    listCheckboxStatus.setAttribute('data-action', 'status')

    listItem.append(listCheckboxStatus)
    listItem.append(listTextSpan)
    listItem.append(listItemRemoveBtn)
    listItem.setAttribute('data-todoid', id);
    todoList.append(listItem);
}

function handleDoneItemCount(event) {
    const doneItems = this.querySelectorAll('input[type="checkbox"]:checked').length;

    doneItemCount.innerText = 'Done tasks: ' + doneItems;
}

function handleListItemCount(event) {
    const listCount = todoList.childElementCount;

    if (listCount >= 0) {
        listItemCount.innerText = 'Total tasks: ' + listCount;
    }
}

function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos'))
}
function setTodosToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}