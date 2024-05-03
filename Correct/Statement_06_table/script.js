const form = document.getElementById("inputForm")
form.addEventListener("submit", formSubmit)

function createTable(input) { // [rows, columns, startIndex]
    let table = []
    for (let row = 0; row < input[0]; row++) {
        table.push([])
    }

    let count = input[2]
    for(let j = 0; j < input[1]; j++) {
        table[0][j] = count++
        for(let i = 0; i < input[0]; i++) {
            table[i][j] = (i + 1) * table[0][j]
        }
    }
    return table;
}

function multiply(table1, table2) {
    let table = []
    for (let i = 0; i < table1.length; i++) {
        let row = []
        for (let j = 0; j < table1[0].length; j++) {
            if (table1[i][j] != table2[i][j])
                row.push(table1[i][j] * table2[i][j])
            else {
                row.push(table1[i][j])
            }
        }
        table.push(row)
    }

    return table
}

function displayTable(table, id) {
    const tableOutput = document.getElementById(id)

    let html = "";
    for (let i = 0; i < table.length; i++) {
        html += "<tr>";
        for (let j = 0; j < table[0].length; j++) {
            html += "<td>";
            html += table[i][j]
            html += "</td>";
        }
        html += "</tr>";
    }

    tableOutput.innerHTML = html;
}

function formSubmit(event) {
    event.preventDefault()

    let input1 = form.input1.value;
    let input2 = form.input2.value;

    input1 = input1.split("#");
    input2 = input2.split("#");

    let table1 = createTable(input1);
    let table2 = createTable(input2);
    console.table(table1)
    console.table(table2)

    let table3 = multiply(table1, table2)
    console.table(table3)

    // displaying tables
    displayTable(table1, "table1")
    displayTable(table2, "table2")
    displayTable(table3, "table3")
}