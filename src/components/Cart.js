import React, { Component } from 'react';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        };
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="well cart affix">
                    <div className="cart-header">
                        <h4>Cart Details</h4>
                    </div>    
                    <div className="cart-body">
                        {
                            this.props.items.length < 1 ? (<p className="empty-cart">
                                <i className="fa fa-shopping-cart fa-3x"></i><br/>
                                <b>
                                    <em>Add items to bag</em>
                                </b>
                                </p>): null
                        }
                        {
                            this.props.items.length > 0 ? (
                                <ul className="list-group">
                                    {
                                        this.props.items.map( item => {
                                            return (
                                                <li className="list-group-item cart-item" key={item.id} >
                                                    <div className="container-fluid no-padding">
                                                        <div className="row">
                                                            <div className="col-sm-7">
                                                                <p>{item.name}</p>
                                                            </div>
                                                            <div className="col-sm-5">
                                                                Qty: <span className="cart-quantity">{item.quantity}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        } )
                                    }
                                </ul>
                            ): null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;