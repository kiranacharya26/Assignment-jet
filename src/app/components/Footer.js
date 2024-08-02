// src/app/components/Footer.js


const Footer = () => {
  return (
   <footer
        className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white text-center py-4"
        
        initial={{ opacity: 0, y: '100%' }}
        style={{ transition: 'opacity 0.5s ease, transform 0.5s ease' }}
      >
        <p>© 2024 Your Company. All rights reserved.</p>
      </footer>
  );
};

export default Footer;
