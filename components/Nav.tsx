import React from "react";
import styles from "./Nav.module.css";
import Image from "public/logo.png";
import Link from "next/link";

const Nav: React.FC<{}> = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles["logo-container"]}>
        <Link href="/">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>

      <div>
        <Link
          href="/create-event"
          className="absolute right-10 mt-4 hover:text-primary"
        >
          Create Event
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
