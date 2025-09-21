// Function that runs once the window is fully loaded
window.onload = function() {
    // Attempt to retrieve the API base URL from the local storage
    var savedBaseUrl = localStorage.getItem('apiBaseUrl');
    // If a base URL is found in local storage, load the posts
    if (savedBaseUrl) {
        document.getElementById('api-base-url').value = savedBaseUrl;
        loadPosts();
    }
}

// Function to fetch all the posts from the API and display them on the page
function loadPosts() {
    // Retrieve the base URL from the input field and save it to local storage
    var baseUrl = document.getElementById('api-base-url').value;
    localStorage.setItem('apiBaseUrl', baseUrl);

    // Use the Fetch API to send a GET request to the /posts endpoint
    fetch(baseUrl + '/posts')
        .then(response => response.json())  // Parse the JSON data from the response
        .then(data => {  // Once the data is ready, we can use it
            // Clear out the post container first
            const postContainer = document.getElementById('post-container');
            postContainer.innerHTML = '';

            // For each post in the response, create a new post element and add it to the page
            data.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.className = 'post';
                postDiv.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>
                <button onclick="editPost(${post.id}, '${post.title.replace(/'/g, "\\'")}', '${post.content.replace(/'/g, "\\'")}')">Edit</button>
                <button onclick="deletePost(${post.id})">Delete</button>`;
                postContainer.appendChild(postDiv);
            });
        })
        .catch(error => console.error('Error:', error));  // If an error occurs, log it to the console
}

// Function to send a POST request to the API to add a new post
function addPost() {
    // Retrieve the values from the input fields
    var baseUrl = document.getElementById('api-base-url').value;
    var postTitle = document.getElementById('post-title').value;
    var postContent = document.getElementById('post-content').value;

    // Use the Fetch API to send a POST request to the /posts endpoint
    fetch(baseUrl + '/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: postTitle, content: postContent })
    })
    .then(response => response.json())  // Parse the JSON data from the response
    .then(post => {
        console.log('Post added:', post);
        loadPosts(); // Reload the posts after adding a new one
    })
    .catch(error => console.error('Error:', error));  // If an error occurs, log it to the console
}

// Function to send a DELETE request to the API to delete a post
function deletePost(postId) {
    var baseUrl = document.getElementById('api-base-url').value;

    // Use the Fetch API to send a DELETE request to the specific post's endpoint
    fetch(baseUrl + '/posts/' + postId, {
        method: 'DELETE'
    })
    .then(response => {
        console.log('Post deleted:', postId);
        loadPosts(); // Reload the posts after deleting one
    })
    .catch(error => console.error('Error:', error));  // If an error occurs, log it to the console
}

// Search posts
function searchPosts() {
    var baseUrl = document.getElementById('api-base-url').value;
    var titleQuery = document.getElementById('search-title').value;
    var contentQuery = document.getElementById('search-content').value;

    if (!titleQuery && !contentQuery) {
        alert('Please enter a search term for title or content');
        return;
    }

    var searchUrl = baseUrl + '/posts/search?';
    if (titleQuery) searchUrl += 'title=' + encodeURIComponent(titleQuery) + '&';
    if (contentQuery) searchUrl += 'content=' + encodeURIComponent(contentQuery);

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            displayPosts(data);
        })
        .catch(error => console.error('Error:', error));
}

// Clear search and reload all posts
function clearSearch() {
    document.getElementById('search-title').value = '';
    document.getElementById('search-content').value = '';
    loadPosts();
}

// Sort posts
function sortPosts() {
    var baseUrl = document.getElementById('api-base-url').value;
    var sortField = document.getElementById('sort-field').value;
    var sortDirection = document.getElementById('sort-direction').value;

    if (!sortField) {
        loadPosts(); // Just load normally if no sort field selected
        return;
    }

    fetch(baseUrl + '/posts?sort=' + sortField + '&direction=' + sortDirection)
        .then(response => response.json())
        .then(data => {
            displayPosts(data);
        })
        .catch(error => console.error('Error:', error));
}

// Open edit modal
function editPost(postId, title, content) {
    document.getElementById('edit-post-id').value = postId;
    document.getElementById('edit-post-title').value = title;
    document.getElementById('edit-post-content').value = content;
    document.getElementById('edit-modal').style.display = 'flex';
}

// Close edit modal
function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

// Update post
function updatePost() {
    var baseUrl = document.getElementById('api-base-url').value;
    var postId = document.getElementById('edit-post-id').value;
    var title = document.getElementById('edit-post-title').value;
    var content = document.getElementById('edit-post-content').value;

    if (!title || !content) {
        alert('Please fill in both title and content');
        return;
    }

    fetch(baseUrl + '/posts/' + postId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, content: content })
    })
        .then(response => response.json())
        .then(data => {
            closeEditModal();
            loadPosts();
            console.log('Post updated:', data);
        })
        .catch(error => console.error('Error:', error));
}

// Function to display posts in the container
function displayPosts(posts) {
    // Clear out the post container first
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = '';

    // For each post in the response, create a new post element and add it to the page
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>
        <button onclick="editPost(${post.id}, '${post.title.replace(/'/g, "\\'")}', '${post.content.replace(/'/g, "\\'")}')">Edit</button>
        <button onclick="deletePost(${post.id})">Delete</button>`;
        postContainer.appendChild(postDiv);
    });
}
