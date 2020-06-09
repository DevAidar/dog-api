import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import Axios from 'axios';

import Popup from './components/Popup/Popup';
import Navbar from './components/Navbar/Navbar';

import './App.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const App = () => {
    let location  = useLocation();

    const initialState = {
        input: location.search.substr(1).split('-').join(' '),
        found: [],
        isPopupOpen: false,
    }


    const [breeds, setBreeds] = useState([]);
    const [images, setImages] = useState([]);
    const [appState, setAppState] = useState(initialState);


    const searchBreed = (keywords) => {
        const foundBreeds = [];
        if (breeds) 
            breeds.forEach(breed =>
                breed[0].split(' ').some(word => keywords.trim().split(' ').length > 1 ? keywords.trim().toLowerCase().split(' ').some(keyword => word === keyword) : word.startsWith(keywords.trim().toLowerCase()))
                    ? 
                        keywords.trim().split(' ').length > 1 
                            // ? breed[1].forEach(subBreed => foundBreeds.push([breed[0], subBreed])) 
                            ? breed[1].forEach(subBreed => subBreed.split(' ').some(word => keywords.trim().toLowerCase().split(' ').every(keyword => keyword === breed[0] || word.startsWith(keyword))) 
                                ? foundBreeds.push([breed[0], subBreed])
                                : null)
                            : foundBreeds.push([breed[0]]) &&
                                breed[1].forEach(subBreed => foundBreeds.push([breed[0], subBreed]))
                    : breed[1].forEach(subBreed => subBreed.split(' ').some(word => keywords.trim().toLowerCase().split(' ').every(keyword => keyword !== breed[0] && word.startsWith(keyword))) 
                        ? foundBreeds.push([breed[0], subBreed])
                        : null)
            );
        return foundBreeds;
    }

    const handleInputChange = e => {
        const keyword = e.target.value;
        if (keyword) 
            setAppState({...appState, input: keyword, found: searchBreed(keyword).slice(0, 5), isPopupOpen: true});
        else 
            setAppState({...appState, input: keyword, found: [], isPopupOpen: false});
    }

    const onClick = () => {
        setAppState({...appState, found: [], isPopupOpen: false});
        
    };


    useEffect(() => {
        const fetchData = async () => {
            const response = await Axios.get(`https://dog.ceo/api/breeds/list/all`);

            setBreeds(Object.entries(response.data.message));
        }

        fetchData();
    }, [setBreeds]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await Axios.get(`https://dog.ceo/api/${location.pathname.split('/').filter(elem => !elem.includes('=') && elem.length > 0).length > 0 ? 'breed' + location.pathname.split('/').filter(elem => !elem.includes('=')).join('/') + '/images' : 'breeds/image'}/random/${location.pathname.includes('img=') ? 12 : 13}`);

            setImages(location.pathname.includes('/img=') ? [`https://images.dog.ceo/breeds/${location.pathname.split('/')[1]}${location.pathname.split('/').filter(elem => !elem.includes('=') && elem.length > 0).length > 1 ? '-' + location.pathname.split('/')[2] : ''}/${location.pathname.split('=')[1]}.jpg` , ...response.data.message] : response.data.message);
        }

        fetchData();
    }, [setImages]);

    useEffect(() => {
        const currentPath = location.pathname;
        const searchParams = new URLSearchParams(location.search);
    }, [location]);


    return (
        <div className="App">
            <Navbar searchValue={ appState.input } handleInputChange={ handleInputChange } isOpen={ appState.isPopupOpen } items={ appState.found } onClick={ onClick } location={ location } />
            
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <p className='text-center lead display-3'>{images[0] ? images[0].split('/')[4].split('-').map(elem => elem[0].toUpperCase() + elem.substr(1).toLowerCase()).join(' ') : ''}</p>
                        <div className='row align-middle align-items-center'>
                            <figure className="col-md">
                                <a href={`/${images[0] ? images[0].split('/')[4].split('-').join('/') + '/img=' + images[0].split('/')[5].split('.', 1)[0] : ''}?`} className='text-center' data-size="1600x1067">
                                    <img 
                                        alt="picture" 
                                        src={images[0]}
                                        className="figure-img mx-auto d-block main-pic" 
                                    />
                                </a>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>

            <div id="gallery" className="carousel slide carousel-multi-item carousel-multi-item-2" data-ride="carousel">
                <a className="carousel-control-prev" href="#gallery" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#gallery" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>  

                <div className='carousel-inner' role='listbox'>
                    { images 
                        ? images.slice(1).map((image, index) => {
                            if (index % 4 === 0) 
                                return (
                                    <div className={`carousel-item${index === 0 ? ' active' : ''}`} key={`carousel-${index + 1}`}>
                                        {images.slice(index + 1, index + 5).map((image, j) => (
                                            <div className="col-md-3 mb-3" key={`carousel-item-${index + j + 1}`}>
                                                <a className="card" href={`/${images[index + j + 1] ? images[index + j + 1].split('/')[4].split('-').join('/') + '/img=' + images[index + j + 1].split('/')[5].split('.', 1)[0] : ''}?`} data-size="1600x1067">
                                                    <img 
                                                        alt="picture" 
                                                        src={images[index + j + 1]}
                                                        className="img-fluid" 
                                                    />
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                )
                        })
                        : <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
