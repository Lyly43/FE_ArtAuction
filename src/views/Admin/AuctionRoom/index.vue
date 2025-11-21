<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
      <div class="mb-3 mb-md-0">
        <h4 class="fw-bold text-primary mb-1">Auction Room Management</h4>
        <p class="text-body-secondary mb-0">Overview and control of all auction sessions</p>
      </div>
      <div>
        <router-link
          to="/admin/add-auction-room"
          class="btn btn-primary shadow-sm rounded-pill px-4"
        >
          <i class="fa-solid fa-plus me-2"></i> Create Room
        </router-link>
      </div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Total Users</h6>
                <h3 class="fw-bold mb-0">1,222</h3>
              </div>
              <div
                class="bg-secondary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-shield fs-5"></i>
              </div>
            </div>
            <small class="text-success fw-medium"
              ><i class="fa-solid fa-arrow-trend-up me-1"></i>+12% vs last month</small
            >
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Verified</h6>
                <h3 class="fw-bold mb-0">100</h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-circle-check fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">80% of total users</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Sellers</h6>
                <h3 class="fw-bold mb-0">1,222</h3>
              </div>
              <div
                class="bg-info-subtle text-info rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-store fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">12% of total users</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Locked</h6>
                <h3 class="fw-bold mb-0">12</h3>
              </div>
              <div
                class="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-ban fs-5"></i>
              </div>
            </div>
            <small class="text-danger fw-medium">Policy violation</small>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body">
        <div class="row justify-content-between align-items-center">
          <div class="col-12 col-md-6 col-lg-5">
            <div class="input-group bg-light rounded-pill px-2 border-0">
              <span class="input-group-text bg-transparent border-0 text-secondary">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                class="form-control bg-transparent border-0 shadow-none"
                placeholder="Search for report..."
              />
            </div>
          </div>

          <div class="col-auto">
            <button class="btn btn-outline-primary px-3">
              <i class="fa-solid fa-filter me-2"></i>Filter
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="card border-0 shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-12 col-md-8">
            <div class="input-group bg-light rounded-pill px-2 border-0">
              <span class="input-group-text bg-transparent border-0 text-secondary">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                class="form-control bg-transparent border-0 shadow-none"
                placeholder="Search by notification content..."
              />
            </div>
          </div>
          <div class="col-12 col-md-4">
            <select
              class="form-select rounded-pill border-0 bg-light shadow-none"
              aria-label="Filter select"
            >
              <option selected>All Status</option>
              <option value="1">Sent</option>
              <option value="2">Failed</option>
            </select>
          </div>
        </div>
      </div>
    </div> -->

    <div class="row no-scrollbar g-4 overflow-y-auto" style="max-height: 400px">
      <div class="col-12" v-for="room in auctionRooms" :key="room.id">
        <div
          class="card border-0 shadow-sm hover-lift transition-base h-100"
          :class="getBorderClass(room.status)"
          @click="handleRoomClick(room.id)"
          style="cursor: pointer"
        >
          <div class="card-body p-4">
            <div class="row align-items-center">
              <div class="col-12 col-lg-4 mb-3 mb-lg-0 border-end-lg">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h5 class="fw-bold text-primary mb-0 text-truncate">{{ room.name }}</h5>
                  <span
                    class="badge rounded-pill px-3 py-2 fw-normal"
                    :class="getStatusClass(room.status)"
                  >
                    {{ room.status }}
                  </span>
                </div>
                <p class="mb-1 text-dark fw-medium">
                  <i class="fa-solid fa-palette me-2 text-secondary"></i>{{ room.artworkName }}
                </p>
                <small class="text-muted"
                  ><i class="fa-solid fa-tag me-2"></i>{{ room.type }}</small
                >
              </div>

              <div class="col-12 col-lg-8">
                <div class="row g-3">
                  <div class="col-6 col-md-3">
                    <span class="text-secondary text-uppercase small fw-bold d-block mb-1"
                      >Start Time</span
                    >
                    <span class="fw-medium text-dark fs-6">{{ room.startTime }}</span>
                  </div>

                  <div class="col-6 col-md-3">
                    <span class="text-secondary text-uppercase small fw-bold d-block mb-1"
                      >Participants</span
                    >
                    <div class="d-flex align-items-center">
                      <i class="fa-solid fa-users text-info me-2"></i>
                      <span class="fw-bold text-dark">{{ room.participants }}</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-3">
                    <span class="text-secondary text-uppercase small fw-bold d-block mb-1"
                      >Current Price</span
                    >
                    <span class="fw-bold text-primary fs-5">{{
                      formatCurrency(room.currentPrice)
                    }}</span>
                  </div>

                  <div class="col-6 col-md-3">
                    <span class="text-secondary text-uppercase small fw-bold d-block mb-1"
                      >Start Price</span
                    >
                    <span class="fw-medium text-body-secondary">{{
                      formatCurrency(room.startPrice)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auctionRooms: [
        {
          id: 1,
          name: "Autumn Art Auction Room",
          status: "Coming soon",
          type: "Oil painting",
          artworkName: "Phong cảnh mùa thu",
          startTime: "19:00 - 20/10/2023",
          participants: 24,
          startPrice: 100000,
          currentPrice: 200000,
        },
        {
          id: 2,
          name: "Abstract Modern Art",
          status: "In progress",
          type: "Oil painting",
          artworkName: "Trừu tượng số 5",
          startTime: "08:00 - 25/10/2023",
          participants: 150,
          startPrice: 5000000,
          currentPrice: 7500000,
        },
        {
          id: 3,
          name: "Vintage Portrait Collection",
          status: "Ended",
          type: "Oil painting",
          artworkName: "Chân dung thiếu nữ",
          startTime: "10:00 - 15/10/2023",
          participants: 45,
          startPrice: 300000,
          currentPrice: 300000,
        },
      ],
    };
  },

  methods: {
    formatCurrency(value) {
      if (!value) return "0đ";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    // CSS Class cho Badge trạng thái
    getStatusClass(status) {
      switch (status) {
        case "Coming soon":
          return "bg-warning-subtle text-warning-emphasis border border-warning-subtle";
        case "In progress":
          return "bg-danger-subtle text-danger border border-danger-subtle";
        case "Ended":
          return "bg-secondary-subtle text-secondary border border-secondary-subtle";
        default:
          return "bg-light text-dark border";
      }
    },

    // CSS Class tạo viền màu bên trái cho Card
    getBorderClass(status) {
      switch (status) {
        case "Coming soon":
          return "border-start border-4 border-warning";
        case "In progress":
          return "border-start border-4 border-danger";
        case "Ended":
          return "border-start border-4 border-secondary";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
/* Custom CSS nhỏ cho hiệu ứng hover */
.transition-base {
  transition: all 0.2s ease-in-out;
}

.hover-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
  background-color: #f8f9fa; /* Đổi màu nền nhẹ khi hover */
}

/* Tạo vạch ngăn cách giữa cột thông tin trên màn hình lớn */
@media (min-width: 992px) {
  .border-end-lg {
    border-right: 1px solid #dee2e6;
  }
}
</style>
