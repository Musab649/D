const users = [
  { id: "70062", name: "Musab Ali", role: "admin", site: "مسلخ غياثي" },
  { id: "200", name: "مستخدم", role: "user", site: "مسلخ مدينة" }
];

let sites = ["مسلخ غياثي"];
let animals = ["خروف"];
let cuttings = ["عزيمة"];
let prices = {};
let invoices = [];
let currentUser = null;
let invoiceCounter = 1;

window.onload = () => {
  showSection("splash");
  setTimeout(() => showSection("login"), 2000);
  fillData();
};

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function login() {
  const id = document.getElementById("employeeId").value.trim();
  const user = users.find(u => u.id === id);
  if (!user) { alert("مستخدم غير موجود!"); return; }
  currentUser = user;
  document.getElementById("username").innerText = user.name;
  if (user.role !== "admin") {
    document.getElementById("manageUsersBtn").style.display = "none";
    document.getElementById("settingsBtn").style.display = "none";
  }
  showSection("dashboard");
  updateInvoice();
}

function logout() {
  currentUser = null;
  showSection("login");
}

function addSite() {
  if (currentUser.role !== "admin") return;
  const s = document.getElementById("newSite").value.trim();
  if (s) sites.push(s);
  fillData();
}

function addAnimal() {
  if (currentUser.role !== "admin") return;
  const a = document.getElementById("newAnimal").value.trim();
  if (a) animals.push(a);
  fillData();
}

function addCutting() {
  if (currentUser.role !== "admin") return;
  const c = document.getElementById("newCutting").value.trim();
  if (c) cuttings.push(c);
  fillData();
}

function addUser() {
  if (currentUser.role !== "admin") return;
  const id = document.getElementById("newUserId").value.trim();
  const name = document.getElementById("newUserName").value.trim();
  const role = document.getElementById("newUserRole").value;
  const site = document.getElementById("newUserSite").value;
  if (id && name) users.push({ id, name, role, site });
  fillData();
}

function setPrice() {
  if (currentUser.role !== "admin") return;
  const a = document.getElementById("priceAnimal").value;
  const c = document.getElementById("priceCutting").value;
  const v = document.getElementById("priceValue").value;
  prices[`${a}_${c}`] = +v;
}

function fillData() {
  fillSelect("animalType", animals);
  fillSelect("cuttingType", cuttings);
  fillSelect("priceAnimal", animals);
  fillSelect("priceCutting", cuttings);
  fillSelect("newUserSite", sites);
  fillSelect("quantity", Array.from({ length: 20 }, (_, i) => i + 1));
  fillTable();
}

function fillSelect(id, items) {
  const sel = document.getElementById(id);
  sel.innerHTML = "";
  items.forEach(i => {
    const o = document.createElement("option");
    o.value = i; o.textContent = i; sel.appendChild(o);
  });
}

function fillTable() {
  const tb = document.querySelector("#usersTable tbody");
  tb.innerHTML = "";
  users.forEach(u => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${u.id}</td><td>${u.name}</td><td>${u.role}</td><td>${u.site}</td>`;
    tb.appendChild(tr);
  });
}

function updateInvoice() {
  document.getElementById("invoiceNumber").value = invoiceCounter++;
}

function updatePrice() {
  const a = document.getElementById("animalType").value;
  const c = document.getElementById("cuttingType").value;
  const qty = +document.getElementById("quantity").value || 1;
  const p = prices[`${a}_${c}`] || 0;
  document.getElementById("unitPrice").value = p;
  document.getElementById("totalPrice").value = p * qty;
}

function saveData() {
  alert("تم الحفظ!");
}
