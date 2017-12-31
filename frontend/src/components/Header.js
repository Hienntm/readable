import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, getPosts, getPostsByCategory } from '../actions';

class Header extends Component {

	componentDidMount() {
		this.props.getCategories()
	}

	render() {
		const { categories } = this.props;
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
				    <div className="navbar-header">
					  <Link className="navbar-brand" to="/" onClick ={() => this.props.getPosts()}>Readable</Link>
					</div>
					<ul className="nav navbar-nav">
						{Object.values(categories).map( category => (
							<li key={category.path}>
								<Link className="nav-item nav-link active" to={`/${category.path}`} onClick = {() => this.props.getPostsByCategory(category.path)}>
								{category.name.toUpperCase()}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</nav>
		)
	}
}

function mapStateToProps({ categories }) {
	return {
		categories,
	}
}

export default connect(mapStateToProps, { getCategories, getPosts, getPostsByCategory })(Header)