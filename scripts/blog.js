
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

function initMarkdown(){
    var markdown = document.getElementById("markdown");
    if (markdown){
        var converter = new Showdown.converter();
        var markdowncontent = markdown.innerHTML;
        var markdownhtml = converter.makeHtml(markdowncontent);
        document.getElementById("content").innerHTML = markdownhtml;
    }
//    else {
//        document.getElementById("content").innerHTML = "";
//    }
}