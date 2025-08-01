document.getElementById('depositForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const accountNo = document.getElementById('accountNo').value.trim();
  const amount = parseFloat(document.getElementById('depositAmount').value);
  const messageDiv = document.getElementById('message');
  messageDiv.innerHTML = "";

  if (!accountNo || isNaN(amount) || amount <= 0) {
    this.classList.add('was-validated');
    return;
  }

  // Use the correct localStorage key: "bankUsers"
  const profiles = JSON.parse(localStorage.getItem('bankUsers')) || [];
  const index = profiles.findIndex(p => p.accountNo === accountNo);

  if (index === -1) {
    messageDiv.innerHTML = `<span class="text-danger">Account number not found.</span>`;
    return;
  }

  profiles[index].balance = (parseFloat(profiles[index].balance) || 0) + amount;
  localStorage.setItem('bankUsers', JSON.stringify(profiles));

  messageDiv.innerHTML = `<span class="text-success">₹${amount} successfully deposited to account ${accountNo}.</span>`;
  this.reset();
  this.classList.remove('was-validated');
});