        // //此处添加下面的试验代码
        // var User = Backbone.Model.extend({
        //     url:"adsf/sdf.php",
        //     initialize: function(){
        //         console.log("开始");
        //     },
        //     validate: function(attr){
        //         console.log(attr);
        //     },
        //     defaults: {
        //         abc:null,
        //     }
        // })
        // var user = new User;
        // // user.bind("error",function(){
        // //     alert();
        // // })
        // user.set({name:"kelichao"});

        // var Users = Backbone.Collection.extend({
        //     model:user,
        //     initialize:function(){
        //         this.on("add", function(){
        //             alert();
        //         })
        //     }

        // })
        // var users = new Users;


        
        var buttonView = {
          label  : 'underscore',
          onClick: function(){ alert('clicked: ' + this.label); },
          onHover: function(){ console.log('hovering: ' + this.label); }
        };
        _.bindAll(buttonView, 'onClick', 'onHover');
        // When the button is clicked, this.label will have the correct value.
        jQuery('#underscore_button').bind('click', buttonView.onHover);
