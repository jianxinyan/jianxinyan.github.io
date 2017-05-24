"use strict";
(function() {
    window.onload = function(){
        
    function $(id){
        return(document.getElementById(id));
    }
    
    var logos = document.querySelectorAll(".logo");
    for(var i = 0; i < logos.length; i ++){
        logos[i].onclick = checkProccess
    }
    
        update();

    
    function checkProccess(){
        if(this.classList.contains("off")){
            this.classList.remove("off");
        } else{
            this.classList.add("off");
        }
        update();
    }
    
    function update(){
        var allPosts = [];
        for(var i = 0; i < logos.length;i++){
            if(!logos[i].classList.contains("off")){
                var temp = call(logos[i].classList[1]);
                allPosts.push(temp[0])
                allPosts.push(temp[1])
            }
        }
        shuffle(allPosts);
        console.log(allPosts);
        
        var currentPosts = document.querySelectorAll(".post")
        for(var i = 0; i < currentPosts.length; i++){
            if(i<allPosts.length){
                //Profile
                var thisPost = currentPosts[i];
                thisPost.classList.remove("hidden")
                thisPost.classList.remove("ig")
                thisPost.classList.remove("fb")
                thisPost.classList.remove("tt")
                thisPost.classList.remove("pt")

                var thisChild = thisPost.children;
                var thisUser = thisChild[0].children;
                thisUser[0].src = allPosts[i].profile;
                thisPost.classList.add(allPosts[i].zpostType)

                
                
                //Handle
                var thisInfo = thisUser[1].children;
                var allPostsInfo = allPosts[i].info;
                if(allPostsInfo.handle !="no handle"){
                    thisInfo[0].innerHTML = allPostsInfo.handle;
                } else{
                    thisInfo[0].innerHTML = " ";
                }
                
                //Name
                thisInfo[1].innerHTML = allPostsInfo.name;
                thisInfo[2].innerHTML = allPostsInfo.date;
                thisChild[1].innerHTML = allPostsInfo.postText;
                
                
                if(allPosts[i].picture != "none"){
                    thisChild[2].src = allPosts[i].picture;
                } else{
                    thisChild[2].src = ""
                }
                
                
            } else{
                currentPosts[i].classList.add("hidden");
            }
            
        }
    }
    
    function call(req){
        var data;
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "index.php?req="+req, false);
        ajax.onload = function(){
            data = JSON.parse(ajax.response);
        }
        ajax.onerror = function(){
            alert("dead")
        }
        ajax.send();
        
        return data;
    }
    
    function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
}})();