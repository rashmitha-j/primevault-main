import React from "react";
import { Link } from "react-router-dom";

// Import your images
import womensCollectionImage from "../../assets/cord model 1.png";
import mensCollectionImage from "../../assets/mens category.png";
import mugscollection from "../../assets/mug hero image.png";


// Category data
const categories = [
  {
    title: "Women's Collection",
    image: womensCollectionImage,
    link: "/collection/all?gender=Women",
  },
  {
    title: "Men's Collection",
    image: mensCollectionImage,
    link: "/collection/all?gender=Men",
  },
   {
    title: "Men's Collection",
    image: mugscollection,
    link: "/collection/all?category=Bottom Wear",
  },
   
];

const ShopByCategory = () => {
  return (
    <div className="container mx-auto px-0">
      <div className="flex flex-col md:flex-row gap-8">
        {categories.map((category, index) => (
          <div key={index} className="flex-1 px-3">
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              <Link
                to={category.link}
                className="text-gray-900 underline font-semibold"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-[500px] object-cover"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
