function money(value) {
  return `${ARCTIC_BAR_CONFIG.currency}${Number(value).toFixed(2)}`;
}

function buildPackageOptions() {
  const packageSelect = document.getElementById("package");
  ARCTIC_BAR_CONFIG.packages.forEach((pkg, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${pkg.name} - ${money(pkg.price)}`;
    packageSelect.appendChild(option);
  });
}

function buildUpgradeOptions() {
  const upgradesBox = document.getElementById("upgrades");
  ARCTIC_BAR_CONFIG.upgrades.forEach((upgrade, index) => {
    const row = document.createElement("label");
    row.className = "option";
    row.innerHTML = `
      <input type="checkbox" value="${index}" data-price="${upgrade.price}">
      <span>${upgrade.name} - ${upgrade.from ? "from " : ""}${money(upgrade.price)}</span>
    `;
    upgradesBox.appendChild(row);
  });
}

function calculateTotal() {
  const packageIndex = document.getElementById("package").value;
  const packagePrice = ARCTIC_BAR_CONFIG.packages[packageIndex]?.price || 0;
  const upgradeTotal = [...document.querySelectorAll("#upgrades input:checked")]
    .reduce((sum, box) => sum + Number(box.dataset.price), 0);
  document.getElementById("total").textContent = money(packagePrice + upgradeTotal);
}

function printJobSheet() {
  calculateTotal();
  window.print();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("business-name").textContent = ARCTIC_BAR_CONFIG.businessName;
  document.getElementById("tagline").textContent = ARCTIC_BAR_CONFIG.tagline;
  document.getElementById("phone").textContent = `${ARCTIC_BAR_CONFIG.phone1} / ${ARCTIC_BAR_CONFIG.phone2}`;
  document.getElementById("deposit-text").textContent = ARCTIC_BAR_CONFIG.depositText;

  buildPackageOptions();
  buildUpgradeOptions();
  calculateTotal();

  document.getElementById("package").addEventListener("change", calculateTotal);
  document.getElementById("upgrades").addEventListener("change", calculateTotal);
  document.getElementById("printBtn").addEventListener("click", printJobSheet);
});
