import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as CategoriesActions } from '../../../../store/ducks/categories';

import { Container, MenuItem } from './styles';

class Menu extends Component {
  static propTypes = {
    categories: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
        }),
      ),
    }).isRequired,
    getCategoriesRequest: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getCategoriesRequest } = this.props;

    getCategoriesRequest();
  }

  render() {
    const { categories } = this.props;

    return (
      <Container>
        {categories.data.map(category => (
          <MenuItem key={category.id} to={`/category/${category.id}`}>
            {category.title}
          </MenuItem>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

const mapDispatchToProps = dispatch => bindActionCreators(CategoriesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
