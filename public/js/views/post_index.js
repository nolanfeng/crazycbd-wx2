(function($) {
    var skx=-5;
    var bload=1;
    var length
$(".am-input-group-label").on("click",function(){
    var val= $(".am-form-field").val();
    if(val !=""){
        $(".Delete").empty();
        AV.Query.doCloudQuery("select * from post where (content like \""+val+"\")", {
            success: function(result){
                var select=result.results;
                var post = AV.Object.extend("post");
                var tags = AV.Object.extend("tags");
                var user = AV.Object.extend("User");
                if(select.length!=0){
                    $(".Delete").empty();
                    $(".Publish").remove();
                    $(".am-icon-spin-extend").remove();
                    length=select.length;
                    for(var i=0; i<select.length;i++){
                        console.log(select[i].id);
                        var posts = AV.Object.extend("post");
                        var query = new AV.Query(posts);
                        query.include("tagkey");
                        query.include("imgs");
                        query.include("username");
                        query.equalTo("objectId",select[i].id);
                        query.find({
                            success:function(sele){
                                var tags= [];
                                var object=sele[0];
                                console.log(object);
                                var newtime = new Date().getTime();
                                var  imgs =  object.get('imgs');
                                console.log(imgs);
                                var avalue = object.id;
                                var content = object.get('content');
                                var otagkey=object.get("tagkey");
                                var ousername =object.get("username");
                                var username = ousername.get("username");
                                var tagvalue=otagkey.get("tagtitle");
                                var oldtime= object.createdAt.getTime();
                                var publishtime = newtime - oldtime;
                                var day = parseInt(publishtime/86400000);
                                if(day>0){
                                    times = day+"天"
                                }else{
                                    var hours = parseInt(publishtime/3600000);
                                    if(hours>0){
                                        times= hours+"小时";
                                    }
                                    else{
                                        var minute = parseInt(publishtime/60000);
                                        if(minute>0){
                                            times=minute+"分钟"
                                        }
                                    }
                                }
                                var osele = {
                                    name: username,
                                    usersay:content,
                                    tag: tagvalue,
                                    time:times,
                                    value:avalue,
                                    img: imgs
                                };
                                tags.push(osele);
                                console.log(tags);
                                var $tpl = $('#amz-tags');
                                var source = $tpl.text();
                                var template = Handlebars.compile(source);
                                var data = {tags: tags};
                                var html = template(data);
                                $tpl.before(html);
                            }
                        })
                    }
                    $("<p class=\"Delete am-sans-serif\">包含“"+val+"”的结果共“"+length+"”条</p>").appendTo($("#field"));
                    bload=0;
                }else{
                    $(".Delete").empty();
                    $(".Publish").remove();
                    $(".am-icon-spin-extend").remove();
                    $("<p class=\"Delete am-sans-serif\">关于“"+val+"”的查询结果不存在</p>").appendTo($("#field"));
                }
            }
        });
    }else{
        $(".Delete").empty();
       // $("<p class=\"Delete am-sans-serif\">请输入搜索条件</p>").appendTo($("#field"));
        loading();
        bload=1;
    }

});

   $("#arrow").hide();
    loading(function(){
        $(".title").on("click",function(){
            var postview=$(this).attr("value");
            window.location.href="post_detail.html?"+postview+"";
        });
        $("#users").on("click",function(){
            //alert("haha");
            window.location.href="user_detail.html";
        });
        $("#foots").on("click",function(){
            window.location.href="post_save.html";
        })

    });

    $(window).scroll(function(){
        var htmlHeight=document.body.scrollHeight||document.documentElement.scrollHeight;
        //var clientHeight=document.body.clientHeight||document.documentElement.clientHeight;
        var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
        var newheight =window.screen.availHeight;
        if(scrollTop>400){
                $("#arrow").show().addClass("am-animation-fade");
            }else{
                $("#arrow").hide();
                $("#arrow").hide().removeClass("am-animation-fade");
            }
        if(scrollTop+newheight+200>=htmlHeight){
            if(bload!=0){
                loading(function(){
                    $(".title").on("click",function(){
                        var postview=$(this).attr("value");
                        window.location.href="post_detail.html?"+postview+"";
                    });
                });
            }
        }
    });
    function loading (callbak){
        AV.initialize("f7r02mj6nyjeocgqv7psbb31mxy2hdt22zp2mcyckpkz7ll8", "blq4yetdf0ygukc7fgfogp3npz33s2t2cjm8l5mns5gf9w3z");
        //ject.createWithoutData('className',id);
        var post = AV.Object.extend("post");
        var tags = AV.Object.extend("tags");
        var user = AV.Object.extend("User");

        var query = new AV.Query(post);
        query.count({
            success:function(skip){
                var newtime = new Date().getTime();
                query.descending("createdAt");
                skx+=5;
                if(skx>=skip){
                    $("#load").remove();
                }
                query.limit(5).skip(skx);
                query.include("tagkey");
                query.include("imgs");
                query.include("username");
                query.find({
                    success:function(arry){
                        var times=0;
                        var tags = [];
                        for (var i = 0; i < arry.length; i++) {
                            var object = arry[i];
                            var  imgs =  object.get('imgs');
                            console.log(imgs);
                            var avalue = object.id;
                            var content = object.get('content');
                            var otagkey=object.get("tagkey");
                            var ousername =object.get("username");
                            var username = ousername.get("username");
                            var tagvalue=otagkey.get("tagtitle");
                            var oldtime= object.createdAt.getTime();
                            var publishtime = newtime - oldtime;
                            var day = parseInt(publishtime/86400000);
                            if(day>0){
                                times = day+"天"
                            }else{
                                var hours = parseInt(publishtime/3600000);
                                if(hours>0){
                                    times= hours+"小时";
                                }
                                else{
                                    var minute = parseInt(publishtime/60000);
                                    if(minute>0){
                                        times=minute+"分钟"
                                    }
                                }
                            }
                            var opost = {
                                name: username,
                                usersay:content,
                                tag: tagvalue,
                                time:times,
                                value:avalue,
                                img: imgs
                            };
                            tags.push(opost);

                        }
                        console.log(tags);
                        var $tpl = $('#amz-tags');
                        var source = $tpl.text();
                        var template = Handlebars.compile(source);
                        var data = {tags: tags};
                        var html = template(data);
                        $tpl.before(html);
                        callbak();
                    }
                });
            }
        });



    }








})(jQuery);


