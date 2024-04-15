import React from 'react';
import styles from './Nav.module.css'
import Image from 'public/logo.png';

const Nav: React.FC<{}> = () => {
  return (
    <nav className={styles.navbar}>

        <div className={styles['logo-container']}>
            <img src = '/logo.png' alt="Logo"/>
        </div>
    
    </nav>
  )
}

export default Nav;
