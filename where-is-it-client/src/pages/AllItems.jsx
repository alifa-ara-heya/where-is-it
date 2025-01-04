import { FaSearch } from "react-icons/fa";
import Heading from "../components/Heading";
import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import toast from "react-hot-toast";
import loadingLottie from '../assets/loading-animation.json'
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";

const AllItems = () => {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllPosts = async () => {
            setLoading(true)
            try {
                // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/posts`)
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/allPosts?search=${search}&filterType=${filterType}&filterCategory=${filterCategory}`)
                setPosts(data)
            } catch (err) {
                toast.error('Error fetching posts', err)
            } finally {
                setLoading(false)
            }
        };

        fetchAllPosts()
    }, [filterCategory, filterType, search]) //// Re-fetch posts when filters or search change

    // console.log(posts.length);

    const handleReset = () => {
        setFilterCategory('')
        setSearch('')
        setFilterType('')
    }


    return (
        <div className="w-11/12 mx-auto max-w-[1440px]">
            <Helmet>
                <title>Lost and Found Items</title>
                <meta name="lost-found-items" content="Your trusted platform for reuniting lost items with their owners."></meta>
            </Helmet>
            <Heading title={'All Lost And Found Items'} subtitle={'Welcome to WhereIsIt, your trusted platform for reuniting lost items with their owners. Whether you’ve lost something precious or found an item that needs a home, we’re here to help bridge the gap and bring peace of mind.'} />

            {/* filter and search buttons */}
            <div className="flex flex-col lg:flex-row gap-6 w-3/4 mx-auto mb-8">

                {/* filter by  type */}
                <select
                    className="select select-bordered w-full"
                    name="type"
                    id='type'
                    onChange={e => setFilterType(e.target.value)}
                    value={filterType}>
                    <option value=''>Filter By Type</option>
                    <option value="Lost">Lost</option>
                    <option value="Found">Found</option>
                </select>

                {/* search field */}
                <div className="relative w-full">
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Search By Title or Location"
                        name="search"
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                    />
                    <button className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
                        <FaSearch />
                    </button>
                </div>

                {/* filter by category */}
                <select
                    className="select select-bordered w-full" value={filterCategory}
                    name='category'
                    id='category'
                    onChange={e => setFilterCategory(e.target.value)}
                >
                    <option value="">Filter by Category</option>
                    <option value="Pets">Pets</option>
                    <option value="Documents">Documents</option>
                    <option value="Gadgets">Gadgets</option>
                </select>

                <button className="btn bg-gradient-to-r from-slate-500 to-slate-400 text-white"
                    onClick={handleReset}>Reset</button>

            </div>

            {/* posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 pb-10">
                {
                    loading ? (
                        <Lottie style={{ width: '100px', marginLeft: 'auto', marginRight: 'auto' }} animationData={loadingLottie} />

                    ) : (
                        posts.map(post => <PostCard key={post._id} post={post}></PostCard>)
                    )
                }
            </div>


        </div>
    );
};

export default AllItems;