(function ($) {
    var postview = window.location.search.split('=')[1];
    var code = postview.split("&")[0];
    var id=""
    var queryobject


    var currentUser = AV.User.current();
    if (currentUser) {
        alert(currentUser);
    } else {
        userloading();
    }

 //   userloading(function(){
 //    AV.initialize("f7r02mj6nyjeocgqv7psbb31mxy2hdt22zp2mcyckpkz7ll8", "blq4yetdf0ygukc7fgfogp3npz33s2t2cjm8l5mns5gf9w3z");
 //    $("#userpost").on("click", function () {
 //        window.location.href = "user_post.html?";
 //    });
 //    $("#user_address").on("click", function () {
 //        window.location.href = "user_address.html?";
 //    });
 //    $("#user_contact").on("click", function () {
 //        window.location.href = "user_contact.html?";
 //    });
 //
 //    var query = new AV.Query(AV.User);
 //    query.equalTo("authData",queryobject);  // find all the women
 //    query.find({
 //        success: function(users) {
 //            id=users[0].id;
 //            alert(id);
 //        }
 //    });
 //});
    function userloading(callbak){
        $.post("http://fuwuhao.dianyingren.com/weixin/userSignUp", {code: code}, function (res) {
            var object=res.authData.weixin;
            queryobject = res.authData;
            var name=object.nickname;
            var img =object.headimgurl;
            id=object.openid;
            var user=[
                {
                    id:id,
                    name:name,
                    img:img
                }
            ]

            var $tpl = $('#user');
            var source = $tpl.text();
            var template = Handlebars.compile(source);
            var data = {tags: user};
            var html = template(data);
            $tpl.before(html);
            callbak();
        });
    }
})(jQuery);


//{
//    "weixin"
//:
//    {
//        "sex"
//    :
//        1, "nickname"
//    :
//        "动名词", "city"
//    :
//        "Mudanjiang", "headimgurl"
//    :
//        "http://wx.qlogo.cn/mmopen/PiajxSqBRaEJgfrRe3VDiaNqFHsR4dBj8Z5rWgsr0icBXAiaY1DmjoNBg85PILc6WQw1sgACOUsGNibYp2QW5KgeRpw/0", "openid"
//    :
//        "omoCDjmkB3VOX-C8SX5-AfE6GmHU", "language"
//    :
//        "zh_CN", "province"
//    :
//        "Heilongjiang", "country"
//    :
//        "China", "privilege"
//    :
//        []
//    }
//}