import React from 'react'
import styles from './styles/App.module.css'

class App extends React.Component {

    state = {
        username: '',
        password: ''
    }

    render() {
        return (
            <div className="App">
                <h1>Bug Tracker</h1>
                <div className={styles.box}></div>
            </div>
        );
    }
}

export default App;