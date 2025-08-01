let balance = 0;

function updateBalance() {
  document.getElementById("balance").innerText = `Balance: ₹${balance}`;
}

function deposit() {
  const amount = parseFloat(document.getElementById("amount").value);
  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount to deposit.");
    return;
  }
  balance += amount;
  updateBalance();
}

function withdraw() {
  const amount = parseFloat(document.getElementById("amount").value);
  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount to withdraw.");
    return;
  }
  if (amount > balance) {
    alert("Insufficient balance.");
    return;
  }
  balance -= amount;
  updateBalance();
}
