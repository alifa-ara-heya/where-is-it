import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import logo from '../assets/logo.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const SignIn = () => {

    const { signInWithGoogle, signInUser, setUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        signInUser(email, password)
            .then(result => {
                // console.log(`signed in user`, result.user);
                e.target.reset();
                setUser(result.user);
                toast.success('Login successful.')
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(`${error.code}`)
            })
    }


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                // console.log(`Google Login User`, result.user);
                toast.success('Sign In Successful!')
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log('My error when logged in with Google is', error.message);
            })
    }


    return (
        <div className="flex justify-center items-center md:min-h-screen md:py-10 pb-3">
            <Helmet>
                <title>Login</title>
                <meta name="login" content="Login Page"></meta>
            </Helmet>
            <div className="">
                <div className="card mx-auto md:w-[500px] shadow-2xl">
                    <div className="text-center">
                        <img src={logo} alt="logo" className="mx-auto my-3" />
                        <h1 className="text-xl md:text-3xl font-medium ">Welcome Back!</h1>
                    </div>

                    <form onSubmit={handleSignIn} className="card-body md:px-20">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                name="email" placeholder="email" className="input input-bordered "

                                required />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"
                                name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                {/* <Link
                                    state={{ email }}
                                    to='/forgot-password'
                                    className="label-text-alt link link-hover">
                                    Forgot password?
                                </Link> */}
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-gradient-to-r from-slate-900 to-slate-600 text-white mb-4 border-none">Login</button>
                        </div>

                        <p>Don&apos;t have an account? <br />Please <Link className="btn-link text-blue-800 " to='/register'>Register.</Link></p>

                        <p>or,</p>
                        <button onClick={handleGoogleSignIn} className="btn btn-outline border-violet-950 hover:bg-gray-100 hover:text-black">Login With Google <FcGoogle size={20} /></button>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default SignIn;