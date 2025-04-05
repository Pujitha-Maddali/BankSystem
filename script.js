document.addEventListener("DOMContentLoaded", () => {
    const addAccountForm = document.getElementById("addAccountForm");

    addAccountForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form reload

        // Get input values
        const holderName = document.getElementById("holderName").value;
        const accountNumber = document.getElementById("accountNumber").value;
        const initialDeposit = parseFloat(document.getElementById("initialDeposit").value);
        const accountType = document.getElementById("accountType").value;

        if (isNaN(initialDeposit) || initialDeposit < 0) {
            alert("Initial deposit must be a valid amount.");
            return;
        }

        // Create account object
        const newAccount = {
            holderName,
            accountNumber,
            balance: initialDeposit,
            accountType,
        };

        // Get existing accounts from local storage
        let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

        // Check if account number already exists
        if (accounts.some(acc => acc.accountNumber === accountNumber)) {
            alert("Account number already exists. Use a different number.");
            return;
        }

        // Add new account to the list
        accounts.push(newAccount);
        localStorage.setItem("accounts", JSON.stringify(accounts));

        alert("Account successfully created!");
        addAccountForm.reset();
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const depositForm = document.getElementById("depositForm");

    if (depositForm) {
        depositForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form reload

            const accountNumber = document.getElementById("depositAccount").value;
            const depositAmount = parseFloat(document.getElementById("depositAmount").value);

            if (isNaN(depositAmount) || depositAmount <= 0) {
                alert("Enter a valid deposit amount.");
                return;
            }

            let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

            let account = accounts.find(acc => acc.accountNumber === accountNumber);

            if (!account) {
                alert("Account not found.");
                return;
            }

            account.balance += depositAmount;

            localStorage.setItem("accounts", JSON.stringify(accounts));
            alert("Deposit successful!");

            depositForm.reset();
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const withdrawForm = document.getElementById("withdrawForm");

    if (withdrawForm) {
        withdrawForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form reload

            const accountNumber = document.getElementById("withdrawAccount").value;
            const withdrawAmount = parseFloat(document.getElementById("withdrawAmount").value);

            if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
                alert("Enter a valid withdrawal amount.");
                return;
            }

            let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

            let account = accounts.find(acc => acc.accountNumber === accountNumber);

            if (!account) {
                alert("Account not found.");
                return;
            }

            if (account.balance < withdrawAmount) {
                alert("Insufficient balance.");
                return;
            }

            account.balance -= withdrawAmount;

            localStorage.setItem("accounts", JSON.stringify(accounts));
            alert("Withdrawal successful!");

            withdrawForm.reset();
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const transferForm = document.getElementById("transferForm");

    if (transferForm) {
        transferForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form reload

            const fromAccount = document.getElementById("fromAccount").value;
            const toAccount = document.getElementById("toAccount").value;
            const transferAmount = parseFloat(document.getElementById("transferAmount").value);

            if (isNaN(transferAmount) || transferAmount <= 0) {
                alert("Enter a valid transfer amount.");
                return;
            }

            let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

            let sender = accounts.find(acc => acc.accountNumber === fromAccount);
            let receiver = accounts.find(acc => acc.accountNumber === toAccount);

            if (!sender) {
                alert("Sender's account not found.");
                return;
            }

            if (!receiver) {
                alert("Receiver's account not found.");
                return;
            }

            if (sender.balance < transferAmount) {
                alert("Insufficient balance in sender's account.");
                return;
            }

            // Perform the transfer
            sender.balance -= transferAmount;
            receiver.balance += transferAmount;

            localStorage.setItem("accounts", JSON.stringify(accounts));
            alert("Transfer successful!");

            transferForm.reset();
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const balanceForm = document.getElementById("balanceForm");

    if (balanceForm) {
        balanceForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const accountNumber = document.getElementById("balanceAccount").value;
            const result = document.getElementById("balanceResult");

            let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

            let account = accounts.find(acc => acc.accountNumber === accountNumber);

            if (!account) {
                result.textContent = "Account not found.";
                result.style.color = "red";
            } else {
                result.textContent = `Account Balance: ₹${account.balance.toFixed(2)}`;
                result.style.color = "green";
            }

            balanceForm.reset();
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const accountsTable = document.getElementById("accountsTable");

    if (accountsTable) {
        let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        const tbody = accountsTable.querySelector("tbody");

        if (accounts.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4">No accounts found.</td></tr>`;
        } else {
            accounts.forEach(account => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${account.holderName}</td>
                    <td>${account.accountNumber}</td>
                    <td>${account.accountType}</td>
                    <td>₹${account.balance.toFixed(2)}</td>
                `;
                tbody.appendChild(row);
            });
        }
    }
});
function showMessage(message, isSuccess = true) {
    const box = document.getElementById("messageBox");
    if (box) {
        box.textContent = message;
        box.className = "message-box " + (isSuccess ? "message-success" : "message-error");
        box.style.display = "block";

        // Hide after 3 seconds
        setTimeout(() => {
            box.style.display = "none";
        }, 3000);
    }
}
