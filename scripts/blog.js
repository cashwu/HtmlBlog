
var blogApp = angular.module("blogApp",["ngRoute","ngDisqus"]);

blogApp.controller("blogController", function($scope, $routeParams){

    $scope.$on("$routeChangeSuccess", function(event, current, previous){

        var url = "";
        if (!isEmpty($routeParams)) {
            url = "http://blog.cashwu.com/" + $routeParams.year + "/" + $routeParams.month + "/" + $routeParams.day + "/" + $routeParams.title;
        }

        $scope.url = typeof($routeParams.title) == "undefined" ? "" : url;

        init();
    });

});

blogApp.controller("ArchivesController", function($scope){
    $scope.archives = archives;
});

function blogAppConfig($disqusProvider, $routeProvider){

    $disqusProvider.setShortname('cashwugeek');

    $routeProvider
        .when("/Archives",{
            templateUrl: "Views/Archives.html",
            controller: "ArchivesController"
        })
        .when("/AboutMe",{
            templateUrl: "Views/AboutMe.html",
            controller: "blogController"
        })
        .when("/:year/:month/:day/:title",{
            templateUrl: function(obj){
                return "Views/" + obj.year + "/" + obj.month + "/" + obj.day + "/" + obj.title + ".html";
            },
            controller: "blogController"
        })
        .otherwise({
            redirectTo: "/Archives"
        });
}

blogApp.config(blogAppConfig);

function init(){
    var markdown = document.getElementById("markdown");
    if (markdown){
        initMarkdown(markdown);
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