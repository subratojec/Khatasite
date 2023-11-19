// Get a reference to the form and its input fields
const form = document.querySelector('form');
const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date');
const amountInput = document.getElementById('amount');

// Add a submit event listener to the form
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Retrieve the existing data from local storage or initialize an empty array
  let savedData = JSON.parse(localStorage.getItem('expenseData')) || [];

  // Create an object to store the captured data
  const formData = {
    title: titleInput.value,
    date: dateInput.value,
    amount: amountInput.value
  };

  // Add the captured data to the array
  savedData.push(formData);

  // Store the updated data in local storage
  localStorage.setItem('expenseData', JSON.stringify(savedData));

  // Optionally, you can clear the input fields after storing the data
  titleInput.value = '';
  dateInput.value = '';
  amountInput.value = '';

  // You can now use 'savedData' as needed
  console.log('Captured and Saved Data:', savedData);
  alert("Registered sucessfully!")
});

document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the data from local storage
    const savedData = JSON.parse(localStorage.getItem('expenseData'));
  
    // Check if there is data in local storage
    if (savedData && Array.isArray(savedData)) {
      // Loop through the saved data and do something with it
      savedData.forEach(function (formData) {
        // Access individual properties (e.g., title, date, amount) in formData
        console.log('Title:', formData.title);
        console.log('Date:', formData.date);
        console.log('Amount:', formData.amount);
        // You can perform actions with the retrieved data here
      });
    } else {
      console.log('No saved data found in local storage.');
    }
  });

  // Retrieve the data from local storage
const savedData = JSON.parse(localStorage.getItem('expenseData'));

// Check if there is data in local storage
if (savedData && Array.isArray(savedData)) {
  // Create an object to store data by date
  const dailyExpenses = {};

  // Loop through the saved data and organize it by date
  savedData.forEach(function (formData) {
    const date = formData.date;
    if (!dailyExpenses[date]) {
      dailyExpenses[date] = [];
    }
    dailyExpenses[date].push(parseFloat(formData.amount)); // Assuming 'amount' is a numeric value
  });

  // Calculate daily totals
  const dates = Object.keys(dailyExpenses);
  const dailyTotals = dates.map(date => ({
    date,
    total: dailyExpenses[date].reduce((acc, val) => acc + val, 0)
  }));

  // Now you have an array of daily totals
  console.log('Daily Totals:', dailyTotals);

  // You can use a charting library like Chart.js to create a historical chart
  // Example Chart.js setup:
  // const ctx = document.getElementById('dailyExpensesChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dailyTotals.map(entry => entry.date),
      datasets: [{
        label: 'Daily Expenses',
        data: dailyTotals.map(entry => entry.total),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
} else {
  console.log('No saved data found in local storage.');
}

  

  


