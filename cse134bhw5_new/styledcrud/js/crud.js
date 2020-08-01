$('#posts').on('show', bindPosts);
let posts;

async function bindPosts() {

    document.getElementById("logout").addEventListener('click', function () {

        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log('Sign-out successful.')
            $('#loginForm').show();
            $('#posts').hide().trigger('hide').find('#output').empty();
        }).catch(function (error) {
            // An error happened.
            console.log('Sign-out error.', error)

        });
    });


    createBtn.addEventListener('click', function () {
        if (typeof dialog.showModal === "function") {
            dialog.showModal();
        }
    });

    // let rawPosts;

    // // each entry is the stringified JSON
    // rawPosts = window.localStorage.getItem('posts');


    posts = await getPosts();


    if (posts.length === 0) {
        output.innerHTML = "No posts currently listed";
    }

    posts.forEach(({
        postId,
        date,
        title,
        summary,
    }) => {
        output.appendChild(createPostNode(postId, title, date, summary));
        addButtonListeners(postId);
    });


    delete_post_ok.addEventListener('click', async function () {

        const postId = delete_post_id.value;
        const idx = posts.findIndex(post => post.postId === postId);
        // find the index
        posts.splice(idx, 1);
        document.getElementById(postId).parentNode.remove();

        if (posts.length === 0) {
            output.innerHTML = "No posts currently listed";
        }

        // delete the post
        const postRef = await deletePost(postId);
    });

    ok.addEventListener("click", async function (e) {
        e.preventDefault();

        const newPost = {};

        newPost.title = post_title.value;
        newPost.date = post_date.value;
        newPost.summary = post_summary.value;
        const postId = post_id.value;

        let foundIndex = -1;

        if (postId) {
            foundIndex = posts.findIndex(({ postId: pid }) => pid === postId);
        }

        // update
        if (foundIndex !== -1) {
            // compare difference
            const oldPost = posts[foundIndex];
            const updatedKeys = {};
            Object.keys(oldPost).filter(key => newPost[key] !== undefined).forEach(key => oldPost[key] !== newPost[key] && (updatedKeys[key] = newPost[key]));
            await updatePost({ ...updatedKeys, postId });
            posts[foundIndex] = { ...oldPost, ...newPost };
            console.log(postId, document.getElementById(postId))
            document.getElementById(postId).innerHTML = getPostContentInner(postId, post_title.value, post_date.value, post_summary.value);
            addButtonListeners(postId);

        } else {
            // insert
            const postRef = await insertPost(newPost);
            posts.push({ ...newPost, postId: postRef.id });
            output.appendChild(createPostNode(postRef.id, post_title.value, post_date.value, post_summary.value));
            addButtonListeners(postRef.id);
        }

        // clear values
        post_title.value = null;
        post_date.value = null;
        post_summary.value = null;
        post_id.value = null;

        dialog.close();
    })

    function addButtonListeners(postId) {
        addListenerToPostDeleteButton(postId);
        addListenerToPostEditButton(postId);
    }

    function addListenerToPostDeleteButton(postId) {

        document.getElementById(getDeleteButtonId(postId)).addEventListener('click', function (e) {
            // show modal
            if (typeof deleteDialog.showModal === "function") {
                deleteDialog.showModal();
            }
            delete_post_id.value = postId;
        });
    }

    function addListenerToPostEditButton(pid) {

        document.getElementById(getEditButtonId(pid)).addEventListener('click', function (e) {
            // get post
            const post = posts.find(({ postId }) => postId === pid);

            // show modal
            if (typeof dialog.showModal === "function") {
                dialog.showModal();
            }

            const {
                title,
                date,
                summary,
                postId,
            } = post;

            // retrieve value
            post_title.value = title;
            post_date.value = date;
            post_summary.value = summary;
            post_id.value = postId;
        });
    }

    function formatPostId(id) {
        return 'post-' + id;
    }

    function getDeleteButtonId(postId) {
        return postId + '_delete';
    }


    function getEditButtonId(postId) {
        return postId + '_edit';
    }

    function getPostTemplate(postId, title, date, summary) {

        return `
    ${getPostContent(postId, title, date, summary)}
    <button id="${getEditButtonId(postId)}"> <i class="fa fa-pencil-square-o"></i></button>
    <button id="${getDeleteButtonId(postId)}"><i class="fa fa-close"></button>`;
    }

    function getPostContent(postId, title, date, summary) {
        return `<span id="${postId}">${getPostContentInner(title, date, summary)}</span>`;
    }

    function getPostContentInner(postId, title, date, summary) {
        return `
        <h5 class="card-title">Post Title: ${title || 'Unavailable'}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Post Date: ${date || 'Unavailable'}</h6>
        <p class="card-text">Post Summary: ${summary || 'Unavailable'}</p>
        <a href="#" id="${getEditButtonId(postId)}" class="card-link fa fa-pencil-square-o">Edit</a>
        <a href="#" id="${getDeleteButtonId(postId)}" class="card-link fa fa-close">Delete</a>`;

        // return `<b>Post Title:</b> ${title}, <b>Post Date: </b>${date}, <b>Post Summary: </b>${summary}`;
    }

    function createPostNode(postId, title, date, summary) {
        return $(`
         <div class="card" style="width: 18rem;">
           <div id="${postId}" class="card-body">
            ${getPostContentInner(postId, title, date, summary)}
           </div>
         </div>`
        )[0];

        // const container = document.createElement('div');
        // container.innerHTML = getPostTemplate(postId, title, date, summary);
        // return container;
    }
    const colors = [
        '#A9DFBF',
        '#AED6F1',
        '#F5B7B1',
        '#FAD7A0',
    ];

    let colorIndex = 0;

    createBtn.style.backgroundColor = colors[0];

    createBtn.addEventListener('click', function changeColor() {
        createBtn.style.backgroundColor = colors[++colorIndex];

    })


}
