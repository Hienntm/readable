import React, { Component } from 'react';
import { addComment, updateComment } from '../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


class CommentCreateEdit extends Component {

  renderInput(field) {
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
	
  onSubmit(values) {
	if (!this.props.id) {
    	this.props.addComment(values);
	} else {
		this.props.updateComment(this.props.id, values);
	}
  }
	
  render() {
	const { handleSubmit } = this.props
    return (
		<form className="col-sm-8" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
	  	  <h4>Share your thought</h4>
		  <Field label="Author" name="author" component={this.renderInput} />
		  <Field label="Comment" name="body" component={this.renderInput} />
		  
		  <button type="submit" className="btn btn-primary">Add Comment</button>
		</form>
    );
  }
}

function mapStateToProps({comments}) {
	console.log(comments)
	return {
		initialValues: comments,
	}
}

const InitializedFromStateForm = reduxForm({
  form: 'CommentCreateEditForm'
})(CommentCreateEdit);

export default connect(mapStateToProps, { addComment, updateComment })(InitializedFromStateForm);
