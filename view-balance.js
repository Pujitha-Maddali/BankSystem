function viewBalance() {
    const accountNumber = document.getElementById("accountNumber").value.trim();
    const message = document.getElementById("message");

    if (!accountNumber) {
        showMessage("Please enter a valid account number.", "error");
        return;
    }

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const account = accounts.find(acc => acc.accountNumber === accountNumber);

    if (!account) {
        showMessage("Account not found!", "error");
        return;
    }

    showMessage(`💰 Balance for ${account.holderName} (${account.accountType} Account): ₹${account.balance}`, "success");

    document.getElementById("accountNumber").value = "";
}

function showMessage(msg, type) {
    const message = document.getElementById("message");
    message.textContent = msg;
    message.style.color = type === "error" ? "red" : "green";
    message.style.fontWeight = "bold";
    message.style.marginTop = "15px";
}
