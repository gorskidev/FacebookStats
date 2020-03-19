import React from 'react'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterByYear: '',
            filterByMonth: ''
        }

        this.getMonths = this.getMonths.bind(this)
        this.getYear = this.getYear.bind(this)
        this.onYearChangeHandler = this.onYearChangeHandler.bind(this)
        this.onMonthChangeHandler = this.onMonthChangeHandler.bind(this)
    }

    getMonths() {
        let newArray = []

        let singular = this.props.getDays(this.props.posts, true)

        for (let i=0; i < singular.length; i++) {
            newArray.push(singular[i].slice(6,7))
        }
        let singularYear = this.props.getDays(newArray, false)
        
        console.log(singularYear)

        return singularYear
    }

    getYear() {
        let newArray = []

        let singular = this.props.getDays(this.props.posts, true)


        for (let i=0; i < singular.length; i++) {
            newArray.push(singular[i].slice(0,4))
        }
        let singularYear = this.props.getDays(newArray, false)
        
        return singularYear
    }

    onYearChangeHandler(e){
        this.setState({filterByYear: e.target.value})
        e.preventDefault()
    }

    onMonthChangeHandler(e){
        this.setState({filterByMonth: e.target.value})
        e.preventDefault()
    }

    render() {
        return (
            <div>
                Rok   
                <select onChange={this.onYearChangeHandler} id="year">
                    {this.getYear().map(year => <option value={year} key={year}>{year}</option>)}
                </select> 
                Miesiąc<select onChange={this.onMonthChangeHandler} id="month">
                    {this.getMonths().map(month => <option value={month}>{month}</option>)}
                </select>
            </div>
        )
    }
}

export default SearchBar