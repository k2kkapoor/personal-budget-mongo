// ChartJS implementation
//Data for ChartJS
var dataSource = {
  datasets: [
    {
      data: [],
      backgroundColor: [
        "#ffcd56",
        "#ff6384",
        "#36a2eb",
        "#fd6b19",
        "#FF8A33",
        "#33BEFF",
        "#33FF8D",
        "#3390FF",
      ],
    },
  ],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [],
};

//Data for D3JS
var data = {};
var title = {};

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
  var color = d3.scaleOrdinal().domain(data).range(d3.schemeSet2);

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
    .attr("fill", function (d) {
      return color(d.data.key);
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
      return color(i);
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
  axios.get("/budget").then(function (res) {
    //Getting data from myBudget.json
    for (var i = 0; i < res.data.myBudget.length; i++) {
      dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
      dataSource.labels[i] = res.data.myBudget[i].title;

      data[res.data.myBudget[i].title] = res.data.myBudget[i].budget;
      title[i] = res.data.myBudget[i].title;
    }

    createChartJS();
    createD3JSChart();
  });
}

getBudget();
