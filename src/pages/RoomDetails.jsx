import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import StarRating from "../components/StarRating";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const RoomDetails = () => {
  const { id } = useParams();
  const { facilityIcons, axios, navigate, getToken, user, paymentService } =
    useAppContext();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  // Restore payment data from localStorage on mount
  useEffect(() => {
    const storedPaymentData = localStorage.getItem("paymentData");
    if (storedPaymentData) {
      setPaymentData(JSON.parse(storedPaymentData));
    }
  }, []);

  const checkAvailability = async () => {
    try {
      if (checkInDate >= checkOutDate) {
        toast.error("Check-In Date must be earlier than Check-Out Date");
        return;
      }
      const { data } = await axios.post("/api/bookings/check-availability", {
        room: id,
        checkInDate,
        checkOutDate,
      });
      if (data.success) {
        setIsAvailable(data.isAvailable);
        toast[data.isAvailable ? "success" : "error"](
          data.isAvailable
            ? "Room is available for booking.Click book Now"
            : "Room is not available for booking"
        );
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createBooking = async (paymentMethod) => {
    try {
      const { data } = await axios.post(
        "/api/bookings",
        {
          room: id,
          checkInDate,
          checkOutDate,
          guests,
          paymentMethod: "Paystack",
        },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        const paystackPayload = {
          email: user.email,
          amount: data.booking.totalPrice * 100, // convert to kobo/pesewas
          currency: "GHS",
        };
        setPaymentData(paystackPayload);
        localStorage.setItem("paymentData", JSON.stringify(paystackPayload)); // ✅ store in localStorage
        console.log("Paystack Payment Data:", paystackPayload);
      } else {
        toast.success(data.message);
        navigate("/my-bookings");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to book a room");
      navigate("/login");
      return;
    }
    if (!isAvailable) return checkAvailability();

    const payNow = window.confirm(
      "Would you like to pay now with Paystack? Click Cancel to pay at hotel."
    );
    const paymentMethod = payNow ? "Paystack" : "Pay At Hotel";

    await createBooking(paymentMethod);
  };

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const { data } = await axios.get(`/api/rooms/${id}`);
        if (data.success) {
          setRoom(data.room);
          setMainImage(data.room.images[0]);
        } else toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchRoomDetails();
  }, [id]);

  return (
    room && (
      <div className="min-h-screen bg-white px-6 py-12 md:px-24 md:mt-20">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Room Images */}
          <div className="space-y-4">
            <img
              src={mainImage}
              alt="Main Room"
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <div className="grid grid-cols-4 gap-2">
              {room.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Room view ${i}`}
                  className="h-24 w-full object-cover rounded cursor-pointer"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Room Details */}
          <div>
            <div className="mb-4">
              <p className="text-gray-500">{room.hotel.city}</p>
              <h2 className="text-3xl font-bold text-gray-900">
                {room.hotel.name}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <StarRating />
                <p className="text-sm text-gray-600">200+ reviews</p>
              </div>
            </div>

            <div className="text-sm text-gray-700 mb-6">
              <p>
                <strong>Address:</strong> Spintex
              </p>
              <p>
                <strong>Price:</strong> {room.pricePerNight} GH₵/ night
              </p>
            </div>

            {/* Booking Form */}
            {!paymentData && (
              <form className="space-y-4" onSubmit={onSubmitHandler}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Guests
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={4}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition"
                >
                  Book Now
                </button>
              </form>
            )}

            {/* Paystack Button */}
            {paymentData && (
              <div className="mt-4">
                <PaystackButton
                  publicKey={import.meta.env.VITE_PAYSTACK_PUBLIC}
                  email={paymentData.email}
                  amount={paymentData.amount}
                  currency={paymentData.currency}
                  reference={paymentData.reference}
                  onSuccess={async (response) => {
                    const verification = await paymentService.verifyPayment(
                      response.reference
                    );
                    if (verification.success) {
                      toast.success("Payment successful!");
                      localStorage.removeItem("paymentData"); // ✅ clear after success
                      navigate("/my-bookings");
                    } else {
                      toast.error("Payment verification failed");
                    }
                  }}
                  onClose={() => {
                    toast.error("Payment cancelled");
                    localStorage.removeItem("paymentData"); // ✅ clear if cancelled
                  }}
                  text="Proceed to Pay with Paystack"
                  className="w-full bg-green-600 text-white py-3 rounded"
                />
              </div>
            )}

            {/* Amenities */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-3">
                {room.amenities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm bg-gray-100 rounded px-3 py-2"
                  >
                    <img
                      src={facilityIcons[item]}
                      alt={item}
                      className="w-5 h-5"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {room.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
