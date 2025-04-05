function depositMoney() {
    const accountNumber = document.getElementById("accountNumber").value.trim();
    const depositAmount = parseFloat(document.getElementById("depositAmount").value);
    const message = document.getElementById("message");

    if (!accountNumber || isNaN(depositAmount) || depositAmount <= 0) {
        showMessage("Please enter a valid account number and deposit amount.", "error");
        return;
    }

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    let account = accounts.find(acc => acc.accountNumber === accountNumber);

    if (!account) {
        showMessage("Account not found!", "error");
        return;
    }

    account.balance += depositAmount;

    localStorage.setItem("accounts", JSON.stringify(accounts));

    showMessage(`✅ ₹${depositAmount} deposited successfully! New Balance: ₹${account.balance}`, "success");

    // Clear fields
    document.getElementById("accountNumber").value = "";
    document.getElementById("depositAmount").value = "";
}

function showMessage(msg, type) {
    const message = document.getElementById("message");
    message.textContent = msg;
    message.style.color = type === "error" ? "red" : "green";
    message.style.fontWeight = "bold";
    message.style.marginTop = "15px";
}
