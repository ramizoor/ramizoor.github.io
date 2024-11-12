// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Function to fetch the count of cats for a particular tag
async function fetchCatCount(tag) {
  try {
    const response = await fetch(`https://cataas.com/api/cats?tag=${tag}`);
    const data = await response.json();
    console.log(`Fetched ${data.length} cats for tag: ${tag}`);
    return data.length; // Returns the number of cats with the specified tag
  } catch (error) {
    console.error('Error fetching tag data:', tag, error);
    return 0; // Return 0 if there's an error fetching data
  }
}

// Bar Chart Example
var ctx = document.getElementById("myBarChart");

async function createChart() {
  // Fetch the number of cats for each tag
  const Cute = await fetchCatCount("Cute");
  const Orange = await fetchCatCount("Orange");
  const Fluffy = await fetchCatCount("Fluffy");
  const Sleepy = await fetchCatCount("Sleepy");
  const Silly = await fetchCatCount("Silly");
  const Bread = await fetchCatCount("Bread");

  // Check if data is being fetched properly (this will print in the browser's console)
  console.log('Fetched Data:', { Cute, Orange, Fluffy, Sleepy, Silly, Bread });

  // Bar Chart Example with fetched data
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Cute", "Orange", "Fluffy", "Sleepy", "Silly", "Bread"], // Labels for the categories
      datasets: [{
        label: "Number of Cats", // Label for the dataset
        backgroundColor: "rgba(2,117,216,1)", // Bar color
        borderColor: "rgba(2,117,216,1)", // Border color
        data: [Cute, Orange, Fluffy, Sleepy, Silly, Bread], // Dynamic data from the API
      }],
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 6
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 2000, // Max value for Y axis (adjust as needed)
            maxTicksLimit: 5
          },
          gridLines: {
            display: true
          }
        }],
      },
      legend: {
        display: false // Hide the legend
      }
    }
  });
}

// Ensure the chart is created once the page is ready and the data is fetched
createChart();
