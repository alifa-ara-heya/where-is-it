import axios from "axios";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import loadingLottie from '../assets/loading-animation.json'
import PostCard from "./PostCard";
import Heading from "./Heading";
import { Link } from "react-router-dom";
import { BiRightArrow } from "react-icons/bi";

const LatestItems = () => {
    const [latestPosts, setLatestPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSixSortedJobs = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/allPosts?sort=desc&limit=6`)
                setLatestPosts(data)
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        };

        fetchSixSortedJobs();
    }, [])

    if (loading) {
        return <Lottie style={{ width: '100px', marginLeft: 'auto', marginRight: 'auto' }} animationData={loadingLottie} />
    }

    return (
        <div>
            <Heading title={'Latest Posts'} subtitle={'Discover the most recently added lost and found items. Stay updated and help reunite belongings with their rightful owners. Browse the latest posts or explore all items to find what you’re looking for!'} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    latestPosts.map(post => <PostCard key={post._id} post={post} />)
                }
            </div>

            <div className="text-center mt-8">
                <Link to="/allItems">
                    <button className="btn bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 hover:scale-90 transition ease-in-out duration-500">
                        See All Items
                        <BiRightArrow size={18} />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LatestItems;