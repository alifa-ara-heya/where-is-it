import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import error from '../assets/error.png'
import { Helmet } from "react-helmet-async";

const Error = () => {
    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <Helmet>
                <title>Error</title>
                <meta name="error-page"></meta>
            </Helmet>
            <div className="text-center p-6 rounded-lg shadow-md">
                {/* <h1 className="text-7xl font-bold text-rose-500 mb-4">404</h1> */}
                <img src={error} alt="" className="w-full" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6 font-medium">Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                <Link to="/" className="btn text-white bg-blue-500 hover:bg-blue-600 rounded-md   items-center gap-3">
                    Go Back Home <BsArrowRight />
                </Link>
            </div>
        </div >
    );
};

export default Error;