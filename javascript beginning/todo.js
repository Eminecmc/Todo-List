const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody =document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton =document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // tüm event Listenerler
    form.addEventListener("submit" ,addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(){
     if(confirm("tümünü silmek istediğinize emin misiniz ? ")){
        //todoList.innerHTML = ""; // yavaş olarak tümünü siler  
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
         }
         localStorage.removeItem("todos");
     }
}
function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue)=== -1){
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }

    });


}
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","todo başarıyla silindi...");
    }
}
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}
function addTodo(e){
    const newTodo=todoInput.value.trim();

    if(newTodo=== ""){
        showAlert("danger","lütfen bir todo girin...");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);

        showAlert("success","başarıyla todo eklendi...");
    }
    

    e.preventDefault();
}
function getTodosFromStorage(){
    let todos;

    if (localStorage.getItem("todos")=== null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    return todos;

}
function addTodoToStorage(newTodo){

   let todos = getTodosFromStorage();
   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos));

}
function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className= `alert alert-${type}` ;
    alert.textContent=message;
    firstCardBody.appendChild(alert);

    setTimeout(function() {
        alert.remove();
    }, 2000);


}
function addTodoToUI(newTodo){  // string değerini list item olarak ekleyecek
    //list item oluşturma 
    const listItem=document.createElement("li");
     //link oluşturma
    
    const link =document.createElement("a");
     link.href="#";
     link.className="delete-item";
     link.innerHTML="<i class = 'fa fa-remove'></i>";
     

     listItem.className="list-group-item d-flex justify-content-between";

     //text node ekleme
     listItem.appendChild(document.createTextNode(newTodo));
     listItem.appendChild(link);
     //todo list'e list item ekleme
     todoList.appendChild(listItem);

   
     //en son girilen input'u temizleme
     todoInput.value="";

}