$(document).ready(function() {
    $("#factsTab").addClass("selected");
    $("#factsTab").on("click", function() {
        $(this).addClass("selected");
        $("#opinionsTab").removeClass("selected");
        $("#experiencesTab").removeClass("selected");
        $(".opinionsPostsContainer").hide("slow");
        $(".experiencesPostsContainer").hide("slow");
        $(".newPostContainer").hide("slow");
        $(".factsPostsContainer").show("slow");
    });

    $("#opinionsTab").on("click", function() {
        $(this).addClass("selected");
        $("#factsTab").removeClass("selected");
        $("#experiencesTab").removeClass("selected");
        $(".factsPostsContainer").hide("slow");
        $(".experiencesPostsContainer").hide("slow");
        $(".newPostContainer").hide("slow");
        $(".opinionsPostsContainer").show("slow");
    });

    $("#experiencesTab").on("click", function() {
        $(this).addClass("selected");
        $("#factsTab").removeClass("selected");
        $("#opinionsTab").removeClass("selected");
        $(".factsPostsContainer").hide("slow");
        $(".opinionsPostsContainer").hide("slow");
        $(".newPostContainer").hide("slow");
        $(".experiencesPostsContainer").show("slow");
    });

    $(".newPostButton").on("click", function() {
        //Need to check user is signed in
        $("#factsTab").removeClass("selected");
        $("#opinionsTab").removeClass("selected");
        $("#experiencesTab").removeClass("selected");
        $(".factsPostsContainer").hide("slow");
        $(".opinionsPostsContainer").hide("slow");
        $(".experiencesPostsContainer").hide("slow");
        $(".newPostContainer").show("slow");
    });

    $(".signUpButton").on("click", function() {
        $("#loginSection").hide();
        $(".signUpButton").hide();
        $("#signUpSection").show();
        $(".signInButton").show();
    });

    $(".signInButton").on("click", function() {
        $("#signUpSection").hide();
        $(".signInButton").hide();
        $("#loginSection").show();
        $(".signUpButton").show();
    });

    $(".upArrow").on("click", function() {
        let postID = this.parentElement.previousElementSibling.attributes.id.value;
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/vote",
            data: {
                "postID": postID, 
                "voteType": "up"
            },
            success: successHandler,
        });
    });

    function successHandler(data) {
        console.log(data);
        let postScore = document.getElementById(data.id).nextElementSibling;
        postScore.children[1].innerHTML = data.score;
        postScore.children[0].classList.add("red");
    }
});
