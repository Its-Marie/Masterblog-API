from flask import Flask, jsonify, request
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
    # ✅ Problematischen dritten Post komplett entfernt!
]

@app.route('/api/posts', methods=['GET'])
def get_posts():
    return jsonify(POSTS)


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


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5002, debug=True)