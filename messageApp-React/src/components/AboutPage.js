import React, { Component } from 'react'
import { UserCard } from '../users/UserCard'

export class AboutPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h3>About</h3>

                <p>
                    We are Eleftheria, Dimitris, Leonidas and Miltiadis. Sometimes we create n-tier applications with Java and Javascript. Some other times we just admire Dimitris' unique point of view for life.
                </p>

                Find us in Github:
                <ul>
                <li><a href='https://github.com/elpaidousi/'>-@elpaidousi</a></li>
                <li><a href='https://github.com/NikolidakisDimitris/'>-@NikolidakisDimitris</a></li>
                <li><a href='https://github.com/varoleon/'>-@varoleon</a></li>
                <li><a href='https://github.com/Milaskaris/'>-@Milaskaris</a></li>

                </ul>
            </div>
        )
    }
}
