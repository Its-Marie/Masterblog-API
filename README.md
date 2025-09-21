# Masterblog API

A simple Flask-based REST API for managing blog posts with a modern frontend interface.

## Features

- 📚 **CRUD Operations**: Create, Read, Update, Delete blog posts
- 🔍 **Search Functionality**: Search posts by title or content
- 🔄 **Sorting**: Sort posts by title or content (ascending/descending)
- 🌐 **CORS Enabled**: Frontend-backend communication support
- 💻 **Modern Frontend**: Clean HTML/CSS/JavaScript interface

## API Endpoints

### Get All Posts
```http
GET /api/posts
```
**Query Parameters:**
- `sort` (optional): Sort field (`title` or `content`)
- `direction` (optional): Sort direction (`asc` or `desc`)

### Search Posts
```http
GET /api/posts/search
```
**Query Parameters:**
- `title` (optional): Search in post titles
- `content` (optional): Search in post content

### Create New Post
```http
POST /api/posts
```
**Request Body:**
```json
{
  "title": "Post Title",
  "content": "Post content here..."
}
```

### Update Post
```http
PUT /api/posts/<id>
```
**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

### Delete Post
```http
DELETE /api/posts/<id>
```

## Installation & Setup

### Prerequisites
- Python 3.7+
- pip

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Its-Marie/Masterblog-API.git
   cd Masterblog-API
   ```

2. Create virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install flask flask-cors
   ```

4. Run the backend:
   ```bash
   python3 backend/backend_app.py
   ```
   Backend will run on `http://127.0.0.1:5002`

### Frontend Setup
1. Run the frontend server:
   ```bash
   python3 frontend/frontend_app.py
   ```
   Frontend will run on `http://127.0.0.1:5001`

2. Open your browser and navigate to `http://127.0.0.1:5001`

## Usage

1. **View Posts**: Posts are automatically loaded when you visit the frontend
2. **Add Post**: Fill in the title and content fields, then click "Add Post"
3. **Search Posts**: Use the search functionality to find specific posts
4. **Sort Posts**: Use query parameters to sort posts by different criteria

## Project Structure

```
masterblog-api/
├── backend/
│   └── backend_app.py          # Flask API server
├── frontend/
│   ├── frontend_app.py         # Frontend server
│   ├── static/
│   │   ├── styles.css          # CSS styles
│   │   └── main.js             # JavaScript functionality
│   └── templates/
│       └── index.html          # Main HTML template
└── README.md
```

## API Response Examples

### Get Posts Response
```json
[
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
```

### Error Response
```json
{
  "error": "Post not found"
}
```

## Technologies Used

- **Backend**: Flask, Flask-CORS
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with Google Fonts (Poppins)
- **Data Storage**: In-memory (Python list)

## Development

### Running in Debug Mode
Both servers run in debug mode by default, which means:
- Auto-reload on file changes
- Detailed error messages
- CORS enabled for development

### Extending the API
To add new features:
1. Add new routes in `backend_app.py`
2. Update the frontend JavaScript in `main.js`
3. Modify the HTML interface as needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Created by [Marie Hirte](https://github.com/Its-Marie) - feel free to contact me!

---

⭐ **Star this repo if you found it helpful!**
