import { format } from "date-fns";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RecoveredPostCard = ({ post }) => {
    const { postPhoto, title, recoveredDate, description, recoveredLocation, postId } = post;
    return (
        <Link to={`/details/${postId}`}>
            <div className="card bg-base-100 shadow-xl hover:scale-95 transition ease-in-out duration-500">
                <figure>
                    <img
                        src={postPhoto}
                        alt={title}
                        className='h-[200px] object-cover w-full' />
                </figure>
                <div className="card-body">
                    <div className='flex justify-between'>
                        <h2 className="card-title">{title}</h2>
                        {/*  {
                            post.type === 'Recovered' &&
                            <h4 className='badge badge-md bg-red-500/20 text-red-500'>Recovered</h4>
                        } */}
                    </div>
                    <p className='font-medium text-gray-500'>Recovered Date: {format(new Date(recoveredDate), 'P')}</p>
                    <p><span className='text-gray-600 font-medium'>Location:</span> {recoveredLocation} </p>
                    <p className='font-medium text-gray-600'>Description: <span className='text-gray-500'>{description}</span></p>
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>
        </Link>

    );
};

RecoveredPostCard.propTypes = {
    post: PropTypes.object,
};

export default RecoveredPostCard;