import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeatureSection from '../components/Products/FeatureSection'
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
import { fetchProductsByFilters } from '../redux/slices/productsSlice'
import Brand from '../components/Layout/Brand'
import Name1 from '../components/Layout/Name1'
import ShopByCategory from '../components/Layout/ShopByCategory'




const Home = () => {

  const dispatch = useDispatch();
  const { products, loading, error} = useSelector((state) => state.products);
  const [bestSellerProduct,  setBestSellerProduct ] = useState(null);


  useEffect(() =>{
    // fetch products for a specific collections
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );
    //fetch the best seller product
    const fetchBestSeller = async() =>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  } ,[dispatch]);

  return (
    <div>
      <Hero />
      <Brand />
      <Name1 />
      <ShopByCategory />
      <FeatureSection />
    
     
     
      <NewArrivals />


      {/* best seller */}
      <h2 className='text-3xl text-center font-bold mb-4'>Customer Favorites – Don’t Miss Out on These Top Picks!</h2>
      { bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id} />) : (
        <p className='text-center'>Loading best seller product...</p>
      )}
     

      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>
          Top Wears for Women

        </h2>
        <ProductGrid  products={products} loading={loading} error={error}/>


      </div>
      <FeaturedCollection />
     
    </div>
  )
}

export default Home
