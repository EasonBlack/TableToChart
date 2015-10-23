define(function(require){
   var $ = require('jquery'),
       _ = require('underscore'),
       Q = require('q'),
       chartHelper = require('../helpers/chartHelper'),
       tableTem = require('rdust!../../template/table');


   var main = function(){
      this.table_data = {};
      this.el = $('.chart-container')[0];
      $('#pie_chart')[0].disabled = true;
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
               , type = '', charttype=''
               ,obj = {};

           type=$("input[type='radio']:checked").val();
           charttype = $('th.shadow').length ?  $('th.shadow')[0].innerHTML: null;
           obj = chartHelper[type](this.table_data, charttype);

           options.el = this.el;
           options.type = type;
           options.categories = obj.categories;
           options.series = obj.series;
           chartHelper.render(options);
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
           $('table').on('click','th:not(:first)', function(e){
               $('#pie_chart')[0].disabled = false;
               $('.shadow').removeClass('shadow');
               var index = $( "th" ).index( $(e.target));
               $(e.target).addClass('shadow');
               $('tr td:nth-child('+(index+1)+')').addClass('shadow');
           })
       }



   }

   return main;
});
