import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>

      <div className="space-y-6 text-gray-700 text-lg">
        <div className="flex items-center gap-4">
          <Phone className="text-blue-600" />
          <span>+91 9066747351</span>
        </div>

        <div className="flex items-center gap-4">
          <Mail className="text-blue-600" />
          <span>primevault2021@gmail.com</span>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="text-blue-600 mt-1" />
          <span>
            #03,<br /> <br />
            Kamalanagar, Bangalore - 560079
          </span>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-600 text-sm">
        We'd love to hear from you! Reach out to us through any of the above methods.
      </div>
    </div>
  );
};

export default ContactUs;
