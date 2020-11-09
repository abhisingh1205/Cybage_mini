$(document).ready(()=>{

    var single_post_array;
    var all_users_array;
    var userName_posted;
    var current_postId;

    sessionStorage.setItem("blogit_userId","3");
    sessionStorage.setItem("blogit_userName","Rachel")


    var current_userID=Number(sessionStorage.getItem("blogit_userId"))
    var current_userName=sessionStorage.getItem("blogit_userName")

    // To GET ALL USERS
    $.ajax({
        url:"http://localhost:3333/users",
        type:"GET",
        success:(users)=>{
            all_users_array=users
            console.log(all_users_array);
            
        }
    })
    
    
    // TO GET SINGLE PAGE POST DATA
    $.ajax({
        url:"http://localhost:3333/posts?id=2",
        type:"GET",
        success:(post)=>{


            
            single_post_array=post[0];
            current_postId=single_post_array.id
            console.log(single_post_array);
            // console.log(postId);
            

            $('<img src="'+single_post_array.url+'" class="post-image">').appendTo(".post-container")
            $('<h1>'+ single_post_array.postTitle +'</h1>').appendTo(".post-container")
            $('<h5>Created At : '+single_post_array.postDate+'</h5>').appendTo(".post-container")
            $('<h5>Category : '+single_post_array.category+'</h5>').appendTo(".post-container")

            console.log(all_users_array);
            

            for(let i=0;i<all_users_array.length;i++)
            {
                if(single_post_array.userId == all_users_array[i].id)
                {
                    userName_posted=all_users_array[i].userName
                    break
                }
                else
                {
                    userName_posted="Unknown"

                }
    
            }

            $('<h5>Created By : '+userName_posted+'</h5>').appendTo(".post-container")
            $('<p>'+ single_post_array.content +'</p>').appendTo(".post-container")
        }
    })


    $.ajax({
        url:"http://localhost:3333/likes",
        type:"GET",
        success:(likes)=>{
            console.log(likes);
            var likes_on_post=0;
            var liked_flag=0;
            for(let i=0;i < likes.length;i++)
            {
                if(likes[i].postId == current_postId)
                {
                    likes_on_post++
                }
            }

            $('<h6>Likes '+likes_on_post+'</h6>').appendTo(".likes-container");
            $('<button class="btn-primary" id="likebtn">Like<button>').appendTo(".likes-container")

            $('#likebtn').click(()=>{
                
                var likes_array;
                $.ajax({
                    url:"http://localhost:3333/likes",
                    type:"GET",
                    success:(data)=>{
                        likes_array=data
                        
                    }
                })
                console.log(likes_array);
                
                for(let i=0;i<likes_array.length;i++)
                {
                    if(likes[i].userName == current_userName)
                    {
                        liked_flag=1
                        break
                    }
                }
                if(liked_flag == 1)
                {
                    $("#likebtn").html("Unlike")
                }
                else
                {
                    $("#likebtn").html("Like")
                }
                
            })
            
        }
    })
    
    // TO GET ALL COMMENTS
    $.ajax({
        url:"http://localhost:3333/comments",
        type:"GET",
        success:(comments)=>{
            console.log(comments);
            

            for(let i=0;i<comments.length;i++)
            {
                // debugger
                if(comments[i].postId==current_postId)
                {
                    // debugger;
                    console.log(comments[i]);
                     
                    $('<div class="well single-comment" id="commentid'+i+'"></div>').appendTo(".comments-container")

                    $('<h6>'+ comments[i].userName +'</h6>').appendTo('#commentid'+i)
                    $('<p>'+ comments[i].comment +'</p>').appendTo('#commentid'+i)

                }
            }

            $('<div class="post-comments"><h6>Post Your Comment</h6></div>').appendTo(".comments-container")
            $('<input type="text" class="input-post-comment">').appendTo(".post-comments")
            $('<button class="post-btn btn-primary">Post Comment</button>').appendTo(".post-comments")

            


            $(".post-btn").click(()=>{

                // var current_userID=Number(sessionStorage.getItem("blogit_userId"))
                // var current_userName=sessionStorage.getItem("blogit_userName")
                var curent_comment=$(".input-post-comment").val();

                var comment_obj={postId:current_postId,userId:current_userID,userName:current_userName,comment:curent_comment}

                $.ajax({
                    url:"http://blog-it-api.herokuapp.com/comments",
                    type:"POST",
                    data:JSON.stringify(comment_obj),
                    contentType:"application/json",
                    success:(data)=>{
                        alert("Success")
                    }
                    
                })
            })


            
        }
    })

    

})