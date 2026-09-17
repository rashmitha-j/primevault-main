import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate is used in React Router v6
import Title from '../Title';
import Resellers from "../../assets/resellers.png"; // Make sure the path is correct

const Reseller = () => {
  const navigate = useNavigate(); // Hook to manage navigation

  // Function to navigate to reseller form page
  const handleClick = () => {
    navigate('/reseller-register'); // Redirects to the reseller form page
  };

  // Category data
  const category = [
    {
      title: "Women's Collection",
      image: Resellers,
    },
  ];

  return (
<div>
    <div className='text-center text-2xl py-9'>
    

            <Title  text1={'PRIME VAULT AFFILIATE PROGRAM'}/>
           <Title  text2={'FOR RESELLERS'}/>

        </div>


    <div className="container mx-auto px-2" style={styles.container}>
      <div style={styles.imageContainer} onClick={handleClick}>
        <img
          src={category[0].image} // Corrected to access the image from the category array
          alt={category[0].title}
          className="w-full object-cover"
          style={styles.image}
        />
        <div style={styles.overlay}>
          <p style={styles.text}>Click to Register as Reseller</p>
        </div>
      </div>
    </div>
  </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    width: '100%', // Full width
    maxWidth: '100%', // Ensures the container takes up full width of its parent
    margin: '0 auto',
    borderRadius: '20px', // Circular edges for the container
    overflow: 'hidden',  // Ensures content inside the container stays within rounded corners
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Optional: Adding some shadow for better appearance
    height: '500px', // Smaller height for the container
  },
  imageContainer: {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    width: '100%',
    height: '100%', // Image container takes full height of the parent container
  },
  image: {
    width: '100%',
    height: '100%', // Image height is set to fill the container height
    objectFit: 'cover', // Ensures the image covers the container without distorting
    borderRadius: '20px', // Circular edges for the image
  },
  overlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '0',
    transition: 'opacity 0.3s ease',
    borderRadius: '20px', // Overlay also respects the rounded corners
  },
  text: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default Reseller;
