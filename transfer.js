function transferFunds() {
    const fromAccount = document.getElementById("fromAccount").value.trim();
    const toAccount = document.getElementById("toAccount").value.trim();
    const transferAmount = parseFloat(document.getElementById("transferAmount").value);
    const message = document.getElementById("message");

    if (!fromAccount || !toAccount || isNaN(transferAmount) || transferAmount <= 0) {
        showMessage("Please enter valid account numbers and transfer amount.", "error");
        return;
    }

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    let sender = accounts.find(acc => acc.accountNumber === fromAccount);
    let receiver = accounts.find(acc => acc.accountNumber === toAccount);

    if (!sender) {
        showMessage("Sender account not found!", "error");
        return;
    }

    if (!receiver) {
        showMessage("Receiver account not found!", "error");
        return;
    }

    if (sender.accountNumber === receiver.accountNumber) {
        showMessage("Cannot transfer to the same account!", "error");
        return;
    }

    if (transferAmount > sender.balance) {
        showMessage("Insufficient balance!", "error");
        return;
    }

    sender.balance -= transferAmount;
    receiver.balance += transferAmount;

    localStorage.setItem("accounts", JSON.stringify(accounts));

    showMessage(`✅ ₹${transferAmount} transferred successfully!`, "success");

    // Clear fields
    document.getElementById("fromAccount").value = "";
    document.getElementById("toAccount").value = "";
    document.getElementById("transferAmount").value = "";
}

function showMessage(msg, type) {
    const message = document.getElementById("message");
    message.textContent = msg;
    message.style.color = type === "error" ? "red" : "green";
    message.style.fontWeight = "bold";
    message.style.marginTop = "15px";
}
