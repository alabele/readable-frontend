import React, { Component } from 'react'

class OrderByForm extends Component {
state = {
  value: this.props.orderBy
}

// When select value is changed, update selected value
handleChange(id, event) {
  this.setState({ value: event });
  //this.props.myFunc(id, event, myState)
}

  render() {
    //const myShelf = this.props.shelfBook
    return (
      <div>
        <select value={this.state.value} onChange={(event)=> this.handleChange(this.props.id, event.target.value)}>
          <option value="default" disabled>Order by...</option>
          <option value="timestamp">Date Published</option>
          <option value="voteScore">Vote Score</option>
        </select>
        </div>
    );
  }
}

export default OrderByForm