import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Heading from "../components/Heading";
import nothingFoundImg from '../assets/nothing-found.png'
import { FaTable } from "react-icons/fa";
import { PiCardsFill } from "react-icons/pi";
import RecoveredPostCard from "../components/RecoveredPostCard";
import RecoveredTable from "../components/RecoveredTable";
import { Helmet } from "react-helmet-async";


const AllRecoveredItems = () => {
    const axiosSecure = useAxiosSecure();
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    const [isCardLayout, setIsCardLayout] = useState(true)


    useEffect(() => {
        const fetchAllRecoveredPostsByTheUser = async () => {
            try {
                const { data } = await axiosSecure.get(`/allRecovered/${user?.email}`)
                setPosts(data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllRecoveredPostsByTheUser();
    }, [user])

    const toggleLayout = () => {
        setIsCardLayout(!isCardLayout)
    }

    if (posts.length === 0)
        return <div className="my-16">
            <img src={nothingFoundImg} alt="" className="mx-auto" />
            <h3 className="text-center text-lg">Nothing Found! Kindly have patience.
            </h3>
        </div>

    return (
        <div className="w-11/12 mx-auto max-w-[1440px] pb-10">
            <Helmet>
                <title>Recovered Items</title>
                <meta name="recovered-items" content="Your trusted platform for reuniting lost items with their owners. "></meta>
            </Helmet>
            <Heading title={'My All Recovered Items'} subtitle={'Congratulations! Track all your recovered items in one place. View detailed records of items you’ve successfully recovered, along with recovery dates and locations.'} />


            <div className="">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center pb-10">
                    <h2>All Recovered items: {posts.length}</h2>
                    <button className="btn bg-gradient-to-r from-red-500 to-pink-500 text-white" onClick={toggleLayout}>

                        {isCardLayout
                            ? (
                                <>
                                    Switch to Table View
                                    <FaTable size={20} />
                                </>
                            )
                            : <>
                                Switch to Card View
                                <PiCardsFill size={20} />
                            </>}
                    </button>
                </div>

                <div>
                    {
                        isCardLayout ?
                            //card layout
                            (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {posts.map(post => <RecoveredPostCard key={post._id} post={post} />)}
                                </div>
                            ) :
                            //table layout
                            (
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th>Photo</th>
                                                <th>Title</th>
                                                <th>Recovered Date</th>
                                                <th>Description</th>
                                                <th className="text-center">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {/* row 1 */}
                                            {
                                                posts.map((post) => <RecoveredTable key={post._id} post={post} />)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                    }
                </div>

            </div>


        </div>
    );
};

export default AllRecoveredItems;