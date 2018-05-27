import React, {Component} from 'react';
import BeerList from './BeerList';
import Cart from './Cart';

class App extends Component {
    constructor() {
        super();
        this.state = {
            beers: [],
            isLoading: true,
            cartItems: [],
            search: "",
            sortOrder: -1,
            style: -1
        };
        this.cartItems = [];
        this.beers = [];
        this.styles = [];

        this.sort = this.sort.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleStyleChange = this.handleStyleChange.bind(this);
    }

    filterData(searchKey, sortOrder, style) {
        var beers = [];
        var filteredBeers = [];
        for(var i=0; i< this.beers.length; i++) {
            if(this.beers[i].name.toLowerCase().indexOf(searchKey) != -1) {
                beers.push(this.beers[i]);
            }
        }

        if(sortOrder != -1) {
            beers.sort((a,b) => {
                if(sortOrder == 0) {
                    return a.abv - b.abv;
                } else {
                    return b.abv - a.abv;
                }
            });
        }

        if(style != -1) {
            for(var i=0; i< beers.length; i++) {
                if(beers[i].style == this.styles[style]) {
                    filteredBeers.push(beers[i]);
                }
            }
        } else {
            filteredBeers = beers;
        }

        return filteredBeers;
    }

    handleChange(event) {
        let searchKey = event.target.value.toLowerCase();
        let style = this.state.style;
        let order = this.state.sortOrder;
        
        this.setState({
            beers: this.filterData(searchKey, order, style),
            search: searchKey,
            style: style,
            sortOrder: order
        });
    }

    handleStyleChange(event) {
        let searchKey = this.state.search;
        let style = event.target.value;
        let order = this.state.sortOrder;
        
        this.setState({
            beers: this.filterData(searchKey, order, style),
            search: searchKey,
            style: style,
            sortOrder: order
        });
    }

    sort(event) {
        let searchKey = this.state.search;
        let style = this.state.style;
        let order = event.target.value;
        
        this.setState({
            beers: this.filterData(searchKey, order, style),
            search: searchKey,
            style: style,
            sortOrder: order
        });
    }

    isStyleAvailable(style) {
        for(var i=0; i< this.styles.length; i++) {
            if(this.styles[i] == style) {
                return true;
            }
        }
        return false;
    }

    componentDidMount() {

        var _this = this;
        fetch("http://starlord.hackerearth.com/beercraft").then(res => res.json())
        .then(response => {
            var beers = response;
            for(var i=0; i< beers.length; i++) {
                beers[i]["quantity"] = 0
                if(!this.isStyleAvailable(beers[i].style)) {
                    this.styles.push(beers[i].style);
                }
            }

            if(window.localStorage.items != undefined) {
                _this.cartItems = JSON.parse(window.localStorage.items);
            }
            _this.setState({
                isLoading: false,
                beers: beers,
                cartItems: _this.cartItems
            });
            _this.beers = beers;
        });
    }

    addToCart(item) {
        if(this.cartItems.length == 0) {
            item.quantity = 1;
            this.cartItems.push(item);
        } else {
            for(var i=0; i< this.cartItems.length; i++) {
                if(this.cartItems[i].name == item.name) {
                    this.cartItems[i].quantity += 1;
                }
            }
            if(!this.isItemAvailable(item)) {
                item.quantity = 1;
                this.cartItems.push(item);
            }
        }
        this.setState({
            cartItems: this.cartItems
        });
        window.localStorage.items = JSON.stringify(this.cartItems);
    }

    decreaseCart(item) {
        for(var i=0; i< this.cartItems.length; i++) {
            if(this.cartItems[i].name == item.name) {
                if(this.cartItems[i].quantity > 1) {
                    this.cartItems[i].quantity -= 1;
                }else {
                    this.cartItems.splice(i, 1);
                }
            }
        }
        this.setState({
            cartItems: this.cartItems
        });
        window.localStorage.items = JSON.stringify(this.cartItems);
    }

    isItemAvailable(item) {
        for(var i=0; i< this.cartItems.length; i++) {
            if(this.cartItems[i].name == item.name) {
                return true
            }
        }
        return false
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.isLoading? (
                        <div className="container">
                            <div className="is-processing">
                                <p>
                                    <i className="fa fa-spinner fa-3x fa-fw"></i>
                                    <span>Loading...</span>
                                </p>
                            </div>
                        </div>
                    ): null
                }
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="label">Sort by Composition</label>
                            <select className="form-control" name="season" onChange={this.sort} value={this.state.sortOrder}>
                                <option value="-1">----Change the order----</option>
                                <option value="0">Ascending</option>
                                <option value="1">Descending</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="label">Search by Beer Name:</label>
                            <input type="text" className="form-control" name="beerName" value={this.state.search} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="label">Filter by Style:</label>
                            <select className="form-control" name="season" onChange={this.handleStyleChange} value={this.state.style}>
                                <option value="-1">----Filter by style----</option>
                                {
                                    this.styles.map( (style, i) => {
                                        return (
                                            <option value={i} key={i}>{style}</option>
                                        )
                                    } )
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <BeerList items={this.state.beers} increaseCart={(e) => {this.addToCart(e)}} decreaseCart={(e) => {this.decreaseCart(e)}}/>
                <Cart items={this.state.cartItems} />
            </div>
        )
    }
}

export default App;