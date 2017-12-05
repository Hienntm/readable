import React from 'react'
import Comment from './Comment'
//import {Link} from 'react-router-dom'

import logo from '../logo.svg';

const CreateEditPage = (props) => {
	return (
		<div className="postPage">
			<header className="App-header">
			  <img src={logo} className="App-logo" alt="logo" />
			  <h1 className="App-title">Readable</h1>
			</header>
			<nav className="">
			  <a href="#">Category 1</a>
			  <a href="#">Category 2</a>
			  <a href="#">Category 3</a>
			  <a href="#">Category 4</a>
			</nav>
			<form className="createpost">
				<input type="text" value="Post Title"/>
				<<textarea name="" id="" cols="30" rows="10">
					Post Content
				</textarea>
				<button className="">Save Post</button>
				<button className="">Cancel</button>
			</form>		
		</div>
	)
}

export default CreateEditPage