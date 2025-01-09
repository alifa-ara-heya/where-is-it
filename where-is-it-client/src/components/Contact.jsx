import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";


const Contact = () => {
    return (
        <section className=" py-16 px-6" id="contact">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-4xl font-bold text-center mb-8 ">Contact Information</h2>

                {/* Contact Details */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
                    {/* Email */}
                    <div className="flex items-center gap-4">
                        <FaEnvelope size={20} />
                        <p className="text-lg">
                            <a href="mailto:alifaaraheya@gmail.com" className="hover:underline">
                                whereisit123@gmail.com
                            </a>
                        </p>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-4">
                        <FaPhone size={20} />
                        <p className="text-lg">
                            <a href="tel:+15183087574" className="hover:underline">
                                017 5495 9868
                            </a>
                        </p>
                    </div>


                    {/* Location */}
                    <div className="flex items-center gap-4">
                        <FaMapMarkerAlt className="text-red-500 text-2xl" />
                        <p className="text-lg">
                            Bangladesh
                        </p>
                    </div>

                    {/* WhatsApp */}
                    {/*  <div className="flex items-center gap-4">
                        <FaWhatsapp />
                        <p className="text-lg">
                            <a
                                href="https://wa.me/15183087574"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                WhatsApp
                            </a>
                        </p>
                    </div> */}
                </div>

                {/* Email Form */}
                <div className=" rounded-lg shadow-lg p-8 md:p-12 max-w-lg mx-auto">
                    <h3 className="text-2xl font-bold mb-4">Send US A Message</h3>
                    <form >
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full p-3 rounded   border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-3 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="w-full p-3 rounded  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full btn bg-cyan-900 text-white py-3 rounded-md transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;