import React, { useState } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';

import Popup from '../Popup/Popup';

const Navbar = ({ searchValue, handleInputChange, isOpen, items, onClick, location }) => {
  const [toShowDDM, setShowDDM] = useState(false);
  let redirect = '';

  let history = useHistory();

  return redirect
    ? <>
      <Redirect to={redirect} />
      {redirect = ''}
    </>
    : (
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <Link className="navbar-brand mr-auto mr-lg-0" to="/dog-api/">Doggos and Puppers</Link>
        <button className="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas" onClick={() => setShowDDM(!toShowDDM)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse offcanvas-collapse${toShowDDM ? ' open' : ''}`} id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto" />
          <form
            className={`form-inline my-2 my-lg-0 dropdown${isOpen && items.length > 0 ? ' show' : ''}`}
            onSubmit={() => {
              console.log(`${searchValue ? items.length > 0 ? `dog-api/${items[0][0]}${items[0][1] ? `/${items[0][1]}?` : '?'}` : '/' : `/${location.pathname.split('/').filter(elem => !elem.includes('=') && elem.length > 0).join('/')}`}`)

              redirect = `${searchValue
                ? items.length > 0
                  ? `/dog-api/${items[0][0]}${items[0][1]
                    ? `/${items[0][1]}?`
                    : '?'}`
                  : '/'
                : `${location.pathname.split('/').filter(elem => !elem.includes('=') && elem.length > 0).join('/')}`}`;
              // history.push({
              //   pathname: `${searchValue
              //     ? items.length > 0
              //       ? `/dog-api/${items[0][0]}${items[0][1]
              //         ? `/${items[0][1]}?`
              //         : '?'}`
              //       : '/'
              //     : `${location.pathname.split('/').filter(elem => !elem.includes('=') && elem.length > 0).join('/')}`}`
              // })
            }}
          >
            <input
              className="form-control mr-sm-2 dropdown-toggle"
              id="search-dropdown"
              data-toggle="dropdown"
              type="text"
              placeholder="Search Breed"
              autoComplete='off'
              value={searchValue}
              onChange={(e) => handleInputChange(e)}
              aria-label="Search"
            />
            <Popup isOpen={isOpen} items={items} onClick={onClick} />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">{searchValue ? 'Search' : 'Find More'}</button>
          </form>

        </div>
      </nav >
    )
};

export default Navbar;