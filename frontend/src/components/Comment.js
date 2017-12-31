import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getComment, deleteComment, voteComment } from '../actions'

class Comment extends Component {
	
	onEditClick(id) {
		this.props.getComment(id)
	}
	
	onDeleteClick(id) {
		this.props.deleteComment(id)
	}	

	onVoteClick(id, option) {
		this.props.voteComment(id,option);
	}	
	
	render() {
		return (
			<div className="comment">
					<h6 className="username">
						<span className="glyphicon glyphicon-user"></span>
						&nbsp;
						{this.props.author}
					</h6>
					<p>{this.props.content}</p>
				<div className="row">
					<div className="col-md-6">	
						<button type="button" className="btn btn-link btn-xs" onClick={() => this.onEditClick(this.props.id)}>
							<span className="glyphicon glyphicon-pencil"></span>
						</button>
						<button type="button" className="btn btn-link btn-xs" onClick={() => this.onDeleteClick(this.props.id)}>
							<span className="glyphicon glyphicon-trash"></span>
						</button>
					</div>
					<div className="col-md-6 comment-vote">	
						<span className="vote-score">{this.props.voteScore}</span>
						<button type="button" className="comment-vote-up btn btn-link btn-xs" onClick={() => this.onVoteClick(this.props.id, 'upVote')}>	
							<span className="glyphicon glyphicon-arrow-up"></span>
						</button> 
						<button type="button" className="comment-vote-down btn btn-link btn-xs" onClick={() => this.onVoteClick(this.props.id, 'downVote')}>	  
							<span className="glyphicon glyphicon-arrow-down"></span>
						</button>
					</div>
				</div>	
			</div>	
		)
	}
}

export default connect(null, {getComment, deleteComment, voteComment})(Comment)
