import axios from 'axios';
import React, {useState} from 'react'
import {useEffect} from 'react';
import Movie from './Movie';
import {MdChevronLeft, MdChevronRight} from "react-icons/md"

const Row = ({title, fetchURL, rowID}) => {

    let [movies,
        setMovies] = useState([]);

    useEffect(() => {

        axios
            .get(fetchURL)
            .then((res) => {
                setMovies(res.data.results);
            });

    }, []);

    let slideLeft = () => {
        var slider = document.getElementById(rowID)
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    let slideRight = () => {
        var slider = document.getElementById(rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    return (
        <div>
            <h2 className="text-white font-medium md:text-xl p-4">{title}</h2>
            <div className="relative flex items-center group">
                <div
                    id={rowID}
                    className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                    {movies.map((movie, id) => (<Movie movie={movie} key={id}/>))}
                </div>
                <div
                    onClick={slideLeft}
                    className="absolute bg-white opacity-50 hover:opacity-100 top-1/2 -translate-y-1/2 left-[20px] p-2 rounded-full items-center justify-center cursor-pointer z-10 hidden group-hover:flex">
                    <MdChevronLeft className="" size={25}/>
                </div>
                <div
                    onClick={slideRight}
                    className="absolute bg-white opacity-50 hover:opacity-100 transition top-1/2 -translate-y-1/2 right-[20px] p-2 rounded-full items-center justify-center cursor-pointer z-10 hidden group-hover:flex">
                    <MdChevronRight className="" size={25}/>
                </div>
            </div>
        </div>
    );
}

export default Row