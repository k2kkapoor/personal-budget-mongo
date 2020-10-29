// ChartJS implementation
//Data for ChartJS
var dataSource = {
  datasets: [
    {
      data: [],
      backgroundColor: [],
    },
  ],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [],
};

//Data for D3JS
var data = {};
var title = {};
var d3Color = {};

function createChartJS() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: dataSource,
  });
}

// D3JS implementation

function createD3JSChart() {
  // set the dimensions and margins of the graph
  var width = 500;
  height = 400;
  margin = 10;
  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin;

  var svg = d3
    .select("#d3jsChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Color Scheme
  var color = d3.scaleOrdinal(d3Color);

  // calculate positioning of parts of the chart
  var pie = d3.pie().value(function (d) {
    return d.value;
  });
  var data_ready = pie(d3.entries(data));

  var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

  // To create the chart
  svg
    .selectAll("mySlices")
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", arcGenerator)
    .attr("fill", function (d,i) {
      return d3Color[i];
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7);

  //Setting up legends

  var legendG = svg
    .selectAll(".legend")
    .data(pie(data_ready))
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      return "translate(" + (width - 300) + "," + (i * 15 - 150) + ")";
    })
    .attr("class", "legend");

  legendG
    .append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", function (d, i) {
      return d3Color[i];
    });

  legendG
    .append("text")
    .text(function (d, i) {
      return title[i];
    })
    .style("font-size", 10)
    .attr("y", 10)
    .attr("x", 11);
}

function getBudget() {
  axios.get("http://localhost:3000/budget").then(function (res) {
    //Getting data from myBudget.json
    //console.log(res.data);
    for (var i = 0; i < res.data.length; i++) {
      dataSource.datasets[0].data[i] = res.data[i].budget;
      dataSource.labels[i] = res.data[i].title;
      dataSource.datasets[0].backgroundColor[i] = res.data[i].color;

      data[res.data[i].title] = res.data[i].budget;
      title[i] = res.data[i].title;
      d3Color[i] = res.data[i].color;
    }
    console.log(d3Color);
    createChartJS();
    createD3JSChart();
  });
}

getBudget();
