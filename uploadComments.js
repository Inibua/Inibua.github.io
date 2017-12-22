$(document).ready(() => {
    $("#uploadPostForm").each(function () {
        $(this).submit(function (e) {
            return false;
        });
    });
    
    $("#formComments").each(function () {
        $(this).submit(function (e) {
            return false;
        });
    });
});

//template for creating a comment
function createComment(name, content, idComment, date) {
    const comment = '<li class="single-comment id=' + idComment + '">' +
        '<div class="commentText">' +
        '<h4>' + name + '</h4>' +
        '<p class="">' + content + '</p>' +
        '<span class="date sub-text">' + date + '</span>' +
        '</div>'+
        '</li>'
    return comment
}

function uploadComment(idPost) {
    if (userGlobal.id.length < 1 || idPost.length < 1) {
        return alertify.error("FIrst you must Login or sign up so that you can upload comment!")
    }
    $("#post-comment-post"+idPost).attr("disabled", true)
    let content = $("#input-text-comment-id-" + idPost).val();
    if (content == "") {
        $("#post-comment-post"+idPost).attr("disabled", false)
        alertify.error("Please insert some text in the field. Do not upload comments without content!");
        return;
    } else {
        postComment(idPost, content)
    }
}

function openCommentsPost(id) {
    let comments3 = postsArray[id]["comments"]
    for (let index = 0; index < comments3.length; index++) {
        let comment = comments3[index]
        let createdComment = createComment(comment.author.username, comment.content, comment._id, comment.createdOn)
        $("#post" + comments3[index].post).find("#comments-content2").prepend(createdComment)
    }
    let disp = $("#commentsPost" + id)[0]['style']['display'];
    if (disp != 'block') {
        $("#commentsPost" + id).css('display', 'block');
    } else {
        $("#commentsPost" + id).css('display', 'none');
    }
}

function postComment(postId, content) {
    let commentData = {
        "author": userGlobal.id,
        "postId": postId,
        "content": content
    }
    let settings = {
        async: true,
        crossDomain: true,
        url: "http://localhost:5000/comment/create",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        processData: false,
        data: JSON.stringify(commentData)
    }

    $.ajax(settings).done(function (response) {
        $("#post-comment-post"+response.comment.post).attr("disabled", false)
        let comment = createComment(userGlobal.username, response.comment.content, response.comment._id, response.comment.createdOn)
        $("#post" + response.comment.post).find("#comments-content2").prepend(comment)
    });
}
