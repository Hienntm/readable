import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost, updatePost, getPost } from '../actions';

class PostCreateEdit extends Component {
  componentDidMount() {
	const { id } = this.props.match.params
	if (id) {
    	this.props.getPost(this.props.match.params.id);
	}
  }
  renderField(field) {
    return (
      <div>
        <label name={field._name}>{field.label}</label>
        <input name={field._name} type="text" value={field._body} />
      </div>
    );
  }

  onSubmit(values) {
	console.log(values)
    if (!this.props.match.params.id) {
      this.props.addPost(values)
	  //.then(() => this.props.history.push('/'))
        
    }
    this.props.updatePost(this.props.posts.id, { ...values})
	//.then(() => this.props.history.push('/'))
  }

  render() {
    const { handleSubmit } = this.props
	const { posts } = this.props
	console.log(posts)
    return (
      <div className="container">
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <br/>
        <Field
          label="Username"
          _name="author"
          _body={posts.author}
          component={this.renderField}
        />
        <Field
          label="Post Title"
          _name="title"
          _body={posts.title}
          component={this.renderField}
        />  
        <Field
          label="Category"
          _name="category"
          _body={posts.category}
          component={this.renderField}
        />              
        <Field
          label="Post Content"
          _name="body"
          _body={posts.body}
          component={this.renderField}
        />
        <br/>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to='/' className="btn btn-danger">Cancel</Link>
      </form>
    </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { posts}
}

const InitializedFromStateForm = reduxForm({
  form: 'PostsNewForm'
})(PostCreateEdit);

export default connect(mapStateToProps, { addPost, updatePost, getPost })(InitializedFromStateForm);
