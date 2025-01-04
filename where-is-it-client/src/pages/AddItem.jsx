import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Heading from "../components/Heading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AddItem = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const email = user?.email;
    const name = user?.displayName;
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();

    // console.log(`${import.meta.env.VITE_API_URL}`);
    const handleAdd = async e => {
        e.preventDefault();
        const form = e.target;
        const type = form.type.value;
        const title = form.title.value;
        const category = form.category.value;
        const photo = form.photo.value;
        const date = startDate;
        const location = form.location.value;
        const description = form.description.value;
        const newPost = {
            type, title, category, photo, date, location, description, name, email
        }

        // console.log(newPost);
        try {
            // const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/addPost`, newPost)
            const { data } = await axiosSecure.post(`/addPost`, newPost)
            if (data.insertedId) {
                toast.success('Data added successfully.')
                form.reset()
                setStartDate(new Date());
                navigate('/myItems')
            }
            console.log(data);
        } catch (err) {
            console.log(err);
            toast.error(err.message)
        }
    }

    return (
        <div className="pb-20 px-10 flex justify-center items-center">
            <div>
                <Helmet>
                    <title>Add Item</title>
                    <meta name="add-item" content="Your trusted platform for reuniting lost items with their owners."></meta>
                </Helmet>
                <Heading title={'Add Lost or Found Item'} subtitle={"Help us reconnect items with their rightful owners. Use this page to add details about a lost or found item—every submission brings us one step closer to reuniting items with their owners!"} />

                <div className="card mx-auto shadow-2xl lg:max-w-[900px]">

                    <form onSubmit={handleAdd} className="card-body px-10">
                        {/* form-row-1 */}
                        <div className="flex gap-5 flex-col md:flex-row justify-center items-center">
                            {/* Post type */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Post Type</span>
                                </label>
                                <select name="type" className="select select-bordered text-gray-400 text-base capitalize" required defaultValue=''>
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
                                    className="input input-bordered " required />
                            </div>

                        </div>
                        {/* form row-2 */}
                        <div className="flex gap-5 flex-col md:flex-row justify-center items-center">
                            {/* category */}
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select name="category" className="select select-bordered text-gray-400 text-base capitalize" required defaultValue="">
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
                                <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered " required />
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
                                    selected={startDate}
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
                                    name="location" placeholder="e.g. 21/C, Dhanmondi, Dhaka" className="input input-bordered " required />
                            </div>
                        </div>

                        {/* description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea className="textarea textarea-md textarea-bordered text-base" placeholder="Short Description About Your Lost or Found Item" required name="description"></textarea>
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
                            <button className="btn bg-gradient-to-r from-slate-900 to-slate-500 border-none text-white mb-4">Add Post</button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    );
};

export default AddItem;