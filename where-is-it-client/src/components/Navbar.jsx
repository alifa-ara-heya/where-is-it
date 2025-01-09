import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
    //todo: make navbar responsive for mobile
    const { user, signOutUser } = useContext(AuthContext)
    return (
        <div className="bg-cyan-900 text-white sticky top-0 z-50 mb-6 backdrop-blur-md">
            <div className="navbar w-11/12 mx-auto pt-3 flex-col md:flex-row max-w-[1440px] ">
                <div className="flex-1">
                    <Link to='/' className="text-lg md:text-3xl font-bold flex gap-2 items-center justify-center hover:scale-95 transition ease-in-out duration-200">
                        <img src={logo} alt="logo" className="h-6 md:h-8  object-contain" />
                        <span>WhereIs<span className="text-red-500">It</span></span></Link>
                </div>
                <div className="flex-none">
                    <ul className='menu menu-horizontal px-1 text-xs md:text-base flex-col justify-center items-center md:flex-row'>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/allItems'>Lost and Found Items</Link>
                        </li>
                        <li>
                            <Link to='/contact'>Contact Us</Link>
                        </li>
                        <li>
                            <Link to='/faq'>FAQ</Link>
                        </li>
                        {!user && (
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                        )}
                        {user && (
                            <div className='dropdown dropdown-end z-50 text-black'>
                                <div
                                    tabIndex={0}
                                    role='button'
                                    className='btn btn-ghost btn-circle avatar'
                                >
                                    <div title={user?.displayName} className='w-10 rounded-full'>
                                        <img
                                            referrerPolicy='no-referrer'
                                            alt='User Profile Photo'
                                            src={user?.photoURL}
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                                >
                                    <li>
                                        <Link to='/addItem' className='justify-between'>
                                            Add Lost and Found Item
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/allRecovered'>All Recovered Items</Link>
                                    </li>
                                    <li>
                                        <Link to='/myItems'>Manage My Items</Link>
                                    </li>
                                    <li className='mt-2'>
                                        <button
                                            onClick={signOutUser}
                                            className='bg-gray-200 block text-center'
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {/*  {
                            user && (
                                <li className='mt-2'>
                                    <button
                                        onClick={signOutUser}
                                        className='bg-red-500 block text-center rounded'
                                    >
                                        Logout

                                    </button>
                                </li>
                            )
                        } */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;