import { Avatar, Blockquote, Rating } from "flowbite-react";
import Heading from "./Heading";

const Review = () => {

    const reviews = [
        {
            id: 1,
            rating: 5,
            text: "This platform is incredible! It helped me reconnect with my lost items effortlessly. Highly recommended!",
            name: "John Doe",
            role: "Engineer at TechCorp",
            avatar: "https://i.pravatar.cc/150?img=1",
        },
        {
            id: 2,
            rating: 4,
            text: "Amazing experience! The intuitive interface made it so easy to report a lost item. Thank you!",
            name: "Jane Smith",
            role: "Product Manager at InnovateX",
            avatar: "https://i.pravatar.cc/150?img=2",
        },
        {
            id: 3,
            rating: 5,
            text: "Fantastic service! I found a lost item, and this platform made returning it a breeze. Truly impactful!",
            name: "Emily Johnson",
            role: "CEO at StartupWorld",
            avatar: "https://i.pravatar.cc/150?img=3",
        },
    ];

    return (
        <div>
            <Heading title={'Hear From Our Community'} subtitle={'Discover how WhereIsIt has helped users reconnect with their lost items and brought smiles to their faces.'} />

            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10">
                {reviews.map((review) => (
                    <figure key={review.id} className="shadow-lg p-3">
                        <div className="mb-4 flex items-center">
                            <Rating size="sm">
                                {[...Array(review.rating)].map((_, index) => (
                                    <Rating.Star key={index} />
                                ))}
                            </Rating>
                        </div>
                        <Blockquote>
                            <p className="text-base md:text-lg font-medium text-gray-900 dark:text-white min-h-[80px]">
                                {`"${review.text}"`}
                            </p>
                        </Blockquote>
                        <figcaption className="mt-6 flex items-center space-x-3">
                            <Avatar
                                rounded
                                size="md"
                                img={review.avatar}
                                alt={`${review.name} profile picture`}
                            />
                            <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
                                <cite className="pr-3 font-medium text-gray-900 dark:text-white">
                                    {review.name}
                                </cite>
                                <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
                                    {review.role}
                                </cite>
                            </div>
                        </figcaption>
                    </figure>

                ))}
            </div>
        </div>
    );
};

export default Review;