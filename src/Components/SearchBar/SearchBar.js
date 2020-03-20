import React from 'react'

import './SearchBar.css'
import PostBox from '../PostBox/PostBox'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            initialItems: [], 
            items: []
        }

        this.getMonths = this.getMonths.bind(this)
        this.onMonthChangeHandler = this.onMonthChangeHandler.bind(this)
        this.filterList = this.filterList.bind(this)
    }

    getMonths() {
        let newArray = []
        let singular = this.props.getDays(this.props.posts, true)
        //console.log(singular)

        for (let i=0; i < singular.length; i++) {
            newArray.push(singular[i].slice(6,7))
        }

        let singularYear = this.props.getDays(newArray, false)

        //console.log(singularYear)
        return singular
    }

    onMonthChangeHandler(e){
        this.setState({filterByMonth: e.target.value})
        e.preventDefault()
        this.filterList()
    }

    filterList = (event) => {
        let items = this.state.initialItems;
        items = items.filter((item) => {
          return item.date.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: items});
    }  

    componentWillMount = () => {
        this.setState({
            initialItems: this.props.posts, 
            items: this.props.posts
        })
      }

    render() {
        return (
            <div className="SearchResults">
                <div className="filter-container">
                    <div className="filter"> 
                        <div>Pokaż dla <select onChange={this.filterList} id="month">
                            {this.getMonths().map(month => <option value={month}>{month}</option>)}
                        </select>
                        </div>
                    </div>
    
                </div>
                <div>
                    {
                        this.state.items.map(item => 
                            <PostBox className="ResultPosts" post={item}
                            /> 
                        )
                    }
                </div>
            </div>
        )
    }
}

export default SearchBar

