import React from "react";
import styles from "./footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <span>© {new Date().getFullYear()} All rights reserved.</span>
      <span>Made with by Simran</span>
    </div>
  </footer>
);

export default Footer;
