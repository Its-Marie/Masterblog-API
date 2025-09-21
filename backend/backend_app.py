from flask import Flask, jsonify, request, redirect
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

POSTS = [
    {
        "id": 1,
        "title": "First post",
        "content": "This is the first post."
    },
    {
        "id": 2,
        "title": "Second post",
        "content": "This is the second post."
    }
]


# Helps to find post per ID
def find_post_by_id(post_id):
    for post in POSTS:
        if post["id"] == post_id:
            return post
    return None


@app.route('/api/posts/search', methods=['GET'])
def find_post_by_title_or_content():
    # Get query params (None if not provided)
    title_query = request.args.get("title")
    content_query = request.args.get("content")

    # Filter posts
    results = [
        post for post in POSTS
        if (
            (title_query and title_query.lower() in post["title"].lower())
            or (content_query and content_query.lower() in post["content"].lower())
        )
    ]

    # Return matching posts (empty list if no matches)
    return jsonify(results), 200


@app.route('/api/posts', methods=['GET'])
def get_posts():
    # Query-Parameter for sorting
    sort_field = request.args.get("sort")
    direction = request.args.get("direction", "asc")

    results = POSTS

    if sort_field:
        if sort_field not in ["title", "content"]:
            return jsonify({"error": f"Invalid sort field: {sort_field}. Must be 'title' or 'content'."
            }), 400

        if direction not in ["asc", "desc"]:
            return jsonify({"error": f"Invalid direction: {direction}. Must be 'asc' or 'desc'."}), 400

        reverse = direction == "desc"
        results = sorted(POSTS, key=lambda post: post[sort_field].lower(), reverse=reverse)

    return jsonify(results), 200


# POST /api/posts → add a new post
@app.route('/api/posts', methods=['POST'])
def add_post():
    data = request.get_json()  # Extract JSON data from the request body

    # Error handling (Step 5)
    if not data:
        return jsonify({"error": "Request body must be JSON"}), 400
    if "title" not in data:
        return jsonify({"error": "Title is required"}), 400
    if "content" not in data:
        return jsonify({"error": "Content is required"}), 400

    # Generate new ID (highest existing ID + 1)
    new_id = max(post["id"] for post in POSTS) + 1 if POSTS else 1

    # Build the new post
    new_post = {
        "id": new_id,
        "title": data["title"],
        "content": data["content"]
    }

    # Append new post to the list
    POSTS.append(new_post)

    # Return the new post with status 201 Created
    return jsonify(new_post), 201


@app.route('/api/posts/<int:id>', methods=['DELETE'])
def delete(id):

    post_to_delete = next((post for post in POSTS if post['id'] == id), None)

    if post_to_delete is None:
        return jsonify({"error": f"Post with id {id} not found"}), 404

    POSTS.remove(post_to_delete)

    return jsonify({"message": f"Post with id {id} has been deleted successfully."}), 200


# PUT /api/posts/<id> → update an existing post
@app.route('/api/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    # Step 1: Find the post
    post = find_post_by_id(post_id)
    if post is None:
        return jsonify({"error": "Post not found"}), 404

    # Step 2: Get JSON data
    data = request.get_json()
    if not data:
        return jsonify({"error": "Request body must be JSON"}), 400

    # Step 3: Update post (only if fields are provided)
    if "title" in data:
        post["title"] = data["title"]
    if "content" in data:
        post["content"] = data["content"]

    # Step 4: Return updated post
    return jsonify(post), 200


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5002, debug=True)