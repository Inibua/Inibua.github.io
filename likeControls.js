function isLiked(userId, likes) {
    for (let i = 0; i < likes.length; i++) {
        if (likes[i] === userId) {
            return true
        }
    }
    return false
}

function changeColorLike(id) {
    let post = postsArray[id.trim()]
    addOrRemoveLike(id, userGlobal.id)
}

function addOrRemoveLike(postID, userID) {
    if (!userID || !postID) {
        return alertify.error("First you must Login or sign up so that you can like!")
    }
    if (userID.length < 1 || postID.length < 1) {
        return alertify.error("First you must Login or sign up so that you can like! Ehoooooooo")
    }
    let likedData = {
        "postId": postID,
        "userLiked": userID
    }
    if (isLiked(userID, postsArray[postID].likes)) {
        let settings = {
            async: true,
            crossDomain: true,
            url: "http://localhost:5000/post/removeLike",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "authorization": token
            },
            processData: false,
            data: JSON.stringify(likedData)
        }

        $.ajax(settings).done(function (response) {
            postsArray[response._id] = response
            $("#buttonLikes" + response._id).html('<span class="glyphicon glyphicon-thumbs-up" id="like' + response._id + '">' + response.likes.length)
            $("#buttonLikes" + response._id).css("background-color", 'aliceblue')
        });
    } else {
        let settings = {
            async: true,
            crossDomain: true,
            url: "http://localhost:5000/post/addLike",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "authorization": token
            },
            processData: false,
            data: JSON.stringify(likedData)
        }

        $.ajax(settings).done(function (response) {
            postsArray[response._id] = response
            $("#buttonLikes" + response._id).html('<span class="glyphicon glyphicon-thumbs-up" id="like' + response._id + '">' + response.likes.length)
            $("#buttonLikes" + response._id).css("background-color", '#00ccff')
        });
    }
}

function changeColorLikeOnLogin(idUser) {
    for (let key in postsArray) {
        for (let i = 0; i < postsArray[key]['likes'].length; i++) {
            if(postsArray[key]['likes'][i] === idUser){
                 $("#buttonLikes" + key).css("background-color", '#00ccff')
            }
        }
    }
}
