import React, { Component } from 'react';
import './Search-Component.css';
import api from '../../Api/Api';
import Utils from '../../Utils/Utils';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
          completeResturauntList: [],
          filteredList: [],
          genreList: [],
          stateList: [],
          isStateFilterActive: false,
          isGenreFilterActive: false,
          inputValue: '',
          optionsSelectedValue: '',
          filterByState: '',
          filterByGenre: '',
          genreSelected: '',
          stateSelected: '',
          defaultValue: 'All',
          searchedList: []
        }
      }

    componentDidMount() {
        api.getRestaraunts().then((res) => {
          const retrievedList = res;
          console.log(retrievedList);
          const alphabeticallySortedList = this.alphabeticalSort(retrievedList);
          const genreList = this.getGenreList(retrievedList);
          const stateList = this.getStateList(retrievedList);
          this.setState({
            completeResturauntList: alphabeticallySortedList,
            genreList,
            stateList
          })
        })
      }
    
      alphabeticalSort = (list) => {
        return list.sort((a, b) => a.name.localeCompare(b.name));
      }

      getGenreList = (list) => {
        const refinedList = Utils.extractGenreList(list);
        return refinedList;
      }
      
      getStateList = (list) => {
        const stateList = Utils.extractStateList(list);
        return stateList;
      }

  render() {
    const { filteredList, genreList, stateList } = this.state;
    const listItems = this.state.completeResturauntList.map((item) =>
        <li key={item.id}>{item.name} | {item.genre} | {item.state}</li>
    );
    return (
        <div>
          <div className="top-row">
          <input placeholder="Enter your search" type="text" />
            <div>
            <select defaultValue={this.state.defaultValue} onChange={this.handleGenreFilterChange}>
              <option value="All" disabled>Genre</option>
              <option value="Default">All</option>
                {
                  genreList.map((genre, key) => {
                  return <option key={key} value={genre.value}>{genre}</option>;
                  })
                }
              </select>
            </div>
            <div>
              <select defaultValue={this.state.defaultValue} onChange={this.handleStateFilterChange}>
                <option value="All" disabled>State</option>
                <option value="Default">All</option>
                {
                  stateList.map((genre, key) => {
                  return <option key={key} value={genre.value}>{genre}</option>;
                  })
                }
              </select>
            </div>
          </div>
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