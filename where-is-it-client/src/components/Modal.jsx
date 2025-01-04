import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../Providers/AuthProvider';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import axios from 'axios';
import Swal from 'sweetalert2';

const Modal = ({ post, fetchPostDetails }) => {
    const [startDate, setStartDate] = useState(new Date());
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const userPhoto = user?.photoURL;
    const name = user?.displayName;
    const postId = post._id;
    const description = post.description;
    const title = post.title


    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const recoveredLocation = form.location.value;
        const recoveredDate = startDate;

        const recoveredData = { postId, recoveredDate, recoveredLocation, name, email, postPhoto: post.photo, userPhoto, description, title }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/addRecovered`, recoveredData)
            if (data.insertedId) {
                // toast.success('Data added successfully.')
                document.getElementById("my_modal_5").close();
                await Swal.fire(
                    {
                        title: "Data added successfully!",
                        text: "Thank you for recovering.",
                        icon: "success"
                    }
                )
                form.reset()
                setStartDate(new Date());
                console.log(data);
                fetchPostDetails();

            }
        } catch (err) {
            // console.log(err);
            toast.error(err?.response?.data)
        }
    }

    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle max-w-4xl mx-auto">
            <div className="modal-box">

                <div className='text-center'>
                    <h2 className='text-lg font-bold mb-3'>Item Recovery Details</h2>
                    <p className='w-[90%] mx-auto'>Provide the details of the recovered item, including where and when it was returned to its original owner. Help us keep accurate records of recovered items.</p>
                </div>

                <div className="card mx-auto shadow-2xl">
                    <form onSubmit={handleSubmit} action="" className="card-body px-10">
                        {/* recovered location */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Recovered Location</span>
                            </label>
                            <input type="text"
                                name="location" placeholder="e.g. 21/C, Dhanmondi, Dhaka" className="input input-bordered " required />
                        </div>

                        {/*recovered date  */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Date Found</span>
                            </label>

                            <DatePicker
                                className="input input-bordered text-gray-500 w-full"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                required
                            />
                        </div>

                        <h4 className="label label-text">Contact Information:</h4>
                        {/* user name */}
                        <hr />
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input type="text"
                                value={name}
                                className="input input-bordered text-gray-400" required disabled={true} />
                        </div>
                        {/* email */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"

                                value={email} className="input input-bordered text-gray-400" required disabled={true} />
                        </div>

                        {/* photo */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text"
                                value={userPhoto} className="input input-bordered text-gray-400" required disabled={true} />
                        </div>

                        <button className="btn btn-primary" type="submit">Add recovered</button>
                    </form>
                </div>

                <div className="modal-action flex items-center justify-center">
                    <form method="dialog">
                        <button className="btn"
                        >Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

Modal.propTypes = {
    post: PropTypes.object,
    fetchPostDetails: PropTypes.func
};

export default Modal;