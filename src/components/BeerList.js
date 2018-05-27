import React, { Component } from 'react';

class BeerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            sortOrder: 0
        }
    }

    decreaseCart(item, event) {
        this.props.decreaseCart(item);
    }

    increaseCart(item, event) {
        this.props.increaseCart(item);
    }

    render() {
        return (
            <div className="col-md-8">
                <div className="row">
                {
                    this.props.items.map( (item) => {
                        return (
                            <div className="col-md-4" key={item.id}>
                                <div className="beer">
                                    <div className="beer-header">
                                        <h6>{item.name}</h6>
                                    </div>
                                    <div className="beer-body">
                                        <p>Style: <i>{item.style}</i></p>
                                        <p>Alcohol content: {item.abv}</p>
                                        <p>Bitterness: {item.ibu}</p>
                                        <p>Weight: {item.ounces}</p>
                                    </div>
                                    <div className="beer-footer">
                                        <span className="cart-quantity-change-btn">
											<i className="fa fa-minus-square" onClick={this.decreaseCart.bind(this, item)}></i>
										</span>
                                        <span className="cart-quantity"></span>
                                        <span className="cart-quantity-change-btn">
											<i className="fa fa-plus-square" onClick={this.increaseCart.bind(this, item)}></i>
										</span>
                                    </div>
                                </div>
                            </div>
                        )
                    } )
                }
                </div>
            </div>
        )
    }
}

export default BeerList;