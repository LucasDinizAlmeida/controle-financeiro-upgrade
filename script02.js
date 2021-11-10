const containerIncome = document.querySelector('#containerIncome')
const containerExpense = document.querySelector('#containerExpense')
let categoryArray = []

const updateCategoryLocalStorage = () => {
  if (transactionsST.length != 0) {
    transactionsST.forEach(checkCategory)
  }
}


const updateUlTransactionIntoDOM = transaction => {
  const parentContainer = (transaction.amount < 0)? containerExpense: containerIncome
  const name = transaction.name
  const amount = Math.abs(transaction.amount)
  const operation = (transaction.amount < 0)? '-' : '+'
  const category = transaction.category
  const typeClass = (transaction.amount < 0)? 'minus' : 'plus'
  const ident = transaction.id
  
  const li = document.createElement('li')
  li.classList.add(typeClass)
  li.innerHTML = `${name} <span>${operation} R$${amount}</span><buttom class="delete-btn" onclick="discoverTransactionIndex(${ident})">x</buttom>`
  
  parentContainer.children[category].appendChild(li)
}


const discoverTransactionIndex = (ident) => {
  const transaction = transactionsST.filter(el => el.id === ident)
  const index = transactionsST.indexOf(transaction[0])
  deleteTransaction(index)
}


const deleteUlCategorys = (category, amount) => {
  const parentContainer = (amount < 0)? containerExpense : containerIncome
  const ul = parentContainer.children[category]
  parentContainer.removeChild(ul)

  categoryArray = categoryArray.filter(el => el != category)
}


const creatArrayCategory = (category, amount) => {
  const container = (amount < 0)? containerExpense : containerIncome
  container.children[category].innerHTML = `<strong>${category}</strong>`
  const newArray = transactionsST.filter( el => el.category == category)
  
  if (newArray.length === 0) {
    deleteUlCategorys(category, amount)
    return
  }
  newArray.forEach(updateUlTransactionIntoDOM)

}

const creatUlIntoDOM = transaction => {
  const parentContainer = (transaction.amount < 0)? containerExpense : containerIncome
  
  const ul = document.createElement('ul')
  const ident = document.createAttribute('id')
  ident.textContent = transaction.category
  ul.setAttributeNode(ident)
  ul.classList.add('transactions')

  parentContainer.appendChild(ul)

  creatArrayCategory(transaction.category, transaction.amount)
}


const checkCategory = transaction => {
  const category = transaction.category
  const amount = transaction.amount

  if (categoryArray.indexOf(category) == -1) {
    categoryArray.push(category)
    creatUlIntoDOM(transaction)
    return
  }
  creatArrayCategory(category, amount)
}

updateCategoryLocalStorage()