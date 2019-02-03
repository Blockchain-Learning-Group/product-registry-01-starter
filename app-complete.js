class ProductRegistry extends React.Component {
  state = {
    products: Seed.products
  };

  handleProductUpVote = (productId) => {
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });
    
    this.setState({ products: nextProducts });
  }

  render() {
    return (
      <div className='ui unstackable items'>
        {
          this.state.products.map(product => 
            <Product
              key={'product-'+product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              submitterAvatarUrl={product.submitterAvatarUrl}
              productImageUrl={product.productImageUrl}
              votes={product.votes}
              onVote={this.handleProductUpVote}
            />
          )
        }
      </div>
    );
  }
}

class Product extends React.Component {
  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={() => this.props.onVote(this.props.id)}>
              <i className='large caret up icon' />
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img className='ui avatar image' src={this.props.submitterAvatarUrl} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ProductRegistry />,
  document.getElementById('content')
);