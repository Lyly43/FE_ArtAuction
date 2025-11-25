<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
      <div class="mb-3 mb-md-0">
        <h4 class="fw-bold text-primary mb-1">Auction Room Management</h4>
        <p class="text-body-secondary mb-0">Manage all auction rooms notifications</p>
      </div>
      <router-link to="/admin/sent-notification" class="btn btn-primary shadow-sm px-4">
        <i class="fa-solid fa-paper-plane"></i> Create Notification
      </router-link>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Total Notifications</h6>
                <h3 class="fw-bold mb-0">
                  {{ (statistical && statistical.totalNotifications) || 0 }}
                </h3>
              </div>
              <div
                class="bg-secondary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-bell fs-5"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Sent</h6>
                <h3 class="fw-bold mb-0">
                  {{
                    (statistical && statistical.statusCounts && statistical.statusCounts["0"]) || 0
                  }}
                </h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-circle-check fs-5"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Failed</h6>
                <h3 class="fw-bold mb-0">
                  {{
                    (statistical && statistical.statusCounts && statistical.statusCounts["1"]) || 0
                  }}
                </h3>
              </div>
              <div
                class="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-ban fs-5"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Read Rate</h6>
                <h3 class="fw-bold mb-0">
                  {{
                    (statistical && statistical.readRate ? statistical.readRate * 100 : 0).toFixed(
                      0
                    )
                  }}%
                </h3>
              </div>
              <div
                class="bg-info-subtle text-info rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-eye fs-5"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm mb-4">
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
    </div>

    <div class="d-flex no-scrollbar flex-column gap-3 overflow-y-auto" style="max-height: 400px">
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <div v-else-if="notifications.length === 0" class="text-center py-5 text-muted">
        <p>Không có thông báo nào</p>
      </div>

      <template v-else>
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="card border-0 shadow-sm position-relative"
        >
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="d-flex align-items-center gap-2">
                <h5 class="fw-bold mb-0">{{ notification.title }}</h5>
                <span
                  class="badge bg-success-subtle text-success border border-success-subtle px-3 py-1"
                >
                  Sent
                </span>
              </div>

              <div class="d-flex align-items-center text-body-secondary small">
                <i class="fa-solid fa-user-group me-2"></i>
                <span
                  >Receiver: <strong>{{ notification.userId }}</strong></span
                >
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-start mb-3">
              <p class="text-dark mb-0" style="max-width: 80%">
                {{ notification.notificationContent }}
              </p>

              <div class="dropdown">
                <button
                  class="btn btn-sm btn-light rounded-circle shadow-sm"
                  type="button"
                  data-bs-toggle="dropdown"
                  style="width: 34px; height: 34px"
                >
                  <i class="fa-solid fa-ellipsis-vertical text-secondary"></i>
                </button>

                <ul
                  class="dropdown-menu dropdown-menu-end shadow border-0"
                  style="border-radius: 8px"
                >
                  <li>
                    <button class="dropdown-item" @click="viewDetail(notification)">
                      <i class="fa-solid fa-circle-info me-2 text-primary"></i>
                      See Details
                    </button>
                  </li>

                  <li><hr class="dropdown-divider" /></li>

                  <li>
                    <button
                      class="dropdown-item text-danger"
                      @click="deleteNotification(notification.id)"
                    >
                      <i class="fa-solid fa-trash me-2"></i>
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div class="d-flex align-items-center text-muted small">
              <i class="fa-regular fa-clock me-2"></i>
              <span>{{ formatDate(notification.notificationTime) }}</span>
            </div>
          </div>
        </div>
      </template>

      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div class="d-flex align-items-center gap-3">
              <h5 class="fw-bold mb-0">Phòng đấu giá sắp bắt đầu</h5>
              <span
                class="badge bg-success-subtle text-success rounded-pill border border-success-subtle"
                >Sent</span
              >
            </div>
            <div class="d-flex align-items-center text-body-secondary">
              <i class="fa-solid fa-user-group me-2"></i>
              <small>Receiver: <strong>VIP Members</strong></small>
            </div>
          </div>

          <p class="mb-2 text-dark">
            Phòng VIP 01 sẽ bắt đầu phiên đấu giá vào lúc 10:00 ngày 26/03/2024
          </p>

          <div class="d-flex align-items-center text-muted small">
            <i class="fa-regular fa-clock me-2"></i>
            <span>25/03/2024 09:00</span>
          </div>
        </div>
      </div>

      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div class="d-flex align-items-center gap-3">
              <h5 class="fw-bold mb-0">Cảnh báo vi phạm</h5>
              <span
                class="badge bg-danger-subtle text-danger rounded-pill border border-danger-subtle"
                >Failed</span
              >
            </div>
            <div class="d-flex align-items-center text-body-secondary">
              <i class="fa-solid fa-user me-2"></i>
              <small>Receiver: <strong>User #123</strong></small>
            </div>
          </div>

          <p class="mb-2 text-dark">Tài khoản của bạn bị tạm khóa do vi phạm chính sách.</p>

          <div class="d-flex align-items-center text-muted small">
            <i class="fa-regular fa-clock me-2"></i>
            <span>25/03/2024 08:30</span>
            <span class="ms-3 text-danger"
              ><i class="fa-solid fa-circle-exclamation me-1"></i>Network Error</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      statistical: {},
      isLoading: false,
      notifications: [],
    };
  },

  mounted() {
    this.loadNotificationStatistics();
    this.loadNotificationData();
  },

  watch: {
    notifications: {
      handler(newVal) {
        console.log("Notifications changed:", newVal);
        console.log("Length:", newVal?.length);
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    loadNotificationStatistics() {
      axios
        .get("http://localhost:8081/api/admin/notifications/thong-ke", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.statistical = res.data.data;
        })
        .catch((err) => {
          console.error("Lỗi thống kê:", err);
        });
    },

    loadNotificationData() {
      this.isLoading = true;
      axios
        .get("http://localhost:8081/api/admin/notifications/lay-du-lieu", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          const payload = res.data?.data;
          if (Array.isArray(payload)) {
            this.notifications = payload;
          } else if (payload && Array.isArray(payload.content)) {
            // Một số API trả về { data: { content: [], totalPages, ... } }
            this.notifications = payload.content;
          } else {
            this.notifications = [];
          }
          console.log("Đã tải:", this.notifications.length, "thông báo");
        })
        .catch((err) => {
          console.error("Lỗi tải danh sách:", err);
          this.notifications = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    // Hàm xử lý khi bấm Xem chi tiết
    viewDetail(notification) {
      console.log("Xem chi tiết ID:", notification.id);
      // Logic mở modal hoặc chuyển trang của bạn ở đây
      alert("Xem chi tiết: " + notification.title);
    },

    formatDate(dateString) {
      if (!dateString) return "N/A";
      try {
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
      } catch {
        return dateString;
      }
    },
  },
};
</script>
