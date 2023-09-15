const tableBody = document.getElementById('table-body');
const nameInput=document.getElementById('name');
const emailInput=document.getElementById('email');
const phoneInput=document.getElementById('phone');
const usernameInput=document.getElementById('username');

// Try to fetch data from API
let userData= JSON.parse(localStorage.getItem('users'));
if(userData)
{
  renderTable(userData);
}
else
{
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    // Store the data in local storage
    localStorage.setItem('users', JSON.stringify(data));
// Render the data in the table
    renderTable(data);
    console.log(data);
  });
  
}
// Function to render the table
function renderTable(data) {
  data.map((user, index) => {
    const row = document.createElement('tr');
    // row.innerHTML =
    //   `
    //                 <td>${index + 1}</td>
    //                 <td>${user.name}</td>
    //                 <td>${user.email}</td>
    //                 <td>${user.phone}</td>
    //                 <td>${user.username}</td>
    //                 <td>
    //                     <a href="#">Edit</a> 
    //                     <a href="#">Delete</a>
    //                 </td>
    //             `;
    // tableBody.appendChild(row);

  });
}

let id = null;
selectData(); 

function manageData() {
  document.getElementById('msg').innerHTML = "";
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let username = document.getElementById('username').value;

  if (name == '') {
    document.getElementById('msg').innerHTML = 'Please enter your name!';
  } 
  else if (email == '') {
    document.getElementById('msg').innerHTML = 'Please enter your email!';
  } 
  else if (phone == '') {
    document.getElementById('msg').innerHTML = 'Please enter your phone number!';
  }
  else if (username == '') {
    document.getElementById('msg').innerHTML = 'Please enter your username!';
  } 
  else {
    console.log(id);
    let data = {
      name: name,
      email: email,
      phone: phone,
      username:username
    };

    if (id == null) {
      console.log(id)
      let arr = getCrudData();
      if (arr == null) {
        let dataArr = [data];
        setCrudData(dataArr);
      } else {
        arr.unshift(data);
        setCrudData(arr);
      }
      document.getElementById('msg').innerHTML = 'Data added !';
    } else {
      let arr = getCrudData();
      arr[id] = data;
      setCrudData(arr);
      document.getElementById('msg').innerHTML = 'Data updated !';
    }
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('username').value = '';
    id = null;
    selectData();
  }
}
// ..............
// function viewData(id){
//   fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(response => response.json())
//   .then(data => {
//     // Store the data in local storage
//     localStorage.setItem('users', JSON.stringify(data));
// // Render the data in the table
//     renderTable(data);
//   });

function selectData() {
  let arr = getCrudData();
  if (arr != null) {
    let html = '';
    let sno = 1;
    for (let k in arr) {
      html += `<tr>
          <td>${sno}</td>
          <td>${arr[k].name}</td>
          <td>${arr[k].email}</td>
          <td>${arr[k].phone}</td>
          <td>${arr[k].username}</td>

          <td>
          <a href="post_page.html" onclick="viewData()">View</a>
            &nbsp;
            <a href="javascript:void(0)" onclick="editData(${k})">Edit</a>
            &nbsp;
            <a href="javascript:void(0)" onclick="deleteData(${k})">Delete</a>
          </td>
        </tr>`;
      sno++;
    }
    document.getElementById('root').innerHTML = html;
    setCrudData(arr);
    
  }
}
function editData(rid) {
  id = rid;
  let arr = getCrudData();
  document.getElementById('name').value = arr[rid].name;
  document.getElementById('email').value = arr[rid].email;
  document.getElementById('phone').value = arr[rid].phone;
  document.getElementById('username').value = arr[rid].username;
}
function deleteData(rid) {
  let arr = getCrudData();
  arr.splice(rid, 1);
  setCrudData(arr);
  selectData();
}
function setCrudData(arr) {
   localStorage.setItem('users',JSON.stringify(arr));

}
function getCrudData() {
  let arr = JSON.parse(localStorage.getItem('users'));
 return arr;
}
// ............>

