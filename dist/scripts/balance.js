(function() {
  $(function() {
    var data, dateParser, height, line, margin, maxValue, parseDate, svg, width, x, xAxis, y, yAxis;
    dateParser = d3.time.format("%d-%m-%Y").parse;
    data = [
      {
        date: dateParser('01-12-2013'),
        amount: 5000
      }, {
        date: dateParser('15-12-2013'),
        amount: 7900
      }, {
        date: dateParser('01-01-2014'),
        amount: 15000
      }, {
        date: dateParser('05-01-2014'),
        amount: 12000
      }, {
        date: dateParser('15-01-2014'),
        amount: 20000
      }, {
        date: dateParser('21-01-2014'),
        amount: 13333
      }, {
        date: dateParser('28-01-2014'),
        amount: 9833
      }, {
        date: dateParser('01-02-2014'),
        amount: 16000
      }, {
        date: dateParser('03-02-2014'),
        amount: 20000
      }, {
        date: dateParser('15-02-2014'),
        amount: 19014
      }, {
        date: dateParser('20-02-2014'),
        amount: 26000
      }, {
        date: dateParser('26-02-2014'),
        amount: 32000
      }, {
        date: dateParser('16-03-2014'),
        amount: 33500
      }, {
        date: dateParser('28-03-2014'),
        amount: 31415
      }, {
        date: dateParser('01-04-2014'),
        amount: 27450
      }, {
        date: dateParser('16-04-2014'),
        amount: 33500
      }, {
        date: dateParser('28-04-2014'),
        amount: 31415
      }, {
        date: dateParser('30-04-2014'),
        amount: 27450
      }, {
        date: dateParser('16-05-2014'),
        amount: 33500
      }, {
        date: dateParser('28-05-2014'),
        amount: 31415
      }, {
        date: dateParser('30-05-2014'),
        amount: 27450
      }
    ];
    margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    };
    width = 960 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
    parseDate = d3.time.format("%d-%b-%y").parse;
    x = d3.time.scale().range([0, width]);
    y = d3.scale.linear().range([height, 0]);
    maxValue = d3.max(data, function(d) {
      return d.amount;
    });
    xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(d3.time.months).tickFormat(d3.time.format("%B"));
    yAxis = d3.svg.axis().scale(y).orient("left");
    line = d3.svg.line().x(function(d) {
      return x(d.date);
    }).y(function(d) {
      return y(d.amount);
    }).interpolate("linear");
    svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain(d3.extent(data, function(d) {
      return d.date;
    }));
    y.domain([0, maxValue]);
    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
    svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Saldo");
    svg.append("path").datum(data).attr("class", "line").attr("d", line);
    svg.selectAll("dot").data(data).enter().append("circle").attr("class", "dot").attr("r", 3.5).attr("cx", function(d) {
      return x(d.date);
    }).attr("cy", function(d) {
      return y(d.amount);
    });
  });

}).call(this);
