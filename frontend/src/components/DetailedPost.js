import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPost, deletePost, votePost, getComments } from '../actions'
import Comment from './Comment'
import CommentForm from './CommentForm'
import NoMatch from './NoMatch'

class DetailedPost extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getComments(id);
    this.props.getPost(id);
  }

  onDeleteClick(id) {
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }
  
  onVoteClick(id, option) {
	this.props.votePost(id,option);
  }  

  renderComments = () => {
	const { comments } = this.props
    return Object.values(comments).map(comment => {
      const { id, body, author, voteScore} = comment;
      return (
        <li className="list-group-item" key={id}>
          <Comment
            comment={comment}
          />
        </li>
      );
    });
  }

  render() {
	
    function turnTimestampToDate(timeStamp) {
       var date = new Date(timeStamp)
       return date.toString().slice(4,15)
     }

    const { post, comments } = this.props;
	  
    if(!post) {
      return <NoMatch />;
    }
	  
    const postDate = turnTimestampToDate(post.timestamp)
    return (
	<div className="container">
		<div className="row">
			<div className="post-container">
				<h1 className="post-title">				{post.title}
				</h1>
				<div className="post-date">
					Published on { postDate }
				</div>
				<div className="post-author">
					<span className="glyphicon glyphicon-user"></span>
					&nbsp;
					{ post.author }
					&nbsp;
					&nbsp;
					{ Object.values(comments).length }
					&nbsp;
					<span className="glyphicon glyphicon-comment"></span>
				</div>
				<p>{post.body}</p>
			</div>
		</div>
				
		<div className="row">
			<div className="col-sm-6 post-edit" >
				<Link to={`/posts/${post.id}/edit`} className="btn btn-link btn-xs">
				    <span className="glyphicon glyphicon-pencil"></span>
				</Link>
				<button type="button" className="post-delete btn btn-link btn-xs" onClick={() => this.onDeleteClick(post.id)}>
					<span className="glyphicon glyphicon-trash"></span>
				</button>
			</div>
			<div className="col-sm-6 post-vote">	
				<span> { post.voteScore } </span> 
				<button type="button" className="post-vote-up btn btn-link btn-xs"  onClick={() => this.onVoteClick(post.id, 'upVote')}>
					<span className="glyphicon glyphicon-arrow-up"></span>
				</button>
				<button type="button" className="post-vote-down btn btn-link btn-xs" onClick={() => this.onVoteClick(post.id, 'downVote')}>
					<span className="glyphicon glyphicon-arrow-down"></span>
				</button>
			</div>

		</div>
		

		<div className="row">
			<hr />
			<h3>{ Object.values(comments).length } comments</h3>
			<ul className="list-group">
				{ this.renderComments() }
			</ul>
			<CommentForm
				parentId={this.props.post.id}
			/>
		</div>

  	</div>
    );
  }
}

function mapStateToProps({ posts, comments }, ownProps) {
  return {
    post: posts[ownProps.match.params.id],
    comments
  }
}

export default connect(mapStateToProps, { getPost, deletePost, votePost, getComments })(DetailedPost);
