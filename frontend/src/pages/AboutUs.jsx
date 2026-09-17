import React from "react";
import { HeartHandshake, Target, Users } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-white shadow-lg rounded-2xl">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">About Us</h1>

      <p className="text-gray-700 text-lg text-center mb-10">
        Welcome to <strong>Prime Vault</strong> – your go-to destination for unique and affordable products. 
        We're passionate about delivering quality, style, and value directly to your doorstep.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <Target className="mx-auto text-blue-600 mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To empower customers by providing easy access to trending, customizable, and quality products online.
          </p>
        </div>

        <div className="text-center">
          <HeartHandshake className="mx-auto text-blue-600 mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
          <p className="text-gray-600">
            Integrity, customer satisfaction, and innovation drive everything we do at Prime Vault.
          </p>
        </div>

        <div className="text-center">
          <Users className="mx-auto text-blue-600 mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Our Team</h3>
          <p className="text-gray-600">
            We're a small but passionate team focused on bringing creative ideas and seamless shopping experiences to life.
          </p>
        </div>
      </div>

      <div className="text-center text-gray-700">
        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <p className="mb-4">
          At Prime Vault, we go beyond just selling products — we build trust, offer customization options, and ensure 
          a satisfying shopping journey from start to finish. Whether you're looking for the perfect gift or a custom 
          t-shirt design, we've got you covered.
        </p>
        <p>
          Thank you for being part of our journey. We’re excited to grow with you!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
