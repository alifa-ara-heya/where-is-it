import { Carousel } from "flowbite-react";

const Banner = () => {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
                {/* Slide 1 */}
                <div className="relative">
                    <img
                        src="https://fastly.picsum.photos/id/151/1920/1080.jpg?hmac=CZiGkkZt5j1ZobW0BJfRfZdVQl250S_ia7gsV0X5mEg"
                        alt="..."
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <h2 className="text-gray-100 text-2xl md:text-4xl font-medium font-marckScript text-center w-1/2 mx-auto">
                            Every lost item deserves to find its way back home.
                        </h2>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="relative">
                    <img
                        src="https://fastly.picsum.photos/id/880/1920/1080.jpg?hmac=HXpwJRjnEPnZVbp9_fzjVHL1BZzEa2xEZZMA7JcEeSU"
                        alt="..."
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <h2 className="text-gray-100 text-2xl md:text-4xl font-medium font-marckScript text-center w-1/2 mx-auto">
                            Connecting people, one lost item at a time.
                        </h2>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="relative">
                    <img
                        src="https://fastly.picsum.photos/id/610/1920/1080.jpg?hmac=c_hiVfMcb4Pa5rjCAnfaFEIsbN0gGP1jAt-yzgr0_0o"
                        alt="..."
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <h2 className="text-gray-100 text-2xl md:text-4xl font-medium font-marckScript text-center w-1/2 mx-auto">
                            Lost something? Don’t worry, we’re here to help.
                        </h2>
                    </div>
                </div>

                {/* Slide 4 */}
                <div className="relative">
                    <img
                        src="https://fastly.picsum.photos/id/547/1920/1080.jpg?hmac=7fw86z3xceCJXe6ckHVCJT1RX4nhRioO-d-6CQuZgtI"
                        alt="..."
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <h2 className="text-gray-100 text-2xl md:text-4xl font-medium font-marckScript text-center w-1/2 mx-auto">
                            Found something? Let’s bring it back to its owner.
                        </h2>
                    </div>
                </div>

                {/* Slide 5 */}
                <div className="relative">
                    <img
                        src="https://fastly.picsum.photos/id/309/1920/1080.jpg?hmac=ENZ4mRdkFk2Uv0oBb6P8ajq4IR4MxtaJouGPTHs_rWQ"
                        alt="..."
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <h2 className="text-gray-100 text-2xl md:text-4xl font-medium font-marckScript text-center w-1/2 mx-auto">
                            A lost item is not just an object, it’s a story waiting to be retold.
                        </h2>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
