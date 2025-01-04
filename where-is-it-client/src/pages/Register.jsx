import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from '../assets/logo.png'
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";


const Register = () => {
    const { createUser, setUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, photo, password);

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMsg('Please use at least one uppercase, one lowercase, one number and one special character(!,@,&) and also make sure that the length of the password is more than six characters.')
            return;
        }

        // create user
        createUser(email, password)
            .then(result => {
                const createdUser = result.user;
                // console.log(`user with sign in`, createdUser);

                // update profile
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        //refreshing user to get updated profile
                        setUser({ ...createdUser, displayName: name, photoURL: photo });
                        toast.success('Registration successful.')
                        const from = location?.state?.from?.pathname || '/';
                        navigate(from, { replace: true });
                    })
                    .catch((error => {
                        console.log(`Error updating profile`, error);
                    }))
            })
            .catch(error => {
                console.log(`Error in registration`, error);
                toast.error(error.message);
            })
    }

    return (
        <div className="flex justify-center items-center md:min-h-screen md:py-10 pb-3">
            <Helmet>
                <title>Register</title>
                <meta name="register" content="Register page"></meta>
            </Helmet>
            <div className="">


                <div className="card mx-auto md:w-[500px]  shadow-2xl">
                    <div className="text-center">
                        <img src={logo} alt="logo" className="mx-auto my-3" />
                        <h1 className="text-xl md:text-3xl font-medium ">Get Your Free Account Now!</h1>

                    </div>
                    <form onSubmit={handleRegister} className="card-body md:px-20">
                        {/* name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Your Name"
                                name="name"
                                className="input input-bordered " required />
                        </div>
                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                name="email" placeholder="email" className="input input-bordered " required />
                        </div>
                        {/* photo url */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered " required />
                        </div>
                        {/* password */}
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder="password"
                                className="input input-bordered" required />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className='btn btn-xs absolute right-2 top-12'>
                                {
                                    showPassword ? <FaEyeSlash /> : <FaEye />
                                }
                            </button>
                            {
                                errorMsg && <p className='text-red-600 text-xs mt-6'>{errorMsg}</p>
                            }
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-gradient-to-r from-slate-900 to-slate-600 border-none text-white mb-4">Register</button>
                        </div>

                        <p>Already have an account? Please <Link className="btn-link text-blue-900" to='/login'>SignIn.</Link></p>


                    </form>

                </div>
            </div>
        </div>
    );
};

export default Register;