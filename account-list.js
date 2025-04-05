window.onload = function () {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const accountList = document.getElementById("accountList");
    const message = document.getElementById("message");

    if (accounts.length === 0) {
        message.innerText = "❌ No accounts available.";
        message.style.color = "red";
        message.style.fontWeight = "bold";
        return;
    }

    accounts.forEach(account => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${account.holderName}</td>
            <td>${account.accountNumber}</td>
            <td>${account.accountType}</td>
            <td>₹${account.balance}</td>
        `;

        accountList.appendChild(row);
    });
};
