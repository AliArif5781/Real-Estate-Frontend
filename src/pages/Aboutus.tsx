import bgImage from "/bg.png";
import video from "/video.mp4";

export const Aboutus = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      {/* Text Content */}
      <div className="lg:col-span-7 flex justify-center items-center mt-16 ">
        <div className="">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-[#1F2937] text-white px-2 [box-decoration-break:clone] [-webkit-box-decoration-break:clone] leading-tight">
              Professional & Trust
            </span>
            <span className="block pt-2"> Building</span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed pr-[4rem] ">
            Housing society management is a digital platform that simplifies
            community living. We automate maintenance, security, and
            communication for seamless operations. Our system enhances
            transparency, efficiency, and resident engagement . Designed for
            scalability and security, we empower societies to transition into
            smart, well-managed communities. Better management. Happier homes.
          </p>
        </div>
      </div>

      <div className="lg:col-span-5 order-1 lg:order-2 hidden lg:flex items-center justify-center">
        <div className="w-full h-64 sm:h-80 md:h-[30rem] object-cover  rounded-xl overflow-hidden flex items-center justify-center">
          {/* {videoElement} */}
          <video
            controls
            preload="metadata"
            // playsInline
            muted
            poster={bgImage}
            className="rounded-lg"
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};
