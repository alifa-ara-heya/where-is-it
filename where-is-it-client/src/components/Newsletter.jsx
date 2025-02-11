
const Newsletter = () => {
    return (
        <div className="w-11/12 mx-auto mb-16 max-w-[1440px] bg-gradient-to-r from-cyan-100 via-white to-sky-100-100 shadow-lg rounded-lg p-10 md:my-16 my-10">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-cyan-600">
                    Join Our Newsletter
                </h2>
                <p className="text-lg text-gray-600 mt-4 lg:w-3/4 mx-auto">
                    Stay updated with the latest lost and found items, success stories, and exclusive opportunities. Sign up to make an impact and be part of the change!
                </p>
            </div>
            <form className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
                <input
                    type="email"
                    placeholder="Enter your email address"
                    className="input input-bordered w-full md:w-2/3 lg:w-1/2 px-4 py-3   rounded-md focus:ring-1 focus:ring-cyan-300"
                />
                <button
                    type="submit"
                    className="btn bg-gradient-to-r from-cyan-800 to-cyan-600 text-white px-6 py-3 rounded-md shadow-md hover:shadow-lg hover:bg-amber-700 transition duration-300"
                >
                    Subscribe
                </button>
            </form>
            <div className="text-center mt-6 text-sm text-gray-500">
                We value your privacy and will never share your email with anyone.
            </div>
        </div>
    );
};

export default Newsletter;