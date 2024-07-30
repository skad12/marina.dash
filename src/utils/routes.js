const routes = {
  baseUrl: "/",
  home: "/home",
  new: "/new",
  details: "/details",
  success: "/success",
  app: {
    dashboard: "/dashboard",
    home: {
      baseUrl: "/home/*",
    },
    apartments: {
      baseUrl: "/apartments/*",
    },
    calender: {
      baseUrl: "/calender/*",
    },
    bookings: {
      baseUrl: "/bookings/*",
    },
    feedbacks: {
      baseUrl: "/feedbacks/*",
    },
    staffs: {
      baseUrl: "/staffs/*",
    },
    schedules: {
      baseUrl: "/schedules/*",
    },
    affiliates: {
      baseUrl: "/affiliates/*",
    },
    admin: {
      baseUrl: "/admin/*",
    },
    inventory: {
      baseUrl: "/inventory/*",
    },
  },
  auth: {
    register: "/register",
    baseUrl: "/auth/*",
    login: "/login",
  },
};

export const getUrl = (url) => url.replace("/*", "");

export default routes;
