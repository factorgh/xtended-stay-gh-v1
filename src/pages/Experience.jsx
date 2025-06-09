import React from "react";

const Experience = () => {
  return (
    <section className="min-h-screen bg-white px-6 py-12 md:px-20 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            The XtendedStayGh Experience
          </h1>
          <p className="text-gray-600 text-lg">
            Discover what makes us your trusted travel companion. More than just
            a booking app—it's a gateway to comfort, reliability, and ease.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1055/1055646.png"
              alt="Smart Search"
              className="w-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Smart Hotel Search
            </h3>
            <p className="text-gray-600">
              Filter by price, rating, location, and amenities—instantly find
              what you’re looking for.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
              alt="Secure Booking"
              className="w-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Secure Booking
            </h3>
            <p className="text-gray-600">
              End-to-end encrypted payments and data protection for a worry-free
              experience.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
              alt="24/7 Support"
              className="w-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              24/7 Customer Support
            </h3>
            <p className="text-gray-600">
              Friendly help whenever you need it — day or night, from anywhere
              in the world.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thousands of travelers use StayEase to simplify their hotel bookings
            every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <p className="text-gray-700 italic mb-4">
              "I booked my entire vacation in 10 minutes. StayEase is the real
              deal!"
            </p>
            <h4 className="font-semibold text-blue-700">— Sarah J., NYC</h4>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow">
            <p className="text-gray-700 italic mb-4">
              "Smooth interface, great prices, and excellent support when I
              needed to change my reservation."
            </p>
            <h4 className="font-semibold text-blue-700">
              — Daniel R., Toronto
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
