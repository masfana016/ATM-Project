import inquirer from "inquirer";
const userData = {
    userId: "masfa123",
    userPin: "1234",
    balance: 100000
};
// input userId and userPin
let userInput = await inquirer.prompt([{
        type: "input",
        name: "Id",
        message: "Enter User Id"
    }, {
        type: "input",
        name: "Pin",
        message: "Enter User Pin"
    }]);
if (userInput.Id === userData.userId && userInput.Pin === userData.userPin) {
    console.log("Welcome to your account");
    showMenu();
}
else {
    console.log("Invalid User Id or Pin");
}
;
// function to display ATM menu
async function showMenu() {
    const menuChoice = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Choose an option:',
        choices: ['Check Balance', 'Withdraw', 'Deposit', 'Change PIN', 'Exit']
    });
    switch (menuChoice.option) {
        case 'Check Balance':
            console.log(`Your current balance is $${userData.balance}`);
            break;
        case 'Withdraw':
            await withdrawAmount();
            break;
        case 'Deposit':
            await depositAmount();
            break;
        case 'Change PIN':
            await changePIN();
            break;
        case 'Exit':
            console.log('Thank you for using the ATM. Goodbye!');
            process.exit(0);
            break;
        default:
            console.log('Invalid option. Please try again.');
    }
    showMenu(); // Show menu again
}
;
// Function to handle withdrawal
async function withdrawAmount() {
    const withdrawal = await inquirer.prompt({
        type: 'input',
        name: 'amount',
        message: 'Enter the amount to withdraw:'
    });
    const amount = parseFloat(withdrawal.amount);
    if (isNaN(amount) || amount <= 0) {
        console.log('Invalid amount. Please enter a valid number.');
        return;
    }
    if (amount > userData.balance) {
        console.log('Insufficient funds.');
    }
    else {
        userData.balance -= amount;
        console.log(`Withdrawal successful. Current balance: ${userData.balance}`);
    }
}
;
// Function to handle deposit
async function depositAmount() {
    const deposit = await inquirer.prompt({
        type: 'input',
        name: 'amount',
        message: 'Enter the amount to deposit:'
    });
    const amount = parseFloat(deposit.amount);
    if (isNaN(amount) || amount <= 0) {
        console.log('Invalid amount. Please enter a valid number.');
        return;
    }
    else {
        userData.balance += amount;
        console.log(`Deposit successful. Current balance: $${userData.balance}`);
    }
}
// Function to change PIN
async function changePIN() {
    const newPIN = await inquirer.prompt({
        type: 'password',
        name: 'pin',
        message: 'Enter your new PIN:'
    });
    userData.userPin = newPIN.pin;
    console.log('PIN changed successfully.');
}
;
