Project Overview
This project demonstrates best practices in building production-level landing pages and user dashboards. It utilizes Tailwind CSS for styling, Framer Motion for animations, and Next.js 14 for server actions and CRUD operations with JSONBin as the backend.

Key Features

Landing Page: A Clingr-inspired layout featuring a header, footer, and animated graphics using Tailwind CSS and Framer Motion.
Dashboard: CRUD operations for user data, displayed using Tanstack Table with search, filtering, pagination, and multi-select functionality.
Landing Page Implementation
Planning:

Component Structure: Separate client components, server components, and assets to maintain scalability.
Organization: Group components in subfolders within the components folder for better management.
Design and Animation:

Styling: Utilize Tailwind CSS for responsive and visually appealing layouts.
Animations: Apply Framer Motion for engaging animations, including mouse interactions and smooth transitions.
Hero Section: Create a dynamic hero section with animated text and images using Framer Motion.
Dashboard Implementation
Thought Process:

Server Actions and JSON: Use Next.js 14 server actions and JSON for handling CRUD operations.
User Data: Include fields such as first_name, last_name, email, alternate_email, password (hashed), and age (must be at least 18).
User Interface:

Navigation: Add a "Users" tab to the navigation pane.
Data Display: Use Tanstack Table to showcase user data with features for search, filtering by age, pagination, and multi-select delete.
Country Management:

State Management: Manage table paging and state using Tanstack Query to ensure automatic updates without page refreshes.
Client and Server Components
Client Components:

Navbar.js: Handles the navigation bar.
UserForm.js: Manages user input for adding or editing users.
UserList.js: Displays the list of users with options for editing and deleting.
Server Components:

route.js: Handles CRUD operations and server-side logic.
Design and Animation
Tailwind CSS: Provides responsive and modern styling.
Framer Motion: Implements advanced animations, including hover effects and smooth section transitions.
Database and CRUD Operations
JSONBin: Utilized as the backend database for simplicity.
CRUD Implementation: Managed by Next.js 14 server actions in route.js to ensure efficient data handling.
Note: JSONBin collections are used to store and manage user data.

Dependencies
Bush: Included for managing the application state and data.
Installation and Running:

Install Dependencies:
bash
Copy code
npm install
Run Development Server:
bash
Copy code
npm run dev
Build for Production:
bash
Copy code
npm run build
Access the Application:
Landing Page: Open a browser and go to http://localhost:3000.
Dashboard: Navigate to http://localhost:3000/dashboard.
