define(function(require){
    var $ = require('jquery'),
        _ = require('underscore'),
        mainView = require('views/main');

    var main = new mainView();
    main.fetch()
        .then(_.bind(main.render,main))
        .done(function(data){
            //alert(data);
        })
});