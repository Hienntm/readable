import React, { Component } from 'react';
import { connect }from 'react-redux';
import { Link }from 'react-router-dom';
import { votePost, getPosts, getPostsByCategory, deletePost, getCategories } from '../actions';
import { sortObjValues } from '../utils/helpers';

class PostsList extends Component {
	state = {
		order: 'voteScore'
	}
	componentDidMount() {
		const category = this.props.match.params.category
		
		if (category) {
			this.props.getPostsByCategory(category)
		}
		else {
			this.props.getPosts();
		}
	}
	
	setOrder(order) {
		this.setState({
			order,
		})
	}

	onDeleteClick(id) {
		this.props.deletePost(id,() => {
		  this.props.history.push('/');
		});
	}

	onVoteClick(id, option) {
		this.props.votePost(id,option);
	}

	renderPosts() {
		const { posts } = this.props
		const { order } = this.state
		const sortedPosts = sortObjValues(posts, order)
		console.log(posts)
		return sortedPosts.map(post => ( 
			<li className = "row list-group-item" key = { post.id }> 
				<div className = "col-md-8" > 
					<Link to = {`/${post.category}/${post.id}`} > 
						{ post.title } 
					</Link> 
				</div> 
				<div className = "col-md-4 post-author" > 
					<span className="glyphicon glyphicon-user"></span>
					&nbsp;
					{ post.author }
					&nbsp;
					&nbsp;
					{ post.commentCount }
					&nbsp;
					<span className="glyphicon glyphicon-comment"></span>
				</div>
				<div className = "col-md-12" >
					<Link to={ `/posts/${post.id}/edit` } className="btn btn-link btn-xs">
						<span className="glyphicon glyphicon-pencil"></span>
					</Link>
					<button type="button" className="post-delete btn btn-link btn-xs" onClick = {() => this.onDeleteClick(post.id) }>
						<span className="glyphicon glyphicon-trash"></span>
					</button>		
				
					<div className = "pull-right" > 
						<span> { post.voteScore } </span> 
						<button type="button" className="post-vote-up btn btn-link btn-xs" onClick={() => this.onVoteClick(post.id, 'upVote')}>
							<span className="glyphicon glyphicon-arrow-up"></span>
						</button>
						<button type="button" className="post-vote-down btn btn-link btn-xs" onClick={() => this.onVoteClick(post.id, 'downVote')}>
							<span className="glyphicon glyphicon-arrow-down"></span>
						</button>
					</div> 
				</div> 
			</li>
			)
		)
	}
	render() {
		return ( 
			<div> 
				<div className = "container" >
					<div className = "row" > 
						<div className = "col-md-6" >
							<br/> 
							<h3> Posts </h3> 
						</div> 
						<div className = "col-md-6" > 
							Sort by 
							&nbsp;
							<button type="button" className = "btn btn-primary btn-xs" onClick = { () => this.setOrder('timestamp')}> Date </button>
							&nbsp;
							<button type="button" className = "btn btn-primary btn-xs" onClick = {() => this.setOrder('voteScore')}> Score </button>
						</div> 
					</div> 
					<ul className = "list-group" > {this.renderPosts()} </ul> 
					<div className = "row" > 
						<Link className = "add-post-button btn btn-primary" to = "/posts/create-edit" > Add a Post < /Link> 
					</div> 
				</div> 
			</div>);
	}
}

function mapStateToProps({ posts }) {
	return {
		posts,
	}
}

export default connect(mapStateToProps, { votePost, getPosts, getPostsByCategory, deletePost, getCategories })(PostsList);