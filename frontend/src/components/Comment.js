import React from 'react'
//import {Link} from 'react-router-dom'

const Comment = (props) => {
	return (
		<div class="comment">
				<h6 className="username">
					<span className="glyphicon glyphicon-user"></span>
					&nbsp;
					{props.author}
				</h6>
				<p>{props.content}</p>
			<div className="row">
				<div className="col-md-6">	
					<button type="button" className="btn btn-link btn-xs">
						<span className="glyphicon glyphicon-pencil"></span>
					</button>
					<button type="button" className="btn btn-link btn-xs">
						<span className="glyphicon glyphicon-trash"></span>
					</button>
				</div>
				<div className="col-md-6 comment-vote">	
					<span className="vote-score">{props.voteScore}</span>
					<button type="button" className="comment-vote-up btn btn-link btn-xs">	
						<span className="glyphicon glyphicon-arrow-up"></span>
					</button> 
					<button type="button" className="comment-vote-down btn btn-link btn-xs">	  
						<span className="glyphicon glyphicon-arrow-down"></span>
					</button>
				</div>
			</div>	
		</div>	
	)
}

export default Comment
