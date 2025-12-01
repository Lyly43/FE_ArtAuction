<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="mb-4">
      <h4 class="text-primary fw-bold mb-1">Report Management</h4>
      <p class="text-body-secondary mb-0">Handle violation reports and complaints from users</p>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">General report</h6>
                <h3 class="card-text fw-bold mb-0">{{ statistics.totalReports }}</h3>
              </div>
              <div
                class="bg-secondary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-file-lines fs-5"></i>
              </div>
            </div>
            <small class="text-secondary fw-medium"> Total reports </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Pending</h6>
                <h3 class="card-text fw-bold mb-0">{{ statistics.pendingReports }}</h3>
              </div>
              <div
                class="bg-warning-subtle text-warning-emphasis rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-clock fs-5"></i>
              </div>
            </div>
            <small class="text-danger fw-medium">Need to consider</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">In progress</h6>
                <h3 class="card-text fw-bold mb-0">{{ statistics.investigatingReports }}</h3>
              </div>
              <div
                class="bg-info-subtle text-info-emphasis rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-hourglass-start fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">Processing</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Resolved</h6>
                <h3 class="card-text fw-bold mb-0">{{ statistics.resolvedReports }}</h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-circle-check fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">Number of rejected reports</small>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <div class="row g-3 mb-4">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="input-group bg-light rounded-pill px-2 border-0">
              <span class="input-group-text bg-transparent border-0 text-secondary">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                class="form-control bg-transparent border-0 shadow-none"
                placeholder="Search for report..."
                @input="handleSearch"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-8 text-md-end">
            <button class="btn btn-outline-primary">
              <i class="fa-solid fa-filter me-2"></i>Filter
            </button>
          </div>
        </div>

        <div class="table-responsive text-nowrap overflow-y-auto">
          <table class="table table-hover align-middle text-nowrap mb-0 w-100">
            <thead class="table-light">
              <tr class="align-middle">
                <th scope="col" class="py-3 ps-3 fw-bold">Annunciator</th>
                <th scope="col" class="py-3 fw-bold">Object type</th>
                <th scope="col" class="py-3 fw-bold">Object Name</th>
                <th scope="col" class="py-3 fw-bold" style="max-width: 300px">Content</th>
                <th scope="col" class="py-3 fw-bold">Created at</th>
                <th scope="col" class="py-3 fw-bold">Status</th>
                <th scope="col" class="py-3 fw-bold text-center">
                  <i class="fa-solid fa-ellipsis"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in reports" :key="item.id">
                <td class="ps-3 align-middle">
                  <div class="d-flex align-items-center gap-2">
                    <!-- <img
                      v-if="report.avatar"
                      :src="report.avatar"
                      alt="Avatar"
                      class="rounded-circle border border-2 border-white shadow-sm object-fit-cover"
                      style="width: 40px; height: 40px"
                    /> -->
                    <div
                      class="bg-secondary-subtle bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold border border-2 border-white shadow-sm"
                      style="width: 40px; height: 40px"
                    >
                      {{ item.reporterName ? item.reporterName.charAt(0).toUpperCase() : "U" }}
                    </div>
                    <span class="fw-medium">{{ item.reporterName }}</span>
                  </div>
                </td>

                <td class="align-middle">
                  <span class="badge bg-light text-dark border fw-normal rounded-pill">
                    objectType
                  </span>
                </td>

                <td class="fw-medium text-primary align-middle">{{ item.objectName }}</td>

                <td
                  class="text-truncate align-middle"
                  style="max-width: 250px"
                  :title="item.content"
                >
                  {{ item.reportReason }}
                </td>

                <td class="small text-body-secondary align-middle">{{ item.createdAt }}</td>

                <td class="align-middle">
                  <button
                    class="btn badge rounded-pill border fw-normal px-3 py-2"
                    :class="getStatusClass(item.reportStatus)"
                  >
                    {{ convertStatus(item.reportStatus) }}
                  </button>
                </td>

                <td class="text-center align-middle">
                  <div class="dropdown">
                    <button
                      class="btn btn-sm btn-light rounded-circle"
                      type="button"
                      data-bs-toggle="dropdown"
                      style="width: 32px; height: 32px"
                    >
                      <i class="fa-solid fa-ellipsis-vertical text-secondary"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end shadow border-0">
                      <li>
                        <button class="dropdown-item">
                          <i class="fa-solid fa-eye me-2 text-primary"></i>See details
                        </button>
                      </li>
                      <!-- <li>
                        <button class="dropdown-item">
                          <i class="fa-solid fa-arrow-up-right-from-square me-2 text-info"></i>View
                          accused
                        </button>
                      </li> -->
                      <li><hr class="dropdown-divider" /></li>
                      <li>
                        <button class="dropdown-item">
                          <i class="fa-solid fa-triangle-exclamation me-2"></i>Warning
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item text-danger">
                          <i class="fa-solid fa-ban me-2"></i>Block
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item text-danger" @click="handleDelete(item.id)">
                          <i class="fa-solid fa-trash me-2"></i>Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
      reports: [
        // {
        //   id: 1,
        //   reporter: "Nguyễn Văn A",
        //   objectType: "User",
        //   objectName: "Trần Thị B",
        //   content: "Spam tin nhắn lừa đảo trong phòng đấu giá...",
        //   createdAt: "2025-10-22 14:00",
        //   status: "Pending",
        // },
        // {
        //   id: 2,
        //   reporter: "Lê Văn C",
        //   objectType: "Artwork",
        //   objectName: "Tranh Mùa Thu",
        //   content: "Đây là tranh chép, không phải tranh gốc...",
        //   createdAt: "2025-10-22 15:30",
        //   status: "Resolved",
        // },
        // {
        //   id: 3, // Sửa lại ID bị trùng (id 2 -> id 3)
        //   reporter: "Lê Văn C",
        //   objectType: "Artwork",
        //   objectName: "Tranh Mùa Thu",
        //   content: "Đây là tranh chép, không phải tranh gốc...",
        //   createdAt: "2025-10-22 15:30",
        //   status: "Rejected",
        // },
      ],
      isLoading: false,
      statistics: [],
    };
  },
  mounted() {
    this.loadReportData();
    this.loadReportStatistical();
  },
  methods: {
    loadReportData() {
      this.isLoading = true;
      axios
        .get("http://localhost:8081/api/admin/reports/lay-du-lieu", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.reports = res.data.data;
          console.log("Data Loaded:", this.reports);
        })
        .catch((err) => {
          console.error("Error loading rooms:", err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    convertStatus(status) {
      switch (status) {
        case 0:
          return "Pending";
        case 1:
          return "In progress";
        case 2:
          return "Done";
        default:
          return "Unknown";
      }
    },

    // Lấy màu trạng thái - Cập nhật style cho Badge Pill
    getStatusClass(status) {
      switch (status) {
        case 0:
          return "bg-warning-subtle text-warning-emphasis border-warning-subtle";
        case 2:
          return "bg-success-subtle text-success border-success-subtle";
        case 1:
          return "bg-danger-subtle text-danger border-danger-subtle";
        default:
          return "bg-light text-dark border-light";
      }
    },

    handleDelete(reportId) {
      if (!confirm(`Are you sure you want to delete this report?`)) return;
      axios
        .delete(`http://localhost:8081/api/admin/reports/xoa/${reportId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Deleted successfully!");
          this.loadReportData();
        })
        .catch((err) => {
          console.error("Error:", err);
          const message = err.response?.data?.message || "Error!";
          alert(message);
        });
    },

    handleSearch() {
      // Xóa bộ đếm cũ nếu người dùng gõ tiếp khi chưa hết giờ
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      // Thiết lập bộ đếm mới (ví dụ: chờ 500ms)
      this.searchTimeout = setTimeout(() => {
        this.performSearchApi();
      }, 500);
    },

    performSearchApi() {
      // Nếu ô tìm kiếm trống thì load lại toàn bộ danh sách
      if (!this.search.trim()) {
        this.loadReportData();
        return;
      }
      this.isLoading = true;
      axios
        .get(`http://localhost:8081/api/admin/reports/tim-kiem?q=${this.search}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.artworks = res.data;
          console.log("Kết quả tìm kiếm:", this.artworks);
        })
        .catch((err) => {
          console.error("Error:", err);
          this.artworks = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    loadReportStatistical() {
      axios
        .get(`http://localhost:8081/api/admin/reports/thong-ke`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.statistics = res.data.data;
          console.log("Kết quả tìm kiếm:", this.statistics);
        })
        .catch((err) => {
          console.error("Error:", err);
          this.statistics = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
