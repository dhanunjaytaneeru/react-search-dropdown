# @fliptask/react-search-dropdown
![React-Search-Dropdown](https://i.imgur.com/4SkACVY.png)
![React-Search-Dropdown](https://i.imgur.com/g1tDNLd.png)
</br>
Searchable autocomplete dropdown for [React](https://reactjs.org/). 

See [fliptask.github.io/react-search-dropdown]() for live demo.

## Installation and usage

The easiest way to use **react-search-dropdown** is to install it from npm and build it into your app with Webpack.

```
yarn add @fliptask/react-search-drodown
```
OR
```
npm install @fliptask/react-search-dropdown
```
Then use it in your app :

```javascript
import React, { Component } from "react";
import SelectableSearch from "react-search-dropdown";

const data = [
    {
        id : "123-s2-546",
        name : "John Jacobs",
        items : [
            "bucket", "bottle"
        ],
        address : "1st Cross, 9th Main, abc Apartment",
        pincode : "5xx012"
    }, {
        id : "123-s3-146",
        name : "David Mire",
        items : ["Bedroom Set"],
        address : "2nd Cross, BTI Apartment",
        pincode : "4xx012"
    }, {
        id : "223-a1-234",
        name : "Soloman Marshall",
        items : ["bottle"],
        address : "Riverbed Apartment",
        pincode : "4xx032"
    }, {
        id : "121-s2-111",
        name : "Ricky Beno",
        items : ["Mobile Set"],
        address : "Sunshine City",
        pincode : "5xx072"
    }, {
        id : "123-p2-246",
        name : "Sikander Singh",
        items : ["Air Conditioner"],
        address : "Riverbed Apartment",
        pincode : "4xx032"
    }
];

class ProductList extends Component{
    state = {
        products: data
    }
    render(){
        return(
            <div className="product-list row">
                <SelectableSearch
                    value={"abc"}
                    onSelected={this.onClick}
                    options={searchData}
                    searchKeys={["name","items"]}
                />
            </div>
        )
    }
}
```

## Props

PropName | Default value(s) | Description
---------|---------|------------
listHeight | 250 | Height of the option list
searchKeys | all keys in the collections | search will be applied on the options if provided otherwise on all the list options.
value | null | set this value if want to show prefilled value in the search box
open | false | true/false for opening and closing option list
selected | {} | selected option from the list
list | [] 
className | null | provided className will be added in the `searchbox` node.
placeholder | default string | Pass custom placeholder otherwise default will be shown.

## Methods

Method Name | Return value
------------|-------------
onChange | (event)
onBlur | (event)
onFocus | (event)
onKeyUp | (event)
onSelect | (event, selectedOption)

## License
___

MIT Licensed. Copyright (c) Fliptask 2020.
