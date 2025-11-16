import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save

// import checkAdmin from "./checkAdmin";
import checkUser from "./checkUser";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Khachhang/Login/index.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Khachhang/Register/index.vue"),
    meta: { layout: "blank" },
  },

  // trước login - ko cần checkUser
  {
    path: '/',
    component: () => import('../views/Khachhang/Home/index.vue'),
    meta: { layout: "client" },
  },
  {
    path: '/about-us',
    name: 'about_us',
    component: () => import('../views/Khachhang/AboutUs/index.vue'),
    meta: { layout: "client" },
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../views/Khachhang/Help/index.vue'),
    meta: { layout: "client" },

  },

  // sau login - phải checkUser
  {
    path: "/client/home",

    component: () => import("../views/Client/Home/index.vue"),
    meta: { layout: "client" },
    beforeEnter: checkUser,
  },
  {
    path: '/client/auction',
    name: 'auction',
    component: () => import('../views/Client/Auction/index.vue'),
    meta: { layout: "client" },
    beforeEnter: checkUser,

  },
  {
    path: "/client/profile",
    name: "profile",
    component: () => import("../views/Client/Profile/index.vue"),
    meta: { layout: "client" },
    beforeEnter: checkUser,
    children: [
      {
        path: "",
        redirect: "/client/profile/art-management",
      },
      {
        path: "art-management",
        name: "profile-art-management",
        component: () => import("../views/Client/Profile/Management/index.vue"),
      },
      {
        path: "history",
        name: "profile-history",
        component: () => import("../views/Client/Profile/History/index.vue"),
      },
      {
        path: "invoices",
        name: "profile-invoices",
        component: () => import("../views/Client/Profile/Invoices/index.vue"),
      },
      {
        path: "e-wallet",
        name: "profile-e-wallet",
        component: () => import("../views/Client/Profile/EWallet/index.vue"),
      },

    ],
  },
  {
    path: '/client/payment',
    name: 'payment',
    component: () => import('../views/Client/Payment/index.vue'),
    meta: { layout: "client" },
    beforeEnter: checkUser,

  },
  {
    path: '/client/register-artwork',
    name: 'invoice',
    component: () => import('../views/Client/RegisArtwork/index.vue'),
    meta: { layout: "client" },
    beforeEnter: checkUser,

  },
  {
    path: '/client/auction-room/:id',
    name: 'auction-room',
    component: () => import('../views/Client/AuctionRoom/index.vue'),
    meta: { layout: "client" },
    props: true,
    beforeEnter: checkUser,

  },


  //test
  {
    path: '/client/live-test',
    // name: 'auction-room',
    component: () => import('../views/Client/testLiveClient/index.vue'),
    meta: { layout: "client" },
    beforeEnter: checkUser,

  },

  {
    path: '/client/edit-profile',
    // name: 'auction-room',
    component: () => import('../views/Client/EditProfile/index.vue'),
    meta: { layout: "client" },
    beforeEnter: checkUser,

  },


  // ADMIN
  {
    path: '/admin/dashboard',
    name: 'ad-dashboard',
    component: () => import('../views/Admin/Dashboard/index.vue'),
    meta: { layout: "default" },
    // beforeEnter: checkUser,

  },
  {
    path: '/admin/management-employees',
    // name: 'auction-room',
    component: () => import('../views/Admin/Employees/index.vue'),
    meta: { layout: "default" },

  },
  {
    path: '/admin/management-users',
    // name: 'auction-room',
    component: () => import('../views/Admin/Users/index.vue'),
    meta: { layout: "default" },

  },
  {
    path: '/admin/management-schedule',
    // name: 'auction-room',
    component: () => import('../views/Admin/Schedules/index.vue'),
    meta: { layout: "default" },

  },
  {
    path: '/admin/management-invoice',
    // name: 'auction-room',
    component: () => import('../views/Admin/Invoices/index.vue'),
    meta: { layout: "default" },

  },
  // {
  //   path: '/admin/live',
  //   name: 'admin-live',
  //   component: () => import('../views/Admin/testLiveStream/index.vue'),
  //   meta: { layout: "default" },
  // },
  {
    path: '/admin/testlivestream',
    name: 'admin-test-livestream',
    component: () => import('../views/Admin/testLiveStream/index.vue'),
    meta: { layout: "default" },
  },
  {
    path: '/admin/livestream',
    // name: 'admin-livestream',
    component: () => import('../views/Admin/LiveStream/index.vue'),
    meta: { layout: "default" },
  },
  {
    path: '/admin/chat/:id',
    name: 'admin-chat',
    component: () => import('../views/Admin/Chat/index.vue'),
    meta: { layout: "default" },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

// Chuyển hướng người dùng đã đăng nhập khỏi các trang dành cho khách
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const isGuestPage = to.path === "/" || to.path === "/login" || to.path === "/register";

  if (token && isGuestPage) {
    return next("/client/home");
  }

  return next();
});
export default router;
