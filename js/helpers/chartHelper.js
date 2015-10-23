define(function(require){
    var highchart = require('Highcharts');

    var chartHelper = function(){
        this.chart = null;
    }
    chartHelper.prototype.render = function(options){
        var el = options.el
            ,type = options.type
            ,categories = options.categories
            ,series = options.series;
        if(this.chart) this.chart.destroy();
        this.chart = new highchart.Chart({
            chart: {
                renderTo:   el, // $('.chart-container')[0],
                type: type
            },
            title: {
                text:''
            },
            xAxis: {
                categories: categories//_.keys(this.table_data.chart_rows[0])
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            credits: {
                enabled: false
            },
            series: series
        });
    }
    chartHelper.prototype.line = chartHelper.prototype.bar = function(){
        var data = arguments[0]
            ,chart_data = [];
        var _chart_headers = _.map(data, function (d) {
            return d.name;
        });
        var _chart_rows = _.map(data, function (d) {
            return d.data;
        });
        _.each( _chart_headers,function(v,i){
            var item = {};
            item.name= v;
            item.data = _.values(_chart_rows[i]);
            chart_data.push(item);
        });
        return {
            chart_headers :_chart_headers,
            chart_rows :_chart_rows,
            series : chart_data,
            categories : _.keys(_chart_rows[0])
        }
    }

    chartHelper.prototype.pie = function(){
        var data = arguments[0]
            ,key = arguments[1]
            ,chart_data = [];
        _.each( data,function(d,i){
            var item = {};
            item.name= d.name;
            item.y = d.data[key];
            chart_data.push(item);
        });

        return {
            series : [{
              data:   chart_data
            }]
        }

    }
    return new chartHelper;

});
