import bgImage from "/bg.png";

export const Aboutus = () => {
  // const videoElement = useMemo(
  //   () => (
  //     <video
  //       src={video}
  //       controls
  //       preload="none"
  //       poster={img}
  //       playsInline
  //       className="w-full h-full object-cover"
  //     />
  //   ),
  //   []
  // );
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
      {/* Text Content */}
      <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 mt-10 lg:mt-0 ">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-[#1F2937] text-white px-2 [box-decoration-break:clone] [-webkit-box-decoration-break:clone] leading-tight">
              Professional & Trust
            </span>
            <span className="my-10"> Building</span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed pr-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            sit ad est, obcaecati voluptatem porro iure laudantium sed deleniti
            debitis culpa? Qui molestias modi esse sequi labore, optio error
            quaerat, ut laudantium dolor architecto sint vel obcaecati ipsum
            quae itaque eum deleniti ad iusto facere in culpa exercitationem
            odio. Impedit!
          </p>
        </div>
      </div>

      <div className="lg:col-span-5 order-1 lg:order-2 flex items-center justify-center">
        <div className="w-full h-64 sm:h-80 md:h-[30rem] object-cover  rounded-xl overflow-hidden flex items-center justify-center">
          {/* {videoElement} */}
          <img src={bgImage} alt="" />
        </div>
      </div>
    </div>
  );
};
