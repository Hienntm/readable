import React, { Component } from 'react'
import { addComment } from '../actions'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'


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
  
  onSubmit = (values) => {
	console.log(values)
	if (!this.props.id) {
    	this.props.addComment(values, this.props.parentId)
		this.props.reset()
	} else {
		this.props.updateComment(this.props.id, values, this.props.parentId)
		
	}
  }
  
  onCancelClick = () => {
	  this.props.reset()
  }
	
  render() {
	const { handleSubmit } = this.props
	console.log(this.props)
    return (
		<form className="col-sm-8" onSubmit={handleSubmit(this.onSubmit)}>
	  	  	<h4>Share your thought</h4>
		    <Field label="Author" name="author" component={this.renderInput} />
		    <Field label="Comment" name="body" component={this.renderInput} />
  	  	  
			<div>
				<button type="submit" className="btn btn-primary">Post comment</button>
				&nbsp;
				&nbsp;		  	
				<button type="button" className="btn btn-danger" onClick={this.onCancelClick}>Cancel</button>
		  	</div>
		</form>
    );
  }
}

const InitializedFromStateForm = reduxForm({
  form: 'CommentCreateForm'
})(CommentCreateEdit);

export default connect(null, { addComment })(InitializedFromStateForm);
