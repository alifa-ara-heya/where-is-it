import { Typewriter } from "react-simple-typewriter";

const Typewriting = () => {
    return (
        <h3 className="text-2xl font-bold text-center text-teal-600">
            <Typewriter
                words={['Welcome to WhereIsIt']}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={70}
                delaySpeed={1000}
            />
        </h3>
    );
};

export default Typewriting;