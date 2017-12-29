import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost, deletePost, votePost, getComments } from '../actions';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';

class DetailedPost extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getComments(id);
    this.props.getPost(id);
  }

  onDeleteClick = () => {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }
  
  renderComments = () => {
	const { comments } = this.props
    return _.map(comments, comment => {
      const { id, body, author, voteScore} = comment;
		console.log(body)
      return (
        <li className="list-group-item" key={id}>
          <Comment
            id={id}
            content={body}
            author={author}
            voteScore={voteScore}
            parentId={this.props.posts.id}
          />
        </li>
      );
    });
  }

  render() {
	
    function getDateTimeFromTimestamp(unixTimeStamp) {
       var date = new Date(unixTimeStamp);
       return ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
     }

    const { posts } = this.props;
    if(!posts) {
      return <div>This post is not available.</div>;
    }
	console.log(posts)
    // const formattedTime = convertTime(post.timestamp);
    const formattedTime = getDateTimeFromTimestamp(posts.timestamp)
    return (
	<div className="container">
		<div className="row">
			<div className="post-container">
				<h2 className="post-title">				{posts.title}
				</h2>
				<div className="post-date">
					Posted at { formattedTime }
				</div>
				<div className="post-author">
					<span className="glyphicon glyphicon-user"></span>
					&nbsp;
					{ posts.author }
					&nbsp;
					&nbsp;
					{ posts.commentCount }
					&nbsp;
					<span className="glyphicon glyphicon-comment"></span>
				</div>
				<p>{posts.body}</p>
			</div>
		</div>
				
		<div className="row">
			<div className="col-sm-6 post-edit" >
				<Link to={`/posts/${posts.id}/edit`} className="btn btn-link btn-xs">
				    <span className="glyphicon glyphicon-pencil"></span>
				</Link>
				<button type="button" className="post-delete btn btn-link btn-xs" onClick={this.onDeleteClick.bind(this)}>
					<span className="glyphicon glyphicon-trash"></span>
				</button>
			</div>
			<div className="col-sm-6 post-vote">	
				<span> { posts.voteScore } </span> 
				<button type="button" className="post-vote-up btn btn-link btn-xs"  onClick={() => votePost('upVote')}>
					<span className="glyphicon glyphicon-arrow-up"></span>
				</button>
				<button type="button" className="post-vote-down btn btn-link btn-xs" onClick={() => votePost('downVote')}>
					<span className="glyphicon glyphicon-arrow-down"></span>
				</button>
			</div>

		</div>
		

		<div className="comment-container">
			<hr />
			<h5>{ posts.commentCount } comments</h5>
			<ul className="list-group">
			{ this.renderComments() }
			<CommentForm parentId={posts.id}/>
			</ul>

		</div>

  	</div>
    );
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    posts: posts,
    comments
  }
}

export default connect(mapStateToProps, { getPost, deletePost, votePost, getComments })(DetailedPost);
