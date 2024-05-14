class User 
{
    username = "";
    email = "";
    password = "";
    passwordConfirmed = "";
    isAdmin = false;
    isTeacher = false;
    constructor(username, email, password, passwordConfirmed, isAdmin, isTeacher) 
    {
        this.username = username;
        this.email = email;
        this.password = password;
        this.passwordConfirmed = passwordConfirmed;
        this.isAdmin = isAdmin;
        this.isTeacher = isTeacher;
    }
}



class Task 
{
    ID = 0;
    title = "";
    teacherName = "";
    priority = 0;
    description = "";
    createdBy = "";
    status = false;
    constructor(ID, title, teacherName, priority, description)
    {
        this.ID = ID;
        this.title = title;
        this.teacherName = teacherName;
        this.priority = priority;
        this.description = description;
    }
}



class Teacher 
{
    name = "";
    email = "";
    password = "";
    taskList = [];
    constructor(name, email, password)
    {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    addNewTask(task) 
    {
        this.taskList.push(task);
    }
}



class Admin 
{
    name = "";
    email = "";
    password = "";
    taskList = [];
    constructor(name, email, password) 
    {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    addNewTask(task) 
    {
        task.createdBy = this.name;
        this.taskList.push(task);
        for (let i = 0; i < TeacherList.length; i++) 
        {
            if (task.teacheName == TeacherList[i].name) 
            {
                TeacherList[i].addNewTask(task);
                break;
            }
        }
    }
}



var UsersList = [];
var TeacherList = [];
var AdminsList = [];

let CurrentAdmin = new Admin();
let CurrentTeacher = new Teacher();



function SignUp(event) 
{
    event.preventDefault();
    let newUser = new User();

    newUser.username = document.getElementById("username").value;
    newUser.email = document.getElementById("email").value;
    newUser.password = document.getElementById("password").value;
    newUser.confirmPassword = document.getElementById("confirmPassword").value;
    newUser.isAdmin = document.getElementById("ad").checked;
    newUser.isTeacher = document.getElementById("teach").checked;

    if (newUser.password != newUser.confirmPassword) 
    {
        window.alert("Passwords are not the same");
    } 
    else 
    {
        if (newUser.isAdmin == true) 
        {
            var newAdmin = new Admin(newUser.username, newUser.email, newUser.password);
            var Alist = JSON.parse(localStorage.getItem("AdminsList")) || [];

            //Checking duplicate names            
            for (var i = 0; i < Alist.length; i++) 
            {
                if (Alist[i].name == newAdmin.name) 
                {
                    window.alert("Username already exists");
                    return;
                }
            }

            localStorage.setItem("aName",newUser.username);
            Alist.push(newAdmin);
            localStorage.setItem("AdminsList", JSON.stringify(Alist));
            CurrentAdmin = newAdmin;
            localStorage.setItem("CurrentAdmin", JSON.stringify(CurrentAdmin));
            window.location.href = "AdminHome.html";
        } 
        else 
        {
            var newTeacher = new Teacher(newUser.username, newUser.email, newUser.password);
            var Tlist = JSON.parse(localStorage.getItem("TeacherList")) || [];

            //Checking duplicate names            
            for (var i = 0; i < Tlist.length; i++) 
            {
                if (Tlist[i].name == newTeacher.name) 
                {
                    window.alert("Username already exists");
                    return;
                }
            }

            localStorage.setItem("tName",newUser.username);
            Tlist.push(newTeacher);
            localStorage.setItem("TeacherList", JSON.stringify(Tlist));
            CurrentTeacher = newTeacher;
            localStorage.setItem("CurrentTeacher", JSON.stringify(CurrentTeacher));
            window.location.href = "TeacherHome.html";
        }
    }
}



const nameForAdminsListInLS = "AdminsList";
const nameForTeacherListInLS = "TeacherList";
const nameForCurrentAdmin = "CurrentAdmin";
const nameForCurrentTeacher = "CurrentTeacher";



function Login(event) 
{
    event.preventDefault();

    var name = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    let Alist = [];
    Alist = JSON.parse(localStorage.getItem("AdminsList"));
    var Tlist = [];
    Tlist = JSON.parse(localStorage.getItem("TeacherList"));
    var succes = false;
    for (var i = 0; i < Alist.length; i++) 
    {
        if (Alist[i].name === name && Alist[i].password === password) 
        {
            CurrentAdmin = Alist[i];
            localStorage.setItem("aName",name);
            localStorage.setItem("CurrentAdmin", JSON.stringify(CurrentAdmin));
            succes = true;
            window.location.href = "AdminHome.html";
            break;
        }
    }

    for (var i = 0; i < Tlist.length; i++) 
    {
        if (Tlist[i].name === name && Tlist[i].password === password) 
        {
            CurrentTeacher = Tlist[i];
            localStorage.setItem("tName",name);
            localStorage.setItem("CurrentTeacher", JSON.stringify(CurrentTeacher));
            succes = true;
            window.location.href = "TeacherHome.html";
            break;
        }
    }
    if (!succes) 
    {
        window.alert("Wrong username or password");
    }
}



function AddTask(event) 
{
    event.preventDefault();

    let Tlist = [];
    Tlist = JSON.parse(localStorage.getItem(nameForTeacherListInLS)) || [];
    let Alist = [];
    Alist = JSON.parse(localStorage.getItem(nameForAdminsListInLS)) || [];
    var CurrentAdmin = JSON.parse(localStorage.getItem(nameForCurrentAdmin));

    let task = new Task();
    task.ID = document.getElementById("id").value;
    task.title = document.getElementById("title").value;
    task.description = document.getElementById("description").value;
    var pr = 0;
    if (document.getElementById("low").checked) 
    {
        pr = 3;
    } 
    else if (document.getElementById("medium").checked) 
    {
        pr = 2;
    } 
    else if (document.getElementById("high").checked) 
    {
        pr = 1;
    }
    task.createdBy = CurrentAdmin.name;
    task.priority = pr;
    task.teacherName = document.getElementById("teacher").value;

    var found = false;
    for (var i = 0; i < Tlist.length; i++) 
    {
        if (Tlist[i].name === task.teacherName)
        {
            Tlist[i].taskList.push(task);
            localStorage.setItem(nameForTeacherListInLS, JSON.stringify(Tlist));
            found = true;
            break;
        }
    }
    if (!found) 
    {
        window.alert("There are no teachers with the name " + task.teacherName);
        return;
    }
    for (let i = 0; i < CurrentAdmin.taskList.length; i++) 
    {
        if (CurrentAdmin.taskList[i].ID === task.ID) 
        {
            window.alert("This task's ID is already taken");
            return;
        }
    }

    for (var i = 0; i < Alist.length; i++) 
    {
        if (Alist[i].name === CurrentAdmin.name) 
        {
            Alist[i].taskList.push(task);
            CurrentAdmin = Alist[i];
            localStorage.setItem(nameForCurrentAdmin, JSON.stringify(CurrentAdmin));
            localStorage.setItem(nameForAdminsListInLS, JSON.stringify(Alist));
            break;
        }
    }
    window.location.href = "ViewAdminTasks.html";
}



function PopulateAdminTable() 
{
    var allTasks = [];
    allTasks = JSON.parse(localStorage.getItem(nameForCurrentAdmin)).taskList;

    //Retrieve the search value inside the function
    var searchForAdminTask = document.getElementById("searchForAdminTask").value;
    let tasks = allTasks;
    var tableBody = document.querySelector("#myTableA tbody");

    //Clear existing rows
    tableBody.innerHTML = "";

    if (searchForAdminTask.trim() !== "") 
    {
        tasks = tasks.filter(function(item) 
        {
            return (item.title.includes(searchForAdminTask) || item.ID.includes(searchForAdminTask) || item.teacherName.includes(searchForAdminTask));
        });
    } 
    //No else condition needed here, if the search input is empty, it will display all tasks

    //Iterate through dataList and create table rows
    tasks.forEach(function(item) 
    {
        var row = document.createElement("tr");

        //Create table cells and populate with data
        var idCell = document.createElement("td");
        idCell.textContent = item.ID;

        var titleCell = document.createElement("td");
        titleCell.textContent = item.title;

        var teacherCell = document.createElement("td");
        teacherCell.textContent = item.teacherName;

        var pCell = document.createElement("td");
        let priority = "";
        switch (item.priority)
        {
            case 1:
                priority = "High";
                break;
            case 2:
                priority = "Medium";
                break;
            case 3:
                priority = "Low";
                break;
        }
        pCell.textContent = priority;

        var buttonsCell = document.createElement("td")
        buttonsCell.className = "tablebtns";

        var editBtn = document.createElement("i");
        editBtn.className = "bx bxs-edit-alt";
        editBtn.style = "margin-right: 7px";
        editBtn.onclick = function() 
        {
            location.href = "EditTask.html?id=" + item.ID;
        }

        var deleteBtn = document.createElement("i");
        deleteBtn.className = "bx bxs-trash-alt";
        deleteBtn.onclick = function() 
        {
            DeleteTask(item.ID);
        }

        buttonsCell.appendChild(editBtn);
        buttonsCell.appendChild(deleteBtn);

        //Append cells to the row
        row.appendChild(buttonsCell);
        row.appendChild(idCell);
        row.appendChild(titleCell);
        row.appendChild(teacherCell);
        row.appendChild(pCell);

        //Append row to table body
        tableBody.appendChild(row);
    });
}



if (location.href.includes("Edit"))
{
    const urlParams = new URLSearchParams(window.location.search);
    const Id = urlParams.get("id");
    PreEditTask(Id);
}

function PreEditTask(Id)
{
    let CurrentAdmin = JSON.parse(localStorage.getItem(nameForCurrentAdmin));
    for (var i = 0; i < CurrentAdmin.taskList.length; i++) 
    {
        if (CurrentAdmin.taskList[i].ID == Id) 
        {
            document.getElementById("id").value = CurrentAdmin.taskList[i].ID;
            document.getElementById("title").value = CurrentAdmin.taskList[i].title;
            document.getElementById("teacher").value = CurrentAdmin.taskList[i].teacherName;
            document.getElementById("description").textContent = CurrentAdmin.taskList[i].description;
        
            switch (CurrentAdmin.taskList[i].priority)
            {
                case 1:
                    document.getElementById("high").checked = true;
                    break;
                case 2:
                    document.getElementById("medium").checked = true;
                    break; 
                case 3:
                    document.getElementById("low").checked = true;
                    break;                   
            }
            break;
        }
    }
}



function EditTask(event) 
{
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const Id = urlParams.get("id");
    let Tlist = [];
    Tlist = JSON.parse(localStorage.getItem(nameForTeacherListInLS)) || [];
    let Alist = [];
    Alist = JSON.parse(localStorage.getItem(nameForAdminsListInLS)) || [];
    var CurrentAdmin = JSON.parse(localStorage.getItem(nameForCurrentAdmin));

    let task = new Task();
    task.ID = document.getElementById("id").value;
    task.title = document.getElementById("title").value;
    task.description = document.getElementById("description").value;
    var pr = 0;
    if (document.getElementById("low").checked) 
    {
        pr = 3;
    } 
    else if (document.getElementById("medium").checked) 
    {
        pr = 2;
    } 
    else if (document.getElementById("high").checked) 
    {
        pr = 1;
    }
    task.createdBy = CurrentAdmin.name;
    task.priority = pr;
    task.teacherName = document.getElementById("teacher").value;

    for (var i = 0; i < CurrentAdmin.taskList.length; i++) 
    {
        if (CurrentAdmin.taskList[i].ID == Id) 
        {
            let tname = CurrentAdmin.taskList[i].teacherName;

            //Delete from teacher first if the name of the teacher is not the same
            if (tname !== task.teacherName) 
            {
                var deletedFromTeacher = false;
                for (let j = 0; j < Tlist.length; j++) 
                {
                    //Deleting the task from teacher
                    if (Tlist[j].name == tname) 
                    {
                        for (let k = 0; k < Tlist[j].taskList.length; k++) 
                        {
                            if (Tlist[j].taskList[k].ID == Id) {
                                Tlist[j].taskList.splice(k, 1);
                                deletedFromTeacher = true;
                                break;
                            }
                        }
                        if (deletedFromTeacher) break;
                    }
                }

                //Add to teacher
                var found = false;
                for (var j = 0; j < Tlist.length; j++) 
                {
                    if (Tlist[j].name === task.teacherName) 
                    {
                        Tlist[j].taskList.push(task);
                        localStorage.setItem(nameForTeacherListInLS, JSON.stringify(Tlist));
                        found = true;
                        break;
                    }
                }
                if (!found) 
                {
                    window.alert("There are no teachers with the name " + task.teacherName);
                    return;
                }
            }
            CurrentAdmin.taskList[i] = task;
            localStorage.setItem(nameForCurrentAdmin, JSON.stringify(CurrentAdmin));
            i = Alist.findIndex((item) => item.name == CurrentAdmin.name);
            Alist[i] = CurrentAdmin;
            localStorage.setItem(nameForAdminsListInLS, JSON.stringify(Alist));
            break;
        }
    }
    window.location.href = "ViewAdminTasks.html";
}



function DeleteTask(Id) 
{
    let CurrentAdmin = JSON.parse(localStorage.getItem(nameForCurrentAdmin));
    let Tlist = JSON.parse(localStorage.getItem(nameForTeacherListInLS));
    let Alist = JSON.parse(localStorage.getItem(nameForAdminsListInLS));

    for (var i = 0; i < CurrentAdmin.taskList.length; i++) 
    {
        if (CurrentAdmin.taskList[i].ID == Id) 
        {
            tname = CurrentAdmin.taskList[i].teacherName;

            //Delete from teacher first
            for (let j = 0; j < Tlist.length; j++) 
            {
                if (Tlist[j].name == tname) 
                {
                    for (let k = 0; k < Tlist[j].taskList.length; k++) 
                    {
                        if (Tlist[j].taskList[k].ID == Id) 
                        {
                            Tlist[j].taskList.splice(k, 1);
                            localStorage.setItem(nameForTeacherListInLS,JSON.stringify(Tlist));
                            break;
                        }
                    }
                    break;
                }
            }

            //Delete from adminlist
            CurrentAdmin.taskList.splice(i, 1);
            localStorage.setItem(nameForCurrentAdmin, JSON.stringify(CurrentAdmin));
            i = Alist.findIndex((item) => item.name == CurrentAdmin.name);
            Alist[i] = CurrentAdmin;
            localStorage.setItem(nameForAdminsListInLS, JSON.stringify(Alist));
            break;
        }
    }
    window.location.href = "ViewAdminTasks.html";
}



function ToggleFilter() 
{
    var FilterList = document.getElementById("filterList");
    if (FilterList.style.height === "0px") 
    {
        FilterList.style.height = "252.9px";
    } 
    else 
    {
        FilterList.style.height = "0px";
    }
}


function PopulateTeacherTable() 
{
    var allTasks = [];
    allTasks = JSON.parse(localStorage.getItem(nameForCurrentTeacher)).taskList;

    //Retrieve the search value inside the function
    var searchForTeacherTask = document.getElementById("searchForTeacherTask").value;
    let tasks = allTasks;
    let tableBody = document.querySelector("#myTableT tbody");
    const selectElement = document.getElementById("filter");
    const selectedValue1 = selectElement.selectedOptions[0].value;

    //Clear existing rows
    tableBody.innerHTML = "";

    if (selectedValue1 === "low") 
    {
        tasks = tasks.filter(function(item) 
        {
            return (item.priority === 3);
        });
        const selectedValue2 = selectElement.selectedOptions[1];
        if (selectedValue2)
        {
            if (selectedValue2.value === "uncompleted")
            {
                tasks = tasks.filter(function(item) 
                {
                    return (item.status === false);
                });
            }
            else if (selectedValue2.value === "completed")
            {
                tasks = tasks.filter(function(item) 
                {
                    return (item.status === true);
                });
            }
        }
    }
    else if (selectedValue1 === "medium")
    {
        tasks = tasks.filter(function(item) 
        {
            return (item.priority === 2);
        });
        const selectedValue2 = selectElement.selectedOptions[1];
        if (selectedValue2)
        {
            if (selectedValue2.value === "uncompleted")
            {
                tasks = tasks.filter(function(item) 
                {
                    return (item.status === false);
                });
            }
            else if (selectedValue2.value === "completed")
            {
                tasks = tasks.filter(function(item) 
                {
                    return (item.status === true);
                });
            }
        }
    }
    else if (selectedValue1 === "high") 
    {
        tasks = tasks.filter(function(item) 
        {
            return (item.priority === 1);
        });
        const selectedValue2 = selectElement.selectedOptions[1];
        if (selectedValue2)
        {
            if (selectedValue2.value === "uncompleted")
            {
                tasks = tasks.filter(function(item) 
                {
                    return (item.status === false);
                });
            }
            else if (selectedValue2.value === "completed")
            {
                tasks = tasks.filter(function(item) 
                {
                    return (item.status === true);
                });
            }
        }
    }
    else if (selectedValue1 === "uncompleted") 
    {
        tasks = tasks.filter(function(item) 
        {
            return (item.status === false);
        });
        const selectedValue2 = selectElement.selectedOptions[1];
        if (selectedValue2)
        {
            if (selectedValue2.value === "low")
            {
                tasks = tasks.filter(function(item) 
                {
                    return (item.priority === 3);
                });
            }
            else if (selectedValue2.value === "medium")
            {
                tasks = tasks.filter(function(item) 
                {
                    return (item.priority === 2);
                });
            }
            else if (selectedValue2.value === "high")
            {
                tasks = tasks.filter(function(item) 
                {
                    return (item.priority === 1);
                });
            }
        }
    }
    else if (selectedValue1 === "completed") 
    {
        tasks = tasks.filter(function(item) 
        {
            return (item.status === true);
        });
        const selectedValue2 = selectElement.selectedOptions[1];
        if (selectedValue2)
        {
            window.alert(selectedValue2.value);
            if (selectedValue2.value === "low")
            {
                tasks = tasks.filter(function(item) 
                {
                    return (item.priority === 3);
                });
            }
            else if (selectedValue2.value === "medium")
            {
                tasks = tasks.filter(function(item) 
                {
                    return (item.priority === 2);
                });
            }
            else if (selectedValue2.value === "high")
            {
                tasks = tasks.filter(function(item) 
                {
                    return (item.priority === 1);
                });
            }
        }
    }

    if (searchForTeacherTask.trim() !== "") 
    {
        tasks = tasks.filter(function(item) 
        {
            return (item.title.includes(searchForTeacherTask) || item.ID.includes(searchForTeacherTask) || item.createdBy.includes(searchForTeacherTask));
        });
    }
    //No else condition needed here, if the search input is empty, it will display all tasks

    //Iterate through dataList and create table rows
    tasks.forEach(function (item) 
    {
        var row = document.createElement("tr");

        //Create table cells and populate with data
        var idCell = document.createElement("td");
        idCell.textContent = item.ID;
        idCell.onclick = function()
        {
            location.href = "ViewTaskDetails.html?id=" + item.ID;
        }

        var titleCell = document.createElement("td");
        titleCell.textContent = item.title;
        titleCell.onclick = function()
        {
            location.href = "ViewTaskDetails.html?id=" + item.ID;
        }

        var adminCell = document.createElement("td");
        adminCell.textContent = item.createdBy;
        adminCell.onclick = function()
        {
            location.href = "ViewTaskDetails.html?id=" + item.ID;
        }

        var pCell = document.createElement("td");
        let priority = "";
        switch (item.priority) 
        {
            case 1:
                priority = "High";
                break;
            case 2:
                priority = "Medium";
                break;
            case 3:
                priority = "Low";
                break;
        }
        pCell.textContent = priority;
        pCell.onclick = function()
        {
            location.href = "ViewTaskDetails.html?id=" + item.ID;
        }
    
        var buttonsCell = document.createElement("td")
        buttonsCell.className = "tablebtns";
    
        var statusBtn = document.createElement("input");
        statusBtn.id = "completedTask";
        statusBtn.type = "checkbox";
        statusBtn.value = "completed";
        statusBtn.onclick = function () 
        {
            ChangeTaskStatus(item.ID);
        }
        if (item.status === true)
        {
            statusBtn.checked = true;
        }
        else
        {
            statusBtn.checked = false;
        }
        buttonsCell.appendChild(statusBtn);
    
        //Append cells to the row
        row.appendChild(buttonsCell);
        row.appendChild(idCell);
        row.appendChild(titleCell);
        row.appendChild(pCell);
        row.appendChild(adminCell);

        //Append row to table body
        tableBody.appendChild(row);
    });
}



if (location.href.includes("ViewTaskDetails"))
{
    const urlParams = new URLSearchParams(window.location.search);
    const Id = urlParams.get("id");
    ViewTask(Id);
}

function ViewTask(Id)
{
    let CurrentAdmin = JSON.parse(localStorage.getItem(nameForCurrentAdmin));
    for (var i = 0; i < CurrentAdmin.taskList.length; i++) 
    {
        if (CurrentAdmin.taskList[i].ID == Id) 
        {
            document.getElementById("id").value = CurrentAdmin.taskList[i].ID;
            document.getElementById("title").value = CurrentAdmin.taskList[i].title;
            document.getElementById("teacher").value = CurrentAdmin.taskList[i].teacherName;
            document.getElementById("description").textContent = CurrentAdmin.taskList[i].description;
        
            switch (CurrentAdmin.taskList[i].priority)
            {
                case 1:
                    document.getElementById("high").checked = true;
                    break;
                case 2:
                    document.getElementById("medium").checked = true;
                    break; 
                case 3:
                    document.getElementById("low").checked = true;
                    break;                   
            }
            break;
        }
    }
}



function ChangeTaskStatus(Id)
{
    let Tlist = JSON.parse(localStorage.getItem(nameForTeacherListInLS));
    let CurrentTeacher = JSON.parse(localStorage.getItem(nameForCurrentTeacher));

    for (var i = 0; i < Tlist.length; i++) 
    {
        if (Tlist[i].name === CurrentTeacher.name)
        {
            for (let j = 0; i < Tlist[i].taskList.length; j++) 
            {
                if (Tlist[i].taskList[j].ID == Id) 
                {
                    if (Tlist[i].taskList[j].status == false)
                    {
                        Tlist[i].taskList[j].status = true;
                        CurrentTeacher.taskList[j].status = true;
                    }
                    else
                    {
                        Tlist[i].taskList[j].status = false;
                        CurrentTeacher.taskList[j].status = false;
                    }
                    break;
                }
            }
            break;
        }
    }

    localStorage.setItem(nameForCurrentTeacher,JSON.stringify(CurrentTeacher));
    localStorage.setItem(nameForTeacherListInLS,JSON.stringify(Tlist))
    window.location.href = "ViewTeacherTasks.html";
}



if(location.href.includes("ViewAdminTasks"))
{
    PopulateAdminTable();
}
else if(location.href.includes("ViewTeacherTasks"))
{
        PopulateTeacherTable();
}