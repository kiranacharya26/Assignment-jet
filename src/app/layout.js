// src/app/layout.js
import '../app/globals.css'; // Ensure this path is correct

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
