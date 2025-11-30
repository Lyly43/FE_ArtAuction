<template>
  <div class="container-fluid py-4 bg-light-subtle">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="text-primary fw-bold mb-1">User Management</h4>
        <p class="text-body-secondary mb-0">Manage access and user information</p>
      </div>
      <button class="btn btn-primary shadow-sm">
        <i class="fa-solid fa-plus me-2"></i>Add New User
      </button>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Total Users</h6>
                <h3 class="fw-bold mb-0">{{ statistics.totalUsers }}</h3>
              </div>
              <div class="icon-box bg-secondary-subtle text-primary rounded-3 p-2">
                <i class="fa-solid fa-shield fa-lg"></i>
              </div>
            </div>
            <small class="text-success fw-medium">
              <i class="fa-solid fa-arrow-trend-up me-1"></i>+12%
            </small>
            <span class="text-body-secondary small ms-1">vs last month</span>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Active</h6>
                <h3 class="fw-bold mb-0">100</h3>
              </div>
              <div class="icon-box bg-success-subtle text-success rounded-3 p-2">
                <i class="fa-solid fa-circle-check fa-lg"></i>
              </div>
            </div>
            <small class="text-body-secondary">80% of total users</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Sellers</h6>
                <h3 class="fw-bold mb-0">{{ statistics.totalSellers }}</h3>
              </div>
              <div class="icon-box bg-info-subtle text-info rounded-3 p-2">
                <i class="fa-solid fa-users fa-lg"></i>
              </div>
            </div>
            <small class="text-body-secondary">Total active users</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Locked</h6>
                <h3 class="fw-bold mb-0">{{ statistics.totalBlockedUsers }}</h3>
              </div>
              <div class="icon-box bg-danger-subtle text-danger rounded-3 p-2">
                <i class="fa-solid fa-ban fa-lg"></i>
              </div>
            </div>
            <small class="text-danger fw-medium">Policy violation</small>
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
                placeholder="Search by name, email..."
                @input="handleSearch"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-8 text-md-end">
            <!-- <button class="btn btn-outline-primary me-2">
              <i class="fa-solid fa-filter me-1"></i> Filter
            </button> -->
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
                      User filter
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
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2"
                        >Status</label
                      >
                      <div class="bg-light rounded-3 p-3 border">
                        <div class="form-check mb-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="statusFilter"
                            id="statusAll"
                            checked
                          />
                          <label class="form-check-label fw-medium" for="statusAll">All</label>
                        </div>
                        <div class="form-check mb-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="statusFilter"
                            id="statusActive"
                          />
                          <label class="form-check-label text-success" for="statusActive"
                            >● Active
                          </label>
                        </div>
                        <div class="form-check mb-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="statusFilter"
                            id="statusLocked"
                          />
                          <label class="form-check-label text-warning" for="statusLocked"
                            >● Locked
                          </label>
                        </div>
                        <!-- <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="statusFilter"
                          id="statusBanned"
                        />
                        <label class="form-check-label text-danger" for="statusBanned"
                          >● Suspended (Đình chỉ)</label
                        >
                      </div> -->
                      </div>
                    </div>

                    <hr class="border-secondary opacity-10 my-4" />

                    <div class="mb-4">
                      <div class="mb-3">
                        <label class="form-label fw-bold text-uppercase small text-secondary"
                          >Gender</label
                        >
                        <div class="d-flex gap-3">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="genderFilter"
                              id="genderMale"
                            />
                            <label class="form-check-label" for="genderMale">Male</label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="genderFilter"
                              id="genderFemale"
                            />
                            <label class="form-check-label" for="genderFemale">Female</label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="genderFilter"
                              id="genderOther"
                            />
                            <label class="form-check-label" for="genderOther">Other</label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label class="form-label fw-bold text-uppercase small text-secondary"
                          >Tỉnh / Thành phố</label
                        >
                        <select class="form-select shadow-none">
                          <option selected disabled>Chọn khu vực...</option>
                          <option value="HN">Hà Nội</option>
                          <option value="HCM">TP. Hồ Chí Minh</option>
                          <option value="DN">Đà Nẵng</option>
                          <option value="Other">Khác</option>
                        </select>
                      </div>
                    </div>

                    <div class="mb-4">
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2"
                        >Date of birth</label
                      >
                      <div class="input-group input-group-sm">
                        <input type="date" class="form-control shadow-none" placeholder="From" />
                        <span class="input-group-text bg-light text-secondary">to</span>
                        <input type="date" class="form-control shadow-none" placeholder="To" />
                      </div>
                    </div>

                    <div class="mb-2">
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2"
                        >Account creation date</label
                      >

                      <div class="d-flex flex-wrap gap-2 mb-2">
                        <button class="btn btn-sm btn-light border text-secondary active-pill">
                          Last 7 days
                        </button>
                        <button class="btn btn-sm btn-light border text-secondary">
                          This month
                        </button>
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

            <!-- <button class="btn btn-outline-secondary">
              <i class="fa-solid fa-download me-1"></i> Export
            </button> -->
          </div>
        </div>

        <div class="table-responsive overflow-y-auto">
          <table class="table table-hover align-middle text-nowrap">
            <thead class="table-light">
              <tr>
                <th scope="col" class="fw-bold">ID</th>
                <th scope="col" class="fw-bold">User Info</th>
                <th scope="col" class="fw-bold">Phone</th>
                <th scope="col" class="fw-bold">Role</th>
                <th scope="col" class="fw-bold">Address</th>
                <th scope="col" class="fw-bold">Birth of day</th>
                <th scope="col" class="fw-bold">Gender</th>
                <th scope="col" class="fw-bold">Status</th>
                <th scope="col" class="fw-bold">Balance</th>
                <th scope="col" class="fw-bold">Date</th>
                <th scope="col" class="fw-bold">
                  <i class="fa-solid fa-ellipsis"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="12" class="text-center py-5 text-muted">
                  <div class="spinner-border text-primary mb-2" role="status"></div>
                  <p class="mb-0 small">Đang tải dữ liệu...</p>
                </td>
              </tr>
              <tr v-for="user in users" :key="user.id">
                <td class="text-center text-secondary fw-medium">#{{ user.id }}</td>
                <td class="align-middle">
                  <div class="d-flex align-items-center gap-2">
                    <img
                      :src="user.avt ? user.avt : '/src/assets/img/default.png'"
                      alt="User Avatar"
                      class="rounded-circle border"
                      style="width: 32px; height: 32px; object-fit: cover"
                    />

                    <!-- <div
                      v-else
                      class="bg-secondary-subtle text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                      style="width: 32px; height: 32px"
                    >
                      {{ user.fullName ? user.fullName.charAt(0).toUpperCase() : "U" }}
                    </div> -->
                    <div>
                      <div class="fw-bold text-dark">{{ user.fullname }}</div>
                      <div class="small text-muted">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="align-middle">{{ user.phonenumber }}</td>
                <td class="align-middle">
                  <span
                    class="badge bg-secondary-subtle text-secondary border border-secondary-subtle rounded-pill fw-normal"
                  >
                    {{ convertRole(user.role) }}
                  </span>
                </td>

                <td class="align-middle">
                  {{ user.address }}
                </td>

                <td class="align-middle">
                  {{ user.dateOfBirth }}
                </td>

                <td class="align-middle">
                  {{ convertGender(user.gender) }}
                </td>

                <td class="align-middle">
                  <button
                    class="btn"
                    :class="['badge rounded-pill border fw-normal', getStatusClass(user.status)]"
                  >
                    {{ convertStatus(user.status) }}
                  </button>
                </td>
                <td class="text-start fw-medium text-dark align-middle">
                  {{ formatCurrency(user.balance) }}
                </td>
                <td class="small text-muted align-middle">{{ user.createdAt }}</td>

                <td class="text-center align-middle">
                  <div class="dropdown">
                    <button
                      class="btn btn-sm btn-light rounded-circle"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <i class="fa-solid fa-ellipsis-vertical text-secondary"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
                      <!-- <li><h6 class="dropdown-header">Actions</h6></li> -->
                      <li>
                        <a class="dropdown-item" @click.prevent="openEditModal(user)"
                          ><i class="fa-solid fa-pen-to-square me-2 text-primary"></i>Edit
                          details</a
                        >
                      </li>
                      <li><hr class="dropdown-divider" /></li>

                      <template v-if="user.status !== 2">
                        <li>
                          <button class="dropdown-item text-warning" @click="handleLock(user)">
                            <i class="fa-solid fa-lock me-2"></i>Lock Account
                          </button>
                        </li>
                      </template>

                      <template v-if="user.status === 2">
                        <li>
                          <button class="dropdown-item text-success" @click="handleUnlock(user)">
                            <i class="fa-solid fa-lock-open me-2"></i>Unlock Account
                          </button>
                        </li>
                      </template>
                      <li>
                        <button
                          class="dropdown-item text-danger"
                          @click="handleDelete(user.id, user.fullname)"
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

        <!-- <nav class="d-flex justify-content-between align-items-center mt-4">
          <small class="text-body-secondary">Showing 3 of 1222 users</small>
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav> -->
      </div>
    </div>
    <div
      class="modal fade"
      id="editUserModal"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          <div class="modal-header bg-secondary-subtle px-4 py-3 border-0">
            <div class="d-flex align-items-center gap-2">
              <div
                class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                style="width: 40px; height: 40px"
              >
                <i class="fa-solid fa-user-pen"></i>
              </div>
              <div>
                <h5 class="modal-title fw-bold text-primary mb-0">Update User Profile</h5>
                <small class="text-body-secondary">ID: #{{ editingUser.id }}</small>
              </div>
            </div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body p-0">
            <div class="row g-0 h-100">
              <div class="col-12 col-lg-4 bg-light-subtle border-end border-light-subtle">
                <div
                  class="d-flex flex-column align-items-center text-center p-4 h-100 justify-content-center"
                >
                  <div class="position-relative mb-3">
                    <img
                      :src="previewAvt || editingUser.avt || 'https://via.placeholder.com/150'"
                      class="rounded-circle shadow-sm border border-4 border-white object-fit-cover"
                      style="width: 150px; height: 150px"
                      alt="User Avatar"
                    />
                    <label
                      for="uploadAvtInput"
                      class="position-absolute bottom-0 end-0 bg-white text-primary border border-2 border-white rounded-circle shadow-sm d-flex align-items-center justify-content-center p-2 mb-1 me-1"
                      style="width: 38px; height: 38px; cursor: pointer"
                    >
                      <i class="fa-solid fa-camera"></i>
                    </label>
                    <input
                      type="file"
                      id="uploadAvtInput"
                      class="d-none"
                      @change="handleFileUpload"
                      accept="image/*"
                    />
                  </div>

                  <h5 class="fw-bold text-dark mb-1">{{ editingUser.fullname }}</h5>
                  <p class="text-secondary small mb-3">{{ editingUser.email }}</p>

                  <div class="d-flex gap-2 justify-content-center w-100">
                    <div class="bg-white rounded-3 p-2 border shadow-sm flex-fill">
                      <small class="d-block text-muted" style="font-size: 0.7rem">BALANCE</small>
                      <span class="fw-bold text-success">{{
                        formatCurrency(editingUser.balance)
                      }}</span>
                    </div>
                    <div class="bg-white rounded-3 p-2 border shadow-sm flex-fill">
                      <small class="d-block text-muted" style="font-size: 0.7rem">CREATED</small>
                      <span class="fw-bold text-dark">{{
                        editingUser.createdAt?.split(" ")[0]
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-lg-8 bg-white">
                <div class="p-4">
                  <form @submit.prevent="updateUser">
                    <p class="text-uppercase fw-bold text-secondary small mb-3 border-bottom pb-2">
                      <i class="fa-regular fa-id-card me-1"></i> Personal Info
                    </p>

                    <div class="row g-3 mb-4">
                      <div class="col-12">
                        <div class="form-floating">
                          <input
                            type="text"
                            class="form-control bg-light-subtle"
                            id="floatName"
                            v-model="editingUser.fullname"
                            placeholder="Fullname"
                          />
                          <label for="floatName">Full Name</label>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-floating">
                          <input
                            type="date"
                            class="form-control bg-light-subtle"
                            id="floatDob"
                            v-model="editingUser.dateOfBirth"
                          />
                          <label for="floatDob">Date of Birth</label>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-floating">
                          <select
                            class="form-select bg-light-subtle"
                            id="floatGender"
                            v-model="editingUser.gender"
                          >
                            <option :value="0">Male</option>
                            <option :value="1">Female</option>
                            <option :value="2">Other</option>
                          </select>
                          <label for="floatGender">Gender</label>
                        </div>
                      </div>
                    </div>

                    <p class="text-uppercase fw-bold text-secondary small mb-3 border-bottom pb-2">
                      <i class="fa-solid fa-layer-group me-1"></i> Role & Status
                    </p>

                    <div class="row g-3">
                      <div class="col-md-6">
                        <label class="form-label small fw-bold text-secondary">User Role</label>
                        <div class="btn-group w-100" role="group">
                          <input
                            type="radio"
                            class="btn-check"
                            name="roleRadio"
                            id="role0"
                            :value="0"
                            v-model="editingUser.role"
                            autocomplete="off"
                          />
                          <label class="btn btn-outline-secondary btn-sm py-2" for="role0"
                            >User</label
                          >

                          <input
                            type="radio"
                            class="btn-check"
                            name="roleRadio"
                            id="role1"
                            :value="1"
                            v-model="editingUser.role"
                            autocomplete="off"
                          />
                          <label class="btn btn-outline-secondary btn-sm py-2" for="role1"
                            >Buyer</label
                          >

                          <input
                            type="radio"
                            class="btn-check"
                            name="roleRadio"
                            id="role2"
                            :value="2"
                            v-model="editingUser.role"
                            autocomplete="off"
                          />
                          <label class="btn btn-outline-secondary btn-sm py-2" for="role2"
                            >Seller</label
                          >
                        </div>
                      </div>

                      <!-- <div class="col-md-6">
                        <label class="form-label small fw-bold text-secondary"
                          >Account Status</label
                        >
                        <div class="input-group">
                          <span class="input-group-text bg-light-subtle border-end-0">
                            <i
                              class="fa-solid fa-toggle-on"
                              :class="editingUser.status === 1 ? 'text-success' : 'text-danger'"
                            ></i>
                          </span>
                          <select
                            class="form-select bg-light-subtle border-start-0"
                            v-model="editingUser.status"
                          >
                            <option :value="1" class="text-success fw-bold">Active</option>
                            <option :value="0" class="text-danger fw-bold">Locked</option>
                            <option value="Pending approval">Pending</option>
                          </select>
                        </div>
                      </div> -->
                    </div>

                    <div class="mt-4">
                      <div class="form-floating">
                        <input
                          type="text"
                          class="form-control bg-light-subtle"
                          id="floatAddress"
                          v-model="editingUser.address"
                          placeholder="Address"
                        />
                        <label for="floatAddress">Address</label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer bg-white border-top px-4 py-3">
            <button
              type="button"
              class="btn btn-danger rounded-pill px-4 fw-medium text-light"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary rounded-pill px-4 fw-bold shadow-sm"
              @click="updateUser"
            >
              <i class="fa-regular fa-floppy-disk me-2"></i>Save Changes
            </button>
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
      users: [],
      isLoading: false,
      search: "",
      statistics: [],
      searchTimeout: null,
      editingUser: {}, // Object chứa user đang chỉnh sửa
      previewAvt: null, // Link ảnh preview khi chọn file mới
      selectedFile: null, // File thực tế để upload
      modalInstance: null, // Biến giữ instance của Modal
    };
  },
  mounted() {
    this.loadUserData();
    this.loadUserStatistical();
  },
  methods: {
    loadUserData() {
      axios
        .get("http://localhost:8081/api/admin/lay-du-lieu-user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.users = res.data;
          console.log(this.users);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    convertStatus(status) {
      switch (status) {
        case 1:
          return "Active";
        case 0:
          return "Inactive";
        case 2:
          return "Locked";
      }
    },
    getStatusClass(status) {
      switch (status) {
        case 1:
          return "bg-success-subtle border-success-subtle text-success";
        case 0:
          return "bg-secondary-subtle border-secondary-subtle text-secondary";
        case 2:
          return "bg-danger-subtle border-danger-subtle text-danger";
      }
    },
    convertRole(roleId) {
      switch (roleId) {
        case 0:
          return "User";
        case 1:
          return "Buyer";
        case 2:
          return "Seller";
        // default:
        //   return "Unknown";
      }
    },

    convertGender(status) {
      switch (status) {
        case 0:
          return "Male";
        case 1:
          return "female";
        case 2:
          return "Other";
        // default:
        //   return "Unknown";
      }
    },

    handleSearch() {
      // Xóa bộ đếm cũ nếu người dùng gõ tiếp khi chưa hết giờ
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      // Thiết lập bộ đếm mới (ví dụ: chờ 500ms)
      this.searchTimeout = setTimeout(() => {
        this.performSearchApi(); // Gọi hàm thực thi API sau khi hết giờ chờ
      }, 500);
    },

    performSearchApi() {
      // Nếu ô tìm kiếm trống thì load lại toàn bộ danh sách
      if (!this.search.trim()) {
        this.loadUserData();
        return;
      }
      this.isLoading = true;
      axios
        .get(`http://localhost:8081/api/admin/tim-kiem-user?q=${this.search}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.users = res.data;
          console.log("Kết quả tìm kiếm:", this.users);
        })
        .catch((err) => {
          console.error("Lỗi tìm kiếm:", err);
          this.users = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    // Xóa
    handleDelete(userId, userName) {
      if (!confirm(`Bạn có chắc chắn muốn xóa Admin: ${userName}?`)) return;

      axios
        .delete(`http://localhost:8081/api/admin/xoa-user/${userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Đã xóa thành công!");
          this.loadUserData();
        })
        .catch((err) => {
          console.error("Lỗi khi xóa:", err);
          const message = err.response?.data?.message || "Có lỗi xảy ra khi xóa!";
          alert(message);
        });
    },

    //  card thống kê
    loadUserStatistical() {
      axios
        .get(`http://localhost:8081/api/admin/thong-ke-user`, {
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

    // 1. Hàm mở Modal và đổ dữ liệu
    openEditModal(user) {
      // Clone dữ liệu để không sửa trực tiếp vào bảng khi chưa lưu
      this.editingUser = { ...user };

      // Reset các biến upload ảnh
      this.previewAvt = null;
      this.selectedFile = null;

      // Hiển thị Modal Bootstrap
      const modalElement = document.getElementById("editUserModal");
      // eslint-disable-next-line no-undef
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file; // Lưu file vào biến để gửi lên server
        this.previewAvt = URL.createObjectURL(file); // Tạo link ảnh ảo để xem trước
      }
    },

    // Thêm vào trong methods: {}
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },

    // Sửa lại hàm updateUser
    async updateUser() {
      if (!this.editingUser.id) return;

      // Tạo object dữ liệu thường (JSON), KHÔNG dùng FormData
      const dataToSend = {
        fullname: this.editingUser.fullname,
        phonenumber: this.editingUser.phonenumber || "",
        address: this.editingUser.address || "",
        gender: this.editingUser.gender,
        role: this.editingUser.role,
        status: this.editingUser.status,
        dateOfBirth: this.editingUser.dateOfBirth || "",
      };

      if (this.selectedFile) {
        try {
          dataToSend.avt = await this.toBase64(this.selectedFile);
        } catch (error) {
          console.error("Lỗi chuyển đổi ảnh:", error);
          return;
        }
      } else {
        // Nếu không chọn ảnh mới, giữ nguyên link ảnh cũ (hoặc null)
        dataToSend.avt = this.editingUser.avt;
      }

      this.isLoading = true;

      // Gửi request dạng JSON (Axios mặc định gửi JSON)
      axios
        .put(`http://localhost:8081/api/admin/cap-nhat-user/${this.editingUser.id}`, dataToSend, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          alert("Cập nhật thông tin thành công!");
          if (this.modalInstance) this.modalInstance.hide();
          this.loadUserData();
        })
        .catch((err) => {
          console.error("Lỗi cập nhật:", err);
          const message = err.response?.data?.message || "Có lỗi xảy ra!";
          alert(message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    handleLock(user) {
      if (!confirm(`Are you sure you want to block the account: ${user.fullname}?`)) return;
      this.updateUserStatus(user.id, 2);
    },

    handleUnlock(user) {
      if (!confirm(`Do you want to unlock the account: ${user.fullname}?`)) return;
      this.updateUserStatus(user.id, 1);
    },

    updateUserStatus(userId, newStatus) {
      this.isLoading = true;

      const user = this.users.find((u) => u.id === userId);
      const dataToSend = { ...user, status: newStatus };

      axios
        .put(`http://localhost:8081/api/admin/cap-nhat-user/${userId}`, dataToSend, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(() => {
          if (newStatus === 2) alert("Account blocked successfully!");
          else if (newStatus === 1) alert("Account unlocked!");

          this.loadUserData();
        })
        .catch((err) => {
          console.error("Error:", err);
          alert("An error occurred, please try again!");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
/* .custom-scrollbar {
  max-height: calc(100vh - 140px);
  overflow-y: auto;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #dee2e6;
  border-radius: 10px;
}

.form-control:focus,
.form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1);
} */
</style>
