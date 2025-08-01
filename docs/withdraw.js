document.getElementById('withdrawForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const accountNo = document.getElementById('accountNo').value.trim();
  const amount = parseFloat(document.getElementById('withdrawAmount').value);
  const messageDiv = document.getElementById('message');

  if (!accountNo || isNaN(amount) || amount <= 0) {
    form.classList.add('was-validated');
    return;
  }

  // Use the correct localStorage key: "bankUsers"
  let profiles = JSON.parse(localStorage.getItem("bankUsers")) || [];
  const user = profiles.find(p => p.accountNo === accountNo);

  if (!user) {
    messageDiv.innerHTML = `<div class="alert alert-danger">Account not found.</div>`;
    return;
  }

  if (user.balance < amount) {
    messageDiv.innerHTML = `<div class="alert alert-warning">Insufficient balance.</div>`;
    return;
  }

  user.balance -= amount;
  localStorage.setItem("bankUsers", JSON.stringify(profiles));

  messageDiv.innerHTML = `<div class="alert alert-success">₹${amount} withdrawn from account ${accountNo}. New balance: ₹${user.balance}</div>`;
  form.reset();
  form.classList.remove('was-validated');
});