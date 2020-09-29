import React from 'react';
import './Table-Component.css';
import Constants from '../../Constants/Constants';

const Table = (props) => {
  const restaurants = props.restaurants;
  const listItems = restaurants.map((restaurant) =>
<li className="box" key={restaurant.id}>{restaurant.name} | {restaurant.city} | {restaurant.state} | {restaurant.telephone} | {restaurant.genre}</li>
  );
  return (
    <div>
      <div>
        {restaurants.length > 0 ? (
          <ul className="list">
            {listItems}
          </ul>
          ) : (
            <ul className="list">
              <li>{Constants.noResultsFound}</li>
            </ul>
          )
        }
      </div>
    </div>
  );
}

export default Table;