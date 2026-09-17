import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResellerRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checkIfEmailRegistered = async (emailToCheck) => {
    try {
      const res = await axios.get(`http://localhost:9000/api/reseller/check/${emailToCheck}`);
      return res.data.isRegistered;
    } catch (error) {
      console.error("Error checking registration status:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const alreadyRegistered = await checkIfEmailRegistered(email);
    if (alreadyRegistered) {
      setIsRegistered(true);
      setMessage("You are already registered as a reseller!");
      return;
    }

    try {
      const res = await axios.post('http://localhost:9000/api/reseller/register', {
        name,
        email,
        phone,
        shopName,
        address,
        password,
      });

      if (res.data.message === 'You have successfully registered as a reseller!') {
        localStorage.setItem('userEmail', email);
        setIsRegistered(true);
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  if (isRegistered) {
    return (
      <div className="message-container">
        <p className="text-green-600 font-semibold text-center mt-6">{message}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className='text-2xl font-bold text-center mb-6'>What is a reseller?</h2>
       <p className='text-gray-500 mb-4 pl-2'>
       A reseller purchases products from manufacturers, liquidators, individual consumers, and other retailers and then sells them. A reseller business permit—also known as a resale license, resale certificate, or tax exemption certificate—allows resellers to purchase certain items free of sales tax, including:
      

       </p>
       <p className='text-gray-500 mb-4 pl-2'>
       Many resellers also provide a value-add for the customer experience. For instance, buying directly from a supplier isn't necessarily easy, and often requires minimum purchase quantities. By contrast, resellers can sell items individually to customers (at a markup), as well as create a branded customer experience. Those elements may be as simple as in-depth product descriptions and reviews, a customer loyalty program, and customer support.
       
       </p>
       <p className='text-gray-500 mb-4 pl-2'>
       Reselling is also a viable business pursuit for people who like and have success with marketing. If you can plan and execute effective marketing strategies, your reselling business is more likely to achieve success.
      

       </p>
       <p className='text-gray-500 mb-4 pl-2'>
       </p>




      <h2 className='text-2xl font-bold text-center mb-6'>What is print on demand?</h2>
      <p className='text-gray-500 mb-4 pl-2'>
      Print on demand (POD) is a form of dropshipping that lets you sell customized products. Under this model, you’re responsible for creating the design, choosing which products to print it on, and listing those products for sale. A third-party supplier will then print your products and ship them directly to your customers as orders come in.
      </p>
      <p className='text-gray-500 mb-4 pl-2'>
      While POD has historically been known as an easy way to start a t-shirt business, today there are hundreds of print-on-demand products to choose from, including ballcaps, phone cases, homeware, shoes, and more. Artists, influencers, and brands alike are using POD to sell a variety of merchandise. 

    </p>

      <p className='text-gray-500 mb-4 pl-2'>
      POD is especially attractive for new entrepreneurs because of its low cost of entry; most POD services are 100% free to join, and you only need to pay your suppliers once a customer places an order. You don’t need to pay for storage space, nor purchase products in bulk ahead of time. 
      </p>
      <div className="registration-container">
        <h2 className='text-2xl font-bold text-center mb-6'>Register Now For Free</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="registration-form">
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2 pl-2'>Name</label>
            <input className='w-full p-2 border rounded' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2 pl-2'>Email</label>
            <input className='w-full p-2 border rounded' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2 pl-2'>Phone Number / Business Number</label>
            <input className='w-full p-2 border rounded' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2 pl-2'>Shop Name / Business Name</label>
            <input className='w-full p-2 border rounded' type="text" value={shopName} onChange={(e) => setShopName(e.target.value)} required />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2 pl-2'>Business Address</label>
            <input className='w-full p-2 border rounded' type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2 pl-2'>Password</label>
            <input className='w-full p-2 border rounded' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition' type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResellerRegister;
