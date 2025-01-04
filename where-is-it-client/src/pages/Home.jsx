import Banner from "../components/Banner";
import LatestItems from "../components/LatestItems";
import Typewriting from "../components/Typewriting";
import Review from "../components/Review";
import WhyUs from "../components/WhyUs";
import Aims from "../components/Aims";
import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <div className="w-11/12 mx-auto max-w-[1440px]">
            <Helmet>
                <title>Home</title>
                <meta name="home" content="Your trusted platform for reuniting lost items with their owners."></meta>
            </Helmet>
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-red-500 to-indigo-500 text-white bg-clip-text text-transparent">
            </h2>
            <Typewriting />

            <p className='font-medium w-full md:w-1/2 mx-auto opacity-65 text-center mt-6 mb-10'>Your trusted platform for reuniting lost items with their owners. Whether you’ve lost something precious or found an item that needs a home, we’re here to help bridge the gap and bring peace of mind.</p>

            <Banner />

            <Review />

            <WhyUs />

            <LatestItems />

            <Aims />
        </div>
    );
};

export default Home;