export default function Page() {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="w-full md:w-9/12">
          <div className="flex w-full flex-col justify-between">
            <div className="p-4">
              <h2 className="text-xl md:text-2xl tracking-tighter font-bold text-left mb-2">
                Why this page?
              </h2>
              <p className=" text-justify">
                On December 5 2025, LTA informed the public that the transport
                operators SMRT and SBS Transit will &quot;will prioritise
                on-site communications for minor MRT delays&quot; instead of
                broadcasting on social media. We feel it is still important to
                have a knowledge of which stations are affected by such delays
                to better plan our routes to our destinations. Hence we made
                this to act as a crowdsourced information of which stations are
                facing delays in services and display it easily for users to
                see!
              </p>
            </div>

            <div className=" p-4 ">
              <h2 className="text-xl md:text-2xl tracking-tighter font-bold text-left mt-2 mb-2">
                Who are we?
              </h2>
              <div className="flex w-full">
                <div className="flex-1 p-4 w-full">
                  <div className="flex flex-col items-center justify-center w-3/4">
                    <img
                      className="w-40 h-40 mb-2 rounded-full object-cover aspect-square"
                      src="/psyduck.png"
                      alt="User Profile"
                    />
                    <div className="font-bold">Psyduck</div>
                    <div className="text-center mb-2 text-sm">
                      <p>Me: Graduates early</p>
                      <p className="">
                        Also me: Spends my weekend staring at algorithms and
                        no-plugins vim
                      </p>
                    </div>
                    <a href="https://github.com/SherisseTJW">
                      <img className="w-8 h-8" src="/github-mark.png" />
                    </a>
                  </div>
                </div>
                <div className="flex-1 p-4 w-full">
                  <div className="flex flex-col items-center justify-center w-3/4">
                    <img
                      className="w-40 h-40 mb-2 rounded-full object-cover aspect-square"
                      src="/rock.jpg"
                      alt="User Profile"
                    />
                    <div className="font-bold">Chuanhao01</div>
                    <div className="text-center mb-2 text-sm">
                      <p>&quot;Extremely unemployed and cooked&quot;</p>
                      <p>&quot;Needs a Job&quot;</p>
                    </div>
                    <a href="https://github.com/chuanhao01">
                      <img className="w-8 h-8" src="/github-mark.png" />
                    </a>
                  </div>
                </div>
                <div className="flex-1 p-4 w-full">
                  <div className="flex flex-col items-center justify-center w-3/4">
                    <img
                      className="w-40 h-40 mb-2 rounded-full object-cover aspect-square"
                      src="/pika.jpg"
                      alt="User Profile"
                    />
                    <div className="font-bold">Wild pokemon</div>
                    <div className="text-center mb-2 text-sm">
                      "pika pika?"
                    </div>
                    <a href="https://github.com/Blahblahlolhahaha">
                      <img className="w-8 h-8" src="/github-mark.png" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
