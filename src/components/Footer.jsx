import styles from '../styles/Footer.module.css';


/**
 * Footer component for the application.
 * This component shows my name and states that the application is for educational purposes only.
 * This component also includes links to GitHub and LinkedIn profiles with icons.
 * Some text and links are styled to be visible only on desktop devices.
 */

const Footer = () => {
  return (
    <footer className={styles.Footer}> 
      <p>
        <span className={styles.Desktoponly}>Created by </span> 
        Jamie Connell Student of Code Institute 
        <span className={styles.DesktopOnly}>For Educational Purposes only</span> 
        <span className={styles.DesktopOnly}>2024</span> 
      </p>
      <span>
        <a
          href="https://github.com/GreenNinjaBoy"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my GitHub profile (opens in a new tab)"
          className={styles.DesktopOnly}
        >
          <i className="fa-brands fa-github"></i> 
        </a>
        <a
          href="https://www.linkedin.com/in/jamie-connell-995748193/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my LinkedIn profile (opens in a new tab)"
          className={styles.DesktopOnly}
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </span>
    </footer>
  );
}

export default Footer; 