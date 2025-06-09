import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6 mt-20">
      <div className="max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          About XtendedStayGh
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">XtendedStayGh</span>,
          your go-to hotel booking platform. We make finding the perfect hotel
          easy, fast, and secure—whether you’re planning a short stay or a long
          vacation.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          What We Offer
        </h2>
        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
          <li>Wide selection of hotels with real-time availability</li>
          <li>Fast and secure booking process</li>
          <li>Simple, user-friendly design</li>
          <li>Clear pricing and exclusive deals</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Our Mission
        </h2>
        <p className="text-gray-600 mb-6">
          To simplify your travel planning by offering a reliable, transparent,
          and intuitive hotel booking experience.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Us</h2>
        <p className="text-gray-600">
          Have questions or feedback? Reach out to us at{" "}
          <a
            href="mailto:support@stayease.com"
            className="text-blue-600 underline"
          >
            support@xtendedstaygh.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
