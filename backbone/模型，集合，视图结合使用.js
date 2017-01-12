<script type="text/javascript">
      // $.ajax({
      //   url:"/thsft/iFindService/IStrategy/subject/ajax-get-organ-members",
      //   type:"post",
      //   data:{
      //     aaa:34,
      //   }
      // })
        // function zxcv(){
        //     this.a=3;
        // }
        // zxcv.qwe = 2;
        // zxcv.prototype.mmm = function(){
        //     alert();
        // }
        // var asdf = new zxcv
        // console.log(zxcv.mmm);
        var pmodel = Backbone.Model.extend({
            el:$("body"),
            url:"/thsft/iFindService/IStrategy/subject/ajax-get-organ-members",
            urlRoot:"/abc12",
            events:{
              "click #bt":"setUrl"
            },
            initialize: function() {

            },

            idAttribute: "_xxx",
            defaults:{
                name:{"kelichao":123,"bob":222},
                six:"man",
                _xxx:123,
                state:1,
                pagesize:3
            },
        });
        var ppp = new pmodel;

    //console.log(ppp.attributes);
    var proView = Backbone.View.extend({
      model:ppp,
      el:$("body"),
      events:{
        "click #bt":"setUrl"
      },
      initialize:function(){
          console.log(this.model);
          this.listenTo(this.model,"change:state",this.init);
          this.listenTo(this.model,"error",this.err);
          this.listenTo(this.model,"sync",this.secc);
          this.listenTo(this.model,"change",this.render);
      },
      render:function(){
        console.log(this.el);
        $("body").append("<div id='sdf'></div>");
        // $("#sdf").append(this.el);
        $(this.el).find("#sdf").html("你好");
        console.log(this.$el);
        alert("视图的渲染");
      },
      setUrl: function(a,b,c) {
        console.log($(a.currentTarget));

        //console.log(a.data);
        this.model.set({"aaa":123});
      },
      err: function(model,response,options) {
          alert("链接出错");
      },
      secc: function(model,response,options){
        alert("跟新成功");
        console.log(model);
        console.log(response);
        console.log(options);
      },
      init:function(){
          alert("我初始化了")
          console.log(this.defaults);
          // this.attributes = {
          //     abc:456,
          //     name:{"kelichao":123,"bob":222},
          //     six:"man",
          //     _xxx:123
          // };
          //console.log(this.defaults);
          this.set({
              abc:456,
              name:222,
          })
      }
    })
    var promodel = new proView({model:ppp});

        // console.log(ppp.set({url:"aaaaa"}));
        // ppp.fetch(null,{success:function(model,response,options) {
        //   // alert();
        //   ppp.set(response);
        // }}); 



    // var artist = new Backbone.Model({
    //   firstName: "Wassily",
    //   lastName: "Kandinsky"
    // });

    // artist.set({birthday: "December 16, 1866"});
    // //console.log(artist)
    // //alert(JSON.stringify(artist));


    //     // ppp.init();
    //     // console.log(ppp.initialize)

    //     var coll = Backbone.Collection.extend({
    //         initialize: function() {

    //         },
    //         model:pmodel,
    //         init:function(){
    //             this.model.defaults = {
    //                 name:{"kelichao":123,"bob":222},
    //                 six:"man",
    //                 _xxx:123
    //             }
    //         }
    //     })
    //     var colll = new coll();
    //     colll.add(ppp);





    //     var view = Backbone.View.extend({
    //         initialize:function(){
    //             // var ccc=$("body")

    //         },

    //         // el:$("#ccc"),
    //         events:{
    //             "click #bbb:eq(2)":"nnn"
    //         },
    //         nnn:function(){
    //                 alert(111);
    //             }
    //     })
    //     var asd = new view({model:ppp,el:$("#ccc")});
    //     //console.log(asd);
    //     var aasd = new view({el:$("#mmm")});

    $("#bt").click(function(){
      console.log($(this));
    })





        //console.log(colll);
        // $("#ccc").click(function(){
        //     alert(213)
        // })
    </script>
