
//angular.element(document).ready(function(){
//    angular.bootstrap(document, ["blogApp"]);
//});

var blogApp = angular.module("blogApp",["ngRoute"]);

blogApp.controller("blogController", function($scope){
    initMarkdown();
});

function blogAppConfig($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl: "Views/default.html",
            controller: "blogController"
        })
        .when("/2014/06/30/Start",{
            templateUrl: "Views/2014/06/30/Start.html",
            controller: "blogController"
        })
        .otherwise({
            redirectTo: "/"
        });
}

blogApp.config(blogAppConfig);

var disqus_shortname = 'cashwugeek';
var disqus_identifier = 'http://blog.cashwu.com/#/2014/06/30/Start';
var disqus_url = 'http://blog.cashwu.com/#/2014/06/30/Start';
var disqus_script = 'embed.js';

function initMarkdown(){
    var markdown = document.getElementById("markdown");
    if (markdown){
        var converter = new Showdown.converter();
        var markdowncontent = markdown.innerHTML;
        var markdownhtml = converter.makeHtml(markdowncontent);
        document.getElementById("content").innerHTML = markdownhtml;

        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/' + disqus_script;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    }
//    else {
//        document.getElementById("content").innerHTML = "";
//    }
}