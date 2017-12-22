function toPosts() {
    $("#navbar-info").removeClass("active");
    $("#info-page").css("display", "none");
    $("#navbar-posts").addClass("active");
    $("#posts-page").css("display", "block");
}

function toInfo() {
    $("#navbar-posts").removeClass("active");
    $("#posts-page").css("display", "none");
    $("#navbar-info").addClass("active");
    $("#info-page").css("display", "block");
}