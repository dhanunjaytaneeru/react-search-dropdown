import React, {Component} from "react";
import SearchItem from "./SearchItem";
import SearchSvg from "./SearchSvg";
import pkg from "./../../package.json";
import cssStyle from './style.js';

export default class SearchBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            isfocused: false,
            activeOptionIndex: -1,
            possibleSelection: {},
            search: props.value || "",
            openList: props.open || false,
            selected: props.selected || {},
            list: props.list || [],
            searchKeys: props.searchKeys || []
        };
    }
    componentWillUnmount () {
        // delete the style when the component unmount
        let tag = document.querySelector(`style[id="${pkg.name}"]`)
        document.getElementsByTagName('head')[0].removeChild(tag)
    }
    componentDidMount () {
        // to check if the style has been existed
        if (!document.getElementsByTagName('head')[0].querySelector(`style[id="${pkg.name}"]`)) {
            // insert the style into the head
            let tag = document.createElement('style')
            tag.id = pkg.name
            tag.innerHTML = cssStyle
            document.getElementsByTagName('head')[0].appendChild(tag)
        }
    }
    static getDerivedStateFromProps = (props, state) => {
        if(props.options && (props.options.length !== state.list.length)){
            return {
                ...state,
                list: props.options,
                searchKeys: props.searchKeys ? props.searchKeys : (props.options.length > 0 ? Object.keys(props.options[0]): [])
            }
        }
        return null;
    }

    setPossibleSelection = (e, option, atIndex) => {
        e.stopPropagation();
        this.setState({
            possibleSelection: option || {},
            activeOptionIndex: atIndex > -1 ? atIndex : -1
        });
    }
    onChange = e => {
        const searchStr = e.target.value.toLowerCase();
        const { searchKeys } = this.state;
        const list = this.props.options.filter((obj) => {
            for(let i = 0 ; i < searchKeys.length ; i++){
                if(
                    typeof obj[searchKeys[i]] === "string"
                    && 
                    obj[searchKeys[i]].toLowerCase().startsWith(searchStr)
                ){
                    return obj;
                }
                
                if(
                    typeof obj[searchKeys[i]] === "object"
                    &&
                    obj[searchKeys[i]].length
                ){
                    const arr = obj[searchKeys[i]];
                    for(let j = 0 ; j < arr.length ; j++){
                        if(arr[j].toLowerCase().startsWith(searchStr)){
                            return obj;
                        }
                    }
                }
            }
        });
        this.setState({
            search: e.target.value,
            openList: e.target.value
                ? true
                : false,
            list: list
        });
    };
    navigateOnList = (e) => {
        const downKey = 40;
        const upKey = 38;
        const {list, activeOptionIndex} = this.state;
        let nextIndex;
        
        if(e.keyCode === downKey && list.length > 0){
            nextIndex = activeOptionIndex === (list.length - 1) ? 0 : activeOptionIndex + 1;        
        }else if(e.keyCode === upKey && list.length > 0){
            nextIndex = (activeOptionIndex === 0 || activeOptionIndex === -1) ? (list.length - 1) : activeOptionIndex - 1;
        }else{
            return;
        }
        
        this.setState({
            activeOptionIndex: nextIndex,
            possibleSelection: list[nextIndex]
        },() => {
            const el = document.querySelector(".search-list--item.active");
            el.scrollIntoView({block: 'center', behavior: 'smooth'});
        });
    }
    onFocus = () => {
        this.setState({
            isfocused: true
        })
    }
    onBlur = () => {
        setTimeout(() => {
            this.setState({
                openList: false,
                activeOptionIndex: -1,
                possibleSelection: {},
                search: "",
                isfocused: false
            })
        }, 500);
    }
    render() {
        const {
            possibleSelection,
            list,
            openList,
            search,
            isfocused
        } = this.state;
        const {
            highlightSearchText = true
        } = this.props;
        const optionList = this.props.options || list;
        return (
            <div className={`searchbox ${isfocused ? "focused" : ""} ${openList ? "selectable" : ""} ${this.props.className || ""}`}>
                <div className="input-box">
                    <SearchSvg />
                    <input
                        onFocus={this.props.onChange || this.onFocus}
                        onBlur={this.props.onBlur || this.onBlur}
                        onKeyUp={this.props.onKeyUp || this.navigateOnList}
                        value={search}
                        type="text"
                        placeholder={this.props.placeholder || `Search users by ${this.state.searchKeys.join(", ")}...`}
                        name="search"
                        onChange={this.props.onChange || this.onChange}
                    />
                </div>
                {openList
                    ? (
                        <div className="search-list"
                            style={{
                                maxHeight: this.props.listHeight+"px" || "250px"
                            }}
                        >
                            {
                                optionList.length > 0 ?
                                
                                optionList.map((obj, i) => {
                                    return <SearchItem
                                        highlightSearchText={highlightSearchText}
                                        onSelected={this.props.onSelected}
                                        key={i}
                                        data={obj}
                                        searchKeys={this.state.searchKeys}
                                        index={i}
                                        onMouseEnter={this.setPossibleSelection}
                                        selected={possibleSelection}
                                        searchString={search}
                                    />
                                })
                                :
                                <div className="search-list-item">
                                    <p className="placeholder-no-items">
                                        No User Found
                                    </p>
                                </div>
                            }
                        </div>
                    )
                    : null}
            </div>
        );
    }
}
