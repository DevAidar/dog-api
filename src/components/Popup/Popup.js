import React from 'react';
import { Link } from 'react-router-dom';

const Popup = ({ isOpen, items, onClick }) => (
    <>
        { isOpen && items.length > 0
            ? <div className="dropdown-menu my-2 my-lg-0 show" aria-labelledby="search-dropdown">
                { items.length > 0 && items.map((item, index) => (
                    <a key={ index } href={`/${item[0]}${item[1] ? `/${item[1]}?` : '?'}`} onClick={() => onClick()} className="dropdown-item my-2 my-lg-0" >
                        {`${item[1] ? `${item[1]} ` : ''}${item[0]}`}
                    </a>
                ))}
            </div>
            : null
                
        }
    </>
)

export default Popup;