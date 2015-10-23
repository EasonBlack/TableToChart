define(function(require){
    var highchart = require('Highcharts');

    var chartHelper = function(){
        var chart = null;
        var render = function(options){
            var el = options.el
                ,type = options.type
                ,categories = options.categories
                ,series = options.series;
            if(chart) chart.destroy();
            chart = new highchart.Chart({
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
                series: series//chart_data
            });
        }

        return {
           render: render
        }
    }


    return chartHelper;

});
