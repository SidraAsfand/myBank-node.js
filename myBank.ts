#! /usr/bin/env node

import inquirer from "inquirer"
//Bank Account Interface
interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance():void

}
// Bank Account  Class
class BankAccount  implements BankAccount{
  accountNumber: number;
  balance: number;
  constructor(accountNumber:number, balance:number){
    this.accountNumber =  accountNumber
    this.balance = balance

  }
  //Debit money
  withdraw(amount : number): void {
    if (this.balance  >= amount){
      this.balance-=amount
    console.log(`Withdraw of $ ${amount} successful.Rmaining balance: $${this.balance}`);
  }
  else{
    console.log("Insufficientbalance.");
  }
  }

  //Credit money
  deposit(amount: number):void {
    if(amount> 100){
        amount -=1;// $1 feecharged ifmorethan $100 is deposited
    }this.balance +=  amount;
    console.log(`Depositof $${amount} successful. Remaining balance: $${this.balance}`)     
  }
  //check balance
  checkBalance(): void {
    console.log(`Currentbalance: $${this.balance}`);
    
  }
}
//customer class
class customer{
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber:number;
  account:BankAccount;

  constructor( firstName: string,lastName: string, gender: string, age: number, mobileNumber:number,account:BankAccount){
    this.firstName =  firstName;
    this.lastName = lastName;
    this.gender =  gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account
  }
  
}

//Create BankAcccount
const accounts: BankAccount [] = [
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 2000)
];

//  Createcustomers
const customers: customer []= [
  new customer ("Hamza","khan","Male",35,316777890,accounts[0]),
  new customer ("Hadia","Hashmi","Female",26,3166658890,accounts[1]),
  new customer ("Areesha","khan","Female",21,3221113451,accounts[2])
]


//Function to interact with bank account
async function service(){
  do{
    const accountNumberInput = await inquirer.prompt({
      name : "accountNumber",
      type: "number",
      message: "Enter your account number?"
    })
    const  customer  =customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
    if(customer){
      console.log(`Welcome,${customer.firstName} ${customer.lastName}\n`)
      const ans = await inquirer.prompt([{
        name: "select",
        type: "list",
        message: "Select an operation",
        choices:  ["Deposit", "Withdraw", "Check Balance", "Exit"]
      }]);
      switch(ans.select){
        case "Deposit":
          const depositAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount  to deposit:"
          })
          customer.account.deposit(depositAmount.amount);
          break;
          case "Withdraw":
          const withdrawAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Enter the amount  to Withdraw:"
          })
          customer.account.withdraw(withdrawAmount.amount);
          break;
      case "Check Balance":
      customer.account.checkBalance();
      break;
      case "Exit":
        console.log("Existing bank program...");
        console.log("\n Thank you for using our bank services.Have a great day!");
        return;
      }
    }else{
      console.log("invalid account number.Please try  again!");
    }
  } while(true)
}
service()