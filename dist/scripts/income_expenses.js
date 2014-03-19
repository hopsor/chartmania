(function() {
  $(function() {
    var current_date_items, data, date, dateParser, formatted_data, formatted_dates, negative_items, positive_items, _i, _len, _results;
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
    _results = [];
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
      _results.push(formatted_data.push({
        date: new Date(date),
        income: d3.sum(positive_items, function(item) {
          return item.amount;
        }),
        expenses: d3.sum(negative_items, function(item) {
          return item.amount;
        })
      }));
    }
    return _results;
  });

}).call(this);
