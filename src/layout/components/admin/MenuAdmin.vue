<template>
  <div class="iq-sidebar ">
    <div class="iq-sidebar-logo d-flex justify-content-between">
      <router-link to="/" class="navbar-brand d-flex align-items-center gap-2">
        <img src="../../../assets/img/LogoAdmin.png" class="imgLogo" alt="" />
        <span class="fw-semibold m-0"><span class="text-primary fw-semibold">Art</span>Auction</span>
      </router-link>
      <div class="iq-menu-bt-sidebar">
        <div class="iq-menu-bt align-self-center">
          <div class="wrapper-menu">
            <div class="main-circle"><i class="fa-solid fa-angle-left"></i></div>
            <div class="hover-circle"><i class="fa-solid fa-angle-right"></i></div>
          </div>
        </div>
      </div>
    </div>
    <div id="sidebar-scrollbar" class="">
      <nav class="iq-sidebar-menu">
        <ul id="iq-sidebar-toggle" class="iq-menu">
          <li class="iq-menu-title">
            <i class="fa-solid fa-minus"></i>
            <span>Dashboard</span>
          </li>
          <li :class="{ active: $route.path === '/admin/dashboard' }">
            <router-link to="/admin/dashboard" class="iq-waves-effect">
              <i class="fa-regular fa-house"></i><span>Dashboard</span>
            </router-link>
          </li>
          <li :class="{ active: $route.path === '/admin/livestream' }">
            <router-link to="/admin/livestream" class="iq-waves-effect">
              <i class="fa-regular fa-house"></i><span>LiveStream</span>
            </router-link>
          </li>
          <li :class="{ active: $route.path === '/admin/testlivestream' }">
            <router-link to="/admin/testlivestream" class="iq-waves-effect">
              <i class="fa-regular fa-house"></i><span>test</span>
            </router-link>
          </li>
          <li :class="{ active: $route.path.startsWith('/admin/chat') }">
            <router-link to="/admin/chat/auction-001" class="iq-waves-effect">
              <i class="fa-solid fa-comments"></i><span>Chat Support</span>
            </router-link>
          </li>
          <li>
            <a href="#menu-design" class="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false">
              <i class="fa-solid fa-bars-staggered"></i><span>Management</span>
              <i class="fa-solid fa-angle-right iq-arrow-right"></i></a>
            <ul id="menu-design" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
              <li :class="{ active: $route.path === '/admin/management-employees' }"><router-link to="/admin/management-employees"><i
                    class="fa-solid fa-user-tie"></i>Employees</router-link></li>
              <li :class="{ active: $route.path === '/admin/management-users' }"><router-link to="/admin/management-users"><i class="fa-solid fa-user"></i>User</router-link></li>
              <li :class="{ active: $route.path === '/admin/management-schedule' }"><router-link to="/admin/management-schedule"><i
                    class="fa-solid fa-calendar-days"></i>Schedule</router-link></li>
              <li :class="{ active: $route.path === '/admin/management-invoice' }"><router-link to="/admin/management-invoice"><i class="fa-solid fa-receipt"></i>Invoice</router-link>
              </li>
            </ul>
          </li>
          <!-- <li>
            <a href="dashboard-2.html" class="iq-waves-effect"><i class="ri-home-8-line"></i><span>Dashboard
                3</span></a>
          </li>
          <li>
            <a href="dashboard-3.html" class="iq-waves-effect"><i class="ri-home-7-line"></i><span>Dashboard
                4</span></a>
          </li> -->
        </ul>
        <div class="p-3 mt-auto">

          <!-- cá nhân ở đây -->
          <div class="d-flex align-items-center gap-3">
            <img src="../../../assets/img/user_test.jpg" class="img-avatar" alt=""
              style="width: 40px; height: 40px; border-radius: 50%;">
            <div class="ms-2">
              <p class="fw-bold mb-0">john_sins (Admin)</p>
              <p class="text-muted small mb-0">connchonam@example.com</p>
            </div>
          </div>
        </div>
      </nav>
    </div>

  </div>
</template>
<script>
export default {};
</script>
<style></style>
