import urls from "../../api/urls";
import { useContext, useState } from "react";
import useAPI from "./useAPI";
import { toast } from "react-toastify";
import DataContext from "../../contexts/DataContext";

function useBookings(props) {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { get, isLoading, post, patch } = useAPI();
  const AppContextData = useContext(DataContext);

  const getBookings = async (start, end, filter = false) => {
    const { data, error } = await get(
      urls.bookings.baseUrl +
        (start
          ? `${filter ? `status=${filter}&` : ""}from=${start}&to=${end}`
          : "")
    );
    if (error) return;
    setBookings(data.data.bookings);
  };

  const getBookingsSearch = async (q) => {
    const { data, error } = await get(urls.bookings.baseUrl + `q=${q}`);
    if (error) return;
    setBookings(data.data.bookings);
  };

  const getReviews = async () => {
    const { data, error } = await get(urls.bookings.reviews);
    if (error) return;
    setReviews(data.data.reviews);
  };

  const changeReviewStatus = async (id) => {
    const { data, error } = await patch(urls.bookings.reviews + `/${id}`);
    if (error) return;
    toast.success(data.message);
    getReviews();
  };

  const checkInBooking = async (id) => {
    const { data, error } = await post(urls.bookings.checkIn + id);
    if (error) return;
    toast.success(data.message);
    AppContextData.getApartments();
  };
  const checkOutBooking = async (id, cb) => {
    const { data, error } = await post(urls.bookings.checkOut + id);
    if (error) return;
    toast.success(data.message);
    if (typeof cb === "function") cb();
    AppContextData.getApartments();
  };

  const refundDeposite = async (id, fdata) => {
    const { data, error } = await patch(
      urls.bookings.refund.replace(":id", id),
      fdata
    );
    if (error) return;
    toast.success(data.message);
    AppContextData.getApartments();
  };

  const confirmDeposite = async (id, fdata, cb) => {
    const { data, error } = await patch(
      urls.bookings.confirmPayment.replace(":id", id),
      fdata
    );
    if (error) return;
    toast.success(data.message);
    if (typeof cb === "function") cb();
    AppContextData.getApartments();
  };

  return {
    isLoading,
    bookings,
    reviews,
    getReviews,
    getBookings,
    checkInBooking,
    checkOutBooking,
    changeReviewStatus,
    getBookingsSearch,
    refundDeposite,
    confirmDeposite,
  };
}

export default useBookings;
