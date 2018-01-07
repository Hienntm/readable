import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { addPost, updatePost, getPost } from '../actions'

class PostCreateEdit extends Component {
  componentDidMount() {
	const { id } = this.props.match.params
	if (id) {
    	this.props.getPost(this.props.match.params.id);
	}
  }

	
  renderFieldInput(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">{field.label}</label>
        <div className="col-sm-10">
        	<input className="form-control" type="text" {...field.input} />
        </div>
      </div>
    );
  }

  renderFieldSelect(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">{field.label}</label>
        <div className="col-sm-10">
			<select className="form-control" {...field.input}>
			{Object.values(field.categories).map(category => (
				<option key={category.path} value={category.path}>{category.path}</option>
			))}
			</select>
     	</div>
      </div>
    );
  }	
	
  renderFieldTextArea(field) {
	  
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">{field.label}</label>
        <div className="col-sm-10">
			<textarea className="form-control" type="text" rows="5" {...field.input}></textarea>
		</div>
      </div>
    );
  }  

  onSubmitClick = (values) => {
		console.log(values)
		if (!this.props.match.params.id) {
			this.props.addPost(values, () => this.props.history.goBack())
		}else {
			this.props.updatePost(this.props.initialValues.id, values, () => this.props.history.goBack())
		}
	}
	
  onCancelClick = () => {
		this.props.history.goBack()
	}

  render() {
    const { handleSubmit } = this.props
		const { categories } = this.props
	  console.log(this)
    return (
      <div className="container">
		  <form onSubmit={handleSubmit(this.onSubmitClick)}>
			<br/>
			<Field
			  label="Username"
			  name="author"
			  component={this.renderFieldInput}
			/>
			<Field
			  label="Post Title"
			  name="title"
			  component={this.renderFieldInput}
			/>  
			<Field
			  label="Category"
			  name="category"
			  categories = {categories}
			  component={this.renderFieldSelect}
			/>              
			<Field
			  label="Post Content"
			  name="body"
			  component={this.renderFieldTextArea}
			/>
			<br/>
			<div className="pull-right">
				<button type="submit" className="btn btn-primary">Submit</button>
				&nbsp;&nbsp;
				<button type="button" className="btn btn-danger" onClick={this.onCancelClick}>Cancel</button>
			</div>
		  </form>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }, ownProps) {
  return {
	  categories,
	  initialValues: posts[ownProps.match.params.id],
  }
}

const InitializedFromStateForm = reduxForm({
  form: 'PostCreateEditForm'
})(PostCreateEdit);

export default connect(mapStateToProps, { addPost, updatePost, getPost })(InitializedFromStateForm);
