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
                <h1 className={styles.title}>Bug Tracker</h1>
                <div className={styles.box}></div>
                <div className={styles.form}>
                    <form action="/Account_Authentication.js">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="Username" placeholder="Username.."></input>
                        <label for="password">Password</label>
                        <input type="text" id="password" name="Password" placeholder="Password.."></input>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
            </div>
        );
    }
}

export default App;