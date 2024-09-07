import React from "react";

const DescriptionBox = () => {
  return (
    <div className="my-[120px] mx-[170px]">
      <div className="flex">
  <div className="flex items-center justify-center font-semibold text-xl w-[171px] h-[70px] ring-1 ring-gray-700">
    Description
  </div>
  <div className="flex items-center justify-center font-semibold text-xl w-[171px] h-[70px] ring-1 ring-gray-700 bg-gray-100 opacity-70">
    Reviews (133)
  </div>
</div>

      <div className="flex flex-col gap-6 ring-1 ring-gray-700 p-12 pb-20">
        <p>
          Voice is your go-to online destination for premium SmartWatches,
          Headphones, and TWS products. Our platform offers cutting-edge
          features like Voice Quick Connect Technology and advanced noise
          cancellation (ANC and ENC), ensuring a seamless and immersive
          experience. Explore our curated collection, each product thoughtfully
          designed with detailed descriptions and images, all within a
          user-friendly, sleek, and modern interface. Shop now and experience
          innovation at your fingertips.
        </p>
        <p>
          Voice delivers an immersive online shopping experience, offering
          meticulously detailed product descriptions, stunning visuals, and
          transparent pricing. Each product on our platform is presented with
          its own dedicated page, showcasing all available options and features,
          from color choices to cutting-edge technology. This thoughtful layout
          empowers customers to make well-informed decisions, ensuring a smooth
          and satisfying shopping journey.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
