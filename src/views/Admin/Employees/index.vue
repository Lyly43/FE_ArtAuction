<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="mb-4">
      <h4 class="fw-bold text-primary mb-1">Admin Management</h4>
      <p class="text-body-secondary mb-0">Manage administrator accounts and permissions</p>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">General Admin</h6>
                <h3 class="fw-bold mb-0">{{ statistics.totalAdmins }}</h3>
              </div>
              <div
                class="bg-secondary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-user-shield fs-5"></i>
              </div>
            </div>
            <small class="text-success fw-medium">Total admins</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">In Operation</h6>
                <h3 class="fw-bold mb-0">{{ statistics.activeAdmins }}</h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-circle-check fs-5"></i>
              </div>
            </div>
            <small class="text-success fw-medium">Active now</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Admin has been locked</h6>
                <h3 class="fw-bold mb-0">{{ statistics.lockedAdmins }}</h3>
              </div>
              <div
                class="bg-danger-subtle text-danger-emphasis rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-ban"></i>
              </div>
            </div>
            <small class="text-body-secondary">Recently added</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Super Admin</h6>
                <h3 class="fw-bold mb-0">2</h3>
              </div>
              <div
                class="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-crown fs-5"></i>
              </div>
            </div>
            <small class="text-danger fw-medium">Highest privilege</small>
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
                v-model="search"
                type="text"
                class="form-control bg-transparent border-0 shadow-none"
                @input="handleSearch"
                placeholder="Searching for admin..."
              />
            </div>
          </div>
          <div
            class="col-12 col-md-6 col-lg-8 text-md-end d-flex justify-content-md-end justify-content-start align-items-center gap-2"
          >
            <button
              class="btn btn-outline-primary shadow-sm"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasFilter"
            >
              <i class="fa-solid fa-filter me-1"></i> Filter
            </button>

            <Teleport to="body">
              <div
                class="offcanvas offcanvas-end border-0 shadow-lg"
                tabindex="-1"
                id="offcanvasFilter"
                aria-labelledby="offcanvasFilterLabel"
                style="width: 400px"
              >
                <div class="offcanvas-header border-bottom bg-light-subtle">
                  <div class="d-flex align-items-center gap-2">
                    <div
                      class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                      style="width: 32px; height: 32px"
                    >
                      <i class="fa-solid fa-sliders"></i>
                    </div>
                    <h5 class="offcanvas-title fw-bold text-primary" id="offcanvasFilterLabel">
                      Employee filter
                    </h5>
                  </div>
                  <button
                    type="button"
                    class="btn-close shadow-none"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>

                <div class="offcanvas-body p-0">
                  <div class="p-4 custom-scrollbar">
                    <div class="mb-4">
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2">
                        <i class="fa-solid fa-user-tag me-1"></i> Roles and Powers
                      </label>
                      <small class="text-muted d-block mb-2 fst-italic" style="font-size: 0.75rem"
                        >Multiple positions can be selected</small
                      >

                      <div class="row g-2">
                        <div class="col-6">
                          <input
                            type="checkbox"
                            class="btn-check"
                            id="roleSuperAdmin"
                            autocomplete="off"
                          />
                          <label
                            class="btn btn-outline-danger btn-sm w-100 text-start"
                            for="roleSuperAdmin"
                          >
                            <i class="fa-solid fa-crown me-1"></i> Super Admin
                          </label>
                        </div>
                        <div class="col-6">
                          <input
                            type="checkbox"
                            class="btn-check"
                            id="roleAdmin"
                            autocomplete="off"
                          />
                          <label
                            class="btn btn-outline-danger btn-sm w-100 text-start"
                            for="roleAdmin"
                          >
                            <i class="fa-solid fa-user-shield me-1"></i> Admin
                          </label>
                        </div>
                        <div class="col-6">
                          <input
                            type="checkbox"
                            class="btn-check"
                            id="roleMod"
                            autocomplete="off"
                          />
                          <label
                            class="btn btn-outline-primary btn-sm w-100 text-start"
                            for="roleMod"
                          >
                            <i class="fa-solid fa-gavel me-1"></i> Moderator
                          </label>
                        </div>
                        <div class="col-6">
                          <input type="checkbox" class="btn-check" id="roleOp" autocomplete="off" />
                          <label
                            class="btn btn-outline-primary btn-sm w-100 text-start"
                            for="roleOp"
                          >
                            <i class="fa-solid fa-headset me-1"></i> Operator
                          </label>
                        </div>
                        <div class="col-6">
                          <input type="checkbox" class="btn-check" id="roleHR" autocomplete="off" />
                          <label
                            class="btn btn-outline-success btn-sm w-100 text-start"
                            for="roleHR"
                          >
                            <i class="fa-solid fa-users-gear me-1"></i> HR
                          </label>
                        </div>
                        <div class="col-6">
                          <input
                            type="checkbox"
                            class="btn-check"
                            id="roleAcc"
                            autocomplete="off"
                          />
                          <label
                            class="btn btn-outline-success btn-sm w-100 text-start"
                            for="roleAcc"
                          >
                            <i class="fa-solid fa-calculator me-1"></i> Accountant
                          </label>
                        </div>
                        <div class="col-6">
                          <input
                            type="checkbox"
                            class="btn-check"
                            id="roleStaff"
                            autocomplete="off"
                          />
                          <label
                            class="btn btn-outline-secondary btn-sm w-100 text-start"
                            for="roleStaff"
                          >
                            <i class="fa-solid fa-id-badge me-1"></i> Staff
                          </label>
                        </div>
                        <div class="col-6">
                          <input
                            type="checkbox"
                            class="btn-check"
                            id="roleView"
                            autocomplete="off"
                          />
                          <label
                            class="btn btn-outline-secondary btn-sm w-100 text-start"
                            for="roleView"
                          >
                            <i class="fa-regular fa-eye me-1"></i> Viewer
                          </label>
                        </div>
                      </div>
                    </div>

                    <hr class="border-secondary opacity-10 my-4" />

                    <div class="mb-4">
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2">
                        Operating status
                      </label>
                      <div class="bg-light rounded-3 p-3 border">
                        <div class="form-check mb-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="empStatus"
                            id="stActive"
                            value="1"
                            checked
                          />
                          <label class="form-check-label text-success fw-medium" for="stActive">
                            <i class="fa-solid fa-circle-check me-1"></i> Active
                          </label>
                        </div>

                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="empStatus"
                            id="stSuspended"
                            value="3"
                          />
                          <label class="form-check-label text-danger" for="stSuspended">
                            <i class="fa-solid fa-ban me-1"></i> Inactive
                          </label>
                        </div>
                      </div>
                    </div>

                    <hr class="border-secondary opacity-10 my-4" />

                    <div class="mb-4">
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2">
                        <i class="fa-regular fa-calendar-days me-1"></i> Time of joining
                      </label>

                      <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text bg-light text-secondary">From</span>
                        <input type="date" class="form-control shadow-none" />
                        <span class="input-group-text bg-light text-secondary">To</span>
                        <input type="date" class="form-control shadow-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="offcanvas-footer border-top p-3 bg-white">
                  <div class="row g-2">
                    <div class="col-4">
                      <button class="btn btn-light border w-100 fw-bold text-secondary">
                        <i class="fa-solid fa-rotate-right me-1"></i> Reset
                      </button>
                    </div>
                    <div class="col-8">
                      <button
                        class="btn btn-primary w-100 fw-bold shadow-sm"
                        data-bs-dismiss="offcanvas"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Teleport>

            <router-link to="/admin/add-admin" class="btn btn-primary">
              <i class="fa-solid fa-plus me-2"></i>Add New Admin
            </router-link>
          </div>
        </div>

        <div class="table-responsive text-nowrap overflow-y-auto">
          <table class="table table-hover align-middle text-nowrap mb-0 w-100">
            <thead class="table-light">
              <tr>
                <th scope="col" class="ps-3 py-3 fw-bold align-middle">ID</th>
                <th scope="col" class="py-3 fw-bold align-middle">Full name</th>
                <th scope="col" class="py-3 fw-bold align-middle">Email</th>
                <th scope="col" class="py-3 fw-bold align-middle">Phone Number</th>
                <th scope="col" class="py-3 fw-bold align-middle">Role</th>
                <th scope="col" class="py-3 fw-bold align-middle">Status</th>
                <th scope="col" class="py-3 fw-bold align-middle">Create at</th>
                <th scope="col" class="py-3 fw-bold align-middle text-center">
                  <i class="fa-solid fa-ellipsis"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.id">
                <td class="ps-3 fw-bold text-secondary align-middle">{{ employee.id }}</td>
                <td class="align-middle">
                  <div class="d-flex align-items-center gap-2">
                    <div class="position-relative">
                      <img
                        :src="employee.avatar"
                        alt="Avatar"
                        class="rounded-circle border border-2 border-white shadow-sm object-fit-cover"
                        style="width: 40px; height: 40px"
                      />
                      <!-- <div
                        v-else
                        class="bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold border border-2 border-white shadow-sm"
                        style="width: 40px; height: 40px"
                      >
                        {{ employee.fullName ? employee.fullName.charAt(0).toUpperCase() : "A" }}
                      </div> -->
                    </div>
                    <span class="fw-medium">{{ employee.fullName }}</span>
                  </div>
                </td>
                <td class="text-muted align-middle">{{ employee.email }}</td>
                <td class="align-middle">{{ employee.phoneNumber }}</td>
                <td class="align-middle">
                  <span class="text-primary fw-bold"
                    ><i class="fa-solid fa-shield-halved me-1"></i>Super admin</span
                  >
                </td>
                <td class="align-middle">
                  <button
                    class="btn badge bg-success-subtle text-success rounded-pill border border-success-subtle px-3 py-2"
                  >
                    {{ convertStatus(employee.status) }}
                  </button>
                </td>
                <td class="small text-body-secondary align-middle">{{ employee.createdAt }}</td>
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
                        <RouterLink class="dropdown-item" to="/details"
                          ><i class="fa-solid fa-eye me-2 text-primary"></i>See details</RouterLink
                        >
                      </li>
                      <li>
                        <RouterLink class="dropdown-item" to="/edit"
                          ><i class="fa-solid fa-pen me-2"></i>Edit</RouterLink
                        >
                      </li>
                      <li><hr class="dropdown-divider" /></li>
                      <li>
                        <button
                          class="dropdown-item text-danger"
                          @click="handleDelete(employee.id, employee.fullName)"
                        >
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
      employees: [],
      isLoading: false,
      search: "",
      statistics: [],
      searchTimeout: null,
    };
  },
  mounted() {
    this.loadAdminData();
    this.loadAdminStatistical();
  },
  methods: {
    loadAdminData() {
      axios
        .get("http://localhost:8081/api/admin/admins/lay-du-lieu", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.employees = res.data;
          console.log(this.employees);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    convertStatus(status) {
      switch (status) {
        case 1:
          return "Active";
        case 0:
          return "Inactive";
        default:
          return "Unknown";
      }
    },
    getStatusClass(status) {
      switch (status) {
        case 1:
          return "bg-success-subtle border-success-subtle text-success";
        case 0:
          return "bg-secondary-subtle border-secondary-subtle text-secondary";
        // default:
        //   return "bg-secondary-subtle border-secondary-subtle text-secondary";
      }
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
        this.loadAdminData();
        return;
      }
      this.isLoading = true;
      axios
        .get(`http://localhost:8081/api/admin/admins/tim-kiem?q=${this.search}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.employees = res.data;
          console.log("Kết quả tìm kiếm:", this.employees);
        })
        .catch((err) => {
          console.error("Lỗi tìm kiếm:", err);
          this.employees = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    // Xóa
    handleDelete(adminId, adminName) {
      if (!confirm(`Are you sure you want to delete Admin ${adminName} không?`)) return;

      axios
        .delete(`http://localhost:8081/api/admin/admins/xoa/${adminId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Deleted successfully!");
          this.loadAdminData();
        })
        .catch((err) => {
          console.error("Lỗi khi xóa:", err);
          const message = err.response?.data?.message || "Có lỗi xảy ra khi xóa!";
          alert(message);
        });
    },

    //  card thống kê
    loadAdminStatistical() {
      axios
        .get(`http://localhost:8081/api/admin/admins/thong-ke`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.statistics = res.data;
          console.log("Kết quả tìm kiếm:", this.statistics);
        })
        .catch((err) => {
          console.error("Lỗi tìm kiếm:", err);
          this.statistics = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
