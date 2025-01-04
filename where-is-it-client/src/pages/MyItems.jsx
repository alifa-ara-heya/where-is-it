import { useContext, useEffect, useState } from "react";
import Heading from "../components/Heading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";
import nothingFoundImg from '../assets/nothing-found.png'
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const MyItems = () => {
    const axiosSecure = useAxiosSecure();
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchAllPostsByTheUser = async () => {
        try {
            // Ensure user email exists before making the request
            /* if (!user?.email) {
                console.error("User email is not available.");
                return;
            } */

            // Fetch all posts created by the logged-in user
            const { data } = await axiosSecure.get(`/posts/${user?.email}`);

            // Update the posts state with the fetched data
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast.error("Failed to fetch your posts. Please try again.");
        }
    }

    useEffect(() => {
        fetchAllPostsByTheUser()
    }, [user])

    const handleDelete = async (id) => {
        try {
            // Confirm deletion with SweetAlert
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                // Call delete API
                const { data } = await axiosSecure.delete(`/post/${id}`);

                // Check if deletion was successful
                //I am sending two result ( postDeleteResult,recoveredDeleteResult) from backend. That's why I am checking the deletedCount inside postDeleteResult
                if (data.postDeleteResult.deletedCount > 0) {
                    // Show success SweetAlert
                    await Swal.fire({
                        title: "Deleted!",
                        text: "Your item has been deleted.",
                        icon: "success"
                    });
                    console.log(data);

                    // Refresh the list of posts
                    fetchAllPostsByTheUser(); // Ensure this updates your UI state
                } else {
                    // Handle case where deletion fails
                    await Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the item. Please try again.",
                        icon: "error"
                    });
                }
            }
        } catch (err) {
            console.error("Error deleting the item:", err);
            // Show error SweetAlert
            await Swal.fire({
                title: "Error!",
                text: "An error occurred while deleting the item.",
                icon: "error"
            });
        }
    };


    // console.log(posts.length);

    return (
        <div className="w-11/12 mx-auto max-w-[1440px] ">
            <Helmet>
                <title>My Items</title>
                <meta name="my-items" content="Your trusted platform for reuniting lost items with their owners."></meta>
            </Helmet>
            <Heading title={'Manage My Items'} subtitle={'Manage all your listed items in one place. Update or delete your posts effortlessly, and keep track of your lost or found items with ease.'} />
            <hr />

            <div className="pb-12">
                {
                    posts.length === 0 ?
                        <div className="my-16">
                            <img src={nothingFoundImg} alt="" className="mx-auto" />

                            <h3 className="text-center text-lg">Nothing Found! Please if you encounter any lost item, add

                                <Link to='/addItem' className="text-blue-700"> here.
                                </Link>
                            </h3>
                        </div>

                        : <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th />
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {
                                        posts.map((post, idx) => <tr key={post._id}>
                                            <td>
                                                {idx + 1}.
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={post.photo}
                                                                alt={post.title} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{post.title}</div>
                                                        <div className="text-sm opacity-50">{post.location}</div>
                                                    </div>
                                                </div>
                                            </td>


                                            <td className="">
                                                {post.description}
                                                <br />
                                                {/* <span className={`badge badge-ghost badge-md text-red-500 bg-red-500/15 rounded-lg ml-3 ${post.type === 'Recovered' && 'text-green-500 bg-green-500/15'}`}> {post.type}</span> */}
                                                <span
                                                    className={`rounded-lg px-3 py-1 ml-3 badge badge-ghost badge-md ${post.type === "Recovered"
                                                        ? "text-green-500 bg-green-500/15"
                                                        : "text-red-500 bg-red-500/15"
                                                        }`}
                                                >
                                                    {post.type}
                                                </span>
                                            </td>
                                            <td>
                                                {post.category}
                                            </td>

                                            <th className="flex justify-around items-center">
                                                <Link to={`/update/${post._id}`}>
                                                    <button className="btn btn-md bg-gradient-to-r from-red-500 to-pink-500 text-white flex-nowrap">
                                                        Update
                                                        <CiEdit size={20} />
                                                    </button></Link>
                                                <button className="btn btn-md ml-3 bg-gradient-to-r from-red-500 to-pink-500 text-white"
                                                    onClick={() => handleDelete(post._id)}>Delete
                                                    <MdDeleteForever size={20} />
                                                </button>
                                            </th>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                }
            </div>
        </div>
    );
};

export default MyItems;