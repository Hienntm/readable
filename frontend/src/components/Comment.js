import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateComment, deleteComment, voteComment } from '../actions'

class Comment extends Component {
	state = {
		editForm: false,
		commentAuthor: '',
		commentBody: ''
	}
	
	renderInput(field) {
		console.log(field)
		return (
			<div className="form-group">
				<input className="form-control"
				  type="text"
				  placeholder={field.label}
				  {...field.input}
				  />
			</div>
		);
	}

	onEditClick() {
		this.setState({
			editForm: true,
			commentAuthor: this.props.comment.author,
			commentBody: this.props.comment.body
		})
	}
	
	onDeleteClick(id) {
		this.props.deleteComment(id)
	}	

	onVoteClick(id, option) {
		this.props.voteComment(id,option);
	}	
	
	render() {
		const { editForm } = this.state
		const { id, author, body, voteScore } = this.props.comment
		return (
			<div>
			{!editForm &&
				<div className="comment">
					<h6 className="username">
						<span className="glyphicon glyphicon-user"></span>
						&nbsp;
						{author}
					</h6>
					<p>{body}</p>
					<div className="row">
						<div className="col-md-6">	
							<button type="button" className="btn btn-link btn-xs" onClick={() => this.onEditClick()}>
								<span className="glyphicon glyphicon-pencil"></span>
							</button>
							<button type="button" className="btn btn-link btn-xs" onClick={() => this.onDeleteClick(id)}>
								<span className="glyphicon glyphicon-trash"></span>
							</button>
						</div>
						<div className="col-md-6 comment-vote">	
							<span className="vote-score">{voteScore}</span>
							<button type="button" className="comment-vote-up btn btn-link btn-xs" onClick={() => this.onVoteClick(id, 'upVote')}>	
								<span className="glyphicon glyphicon-arrow-up"></span>
							</button> 
							<button type="button" className="comment-vote-down btn btn-link btn-xs" onClick={() => this.onVoteClick(id, 'downVote')}>	  
								<span className="glyphicon glyphicon-arrow-down"></span>
							</button>
						</div>
					</div>
				</div>	
			}
				
			{editForm && 
				<div className="row">
					<form className="col-md-8">
						<div className="form-group">
							<input 
							className="form-control" 
							value={this.state.commentAuthor} 
							onChange={event => this.setState({commentAuthor: event.target.value})} />
						</div>
						<div className="form-group">	
							<input 
							className="form-control" 
							value={this.state.commentBody} 
							onChange={event => this.setState({commentBody: event.target.value})} />
						</div>
						<div>
							<button 
							className="btn btn-primary" 
							type="submit" 
							onClick={() => {
								this.props.updateComment(id, {
									...this.props.comment, 
									author: this.state.commentAuthor,
									body: this.state.commentBody})
								this.setState({editForm: false})
							}}>Update</button>
							&nbsp;
							&nbsp;
							<button 
							className="btn btn-danger" 
							type="button"
							onClick={() => this.setState({editForm: false})
							}>Cancel</button>
						</div>
					</form>
				</div>
			}
			 </div>
		)
	}
}


export default connect(null, { updateComment, deleteComment, voteComment })(Comment)
