function createAccount() {
    const holderName = document.getElementById("holderName").value.trim();
    const accountNumber = document.getElementById("accountNumber").value.trim();
    const initialDeposit = parseFloat(document.getElementById("initialDeposit").value);
    const accountType = document.getElementById("accountType").value;
    const message = document.getElementById("message");

    // Input Validation
    if (!holderName || !accountNumber || isNaN(initialDeposit) || initialDeposit < 0 || !accountType) {
        showMessage("Please fill in all fields correctly.", "error");
        return;
    }

    const newAccount = {
        holderName,
        accountNumber,
        accountType,
        balance: initialDeposit
    };

    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Check for duplicate account number
    const exists = accounts.some(acc => acc.accountNumber === accountNumber);
    if (exists) {
        showMessage("Account number already exists.", "error");
        return;
    }

    accounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(accounts));

    showMessage("✅ Account created successfully!", "success");

    // Clear fields
    document.getElementById("holderName").value = "";
    document.getElementById("accountNumber").value = "";
    document.getElementById("initialDeposit").value = "";
    document.getElementById("accountType").value = "";
}

function showMessage(msg, type) {
    const message = document.getElementById("message");
    message.textContent = msg;
    message.style.color = type === "error" ? "red" : "green";
    message.style.fontWeight = "bold";
    message.style.marginTop = "15px";
}
