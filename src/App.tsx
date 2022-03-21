import logo from './logo.svg';
import styles from './App.module.less';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState<string>();

  useEffect(() => {
    axios.get('/api/').then((res) => setTitle(res.data));
  }, []);

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={styles.AppLink}
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          {title}
        </a>
      </header>
    </div>
  );
}

export default App;
