'use strict';

var articles;
var scroler = 0;
var list = 1;
var p = document.getElementById("list");

$(".articles").each(function() {
    const $articles = $(this).find(".new_article");
    articles=$articles.length;

    
    if (articles > 4){
        document.getElementById("right_arr").style.display = "block";
    }
})

function news_left_but() {
    var chet = articles % 4;
    var max_scroll = articles / 4;
    
    scroler = scroler - 1530;

    if (list > 1){
        document.getElementById("left_arr").style.display = "block";
    }

    document.getElementById("articles").scrollTo(scroler,0);

    list = list - 1;
    p.innerHTML = list;
    if(list == 1){
        document.getElementById("right_arr").style.display = "block";
        document.getElementById("left_arr").style.display = "none";
    }
}


function news_right_but(){
    var chet = articles % 4;
    var max_scroll = articles / 4;
    
    scroler = scroler + 1530;

    if (scroler > 0){
        document.getElementById("left_arr").style.display = "block";
    }

    document.getElementById("articles").scrollTo(scroler,0);
    list = list + 1;
    p.innerHTML = list;
    if(list >= max_scroll){
        document.getElementById("right_arr").style.display = "none";
    }
}