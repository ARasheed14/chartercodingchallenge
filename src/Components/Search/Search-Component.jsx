import React, { Component } from 'react';
import './Search-Component.css';
import api from '../../Api/Api';
import Utils from '../../Utils/Utils';
import Constants from '../../Constants/Constants';
import TableComponent from '../Table/Table-Component';

class Search extends Component {
  genreText = 'genre';
  stateText = 'state';
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
          defaultValue: Constants.allText,
          searchedList: []
        }
      }

    componentDidMount() {
        api.getRestaraunts().then((res) => {
          const retrievedList = res;
          const alphabeticallySortedList = this.alphabeticalSort(retrievedList);
          const genreList = this.getGenreList(retrievedList);
          const stateList = this.getStateList(retrievedList);
          this.setState({
            completeResturauntList: alphabeticallySortedList,
            filteredList: alphabeticallySortedList,
            searchedList: alphabeticallySortedList,
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

      search = (searchText, list) => {
        const searchList = list.filter(restuaraunt => 
          restuaraunt.name.toLowerCase().includes(searchText.toLowerCase()) 
          || restuaraunt.city.toLowerCase().includes(searchText.toLowerCase()) 
          || restuaraunt.genre.toLowerCase().includes(searchText.toLowerCase()));
        const newFilteredList = this.filterCheck(searchList);
        this.setState({
          filteredList: newFilteredList,
          searchedList: searchList
        });
      }

      handleChange = (event) => {
        this.setState({inputValue: event.target.value});
        this.search(event.target.value, this.state.completeResturauntList);
      }

      filterCheck = (list) => {
        if (this.state.isStateFilterActive === true) {
          return list.filter(restuaraunt => 
            restuaraunt.state.toLowerCase().includes(this.state.filterByState.toLowerCase()));
        }
        if (this.state.isGenreFilterActive) {
          return list.filter(restuaraunt => 
            restuaraunt.genre.toLowerCase().includes(this.state.filterByGenre.toLowerCase()));
        }
        if (this.state.isGenreFilterActive && this.state.isStateFilterActive) {
          return list.filter(restuaraunt => 
            restuaraunt.state.toLowerCase().includes(this.state.filterByState.toLowerCase()) && restuaraunt.genre.toLowerCase().includes(this.state.filterByGenre.toLowerCase()));
        } 
        if (!this.state.isGenreFilterActive && !this.state.isStateFilterActive) {
          return list;
        }
      }

      activateFilter = (filter, filterBy) => {
        if (filter === this.genreText && !this.state.isGenreFilterActive) {
          this.setState({
            isGenreFilterActive: true,
            filterByGenre: filterBy
          })
        }
        if (filter === this.stateText && !this.state.isStateFilterActive) {
          this.setState({
            isStateFilterActive: true ,
            filterByState: filterBy
          })
        }
      }

      disableFilters = (filter) => {
        if (filter === this.genreText && this.state.isGenreFilterActive) {
          this.setState((prevState) => ({
            isGenreFilterActive: false,
            filteredList: prevState.searchedList,
            filterByGenre: ''
          }))
        }
        if (filter === this.stateText) {
          this.setState((prevState) => ({
            isStateFilterActive: false,
            filteredList: prevState.searchedList,
            filterByState: ''
          }))
        }
      }

      handleGenreFilterChange = (event) => {
        const filterValue = event.target.value;
        if (filterValue !== Constants.defaultText) {
          this.activateFilter(this.genreText, filterValue)
        }
        if (filterValue === Constants.defaultText) {
          this.disableFilters(this.genreText);
        }
      }
      
      handleStateFilterChange = (event) => {
        const filterValue = event.target.value;
        if (filterValue !== Constants.defaultText) {
          this.activateFilter(this.stateText, filterValue)
        }
        if (filterValue === Constants.defaultText) {
          this.disableFilters(this.stateText);
        }
      }

  render() {
    const { filteredList, genreList, stateList } = this.state;
    return (
        <div>
          <div className="top-row">
          <input placeholder={Constants.inputPlaceHolder} type="text" onChange={this.handleChange} />
            <div>
            <select defaultValue={this.state.defaultValue} onChange={this.handleGenreFilterChange}>
              <option value={Constants.allText} disabled>{Constants.genreBigText}</option>
              <option value={Constants.defaultText}>{Constants.allText}</option>
                {
                  genreList.map((genre, key) => {
                  return <option key={key} value={genre.value}>{genre}</option>;
                  })
                }
              </select>
            </div>
            <div>
              <select defaultValue={this.state.defaultValue} onChange={this.handleStateFilterChange}>
              <option value={Constants.allText} disabled>{Constants.stateBigText}</option>
              <option value={Constants.defaultText}>{Constants.allText}</option>
                {
                  stateList.map((state, key) => {
                  return <option key={key} value={state.value}>{state}</option>;
                  })
                }
              </select>
            </div>
          </div>
            <TableComponent restaurants={filteredList}></TableComponent>
        </div>
      );
  }
}

export default Search;