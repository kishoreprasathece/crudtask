var data = null;
var editRow = null; 
document.addEventListener('DOMContentLoaded', loadStoredData); 

function calculatenow(event) {
    event.preventDefault();
    let receiveddata = getformdata();
  

    if (editRow == null) {
        addrow(receiveddata);
        storeData(receiveddata); 
    } else {
        update(receiveddata);
        updateStoredData(receiveddata); 
    }


    editRow = null; 
}

function getformdata() {
    let receiveddata = {};
    receiveddata['dob'] = document.getElementById('dob').value;
    receiveddata['description'] = document.getElementById('description').value;
    receiveddata['income'] = parseFloat(document.getElementById('income').value);
    receiveddata['expense'] = parseFloat(document.getElementById('expense').value);
    return receiveddata;
}

function addrow(data) {
    let table = document.getElementById('put').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.length);

    let cell1 = newRow.insertCell(0);
    cell1.innerText = data.dob;

    let cell2 = newRow.insertCell(1);
    cell2.innerText = data.description;

    let cell3 = newRow.insertCell(2);
    cell3.innerText = data.income;

    let cell4 = newRow.insertCell(3);
    cell4.innerText = data.expense;

    let total = data.income - data.expense;
    let cell5 = newRow.insertCell(4);
    cell5.innerText = total;

    let cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button  onClick="onEdit(this)">Edit</button> <button id="edit" onClick="onDelete(this)">Delete</button>`;
    updateTotals();
}

function resetdata() {
    document.getElementById('dob').value = '';
    document.getElementById('description').value = '';
    document.getElementById('income').value = '';
    document.getElementById('expense').value = '';
}

function onEdit(td) {
    editRow = td.parentElement.parentElement; 

    document.getElementById('dob').value = editRow.cells[0].innerText;
    document.getElementById('description').value = editRow.cells[1].innerText;
    document.getElementById('income').value = editRow.cells[2].innerText;
    document.getElementById('expense').value = editRow.cells[3].innerText;
}

function update(receiveddata) {

    editRow.cells[0].innerText = receiveddata.dob;
    editRow.cells[1].innerText = receiveddata.description;
    editRow.cells[2].innerText = receiveddata.income;
    editRow.cells[3].innerText = receiveddata.expense;

    let total = receiveddata.income - receiveddata.expense;
    editRow.cells[4].innerText = total;
    updateTotals();
}

function onDelete(td) {
    if (confirm('Are you sure you want to delete this record?')) {
        let row = td.parentElement.parentElement;
        document.getElementById('put').deleteRow(row.rowIndex);


        deleteStoredData(row.rowIndex);
    }
    updateTotals();
}

// Store new data in localStorage
function storeData(receiveddata) {
    let storedData = JSON.parse(localStorage.getItem('incomeExpenseData')) || [];
    storedData.push(receiveddata);
    localStorage.setItem('incomeExpenseData', JSON.stringify(storedData));
}

// Load data from localStorage
function loadStoredData() {
    let storedData = JSON.parse(localStorage.getItem('incomeExpenseData')) || [];
    storedData.forEach(data => addrow(data)); // Populate table with stored data
}

// Update edited data in localStorage
function updateStoredData(receiveddata) {
    let storedData = JSON.parse(localStorage.getItem('incomeExpenseData')) || [];
    let index = editRow.rowIndex - 1; // Assuming 1st row is header
    storedData[index] = receiveddata;
    localStorage.setItem('incomeExpenseData', JSON.stringify(storedData));
}

// Delete a row's data from localStorage
function deleteStoredData(rowIndex) {
    let storedData = JSON.parse(localStorage.getItem('incomeExpenseData')) || [];
    storedData.splice(rowIndex - 1, 1); // Adjust index for the table header
    localStorage.setItem('incomeExpenseData', JSON.stringify(storedData));
}
function updateTotals() {
    let table = document.getElementById('put').getElementsByTagName('tbody')[0];
    let totalIncome = 0;
    let totalExpense = 0;

    // Loop through all rows in the table
    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        let incomeValue = parseFloat(row.cells[2].innerText) || 0; // Get income from each row
        let expenseValue = parseFloat(row.cells[3].innerText) || 0; // Get expense from each row

        totalIncome += incomeValue;
        totalExpense += expenseValue;
    }

    let netWorth = totalIncome - totalExpense;

    // Update net income, net expense, and net worth
    document.getElementById('netincome').innerText = `${totalIncome}`;
    document.getElementById('netexpense').innerText = `${totalExpense}`;
    document.getElementById('networth').innerText = `${netWorth}`;
}
