import React, { Component } from 'react';
import './Search-Component.css';
import api from '../../Api/Api';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
          completeResturauntList: []
        }
      }

    componentDidMount() {
        api.getRestaraunts().then((res) => {
          const retrievedList = res;
          console.log(retrievedList);
          const alphabeticallySortedList = this.alphabeticalSort(retrievedList);
          this.setState({
            completeResturauntList: alphabeticallySortedList
          })
        })
      }
    
      alphabeticalSort = (list) => {
        return list.sort((a, b) => a.name.localeCompare(b.name));
      }
  render() {
    const listItems = this.state.completeResturauntList.map((item) =>
        <li key={item.id}>{item.name} | {item.genre} | {item.state}</li>
    );
    return (
        <div>
          <input placeholder="Enter your search" type="text" />
          <div>
          {listItems.length > 0 ? (
            <ul className="list">
              {listItems}
            </ul>
            ) : (
              <ul className="list">
                <li>No results were found</li>
              </ul>
            )
          }
          </div>
        </div>
      );
  }
}

export default Search;