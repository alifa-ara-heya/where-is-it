// import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLocationArrow } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";



const PostDetails = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const fetchPostDetails = async () => {
        try {
            const { data } = await axiosSecure.get(`/postDetails/${id}`)
            setPost(data)
        } catch (err) {
            toast.error('Error fetching post details', err)
        }
    };

    useEffect(() => {
        fetchPostDetails()
    }, [id])

    const { title, photo, description, date, type, location, category } = post;


    return (
        <div>
            <div className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 w-[300px] md:w-[500px] mx-auto max-w-7xl md:mt-10 mb-10 mt-4 py-6">
                <Helmet>
                    <title>{title}</title>
                    <meta name={title} content="Your trusted platform for reuniting lost items with their owners. "></meta>
                </Helmet>
                {/* Post Image */}
                <img
                    src={photo}
                    alt={title}
                    className="w-full h-60 md:h-72 object-cover rounded-lg"
                />

                {/* Post Content */}
                <div className="p-6 space-y-4">

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-800">
                        {title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 font-medium">
                        {description}
                    </p>

                    {/* category */}
                    <p className="text-gray-600 font-medium">
                        Category:
                        <span className="text-gray-500"> {category}</span>
                    </p>

                    {/* Date */}
                    <p className=" text-gray-600 font-medium">
                        Posted on:
                        <span className="text-gray-500"> {new Date(date).toLocaleDateString()}</span>
                    </p>

                    {/* Location */}
                    <div className="flex items-center text-gray-500 gap-3 font-medium">
                        <FaLocationArrow />
                        {location}
                    </div>

                    {/* status or type */}
                    <p className="text-gray-600 font-medium">
                        Status:
                        <span
                            className={`rounded-lg px-3 py-1 ml-3 ${type === "Recovered"
                                ? "text-green-500 bg-green-500/15"
                                : "text-red-500 bg-red-500/15"
                                }`}
                        >
                            {type}
                        </span>
                    </p>



                    {/* Button */}
                    {
                        type === 'Lost' ? (
                            <button
                                className="btn bg-gradient-to-r from-red-500 to-pink-500 text-white"
                                onClick={() => document.getElementById('my_modal_5').showModal()}
                            >
                                Found This
                            </button>
                        ) : type === 'Found' ? (
                            <button
                                className="btn bg-gradient-to-r from-red-500 to-pink-500 text-white"
                                onClick={() => document.getElementById('my_modal_5').showModal()}
                            >
                                This is Mine
                            </button>
                        ) : type === 'Recovered' && (
                            <button
                                className="btn bg-gray-400 text-white cursor-not-allowed"
                                disabled={true}
                            >
                                Recovered
                            </button>
                        )
                    }


                </div>
                <Modal post={post} fetchPostDetails={fetchPostDetails} />
            </div>


        </div>
    );
};

export default PostDetails;