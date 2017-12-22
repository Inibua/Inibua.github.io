var imageBase64 = "";
var title = "";
var postsArray = {};
var responseGlobal = {};

$(document).ready(() => {
    loadAllPosts()
});

function loadAllPosts() {
    let settings = {
        async: true,
        crossDomain: true,
        url: "https://cors-anywhere.herokuapp.com/http://164.138.216.49:5000/post/all",//"http://localhost:5000/post/all",
        method: "GET",
        dataType: "json",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        processData: false
    }

    $.ajax(settings).done(function (response) {
        responseGlobal = response
        for (let i = response.length - 1; i >= 0; i--) {
            postsArray[response[i]._id] = response[i]
            let singlePost = createPost(response[i]._id, response[i].title, response[i].postUrl, response[i].likes.length)
            $("#posts-page").prepend(singlePost)
            loadSinglePostComments(response[i]._id)
        }
    });
}

function loadSinglePostComments(postId) {
    let settings = {
        async: true,
        crossDomain: true,
        url: "https://cors-anywhere.herokuapp.com/http://164.138.216.49:5000/comment/getComments/" + postId,//"http://localhost:5000/comment/getComments/" + postId,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        processData: false
    }
    let result = []
        $.ajax(settings).done(function (response) {
        postsArray[postId]["comments"] = response
    })
}

function createPost(id, title, url, cLikes) {

    const html = '<div class="single-post container" id="post' + id + '">' +
        '<div class="single-post-image-container">' +
        '<h2 class="single-post-heading" id ="heading">' + title + '</h2>' +
        '<img class="single-post-image img-rounded" id="image" src="' + url + '"/>' +
        '</div>' + //end single-post-image-container
        '<div class="votes-comment-buttons btn-group">' +
        //'<span class="votes-comments">' +
        //'<span class="vote-buttons">' +
        '<button class="like-button btn btn-default" id="buttonLikes' + id + '" onClick="changeColorLike(\'' + id + '\')"><span class="glyphicon glyphicon-thumbs-up" id="like' + id + '"></span>' + cLikes + ' </button>' +
        //'</span>' +
        '<span class="show-comment-button">' +
        '<button class="open-comments-button btn btn-default" onClick="openCommentsPost(\'' + id + '\')"><span class="glyphicon glyphicon-comment"></span> Comments </button>' +
        //'</span>' +
        //'</span>' +
        '</div>' +//end votes-comment-buttons
        
        //begin comments container  
        '<div class="comments-container detailBox container" id="commentsPost' + id + '">' +//open detailBox
        '<div class="titleBox">' +//open titleBox
        '<label>Comments</label>' +//close label
        '</div>' + //end titleBox
        '<div class="comments-body actionBox">' + //open actionBox
        '<form id="formComments" class="form-inline" role="form">' +//open form
        '<div class="form-group">'+ //open formgroup
        '<input class="form-control" type="text" placeholder="Your comments" id="input-text-comment-id-' + id + '"/>'+//close input
        '</div>' +//close formgroup
        '<div class="form-group">'+//open formgroup
        '<button class="addCommentButton btn btn-default" id="post-comment-post' + id + '" onClick="uploadComment(\'' + id + '\')">Add</button>' +
        '</div>' +//close formgroup
        '</form>'+//close form
        '<ul id="comments-content2" class="commentList">' +//open ul
        '</ul class="comments-content2">' +//close ul    
        '</div> ' + // end actionBox
        '</div>' +//end detailBox
        '</div><!--end of single post container-->'
        

    return html;
}


function uploadPost() {
    $("#uploadNewPostButton").attr("disabled", true)
    empty = " ";
    title = $("#title-new-post").val();
    if(title.length < 1){
        alertify.error("Title can not be empty")
    }
    let imageData = "";
    while (imageBase64 != "") {
        if (imageBase64.length > 1) {
            break;
        }
    }
    uploadImgur()
}

function uploadImgur() {
    let imageData = {
        image: imageBase64
    }
    let imageUploadRequest = {
        method: 'POST',
        url: 'https://api.imgur.com/3/upload',
        headers: {
            'Authorization': 'Client-ID 4c7e742000836ce'
        },
        data: imageData,
        success: imageUploaded,
        error: errorCreate
    }
    // Send request to upload.
    return $.ajax(imageUploadRequest)
}

function imageUploaded(response) {
    postPost(response.data.link, title)
    $("#closeUpload").trigger("click", "close")
}

function errorCreate(response) {
    $("#uploadNewPostButton").attr("disabled", false)
}

function encodeImagetoBase64(element) {
    file = element.files[0];
    reader = new FileReader();
    reader.onloadend = function () {
        imageBase64 = reader.result.slice(reader.result.indexOf(",") + 1)
    }
    reader.readAsDataURL(file);
}

function postPost(link, title) {
    let post = {
        "postUrl": link,
        "title": title,
        "author": userGlobal.id
    }
    let settings = {
        async: true,
        crossDomain: true,
        url: "https://cors-anywhere.herokuapp.com/http://164.138.216.49:5000/post/create",//"http://localhost:5000/post/create",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "authorization": token
        },
        processData: false,
        data: JSON.stringify(post)
    }

    $.ajax(settings).done(function (response) {
        $("#uploadNewPostButton").attr("disabled", false)
        postsArray[response.post._id] = response.post
        let newSinglePost = createPost(response.post._id, response.post.title, response.post.postUrl, response.post.likes.length)
        $("#posts-page").prepend(newSinglePost)
    });
}



