# 🍲 Food Adding Backend API

A simple Node.js + Express + MongoDB REST API for managing a food ordering system with JWT authentication.

---

## 🔧 Tech Stack

- **Backend Framework**: Node.js + Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt.js
- **File Uploads**: multer
- **Other Tools**: dotenv, cors, body-parser

---

## 🔍 Project Structure

```bash
├── config/
│   └── authMiddleware.js    # JWT authentication middleware
├── controllers/
│   ├── foodController.js    # Add, list, and remove food APIs
│   └── userController.js    # Register and login APIs
├── models/
│   ├── foodModel.js         # Mongoose schema for Food
│   └── userModel.js         # Mongoose schema for User
├── routes/
│   ├── foodRoutes.js        # Routes for food APIs
│   └── userRoutes.js        # Routes for user APIs
├── uploads/                 # Folder for uploaded images
├── .env                     # Environment variables
├── package.json             # Node dependencies
├── server.js                # Main server file
└── README.md                # Project Documentation
```

---

## 📁 Installation

```bash
# Clone the repository
git clone https://github.com/lokesh143b/thob_backend_assignment/

# Move into the project directory
cd your-project

# Install dependencies
npm install

# Create a .env file and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000

# Start the server
npm run server
```

---

## 🚀 Available APIs

### Auth Routes

#### 1. Register a new user

- **POST** `/user/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "phone": "9876543210"
}
```

**Responses:**
- Success: 201 Created
```json
{
  "success": true,
  "message": "User registered successfully"
}
```
- Error (user exists): 400 Bad Request

---

#### 2. Login (by email or phone)

- **POST** `/user/login`

**Request Body:**
```json
{
  "emailOrPhone": "john@example.com",
  "password": "123456"
}
```

**Responses:**
- Success: 200 OK
```json
{
  "success": true,
  "message": "Login successful",
  "token": "<jwt-token>"
}
```
- Error (invalid credentials): 400/401

---

### Food Routes (Protected)
> Add Authorization header: `Bearer <token>`

#### 3. Add a new food item

- **POST** `/food/add`
- **Headers**: Authorization: Bearer `<token>`
- **Form-Data**:
  - name: String
  - description: String
  - price: Number
  - category: String (One of: Salad, Rolls, Deserts, Sandwitch, Cake, Pure Veg, Pasta, Noodles, Drinks, Milkshakes)
  - image: File (image upload)

**Responses:**
- Success: 201 Created
```json
{
  "success": true,
  "message": "Food Added"
}
```

---

#### 4. List all food items

- **GET** `/food/list`
- **Headers**: Authorization: Bearer `<token>`

**Responses:**
- Success: 200 OK
```json
{
  "success": true,
  "message": "Food list fetched",
  "data": [
    {
      "_id": "...",
      "name": "Pizza",
      "description": "Cheesy pizza",
      "price": 299,
      "image": "image-file.jpg",
      "category": "Cake",
      "createdAt": "..."
    }
  ]
}
```

---

#### 5. Remove a food item

- **POST** `/food/remove`
- **Headers**: Authorization: Bearer `<token>`

**Request Body:**
```json
{
  "id": "food_item_id"
}
```

**Responses:**
- Success: 200 OK
```json
{
  "success": true,
  "message": "Item removed"
}
```

---

## 🌐 Image Access

Uploaded images are accessible at:
```bash
http://localhost:4000/images/<image-name>
```

Example:
```bash
http://localhost:4000/images/1682447663423-pizza.jpg
```

---

## 📊 Environment Variables (.env)

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=4000
```

---

## 🔗 Key Features
- Secure Authentication using JWT.
- Passwords are securely hashed.
- CRUD operations on food items.
- Image uploads and static serving.
- Organized MVC structure.
- Error handling and validation.

---

## 💪 Author

- Developed by Srirangam Lokeswara rao

---



---

## ✨ License

This project is open source. Feel free to use and modify!

