import { render } from '@testing-library/react';
import React, {useState, useRef, Component } from 'react';
import Project from './project'
import '../styles/home.css'

function Home() {

    const [project, setProject] = useState([]);

    function addProject() {
        this.setState({ projects: [...this.state.projects, {
            project, 
            id: this.state.projects.length,
        }]});
    };

    return (
        { project.map((project, id) => (
            <Project name={project.project} id={project.id} />
        ))}
    );
    
}

export default Home;
