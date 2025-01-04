import Heading from "./Heading";
import lost1 from "../assets/lost-1.jpg";
import lost2 from "../assets/lost-2.jpg";
import lost3 from "../assets/lost-3.jpg";

const WhyUs = () => {
    const whyUsData = [
        {
            id: 1,
            image: lost1,
            title: "Trusted Platform",
            description:
                "Lost things are not gone forever—they just need a little help finding their way. Used by thousands to reconnect with their lost belongings quickly and securely. ",
        },
        {
            id: 2,
            image: lost2,
            title: "Easy to Use",
            description:
                "Every act of kindness brings us closer to each other. Our user-friendly interface makes it simple to post or search for lost items. ",
        },
        {
            id: 3,
            image: lost3,
            title: "Community Impact",
            description:
                "In every loss, there’s an opportunity to connect. Join a network of kind-hearted individuals solving real problems together. ",
        },
    ];

    return (
        <div className="py-10 w-11/12 mx-auto max-w-[1440px]">
            <Heading
                title={"Why Choose Us"}
                subtitle={
                    "Our platform is simple and intuitive, making it easy for anyone to report or find a lost item. By joining our community, you’re helping bring people and their belongings back together."
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {whyUsData.map((item) => (
                    <div
                        key={item.id}
                        className="relative bg-cover bg-center rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
                        style={{
                            backgroundImage: `url(${item.image})`,
                        }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40"></div>

                        {/* Content */}
                        <div className="relative p-6 z-10 text-white flex flex-col justify-center items-center h-full text-center">
                            <h3 className="text-2xl font-medium mb-2">{item.title}</h3>
                            <div className="divider before:bg-slate-300 after:bg-slate-300">♡</div>
                            <p className="text-center text-sm">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyUs;
