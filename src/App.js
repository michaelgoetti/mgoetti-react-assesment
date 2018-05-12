import React, { Component } from 'react';
import ListItem from './ListItem';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			myList: [],
			tempItemTitle: '',
			maxItemId: 0,
		}

		this.addToList = this.addToList.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.completeTask = this.completeTask.bind(this);
		this.deleteTask = this.deleteTask.bind(this);

	}

	addToList() {
		let currItem = {
			id: this.state.maxItemId + 1,
			title: this.state.tempItemTitle,
			cplt: false,
		};
		this.setState({
			myList: [...this.state.myList, currItem ],
			maxItemId: this.state.maxItemId + 1,
			tempItemTitle: '',
		});
	}

	handleTitleChange(event) {
    this.setState({tempItemTitle: event.target.value});
	}

	completeTask(index) {
		let tempListArray = this.state.myList;
		tempListArray[index].cplt = true;
		this.setState({ myList: tempListArray });
	}

	deleteTask(id) {
		this.setState({myList: [
			...this.state.myList.filter(x => id !== x.id)
		]});
	}

  render() {
		let mainStyle = {
			width: '95%', 
			display: 'inline-block',
		};
    return (
      <div className="global-wrap">
				<div 
					className="main-entry" 
					style={{mainStyle}}
				>
					<h2>TO-DO:</h2>
					<input 
						type="text" 
						className="form-control main-input" 
						value={ this.state.tempItemTitle } 
						onChange={ this.handleTitleChange } 
					/>
					<button 
						className="btn btn-info add-btn" 
						disabled={ this.state.tempItemTitle.length === 0 } 
						onClick={ this.addToList } 
					>
						Add to List
					</button>
				</div>
				
				<br />
				{ this.state.myList.length === 0 ? null :
					<div className="task-array">
						<h4>Items:</h4>
						{
							this.state.myList.map((item, index) => {
								return (
									<ListItem 
										id={ item.id } 
										key={ index }
										title={ item.title } 
										boolCplt={ item.cplt }
										index={ index } 
										funcCplt={this.completeTask}
										funcDel={ this.deleteTask }
									/>
								)
							})
						}
					</div>
				}
      </div>
    );
  }
}

export default App;
