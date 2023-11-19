document.addEventListener('DOMContentLoaded', function () {
  // Retrieve the data from local storage
  const savedData = JSON.parse(localStorage.getItem('expenseData'));

  // Check if there is data in local storage
  if (savedData && Array.isArray(savedData)) {
    // Create separate arrays for daily and monthly expenses
    const dailyExpenses = new Array(31).fill(0); // Initialize an array with 31 days for a month
    const monthlyExpenses = new Array(12).fill(0); // Initialize an array with 12 months

    // Loop through the saved data and organize it
    savedData.forEach(function (formData) {
      const date = new Date(formData.date);
      const day = date.getDate();
      const month = date.getMonth();
      const amount = parseFloat(formData.amount);

      // Update the corresponding array based on the date
      dailyExpenses[day - 1] += amount; // Subtract 1 to match array index
      monthlyExpenses[month] += amount;
    });

    // Initialize the chart with daily data
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()), // Days of the month
        datasets: [
          {
            label: 'Daily Expenses',
            data: dailyExpenses,
            backgroundColor: '#473C8B ',
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Handle slider change
    const slider = document.getElementById('chartSlider');
    const sliderValue = document.getElementById('sliderValue');

    slider.addEventListener('input', function () {
      // Update the chart data and label based on the slider value
      if (this.value == 0) {
        chart.data.datasets[0].data = dailyExpenses;
        chart.data.datasets[0].label = 'Daily Expenses';
        sliderValue.textContent = 'Daily';
        chart.data.labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
      } else {
        chart.data.datasets[0].data = monthlyExpenses;
        chart.data.datasets[0].label = 'Monthly Expenses';
        sliderValue.textContent = 'Monthly';
        chart.data.labels = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
      }
      chart.update(); // Update the chart
    });
  } else {
    console.log('No saved data found in local storage.');
  }
});



  