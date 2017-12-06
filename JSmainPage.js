$(document).ready(() => {
  /*$("#uploadNewPostButton").click(uploadPost);*/
  $("#form").each(function(){
    $( this ).submit(function(e){
    console.log(e);
    return false;
      });
  });
    
    $("#form2").each(function(){
    $( this ).submit(function(e){
    console.log(e);
    e.preventDefault();
      });
  });
    
});

 
function uploadPost() {
    empty=" ";
    title = $("#title-new-post").val();
    $("#title-new-post").text(empty);
    imageLink = $("#link-picture-new-post").val();
    if (title == ""){
        alert("Please insert a title!");
      return;
    } else if(imageLink=="") {
         alert("Please insert a valid image url!");
      return;
    } else {
      let id = Math.floor(Math.random() * 100000)+1
      $(".posts.content").prepend(createPost(id));
      $("#"+id).find("#heading").text(title);
      $("#"+id).find("#image").attr("src",imageLink)
      $("#closeUpload").trigger("click");
    }
}

function createPost(id) {

  const html = '<div class="single-post container" id="'+id+'">'+
          '<div class="single-post-image-container">'+
          '<h2 class="single-post-heading" id ="heading"></h2>'+
          '<img class="single-post-image" id="image"/>'+
        '</div>'+
        '<div class="votes-comment-buttons">'+
          '<span class="votes-comments">'+
            '<span class="vote-buttons">'+
              '<button class="like-button" id="button'+id+'" onClick="changeColorLike('+id+')"><span class="glyphicon glyphicon-thumbs-up"></span> Like </button>'+
            '</span>'+
            '<span class="show-comment-button">'+
              '<button type="button" class="open-comments-button" data-toggle="modal" data-target="#myModalCommentsPost'+id+'"><span class="glyphicon glyphicon-comment"></span> Comments </button>'+
            '</span>'+
          '</span>'+
        '</div>'+
       
        '<!--container class for modal-->'+
        '<div class="container">'+
        '<!-- Modal -->'+
         ' <div class="modal fade" id="myModalCommentsPost'+id+'" role="dialog">'+
         '   <div class="modal-dialog">'+
           '   <!-- Modal content-->'+
           '   <div class="modal-content">'+
           '       <div class="modal-header">'+
           '         <button type="button" class="close" data-dismiss="modal">&times;</button>'+
           '         <h4 class="modal-title">Comments</h4>'+
           '       </div>'+
           '       <div class="modal-body">'+
           '         <div class="modal-body-comments">'+
             
           '             <h4>Write Comment</h4>'+
           '             <input type="comment" id="input-text-comment-id-'+id+'"/>'+
           '             <button id="post-comment-post'+id+'" onClick="uploadComment('+id+')">Comment</button>'+
                  
           '         </div>'+
           '         <div class="comments-content">'+
           '         </div> '+
           '       </div>'+
           '       <div class="modal-footer">'+
           '         <button type="button" class="btn btn-default" data-dismiss="modal" id="close">Close</button>'+
      '            </div>'+
      '          </div>'+
      '        </div>'+
      '      </div>'+
      '    </div>'+
      '  </div><!--end of single post container-->'
 
      return html;
}




function createComment(name,content){
    let idComment = Math.floor(Math.random() * 100000)+1
  const comment = '<div class="single-comment id='+idComment+'">'+
                   '     <h4>'+name+'</h4>'+
                   '     <p>'+content+'</p>'+
                   '   </div>'
  return comment;    
}

function uploadComment(id) {
    let idUser = Math.floor(Math.random() * 100000)+1
  let name = "Some user" + idUser;
  content = $("#input-text-comment-id-"+id).val();
  if(content == ""){
      alert("Please insert some text in the field. Do not upload comments without content!");
    return;
  } else {
    $("#myModalCommentsPost"+id).find(".comments-content").prepend(createComment(name, content));
  }
}

function changeColorLike(id) {
    let color = $("#button"+id)[0]['style']['background-color'];
    if(color === "aliceblue" || color === ""){
        $("#button"+id).css("background-color", '#00ccff');
    } else {
        $("#button"+id).css("background-color", 'aliceblue');
    }
}