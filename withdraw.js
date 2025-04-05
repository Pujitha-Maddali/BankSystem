function withdrawMoney() {
    const accountNumber = document.getElementById("accountNumber").value.trim();
    const withdrawAmount = parseFloat(document.getElementById("withdrawAmount").value);
    const message = document.getElementById("message");

    if (!accountNumber || isNaN(withdrawAmount) || withdrawAmount <= 0) {
        showMessage("Please enter a valid account number and withdrawal amount.", "error");
        return;
    }

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    let account = accounts.find(acc => acc.accountNumber === accountNumber);

    if (!account) {
        showMessage("Account not found!", "error");
        return;
    }

    if (withdrawAmount > account.balance) {
        showMessage("Insufficient balance!", "error");
        return;
    }

    account.balance -= withdrawAmount;

    localStorage.setItem("accounts", JSON.stringify(accounts));

    showMessage(`✅ ₹${withdrawAmount} withdrawn successfully! New Balance: ₹${account.balance}`, "success");

    // Clear fields
    document.getElementById("accountNumber").value = "";
    document.getElementById("withdrawAmount").value = "";
}

function showMessage(msg, type) {
    const message = document.getElementById("message");
    message.textContent = msg;
    message.style.color = type === "error" ? "red" : "green";
    message.style.fontWeight = "bold";
    message.style.marginTop = "15px";
}
