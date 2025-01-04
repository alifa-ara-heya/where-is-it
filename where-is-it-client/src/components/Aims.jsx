import banner from '../assets/banner.jpg'
import Heading from './Heading';
import { motion } from "framer-motion";

const Aims = () => {
    return (
        <div className='pb-6'>
            <Heading title={'Our Objectives'} subtitle={"Lost things are not gone forever—they just need a little help finding their way. Used by thousands to reconnect with their lost belongings quickly and securely. Join us in making the world a little kinder, one item at a time."} />

            <div className='flex flex-col lg:flex-row items-center justify-between gap-6'>
                <div className="relative w-1/2 h-64 overflow-hidden rounded-lg">
                    <motion.img
                        src={banner}
                        alt="helping people"
                        animate={{ x: ["0%", "100%", "0%"] }} // Moves from start to end within its container
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }} // Smooth infinite movement
                        className="absolute top-0 left-0 h-full w-auto object-cover rounded-lg"
                    />
                </div>
                <ul className="space-y-4 text-base md:text-lg text-gray-700 w-full lg:w-1/2 *:font-medium px-3">
                    <li>✅ Trusted by thousands for reuniting lost items with their owners.</li>
                    <li>✅ Easy-to-use platform with quick reporting and searching.</li>
                    <li>✅ Advanced filters and real-time updates for efficient searches.</li>
                    <li>✅ Dedicated to privacy, safety, and secure interactions.</li>
                    <li>✅ Join a growing community solving real problems every day.</li>
                </ul>
            </div>
        </div>
    );
};

export default Aims;