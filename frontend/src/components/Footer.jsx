import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer-glow app-footer-glow-left" />
      <div className="app-footer-glow app-footer-glow-right" />
      <div className="app-footer-content">
        <h3>JustTicketIT</h3>
        <p>Built with MERN Stack</p>
        <p className="app-footer-copy">� 2026 Joy Das</p>
      </div>
    </footer>
  );
};

export default Footer;
