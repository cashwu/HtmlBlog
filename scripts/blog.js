
var blogApp = angular.module("blogApp",["ngRoute"]);

blogApp.controller("blogController", function($scope, $routeParams){

    $scope.$on("$routeChangeSuccess", function(event, current, previous){

        var url;
        if (!isEmpty($routeParams)) {
            url = "http://blog.cashwu.com/#/" + $routeParams.year + "/" + $routeParams.month + "/" + $routeParams.day + "/" + $routeParams.title;
            init(url);
        }

        if (typeof($routeParams.title) == "undefined") {
            $scope.pageTitle = "Cash Wu Geek";
            $scope.url = "http://blog.cashwu.com";
        } else {
            $scope.pageTitle = $routeParams.title + " | Cash Wu Geek";
            $scope.url = url;
        }
    });

});

blogApp.controller("defaultController", function($scope) {
});

function blogAppConfig($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl: "Views/default.html",
            controller: "defaultController"
        })
        .when("/:year/:month/:day/:title",{
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
var disqus_identifier = 'http://blog.cashwu.com';
var disqus_url = 'http://blog.cashwu.com';

function init(url){
    var markdown = document.getElementById("markdown");
    if (markdown){
        initMarkdown(markdown);
        intDsq(url);
    }
}

function isEmpty(myObject) {
    for(var key in myObject) {
        if (myObject.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

function initMarkdown(markdown){
    var converter = new Showdown.converter();
    var markdowncontent = markdown.innerHTML;
    var markdownhtml = converter.makeHtml(markdowncontent);
    document.getElementById("content").innerHTML = markdownhtml;
}

function intDsq(url){

    disqus_identifier = url;
    disqus_url = url;

    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
}