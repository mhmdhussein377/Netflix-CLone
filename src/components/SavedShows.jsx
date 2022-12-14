import React, {useState, useEffect} from 'react'
import {MdChevronLeft, MdChevronRight} from "react-icons/md"
import {AiOutlineClose} from "react-icons/ai"
import {UserAuth} from '../context/AuthContext';
import {db} from '../firebase';
import {updateDoc, doc, onSnapshot} from "firebase/firestore"

const SavedShows = () => {

    let [movies,
        setMovies] = useState([]);
    let {user} = UserAuth();

    let slideLeft = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    let slideRight = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    useEffect(() => {
        onSnapshot(doc(db, "users", `${user
            ?.email}`), (snapshot) => {
            setMovies(snapshot.data()
                ?.savedShows)
        })
    }, [user
            ?.email]);

    let handleDelete = async(movieId) => {
        try {
            let result = movies.filter((movie) => movie.id !== movieId);
            await updateDoc(doc(db, "users", user
                ?.email), {savedShows: result});
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <h2 className="text-white font-medium md:text-xl p-4">My Shows</h2>
            <div className="relative flex items-center group">
                <div
                    id="slider"
                    className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                    {movies
                        ?.map((movie, id) => (
                            <div
                                className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer p-2 relative"
                                key={id}>
                                <img
                                    className="w-full h-auto d-block"
                                    src={`https://image.tmdb.org/t/p/w500/${movie
                                    ?.img}`}
                                    title={movie
                                    ?.title}/>
                                <div
                                    className="absolute w-full h-full top-0 left-0 hover:bg-black/80 opacity-0 transition flex items-center justify-center text-white hover:opacity-100 ">
                                    <p className="font-medium text-xs md:text-sm">
                                        {movie
                                            ?.title}
                                    </p>
                                    <p
                                        onClick={() => handleDelete(movie.id)}
                                        className='absolute text-gray-300 top-4 right-4'><AiOutlineClose className='' size={20}/></p>
                                </div>
                            </div>
                        ))}
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

export default SavedShows