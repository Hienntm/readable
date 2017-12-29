import _ from 'lodash'
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
			<div>
				<nav className="navbar navbar-default">
					<div className="nav navbar-nav">
						<Link className="nav-item nav-link active" to="/" onClick ={() => this.props.getPosts()}>HOME</Link>
						
						{_.map(categories, category => (
							<span key={category.path}>
								<Link className="nav-item nav-link active" to={`/${category.path}`} onClick = {() => this.props.getPostsByCategory(category.path)}>
								{category.name.toUpperCase()}
								</Link>
							</span>
						))}
					</div>
				</nav>
			</div>

		)
	}
}

function mapStateToProps({ categories }) {
	return {
		categories,
	}
}

//function mapDispatchToProps(dispatch) {
//	return bindActionCreators({
//		getCategories
//	}, dispatch)
//}

export default connect(mapStateToProps, { getCategories, getPosts, getPostsByCategory })(Header)
//export default connect(mapStateToProps, mapDispatchToProps)(Header)