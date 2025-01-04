
import PropTypes from 'prop-types';
import { format } from 'date-fns'
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    const { title, photo, description, date, type, location, _id } = post;
    return (

        <div className="card bg-base-100 shadow-xl hover:scale-95 transition ease-in-out duration-500">
            <figure>
                <img
                    src={photo}
                    alt={title}
                    className='h-[200px] object-cover w-full' />
            </figure>
            <div className="card-body">
                <div className='flex justify-between'>
                    <h2 className="card-title">{title}</h2>
                    {
                        post.type === 'Recovered' &&
                        <h4 className='badge badge-md bg-green-500/20 text-green-500'>Recovered</h4>
                    }
                </div>

                <p className='font-medium text-gray-500'>{type === 'Lost' ? "Lost" : "Found"} Date: {format(new Date(date), 'P')}</p>

                <p><span className='text-gray-600 font-medium'>Location:</span> {location} </p>

                <p className='font-medium text-gray-600'>Description: <span className='text-gray-500'>{description}</span></p>
                <div className="card-actions justify-end">
                    <Link to={`/details/${_id}`}>
                        <button className="btn bg-gradient-to-r from-slate-700 to-slate-400 text-white hover:scale-90 transition ease-in-out duration-500">View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>

    );
};

PostCard.propTypes = {
    post: PropTypes.object,
};

export default PostCard;