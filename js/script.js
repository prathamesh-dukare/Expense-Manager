let counterDiv = document.querySelector("#input");//amount field selector
let descriptionDiv = document.querySelector("#description");//amount field selector
let addBtn = document.querySelector("#add");//add btn selector
let spanText = document.querySelector("#span");//Display text in Span
let expenseArray = []; //array to save expense objects
let expenseDetails = document.querySelector("#details");
updateExpenseCounter("setZero", 0)

// controller functions
// 1.Update DOM Function
function UpdateDOM(passedexpenseArray) {
    //Map over Expensearray to Create innerHTML for List item
    let expenseDetailsHTML = passedexpenseArray.map(expense => {
        const nowMoment = String(expense.moment);
        return `<li class="list-group-item d-flex justify-content-between">
        <div class="d-flex flex-column">
            ${expense.description}
            <small class="text-muted">${nowMoment.slice(0, 25)}</small>
        </div>
        <div>
            <span class="px-5">
            ${expense.Amount}
            </span>
            <button type="button" onclick = "deleteItemHandler(${expense.moment.valueOf()})" class="btn btn-outline-danger btn-sm">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    </li>`
    })
    //Update DOM Section
    let joinedexpenseDetailsHTML = expenseDetailsHTML.join('');
    finalDetailsHTML = `<ul class="list-group">` + joinedexpenseDetailsHTML + `</ul>`;
    expenseDetails.innerHTML = finalDetailsHTML;
}
// 2.Delete item Handler Function
function deleteItemHandler(passedValue) {
    let newexpenseArray = [];
    for (let i = 0; i < expenseArray.length; i++) {
        let uniqueValue = expenseArray[i].moment.valueOf()
        if (uniqueValue !== passedValue) {
            newexpenseArray.push(expenseArray[i])
        } else {
            howMuchDeleteAmount = expenseArray[i].Amount;
            updateExpenseCounter("-", howMuchDeleteAmount)
        }
    }
    // console.log(newexpenseArray)
    UpdateDOM(newexpenseArray)
    expenseArray = newexpenseArray;
}

// 3.Function to update counter
function updateExpenseCounter(todo, passedAmount) {
    if (passedAmount == NaN) {
        passedAmount = 0;
    }
    if (todo == "+") {
        expenseCounter = expenseCounter + passedAmount
    } else if (todo == "-") {
        expenseCounter = expenseCounter - passedAmount
    } else {
        expenseCounter = 0;
    }
    spanText.innerText = expenseCounter;// Display updated total expense on DOM
}
// 4.Function Handeling addition of expense
function addCounterHandler() {
    fieldAmount = counterDiv.value;
    if (fieldAmount == "") {
        fieldAmount = 0;
    } else {
        fieldAmount = parseInt(fieldAmount)
    }
    updateExpenseCounter("+", fieldAmount)

    let expenseObj = {}; //expense objects to save amount & description
    expenseObj.Amount = fieldAmount;
    expenseObj.description = descriptionDiv.value;
    expenseObj.moment = new Date();
    expenseArray.push(expenseObj);

    UpdateDOM(expenseArray)
}
addBtn.addEventListener("click", addCounterHandler);