export default function Page() {
    return (
        <div className="flex items-start flex-col w-[75%]">
            <h2 className="text-xl md:text-2xl tracking-tighter font-bold text-left mb-2">
                Why this page?
            </h2>
            <p className="  ">
                On December 5 2025, LTA informed the public that the transport operators SMRT and SBS Transit will "will prioritise on-site communications for minor MRT delays"
                instead of broadcasting on social media. We feel it is still important to have a knowledge of which stations are affected by such delays to better plan our
                routes to our destinations.
            </p>
            <p className="  ">
                Hence we made this to act as a crowdsourced information of which stations are facing delays in services and display it easily for users to see!
            </p>
            <h2 className="text-xl md:text-2xl tracking-tighter font-bold text-left mt-2 mb-2">
                Who are we?
            </h2>
            <div className="flex mx-auto items-center mb-5">
                <div className="flex flex-col items-center mr-5 mb-5 max-w-[30%]">
                    <img className="w-40 h-40 mb-2 rounded-full object-cover aspect-square" src="/psyduck.png" alt="User Profile" />
                    <div className="font-bold">
                        Psyduck
                    </div>
                    <div className="text-center mb-2 text-sm">
                        Me: Graduates early
                        <br />
                        Also me: Spends my weekend staring at algorithms and no-plugins vim
                    </div>
                    <a href="https://github.com/SherisseTJW">
                        <img className="w-8 h-8" src="/github-mark.png" />
                    </a>
                </div>

                <div className="flex flex-col items-center mr-5 mb-5 max-w-[30%]">
                    <img className="w-40 h-40 mb-2 rounded-full object-cover aspect-square" src="/rock.jpg" alt="User Profile" />
                    <div className="font-bold">
                        Chuanhao01
                    </div>
                    <div className="text-center mb-2 text-sm">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                    </div>
                    <a href="https://github.com/chuanhao01">
                        <img className="w-8 h-8" src="/github-mark.png" />
                    </a>
                </div>

                <div className="flex flex-col items-center mr-5 mb-5 max-w-[30%] align-top">
                    <img className="w-40 h-40 mb-2 rounded-full object-cover aspect-square" src="/pika.jpg" alt="User Profile" />
                    <div className="font-bold">
                        Wild pokemon
                    </div>
                    <div className="text-center mb-2 text-sm">
                        "pika pika?"
                        <br/>
                        <br/>
                        <br/>
                    </div>
                    <a href="https://github.com/Blahblahlolhahaha">
                        <img className="w-8 h-8" src="/github-mark.png" />
                    </a>
                </div>


            </div>

        </div>
    )
}