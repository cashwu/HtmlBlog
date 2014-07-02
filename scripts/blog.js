
var blogApp = angular.module("blogApp",["ngRoute"]);

blogApp.controller("blogController", function($scope, $routeParams){

    if (!isEmpty($routeParams)) {
        var url = $routeParams.year + "/" + $routeParams.month + "/" + $routeParams.day + "/" + $routeParams.title;
        initMarkdown(url);
    }

});

function blogAppConfig($routeProvider){
    $routeProvider
        .when('/:year/:month/:day/:title',{
            templateUrl: function(obj){
                return "Views/" + obj.year + "/" + obj.month + "/" + obj.day + "/" + obj.title + ".html";
            },
            controller: "blogController"
        })
        .otherwise({
            redirectTo: "/"
        });
}

blogApp.config(blogAppConfig);

var disqus_shortname = 'cashwugeek';
var disqus_identifier = 'http://blog.cashwu.com/#';
var disqus_url = 'http://blog.cashwu.com/#';

function initMarkdown(url){

    disqus_identifier += url;
    disqus_url += url;

    var markdown = document.getElementById("markdown");
    if (markdown){
        var converter = new Showdown.converter();
        var markdowncontent = markdown.innerHTML;
        var markdownhtml = converter.makeHtml(markdowncontent);
        document.getElementById("content").innerHTML = markdownhtml;

        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    }
//    else {
//        document.getElementById("content").innerHTML = "";
//    }
}

function isEmpty(myObject) {
    for(var key in myObject) {
        if (myObject.hasOwnProperty(key)) {
            return false;
        }
    }

    return true;
}