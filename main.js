

// // Get elements
// const expenseForm = document.getElementById("expense-form");
// const expenseList = document.getElementById("expense-list");
// const totalAmount = document.getElementById("total-amount");
// const themeToggle = document.getElementById("theme-toggle");
// const monthFilter = document.getElementById("filter-month");
// const downloadCsvBtn = document.getElementById("download-csv");

// let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// /**
//  * Render expenses.
//  * If filterMonth is not provided, use the current monthFilter.value (or "all").
//  */
// function renderExpenses(filterMonth) {
//   // Use provided filterMonth, otherwise read from select element or default to "all"
//   if (!filterMonth) {
//     filterMonth = (monthFilter && monthFilter.value) ? monthFilter.value : "all";
//   }

//   expenseList.innerHTML = "";
//   let total = 0;

//   expenses.forEach((expense, index) => {
//     // If date is missing or malformed, mark month as empty string so filter logic works
//     let expenseMonth = "";
//     if (expense.date && typeof expense.date === "string" && expense.date.includes("-")) {
//       const parts = expense.date.split("-");
//       if (parts.length >= 2) expenseMonth = parts[1];
//     }

//     // Apply filter: if a filter is active and not "all", skip non-matching months
//     if (filterMonth && filterMonth !== "all" && expenseMonth !== filterMonth) return;

//     const div = document.createElement("div");
//     div.classList.add("expense-item");

//     div.innerHTML = `
//       <span>${escapeHtml(expense.name)} - ₹${Number(expense.amount).toFixed(2)} <small>(${escapeHtml(expense.date)})</small></span>
//       <div>
//         <button onclick="editExpense(${index})">Edit</button>
//         <button onclick="deleteExpense(${index})">Delete</button>
//       </div>
//     `;

//     expenseList.appendChild(div);
//     total += parseFloat(expense.amount) || 0;
//   });

//   totalAmount.textContent = total.toFixed(2);
//   localStorage.setItem("expenses", JSON.stringify(expenses));
// }

// // Simple HTML escape for safety in injected strings
// function escapeHtml(text) {
//   if (text === undefined || text === null) return "";
//   return String(text)
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;")
//     .replaceAll("'", "&#039;");
// }

// // Add Expense
// expenseForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const name = document.getElementById("expense-name").value.trim();
//   const amountValue = document.getElementById("expense-amount").value;
//   const amount = parseFloat(amountValue);
//   const date = document.getElementById("expense-date").value;

//   if (!name || !date || isNaN(amount) || amount <= 0) {
//     alert("Please enter a valid amount (greater than 0) and fill all fields.");
//     return;
//   }

//   // Store number with two decimals for consistent display
//   expenses.push({ name, amount: Number(amount).toFixed(2), date });
//   // Render immediately using current filter (so user sees new expense without touching filter)
//   renderExpenses(monthFilter ? monthFilter.value : "all");
//   // Then reset the form
//   expenseForm.reset();
// });

// // Edit Expense
// function editExpense(index) {
//   const expense = expenses[index];
//   document.getElementById("expense-name").value = expense.name;
//   document.getElementById("expense-amount").value = expense.amount;
//   document.getElementById("expense-date").value = expense.date;

//   // Remove the old entry so submit will re-add the edited one
//   deleteExpense(index);
// }

// // Delete Expense
// function deleteExpense(index) {
//   expenses.splice(index, 1);
//   localStorage.setItem("expenses", JSON.stringify(expenses));
//   renderExpenses(monthFilter ? monthFilter.value : "all");
// }

// // Theme Toggle
// themeToggle.addEventListener("click", () => {
//   document.body.classList.toggle("dark-theme");
//   document.body.classList.toggle("light-theme");
//   themeToggle.textContent = document.body.classList.contains("dark-theme")
//     ? "Switch to Light Mode"
//     : "Switch to Dark Mode";
// });

// // Filter by Month
// if (monthFilter) {
//   monthFilter.addEventListener("change", (e) => {
//     renderExpenses(e.target.value);

//     // Filter by Month
// monthFilter.addEventListener("change", (e) => {
//   const selectedMonth = e.target.value;
//   localStorage.setItem("selectedMonth", selectedMonth); // ✅ Save selected month
//   renderExpenses(selectedMonth);
// });

//   });
// }

// // Export to CSV
// function exportToCSV() {
//   if (expenses.length === 0) {
//     alert("No expenses to export!");

//     return;
//   }

//   let csvContent = "data:text/csv;charset=utf-8,";
//   csvContent += "Name,Amount,Date\n";
//   expenses.forEach(exp => {
//     // Use template literal (fixed) and ensure commas in name are handled by quoting
//     const safeName = `"${String(exp.name).replaceAll('"', '""')}"`;
//     csvContent += `${safeName},${exp.amount},${exp.date}\n`;
//   });

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "Expense_Report.csv");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

// if (downloadCsvBtn) {
//   downloadCsvBtn.addEventListener("click", exportToCSV);
// }

// // Default to dark theme on load (per your earlier request)
// function setDefaultTheme() {
//   document.body.classList.add("dark-theme");
//   document.body.classList.remove("light-theme");
//   if (themeToggle) themeToggle.textContent = "Switch to Light Mode";
// }

// // Wait for DOM ready then initialize
// document.addEventListener("DOMContentLoaded", () => {
//   setDefaultTheme();
//   // initial render using current select value or "all"
//   renderExpenses(monthFilter ? monthFilter.value : "all");
// });




const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");
const themeToggle = document.getElementById("theme-toggle");
const monthFilter = document.getElementById("filter-month");
const yearFilter = document.getElementById("filter-year");
const downloadCsvBtn = document.getElementById("download-csv");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Render expenses based on month/year filter
function renderExpenses() {
  const selectedMonth = monthFilter.value || "all";
  const selectedYear = yearFilter.value || "all";

  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    const [year, month] = expense.date.split("-");
    if ((selectedMonth !== "all" && month !== selectedMonth) || 
        (selectedYear !== "all" && year !== selectedYear)) return;

    const div = document.createElement("div");
    div.classList.add("expense-item");
    div.innerHTML = `
      <span>${expense.name} - ₹${Number(expense.amount).toFixed(2)} <small>(${expense.date})</small></span>
      <div>
        <button onclick="editExpense(${index})">Edit</button>
        <button onclick="deleteExpense(${index})">Delete</button>
      </div>
    `;
    expenseList.appendChild(div);
    total += parseFloat(expense.amount) || 0;
  });

  totalAmount.textContent = total.toFixed(2);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("selectedMonth", monthFilter.value);
  localStorage.setItem("selectedYear", yearFilter.value);
}

// Add expense
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("expense-name").value.trim();
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const date = document.getElementById("expense-date").value;

  if (!name || !date || isNaN(amount) || amount <= 0) {
    alert("Please enter valid details!");
    return;
  }

  expenses.push({ name, amount: Number(amount).toFixed(2), date });
  expenseForm.reset();
  renderExpenses();
});

// Edit expense
function editExpense(index) {
  const expense = expenses[index];
  document.getElementById("expense-name").value = expense.name;
  document.getElementById("expense-amount").value = expense.amount;
  document.getElementById("expense-date").value = expense.date;
  expenses.splice(index, 1);
  renderExpenses();
}

// Delete expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  themeToggle.textContent = document.body.classList.contains("dark-theme")
    ? "Switch to Light Mode"
    : "Switch to Dark Mode";
});

// Filter change
monthFilter.addEventListener("change", renderExpenses);
yearFilter.addEventListener("change", renderExpenses);

// Export CSV
downloadCsvBtn.addEventListener("click", () => {
  if (expenses.length === 0) { alert("No expenses to export!"); return; }
  let csv = "Name,Amount,Date\n";
  expenses.forEach(exp => {
    csv += `"${exp.name.replaceAll('"','""')}",${exp.amount},${exp.date}\n`;
  });
  const link = document.createElement("a");
  link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  link.download = "Expense_Report.csv";
  link.click();
});

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderExpenses();
});
