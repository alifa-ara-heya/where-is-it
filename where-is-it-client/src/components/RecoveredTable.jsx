import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RecoveredTable = ({ post }) => {
    const { postPhoto, title, recoveredDate, description, postId } = post;
    return (

        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={postPhoto}
                                alt={title} />
                        </div>
                    </div>
                </div>
            </td>

            <td>
                <div className="font-bold">{title}</div>
            </td>

            <td>
                <div className="text-sm opacity-50">{new Date(recoveredDate).toLocaleDateString()}</div>
            </td>

            <td>
                {description}

            </td>

            <th className="">
                {/* Here I am using postId instead of _id, because the _id is for the recovered post. to get the post details route, I need to use the postId, which I saved before in the database by the Modal.jsx*/}
                <Link to={`/details/${postId}`}><button className="btn">Details</button></Link>
            </th>
        </tr>

    );
};

RecoveredTable.propTypes = {
    post: PropTypes.object,
};

export default RecoveredTable;