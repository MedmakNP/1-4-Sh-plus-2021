let usersTable = document.getElementById("usersTable")


 async function DataTable(config) {
    let table = document.createElement('table');
    table.classList.add('table')
    let tHead = document.createElement('thead')
    let tr = document.createElement('tr'); 
    table.appendChild(tHead);
    tHead.appendChild(tr);
  for(i = 0;i<config.columns.length;i++){
    let th = document.createElement("th")
    th.innerHTML = config.columns[i].title
    tr.appendChild(th)
  }
  let tbody = document.createElement("tbody")
  table.insertAdjacentElement('beforeend', tbody);
 if(config.apiUrl != undefined){
    const urlApi = config.apiUrl;
   const  response = await fetch(urlApi);
    const data = await response.json();
 
  for(i = 0;i < Object.keys(data.data).length;i++){
    let btnDel = document.createElement('button')
    btnDel.innerHTML = 'Delete'
    btnDel.classList.add('btnDel')
    btnDel.id = Object.keys(data.data)[i];
    let btnId = btnDel.id;
    btnDel.addEventListener('click',() =>{
      deleteUser(btnId)
    });
    

    let row = document.createElement("tr")
    let objValue = Object.values(Object.values(data.data)[i]);
    for(j = 0;j < objValue.length;j++){
      let td = document.createElement('td')
      td.innerHTML = objValue[j]
      row.appendChild(td)
      td.classList.add('td')
      
    }
    row.appendChild(btnDel);
    tbody.appendChild(row)
  }
 let btnAdd = document.createElement("button")
      btnAdd.classList.add("btnAdd")
      btnAdd.innerHTML = 'Add user +'
      table.insertAdjacentElement('afterbegin', btnAdd)
      btnAdd.addEventListener("click", () =>{
        let rowAdd = document.createElement("tr")
        let btnCreate = document.createElement("button")
        btnCreate.classList.add("tdCreate")
        btnCreate.innerHTML = "Create user"
        
        for( let el of config.columns ){
          let tdAdd = document.createElement("td")
          let input = document.createElement("input")
          input.classList.add('inputs');
          input.placeholder = el.value;
          input.name = el.value;


          if(el.value === 'birthday'){
            input.type = 'date'
          }
          tdAdd.appendChild(input)
          
          tdAdd.classList.add("td")
          rowAdd.appendChild(tdAdd)
          
          input.addEventListener("input", () =>{
            input.classList.add("filed")
            input.classList.remove("empty") 
         }) 
         if(!input.classList.contains('filed')){
          input.classList.add('empty');
        }
        }
        btnCreate.addEventListener("click",() => {
          let newUser = {}
          let inputs = document.querySelectorAll(".inputs")
          for(let inp of inputs)
          {
            if(inp.classList.contains('empty'))
            {
              inp.placeholder = "Enter data"
            }
            else{
              newUser[inp.name] = inp.value
              addNewUser(config.apiUrl, newUser).then(()=>{
              window.location.reload()
              });
            }
          }
        })
        rowAdd.appendChild(btnCreate)
        tbody.insertAdjacentElement('afterbegin', rowAdd)
        
      })
  
 }
 usersTable.appendChild(table)
}

const config1 = {
  parent: '#usersTable',
  columns: [
    {title: 'Имя', value: 'name'},
    {title: 'Фамилия', value: 'surname'},
    {title: 'Аватар', value: 'avatar'},
    {title: 'День рождения', value: 'birthday'},
  ],
  apiUrl: "https://mock-api.shpp.me/npanchenko/users"
};
async function deleteUser(id){
  let userUrl = `${config1.apiUrl}/${id}`
  const response = await fetch(userUrl,{method : "delete"});  
  window.location.reload()
  if(response.ok){
    return false
  }
}
async function addNewUser(url, user) {
  const response = await fetch(url, {
      method: 'POST',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(user)
  })
  if (response.ok) {
      return false;
  }
}

DataTable(config1);
