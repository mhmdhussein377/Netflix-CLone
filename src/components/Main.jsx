import React from 'react'
import {useEffect} from 'react';
import {useState} from 'react';
import requests from '../Request';
import axios from "axios"

const Main = () => {

    let [movies,
        setMovies] = useState([]);

    let movie = movies[Math.floor(Math.random() * movies.length)];

    useEffect(() => {

        axios
            .get(requests.requestPopular)
            .then((res) => {
                setMovies(res.data.results);
            });

    }, []);

    let truncateString = (str, num) => {
        if (str
            ?.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }

    return (
        <div className="w-full h-[550px] text-white">
            <div className="w-full h-full relative">
                <img
                    src={`https://image.tmdb.org/t/p/original/${movie
                    ?.backdrop_path}`}
                    className="w-full h-full object-cover"
                    alt={movie
                    ?.title}/>
                <div
                    className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-black"></div>
                <div className="absolute w-full top-[20%] p-4 md:p-8">
                    <h1 className="text-3xl md:text-5xl font-semibold">
                        {movie
                            ?.title}
                    </h1>
                    <div className="my-4">
                        <button
                            className="border font-medium bg-gray-300 text-black border-gray-300 py-3 px-5">
                            Play
                        </button>
                        <button
                            className="border font-medium text-white ml-4 border-gray-300 py-3 px-5">
                            Watch Later
                        </button>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Released: {movie
                            ?.release_date}
                    </p>
                    <p
                        className="w-full md:max-w-[75%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                        {truncateString(movie
                            ?.overview, 150)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main