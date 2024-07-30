Overview: 
This project covers the use of best practices at the production level to create landing/home pages and user dashboards. The landing page replicates the Clingr layout (including a header, footer, and an interesting triangle) using Tailwind CSS and Framer Motion to create beautiful graphics. The dashboard displays a tab for CRUD operations on user data, Next.js 14 uses server actions and JSON for database requirements. User data is displayed using a Tanstack Table with features such as search, filtering, pagination, and multi-select and delete operations.

Landing Page Implementation
Dashboard Implementation
Client and Server Components
Styling and Animations
Database and CRUD Operations
Running the Project

Landing page

Planning:
Separate client components, server components, and assets to ensure a maintainable and scalable codebase.
Organize components in subfolders within the component folder for easy handling.
Design and Animation:
Use Tailwind CSS for styling to ensure a functional and visually appealing layout.
Use Framer Motion for animation to create a dynamic and engaging user experience.
Recreate the Clingr layout, including headers, footers, and interesting triangles, ensuring that all required fonts, properties, and text are used.
Hero Section:
Create a hero section with great focused details that animate the mousepanel.
Make sure the hero’s image covers the entire side with the text overlapping the image.
Use Framer Motion for smooth fading and overlay animations.

Dashboard implementation

thought:
Use Next.js 14 server actions and JSON for database requirements to properly handle CRUD operations.
Ensure that the user data includes fields such as first_name, last_name, email, alternate_email, password (hash), and age (maximum of 18).
User Interface:
In the navigation pane, create a tab labeled "Users".
Display user data using a Tanstack Table with features such as search, age, pages, and multiselect delete functionality.
Country management:
For simplicity, handle table paging and state management in one package.
Use Tanstack Query to ensure that the username is automatically updated for every mutation (addition, change, deletion) without having to refresh the page.

client and server sides

Client Components: Components that manage the UI and user interface, such as Navbar.js, UserForm.js, and UserList.js.
Server Components: Components that manage server-side logic, such as route.js for CRUD processing.
Design and Animation

Tailwind CSS: Used for responsive and modern fashion.
Framer Motion: Used for advanced animations, including hover effects on hero text and smooth transitions between sections.
database and CRUD operations

JSON Database: Used for simplicity and ease of use in development environment.
CRUD implementation: Next.js inside route.js ensures compliance, efficiency and scalability of data management using 14 server actions.

Dependencies: Installed:
Bush
Copy the code
npm installation
Use the development server:
Bush
Copy the code
npm run dev
Procedures for:
Bush
Copy the code
npm run build
It starts at npm
Get the application form:
Open a browser and go to http://localhost:3000 to view the landing page.
Go to http://localhost:3000/dashboard and navigate to the user dashboard.


