var data=null;
var newdata=null;
function calculatenow(event){

    let receiveddata=getformdata()
    event.preventDefault()
if(data===null){
    addrow(receiveddata)
}else if(newdata==null || newdata==data){
    onEdit(receiveddata)
}

}
function getformdata(){

let receiveddata={}

receiveddata['dob']=document.getElementById('dob').value;
receiveddata['description']=document.getElementById('description').value;
receiveddata['income']=document.getElementById('income').value;
receiveddata['expense']=document.getElementById('expense').value;

return receiveddata;
}

function addrow(data){

let table= document.getElementById('put').getElementsByTagName('tbody')[0]
let newRow=table.insertRow(table.length)

let cell1=newRow.insertCell(0)
cell1.innerText=data.dob

let cell2=newRow.insertCell(1)
cell2.innerText=data.description

let cell3=newRow.insertCell(2)
cell3.innerText=data.income

let cell4=newRow.insertCell(3)
cell4.innerText=data.expense

let cell5=newRow.insertCell(4)
cell5.innerHTML=`<button onClick="onEdit(this)" > Edit </button> <button onClick="onDelete(this)" > Delete </button> `
}

function onEdit(td) {
    // Get the row to edit
    let row = td.parentElement.parentElement;
  
   let edit= document.getElementById('put').getElementsByTagName('tbody').newRow(table.length)
   edit.innerText='';


  
    newdata = row;
    };




function onDelete(td) {
    if (confirm('Are you sure you want to delete this record?')) {
        let row = td.parentElement.parentElement;
        document.getElementById('put').deleteRow(row.rowIndex);
     
    }
}
