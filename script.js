const hideTransactions = document.querySelector('#hideTransactions')
const transactionsUl = document.querySelector('#transactions')
const inputNameTransaction = document.querySelector('#text')
const inputAmountTransaction = document.querySelector('#amount')
const inputNameCategory = document.querySelector('#nameCategory')
const balance = document.querySelector('#balance')
const moneyPlus = document.querySelector('#money-plus')
const moneyMinus = document.querySelector('#money-minus')
const transactionsLocalStorage = JSON.parse(localStorage.getItem('transactionsST'))
let transactionsST = (transactionsLocalStorage != null)? transactionsLocalStorage : []

const deleteTransaction = (index) => {
  const category = transactionsST[index].category
  const amount = transactionsST[index].amount
  transactionsST = transactionsST.filter(el => transactionsST[index] != el)
  creatArrayCategory(category, amount)
  init()
}

const updateTransactionIntoDOM = transaction => {
  const name = transaction.name
  const amount = Math.abs(transaction.amount)
  const typeClass = (transaction.amount < 0)? 'minus' : 'plus'
  const operation = (transaction.amount < 0)? '-' : '+'
  const index = transactionsST.indexOf(transaction)

  const li = document.createElement('li')
  li.classList.add(typeClass)
  li.innerHTML = `
  ${name} <span>${operation} R$${amount}</span> <button class="delete-btn" onclick="deleteTransaction(${index})">x</button>
  `

  transactionsUl.append(li)
}


const updateValueDashboard = () => {
  const amountArray = transactionsST
    .map(element => element.amount)
  const total = amountArray
    .reduce((accumulation, number) => accumulation + number, 0)
    .toFixed(2)
  const income = amountArray
    .filter(element => element >= 0)
    .reduce((accumulation, number) => accumulation + number, 0)
    .toFixed(2)
  const expense = Math.abs(amountArray
    .filter(element => element < 0)
    .reduce((accumulation, number) => accumulation + number, 0))
    .toFixed(2)

  balance.textContent = `R$ ${total}`
  moneyPlus.textContent = `+ R$ ${income}`
  moneyMinus.textContent = `- R$ ${expense}`
}


const generateNumber = () => Math.floor(Math.random() * 1000)


const doSubmit = () => {
  const name = inputNameTransaction.value
  const amount = Number(inputAmountTransaction.value)
  const ident = generateNumber()
  const category = inputNameCategory.value

  if (name.length == 0 || inputAmountTransaction.value.length == 0 || category.length == 0) {
    window.alert('Preencha os dados corretamente!')
    return
  }
  const transaction = {id: ident, name: name, amount: amount, category: category}
  transactionsST.unshift(transaction)
  
  inputNameTransaction.value = ''
  inputAmountTransaction.value = ''
  inputNameCategory.value = ''
  checkCategory(transaction)
  init()
}


form.addEventListener('submit', el => {
  el.preventDefault()
  doSubmit()
})


const updateLocalStorage = () => {
  localStorage.setItem('transactionsST', JSON.stringify(transactionsST)) 
}


const hide = () => {
  if (hideTransactions.textContent == '-') {
    transactionsUl.classList.add('add-none')
    hideTransactions.textContent = '+'
  } else {
    transactionsUl.classList.remove('add-none')
    hideTransactions.textContent = '-'
  }
}


const init = () => {
  transactionsUl.innerHTML = ''
  transactionsST.forEach(updateTransactionIntoDOM)
  updateValueDashboard()
  updateLocalStorage()
}
init()

