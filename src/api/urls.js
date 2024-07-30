const urls = Object.freeze({
  auth: {
    login: "/v1/admin/auth/login",
    access: "/v1/admin/auth/refresh-access",
    resetPassword: "/v1/admin/auth/reset-password",
  },
  profile: {
    baseUrl: "/v1/admin/profile",
    me: "/v1/admin/profile/me",
  },
  apartments: {
    baseUrl: "/v1/admin/apartments",
  },
  bookings: {
    baseUrl: "/v1/admin/bookings?",
    reviews: "/v1/admin/bookings/reviews",
    discounts: "/v1/admin/bookings/discounts",
    checkIn: "/v1/admin/bookings/checkin?id=",
    checkOut: "/v1/admin/bookings/checkout?id=",
    refund: "/v1/admin/bookings/:id/refund",
    confirmPayment: "/v1/admin/bookings/:id/confirm-payment",
  },
  inventory: {
    baseUrl: "/v1/admin/inventory",
  },
  staffs: {
    baseUrl: "/v1/admin/staffs",
    tasks: "/v1/admin/staffs/tasks?",
  },
});
export default urls;
