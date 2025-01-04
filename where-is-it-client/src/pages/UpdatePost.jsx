import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import DatePicker from "react-datepicker";
import { Helmet } from "react-helmet-async";

const UpdatePost = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const name = user?.displayName;
    const navigate = useNavigate();


    const axiosSecure = useAxiosSecure();
    const [post, setPost] = useState({});
    const [startDate, setStartDate] = useState(new Date())

    useEffect(() => {
        fetchPostDetails()
    }, [])

    const fetchPostDetails = async () => {
        try {
            const { data } = await axiosSecure.get(`/postDetails/${id}`)
            setPost(data)
        } catch (err) {
            toast.error('Error fetching post details', err)
        }
    };

    const handleUpdate = async e => {
        e.preventDefault();
        const form = e.target;
        const type = form.type.value;
        const title = form.title.value;
        const category = form.category.value;
        const photo = form.photo.value;
        const date = startDate;
        const location = form.location.value;
        const description = form.description.value;
        const updatedPost = {
            type, title, category, photo, date, location, description, name, email
        }

        try {
            const { data } = await axiosSecure.put(`/updatePost/${id}`, updatedPost)
            if (data.modifiedCount > 0) {
                toast.success('Post updated successfully.')
                navigate('/myItems')
            }
            console.log(data);
        } catch (err) {
            console.log(err);
            toast.error(err)
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setPost(prev => ({
            ...prev, [name]: value
        }))

    }


    return (
        <div className="pb-20 px-10 flex justify-center items-center">
            <div>
                <Helmet>
                    <title>Update Post</title>
                    <meta name="update-post" content="Your trusted platform for reuniting lost items with their owners."></meta>
                </Helmet>
                <Heading title={'Update Lost or Found Item'} subtitle={"Manage all your listed items in one place. Update or delete your posts effortlessly, and keep track of your lost or found items with ease."} />

                <div className="card mx-auto shadow-2xl lg:max-w-[900px]">

                    <form onSubmit={handleUpdate} className="card-body px-10">
                        {/* form-row-1 */}
                        <div className="flex gap-5 flex-col md:flex-row justify-center items-center">
                            {/* Post type */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Post Type</span>
                                </label>
                                <select name="type" className="select select-bordered text-gray-400 text-base capitalize" required value={post.type || ''} onChange={handleChange}>
                                    <option value='' disabled>Choose from below</option>
                                    <option value='Lost'>Lost</option>
                                    <option value='Found'>Found</option>
                                </select>
                            </div>
                            {/* post title */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Post Title</span>
                                </label>
                                <input type="text" placeholder="Title"
                                    name="title"
                                    className="input input-bordered " required
                                    defaultValue={post.title} />
                            </div>

                        </div>
                        {/* form row-2 */}
                        <div className="flex gap-5 flex-col md:flex-row justify-center items-center">
                            {/* category */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select name="category" className="select select-bordered text-gray-400 text-base capitalize" required value={post.category || ""} onChange={handleChange}>
                                    <option value='' disabled>Choose Category</option>
                                    <option value='Pets'>Pets</option>
                                    <option value='Documents'>Documents</option>
                                    <option value='Gadgets'>Gadgets</option>
                                </select>
                            </div>

                            {/* photo url */}
                            <div className="form-control w-full md:w-1/2 ">
                                <label className="label">
                                    <span className="label-text">Item Image URL</span>
                                </label>
                                <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered " required
                                    defaultValue={post.photo} />
                            </div>

                        </div>
                        {/* form-row-3 */}
                        <div className="flex gap-5 flex-col md:flex-row justify-center items-center">
                            {/* date Lost */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Date Lost</span>
                                </label>

                                <DatePicker
                                    className="input input-bordered text-gray-500 w-full"
                                    selected={post.date}
                                    onChange={(date) => setStartDate(date)}
                                    required

                                />

                            </div>
                            {/* location */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input type="text"
                                    name="location" placeholder="e.g. 21/C, Dhanmondi, Dhaka" className="input input-bordered" required
                                    defaultValue={post.location} />
                            </div>
                        </div>

                        {/* description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea className="textarea textarea-md textarea-bordered text-base" placeholder="Short Description About Your Lost or Found Item" required name="description" defaultValue={post.description}></textarea>
                        </div>


                        {/* form-row-4 - contact info*/}
                        <div className="flex gap-5 flex-col md:flex-row justify-center items-center">
                            <h4 className="label label-text">Contact Information:</h4>
                            {/* user name */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input type="text"
                                    value={name}
                                    className="input input-bordered text-gray-400" required disabled={true} />
                            </div>
                            {/* email */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"

                                    value={email} className="input input-bordered text-gray-400" required disabled={true} />
                            </div>

                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-gradient-to-r from-slate-900 to-slate-500 border-none text-white mb-4">Update</button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    );
};

export default UpdatePost;