import React from 'react'

import './Najebometr.css';

class Najebometr extends React.Component {
    render() {
        return (
            <div className="najebometr">
                <a>W ciągu ostatniego miesiąca, najwięcej pierdochujstw napisałam w dniu {this.props.mostFrequent}</a>
                <br /> <br />
                <a>Spis dni</a> <br />{
                    this.props.onWhatDays.map(day => <a key={day}>{this.props.formatDate(day)} Postów: {this.props.getOccurrences(day)} <br/></a>)}
            </div>
        )
    }
}

export default Najebometr