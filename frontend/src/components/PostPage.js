import React from 'react'
import Comment from './Comment'
//import {Link} from 'react-router-dom'

import logo from '../logo.svg';

const PostPage = (props) => {
	return (
		<div className="categoryPage">
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
			<div className="post">
				<h2>Post Title</h2>
				<span className="author">Author</span>
				<span className="timestamp">Timestamp</span>
				<span className="vote-score">Votescore</span>
				<button className="">Edit Post</button>
				<button className="">Delete Post</button>
				<p className="post-content">Post content</p>
				<ul className="comments-list">
					<li key >
						<Comment />
					</li>
				</ul>
				<button className="">Add Comment</button>
			</div>
			<button className="addPost">
				Add Post
			</button>		
		</div>
	)
}

export default PostPage