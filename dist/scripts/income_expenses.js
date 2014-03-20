(function() {
  $(function() {
    var barTypes, color, current_date_items, data, date, dateParser, formatted_data, formatted_dates, height, margin, negative_items, positive_items, state, svg, width, x0, x1, xAxis, y, yAxis, _i, _len;
    dateParser = d3.time.format("%d-%m-%Y").parse;
    data = [
      {
        date: dateParser('01-01-2014'),
        amount: 5000
      }, {
        date: dateParser('13-01-2014'),
        amount: -1900
      }, {
        date: dateParser('20-01-2014'),
        amount: -2000
      }, {
        date: dateParser('05-02-2014'),
        amount: 12000
      }, {
        date: dateParser('15-02-2014'),
        amount: -6000
      }, {
        date: dateParser('21-03-2014'),
        amount: 7100
      }, {
        date: dateParser('28-03-2014'),
        amount: -5000
      }
    ];
    formatted_data = [];
    formatted_dates = d3.set($(data).map(function(idx, elm) {
      return new Date(elm.date.getFullYear(), elm.date.getMonth(), 1);
    }).get()).values();
    for (_i = 0, _len = formatted_dates.length; _i < _len; _i++) {
      date = formatted_dates[_i];
      current_date_items = data.filter(function(item) {
        return item.date.getFullYear() === new Date(date).getFullYear() && item.date.getMonth() === new Date(date).getMonth();
      });
      positive_items = current_date_items.filter(function(item) {
        return item.amount > 0;
      });
      negative_items = current_date_items.filter(function(item) {
        return item.amount < 0;
      });
      formatted_data.push({
        date: new Date(date),
        income: d3.sum(positive_items, function(item) {
          return item.amount;
        }),
        expenses: d3.sum(negative_items, function(item) {
          return Math.abs(item.amount);
        })
      });
    }
    margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    };
    width = 960 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
    x0 = d3.scale.ordinal().rangeRoundBands([0, width], .1);
    x1 = d3.scale.ordinal();
    y = d3.scale.linear().range([height, 0]);
    color = d3.scale.ordinal().range(["#77dd77", "#ff6961"]);
    xAxis = d3.svg.axis().scale(x0).orient("bottom").ticks(d3.time.months).tickFormat(d3.time.format("%B"));
    yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format(".2s"));
    svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    barTypes = ['income', 'expenses'];
    formatted_data.forEach(function(d) {
      d.amounts = barTypes.map(function(name) {
        return {
          name: name,
          value: +d[name]
        };
      });
    });
    x0.domain(formatted_data.map(function(d) {
      return d.date;
    }));
    x1.domain(barTypes).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([
      0, d3.max(formatted_data, function(d) {
        return d3.max(d.amounts, function(d) {
          return d.value;
        });
      })
    ]);
    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
    svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("EUR");
    state = svg.selectAll(".state").data(formatted_data).enter().append("g").attr("class", "g").attr("transform", function(d) {
      return "translate(" + x0(d.date) + ",0)";
    });
    return state.selectAll("rect").data(function(d) {
      return d.amounts;
    }).enter().append("rect").attr("width", x1.rangeBand()).attr("x", function(d) {
      return x1(d.name);
    }).attr("y", function(d) {
      return y(d.value);
    }).attr("height", function(d) {
      return height - y(d.value);
    }).style("fill", function(d) {
      return color(d.name);
    });
  });

}).call(this);
