# Project Name

**WhereIsIt**

---

## Purpose

WhereIsIt is a lost and found platform designed to help people reconnect with their lost belongings or claim items they have found. The platform allows users to post details about lost or found items, search for items, and manage their posts. It promotes community collaboration to solve real-world problems.

---

## Live URL

[WhereIsIt Live Website](https://where-is-it-by-alifa.web.app)

---

## Key Features

1. **User Authentication**:

   - Email and password-based login/signup.
   - Social login options (e.g., Google).
   - JWT-based private routes for secure access.

2. **Lost and Found Management**:

   - Add posts for lost or found items with details such as title, category, location, and description.
   - Update and delete posts.

3. **Search and Filter**:

   - Search items by title or location.
   - Filter items by type (Lost or Found) and category (e.g., Pets, Documents, Gadgets).

4. **Item Recovery**:
   - Mark items as recovered with details like recovery date and location.
   - Separate page to manage all recovered items.

<!-- 5. **Pagination**:
   - Display paginated items for efficient browsing. -->

5. **Dynamic Titles**:

   - Each page has dynamic titles and meta descriptions for better UX and SEO.

6. **Responsive Design**:
   - Fully responsive design optimized for desktop, tablet, and mobile devices.

---

## NPM Packages Used

1. **React** - For building the UI.
2. **React Router DOM** - For routing and navigation.
3. **Tailwind CSS** - For styling.
4. **DaisyUI** - For pre-designed UI components.
5. **Flowbite-React** - For additional UI components.
6. **React-Helmet-Async** - For managing dynamic page titles and meta tags.
7. **Axios** - For making API calls.
8. **React Icons** - For using icons.
9. **React Hot Toast** - For toast notifications.
10. **Lottie React** - For animations.
11. **SweetAlert2** - For modal-based alerts.
12. **Date-FNS** - For formatting dates.
13. **React Date Picker** - For collecting and formatting dates.
14. **React Simple Typewriter** - For animated typewriter effects.
15. **Framer Motion** - For a simple animated object.

---

---

## How to Run the Project Locally

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:
   ```bash
   cd whereisit
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:5173
   ```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_API_URL=http://localhost:5000
ACCESS_TOKEN_SECRET=your_jwt_secret
```

Replace `your_jwt_secret` with your JWT secret key.

---


## API Endpoints

The project communicates with a Node.js/Express backend and MongoDB database. Key API endpoints:

1. **Authentication**:

   - `/jwt` - Generate JWT token.
   - `/logout` - Clear the token.

2. **Posts**:

   - `/addPost` - Add a new lost/found post.
   - `/allPosts` - Get all posts (supports search and filter).
   - `/postDetails/:id` - Get details of a single post.
   - `/updatePost/:id` - Update a specific post.
   - `/post/:id` - Delete a post.

3. **Recovered Items**:
   - `/addRecovered` - Mark an item as recovered.
   - `/allRecovered/:email` - Get all recovered items for a specific user.
