import React, { useEffect } from 'react'
import {useState} from 'react';
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {UserAuth} from '../context/AuthContext';
import {db} from "./../firebase";
import {doc, updateDoc, arrayUnion, onSnapshot} from "firebase/firestore"

const Movie = ({movie}) => {

    let {user} = UserAuth();

    let [saved,
        setSaved] = useState(false);
    let [like,
        setLike] = useState(false);

    let movieID = doc(db, "users", `${user
        ?.email}`);

    let saveShow = async() => {
        if (user
            ?.email) {
            setLike(!like);
            setSaved(true);
            await updateDoc(movieID, {
                savedShows: arrayUnion({id: movie.id, title: movie.title, img: movie.backdrop_path})
            });
        } else {
            alert("Please log in to save a movie");
        };
    };

    // my code

    let [movies, setMovies] = useState([]);

    useEffect(() => {
        onSnapshot(doc(db, "users", `${user
            ?.email}`), (snapshot) => {
            setMovies(snapshot.data()
                ?.savedShows);
        });

        if(movies?.includes(movie)) {
            setLike(true);
        }

    }, [user
            ?.email]);

    return (
        <div
            className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer p-2 relative">
            <img
                className="w-full h-auto d-block"
                src={`https://image.tmdb.org/t/p/w500/${movie
                ?.backdrop_path}`}
                title={movie.title}/>
            <div
                className="absolute w-full h-full top-0 left-0 hover:bg-black/80 opacity-0 transition flex items-center justify-center text-white hover:opacity-100 ">
                <p className="font-medium text-xs md:text-sm">{movie
                        ?.title}</p>
                <p className="absolute top-[15px] left-[15px] text-gray-300" onClick={saveShow}>
                    {like
                        ? <FaHeart/>
                        : <FaRegHeart/>}
                </p>
            </div>
        </div>
    );
}

export default Movie