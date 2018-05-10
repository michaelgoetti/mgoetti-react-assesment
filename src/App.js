import React, { Component } from 'react';
import ListItem from './ListItem';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			myList: [],
			tempTitle: '',
			maxId: 0,
		}

		this.addToList = this.addToList.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.completeTask = this.completeTask.bind(this);
		this.deleteTask = this.deleteTask.bind(this);

	}

	addToList() {
		let currItem = {
			id: this.state.maxId + 1,
			title: this.state.tempTitle,
			cplt: false,
		};
		this.setState({
			myList: [...this.state.myList, currItem ]
		},
			() => {
				this.setState({ 
					maxId: this.state.maxId + 1,
					tempTitle: '',
				})
			}
		);
		document.querySelector(".main-input").value = '';
	}

	handleTitleChange(event) {
    this.setState({tempTitle: event.target.value});
	}
	

	completeTask(id, index) {
		this.setState({myList: [
			...this.state.myList.filter(x => id !== x.id),
			{ 
				id: this.state.myList[index].id,
				title: this.state.myList[index].title,
				cplt: true, 
			}
		]},
			() => {
				let tempList = this.state.myList;
				tempList.sort(function(a,b) {
					return (a.id > b.id) 
						? 1 
						: ((b.id > a.id) ? -1 : 0);}
					);
				this.setState({ myList: tempList })		
				});
	}

	deleteTask(id) {
		this.setState({myList: [
			...this.state.myList.filter(x => id !== x.id)
		]});
	}

  render() {
    return (
      <div className="global-wrap">
				<div className="main-entry" style={{width: '96.5%', display: 'inline-block'}}>
					<h2>TO-DO:</h2>
					<input type="text" className="form-control main-input" onChange={ this.handleTitleChange } />
					<button className="btn btn-info add-btn" disabled={ this.state.tempTitle.length === 0 } onClick={ this.addToList } >
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
										cplt={ item.cplt }
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
