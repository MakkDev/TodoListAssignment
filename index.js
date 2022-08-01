let addTodoButton = document.getElementById("addTodoButton");
let todoList = document.getElementById("todoList");
let inputField = document.getElementById("input__field");
let clearListButton = document.getElementById("clearListButton");
let itemElement = document.getElementById("itemCount");

const baseURL = "http://localhost:3000"
const path = "todos"

var itemCount = 0;


//GET Request
const getPosts = () => {
    const postsEndpoint = [baseURL, path].join('/');
    fetch(postsEndpoint)
    .then(res => res.json())
    .then(data => {
        const posts = data.map((item) => {
    var todoItem = document.createElement("p");
    var todoText = document.createElement("p")
    var iconContainer = document.createElement('span')
    var trashIcon = document.createElement("i");
    var editIcon = document.createElement("i");
    todoItem.classList.add('todo__item');
    iconContainer.classList.add('icon__container');
    trashIcon.className = "fa-solid fa-trash";
    trashIcon.style.cursor = "pointer";
    editIcon.className = "fa-solid fa-pen";
    editIcon.style.cursor = "pointer"
    todoText.innerText = item.title; 
    todoList.appendChild(todoItem);
    todoItem.appendChild(todoText)
    todoItem.appendChild(iconContainer)
    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(trashIcon);
    inputField.value = "";
    itemCount++;
    setItemCount();
    todoItem.addEventListener('click', function(){
        todoText.style.textDecoration = "line-through";
    })
    todoItem.addEventListener('dblclick', function (){
        todoList.removeChild(todoItem);
        itemCount--;
        setItemCount();
        deletePost(item.id);
    })
    trashIcon.addEventListener('click', function (){
        todoList.removeChild(todoItem);
        itemCount--;
        setItemCount();
        deletePost(item.id); 
    })  
        })
        
    })
    .catch(error => console.log(error)) 
}
getPosts();

//POST Request
const postTodo = (title) => {
    const postsEndpoint = [baseURL, path].join('/');
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "title": title,
            "completed": false,
            
        })
    }
    fetch (postsEndpoint, options )
    .then(res => {
        if (res.ok) {console.log("Succesfully Posted!")}
        else {console.log("Post Unsuccesful!")}
        return res
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

//DELETE Request
const deletePost = (id) => {
    const postsEndpoint = [baseURL, path, id].join('/');
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        } 
    }
    fetch (postsEndpoint, options )
    .then(res => {
        if (res.ok) {console.log("Succesfully Deleted!")}
        else {console.log("Post Did NOT Delete!")}
        return res
    })
    .then(res => console.log(res))
}


const setItemCount = () => {
itemElement.textContent = itemCount;
}
setItemCount();


const addItem = () => {
    var todoItem = document.createElement("p");
    var todoText = document.createElement("p")
    var iconContainer = document.createElement('span');
    var trashIcon = document.createElement("i");
    var editIcon = document.createElement("i");
    todoItem.classList.add('todo__item');
    iconContainer.classList.add('icon__container');
    trashIcon.className = "fa-solid fa-trash";
    trashIcon.style.cursor = "pointer"
    editIcon.className = "fa-solid fa-pen";
    editIcon.style.cursor = "pointer"
    todoText.innerText = inputField.value; 
    todoList.appendChild(todoItem);
    todoItem.appendChild(todoText)
    todoItem.appendChild(iconContainer)
    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(trashIcon);
    postTodo(inputField.value);
    inputField.value = "";
    itemCount++;
    setItemCount();
    todoItem.addEventListener('click', function(){
        todoText.style.textDecoration = "line-through";
    })
    
      todoItem.addEventListener('dblclick', function (){
                todoList.removeChild(todoItem);
                itemCount--;
                setItemCount();
                deletePost(todo.id)
            })
   trashIcon.addEventListener('click', function (){
                todoList.removeChild(todoItem);
                itemCount--;
                setItemCount();
                deletePost(todo.id)        
            })
        
    }
    



const clearList = () => {
    if(confirm("Are you sure you want to clear your to-do list?")){
        todoList.innerHTML= "";
        itemCount = 0;
        setItemCount();
    }
}

addTodoButton.addEventListener ('click', addItem);
inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter")
    addItem();
})
clearListButton.addEventListener('click', clearList);
