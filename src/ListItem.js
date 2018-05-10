import React, { Component } from 'react';
import './App.css';

class ListItem extends Component {

  render() {
    return (
      <div 
				className="list-item" 
				style={{ margin: '5px' }}
			>
				<div className={`item-title ${ this.props.cplt ? 'item-cplt' : '' }`}>
					{ this.props.title } 
				</div> 
				<button 
					className="btn btn-danger del-btn" 
					onClick={ () => this.props.funcDel(this.props.id) }
				> 
					X 
				</button>
				<button 
					className="btn btn-warning cplt-btn" 
					onClick={ () => this.props.funcCplt(this.props.id, this.props.index) }
					disabled={ this.props.cplt }	
				> 
					Complete 
				</button>
			</div>
    );
	}
	

}

export default ListItem;
