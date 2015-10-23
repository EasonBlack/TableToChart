define(function(require){
   var $ = require('jquery'),
       _ = require('underscore'),
       Q = require('q'),
       chartHelper = require('../helpers/chartHelper'),
       tableTem = require('rdust!../../template/table');


   var main = function(){
      this.table_data = {};
      this.el = $('.chart-container')[0];
      this.init.apply(this, arguments);
   }

   main.prototype = {
       init: function(){

       },

       fetch: function() {
           var d = Q.defer()
               ,self = this;
           $.getJSON('data/data.json',function(data){
               self.table_data = data;
               d.resolve(data);
           })
           return d.promise;
       },

       render: function(data){
           var d = Q.defer()
               ,self= this
               ,_obj;
           _obj = this.recode(data,function(){
               var _headers =  ['Name'].concat(_.keys(data[0].data));
               var _rows = _.map(data, function(d){
                   return  [d.name].concat(_.values(d.data));
               });
               return {
                   headers: _headers,
                   rows: _rows
               }
           });
           tableTem.render( _obj , function(err,out){
               $('.table-container').html(out);
               self.eventBind();
               d.resolve(true);
           });
           return d.promise;
       },

       recode:function(data,callback){
          return  callback(data);
       },

       chartrender: function(){
           var options = {}
               , chart_data = []
               , self =this
               ,obj = {};

           obj = this.recode(this.table_data, function() {
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
           });


           options.el = this.el;
           options.type = $("input[type='radio']:checked").val();
           options.categories = obj.categories;
           options.series = obj.series;
           chartHelper().render(options);

       },

       eventBind: function(){
           var self = this;
           $('#btnChart').on('click',function(e){
               e.stopPropagation();
               self.chartrender();
               $('.chart-container').css('left','0px');
           });
           $(document).on('click',function(e){
               $('.chart-container').css('left','-600px');
           });
       }



   }

   return main;
});
