
var data = null;
var newdata = data;

function calculatenow(event) {
    let receiveddata = getformdata();
    event.preventDefault();

    if (data === null) {
        addrow(receiveddata);
    } else if (newdata == null || newdata == data) {
        onEdit(receiveddata);
    }

    // Update income, expense, and total
    updateTotals(receiveddata);
}

function getformdata() {
    let receiveddata = {};

    receiveddata['dob'] = document.getElementById('dob').value;
    receiveddata['description'] = document.getElementById('description').value;
    receiveddata['income'] = parseFloat(document.getElementById('income').value) || 0;
    receiveddata['expense'] = parseFloat(document.getElementById('expense').value) || 0;

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

    newdata = null; 
}

function updateTotals(receiveddata) {
    let incomeSpan = document.getElementById('incom');
    let expenSpan = document.getElementById('expen');
    let totalSpan = document.getElementById('total');

    let currentIncome = parseFloat(incomeSpan.innerText) || 0;
    let currentExpen = parseFloat(expenseSpan.innerText) || 0;

 
    currentIncome += receiveddata.income;
    currentExpen += receiveddata.expense;

    incomeSpan.innerText = currentIncome;
    expenSpan.innerText = currentExpense;


    totalSpan.innerText = currentIncome - currentExpen;
}

function onEdit(td) {

    let row = td.parentElement.parentElement;


    document.getElementById('dob').value = row.cells[0].innerText;
    document.getElementById('description').value = row.cells[1].innerText;
    document.getElementById('income').value = row.cells[2].innerText;
    document.getElementById('expense').value = row.cells[3].innerText;

    newdata = row; 
}

function onDelete(td) {
    if (confirm('Are you sure you want to delete this record?')) {
        let row = td.parentElement.parentElement;
        document.getElementById('put').deleteRow(row.rowIndex);
        

        recalculateTotals();
    }
}

function recalculateTotals() {
    let totalIncome = 0;
    let totalExpen = 0;
    let total =0;
    let table = document.getElementById('put').getElementsByTagName('tbody')[0];
    let rows = table.getElementsByTagName('tr');

    for (let row of rows) {
        totalIncome += parseFloat(row.cells[2].innerText) || 0;
        totalExpen += parseFloat(row.cells[3].innerText) || 0;
    }

    document.getElementById('incom').innerText = totalIncome;
    document.getElementById('expen').innerText = totalExpen;
    document.getElementById('total').innerText = totalIncome - totalExpen;
}

