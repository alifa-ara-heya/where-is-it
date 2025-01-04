import PropTypes from 'prop-types';

const Heading = ({ title, subtitle }) => {
    return (
        <div className="text-center my-10 md:my-16" >
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-4'>
                {title}
            </h1>
            <p className='font-medium w-full md:w-1/2 mx-auto opacity-65'>
                {subtitle}
            </p>
        </div>
    );
};


Heading.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
};


export default Heading;