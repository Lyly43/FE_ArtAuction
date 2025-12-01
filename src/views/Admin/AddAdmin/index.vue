<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div>
        <div class="d-flex align-items-center gap-2 mb-1">
          <router-link
            to="/admin/management-employees"
            class="btn btn-light btn-sm rounded-circle shadow-sm"
          >
            <i class="fa-solid fa-arrow-left text-secondary"></i>
          </router-link>
          <h4 class="fw-bold text-primary mb-0">Create New Admin</h4>
        </div>
        <p class="text-body-secondary mb-0 ms-5">Create a new profile and assign permissions</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-light text-secondary fw-bold shadow-sm px-4">Reset</button>
        <button class="btn btn-primary fw-bold shadow-sm px-4" @click="submitForm">
          <i class="fa-solid fa-check me-2"></i> Create Account
        </button>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-12 col-lg-4 col-xl-3">
        <div class="card border-0 shadow-sm rounded-4 mb-4">
          <div class="card-body text-center p-4">
            <h6 class="fw-bold text-secondary mb-3">Profile Picture</h6>

            <div
              class="position-relative d-inline-block mb-3"
              @click="$refs.fileInput.click()"
              style="cursor: pointer"
            >
              <div
                class="rounded-circle border border-3 border-light shadow-sm overflow-hidden d-flex align-items-center justify-content-center bg-light"
                style="width: 150px; height: 150px; margin: 0 auto"
              >
                <img
                  v-if="previewImage"
                  :src="previewImage"
                  class="w-100 h-100 object-fit-cover"
                  alt="Avatar Preview"
                />
                <div v-else class="text-secondary text-center">
                  <i class="fa-regular fa-image fs-1 mb-2"></i>
                  <p class="small mb-0 fw-medium">Upload</p>
                </div>
              </div>

              <div
                class="position-absolute bottom-0 end-0 bg-white rounded-circle shadow-sm p-2 border"
                style="transform: translate(10%, 10%)"
              >
                <i class="fa-solid fa-camera text-primary"></i>
              </div>
            </div>

            <p class="text-muted x-small mb-3">
              Allowed *.jpeg, *.jpg, *.png, *.webp <br />
              max size of 3 MB
            </p>

            <input
              type="file"
              ref="fileInput"
              class="d-none"
              accept="image/*"
              @change="handleFileUpload"
            />
          </div>
        </div>

        <div class="card border-0 shadow-sm rounded-4">
          <div class="card-body p-4">
            <h6 class="fw-bold text-secondary mb-3">Account Status</h6>
            <div
              class="form-check form-switch d-flex align-items-center justify-content-between ps-0"
            >
              <label class="form-check-label fw-medium" for="statusSwitch">
                {{ form.status === 1 ? "Active" : "Locked" }}
              </label>
              <input
                class="form-check-input ms-auto"
                type="checkbox"
                role="switch"
                id="statusSwitch"
                style="width: 3em; height: 1.5em"
                v-model="statusBoolean"
              />
            </div>
            <p class="text-muted x-small mt-2 mb-0">
              If locked, this admin will not be able to access the system.
            </p>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-8 col-xl-9">
        <div class="card border-0 shadow-sm rounded-4 h-100">
          <div class="card-body p-4 p-md-5">
            <div class="mb-5">
              <div class="d-flex align-items-center mb-4">
                <div
                  class="bg-secondary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                  style="width: 40px; height: 40px"
                >
                  <i class="fa-solid fa-user-shield"></i>
                </div>
                <h5 class="fw-bold mb-0">Account Credentials</h5>
              </div>

              <div class="row g-3">
                <div class="col-12">
                  <div class="form-floating">
                    <input
                      type="email"
                      class="form-control bg-light border-0"
                      id="emailInput"
                      placeholder="name@example.com"
                      v-model="form.email"
                    />
                    <label for="emailInput">Email Address <span class="text-danger">*</span></label>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-floating">
                    <input
                      type="password"
                      class="form-control bg-light border-0"
                      id="passInput"
                      placeholder="Password"
                      v-model="form.password"
                    />
                    <label for="passInput">Password <span class="text-danger">*</span></label>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-floating">
                    <input
                      v-model="form.confirmPassword"
                      type="password"
                      class="form-control bg-light border-0"
                      id="confirmPassInput"
                      placeholder="Confirm Password"
                    />
                    <label for="confirmPassInput"
                      >Confirm Password <span class="text-danger">*</span></label
                    >
                  </div>
                </div>
              </div>
            </div>

            <hr class="border-secondary opacity-10 my-4" />

            <div class="mb-5">
              <div class="d-flex align-items-center mb-4">
                <div
                  class="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center me-3"
                  style="width: 40px; height: 40px"
                >
                  <i class="fa-solid fa-id-card"></i>
                </div>
                <h5 class="fw-bold mb-0">Personal Information</h5>
              </div>

              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control bg-light border-0"
                      id="nameInput"
                      placeholder="John Doe"
                      v-model="form.fullName"
                    />
                    <label for="nameInput">Full Name <span class="text-danger">*</span></label>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="form-floating">
                    <input
                      type="tel"
                      class="form-control bg-light border-0"
                      id="phoneInput"
                      placeholder="0909..."
                      v-model="form.phoneNumber"
                    />
                    <label for="phoneInput">Phone Number</label>
                  </div>
                </div>
                <div class="col-12">
                  <label class="form-label fw-bold text-secondary small text-uppercase mb-2"
                    >Role & Permissions</label
                  >
                  <div class="row g-3">
                    <div class="col-6 col-md-3" v-for="role in roles" :key="role.value">
                      <input
                        type="radio"
                        class="btn-check"
                        name="roleOptions"
                        :id="'role' + role.value"
                        :value="role.value"
                        v-model="form.role"
                      />
                      <label
                        class="btn btn-outline-light text-dark border w-100 d-flex flex-column align-items-center justify-content-center py-3 gap-2 h-100"
                        :for="'role' + role.value"
                        :class="{
                          'border-secondary bg-secondary-subtle text-primary fw-bold':
                            form.role === role.value,
                        }"
                      >
                        <i :class="role.icon + ' fs-4'"></i>
                        <span>{{ role.label }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-md-none mt-4">
              <button class="btn btn-secondary w-100 fw-bold py-3 shadow-sm" @click="submitForm">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddAdmin",
  data() {
    return {
      previewImage: null,
      selectedFile: null,
      isSubmitting: false,

      form: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address: "Vietnam",
        role: "admin",
        status: 1, // 1: Active, 0: Locked
        avatar: "",
      },

      roles: [
        { label: "Super Admin", value: "super_admin", icon: "fa-solid fa-crown text-danger" }, // Tất cả, gồm cả phân quyền
        { label: "Auction Admin", value: "admin", icon: "fa-solid fa-gavel text-info" }, // Duyệt tác phẩm, quản lý phiên đấu giá, kiểm soát livestream
        // { label: "Content Admin", value: "moderator", icon: "fa-solid fa-gavel text-info" },
        { label: "Finance Admin", value: "finance", icon: "fa-solid fa-dollar-sign text-warning" }, //Thanh toán, refund, invoice
        { label: "Support Admin", value: "support", icon: "fa-solid fa-users-gear text-success" }, // Xử lý khiếu nại, cảnh báo, khóa user
      ],
    };
  },

  computed: {
    statusBoolean: {
      get() {
        return this.form.status === 1;
      },
      set(val) {
        this.form.status = val ? 1 : 0;
      },
    },
  },

  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.previewImage = URL.createObjectURL(file);
      }
    },

    submitForm() {
      // 1. Validate dữ liệu
      if (!this.form.email || !this.form.password || !this.form.fullName) {
        alert("Vui lòng điền đầy đủ các trường bắt buộc (*)");
        return;
      }
      if (this.form.password !== this.form.confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }

      this.isSubmitting = true;

      // 2. Tạo Promise xử lý ảnh (Upload hoặc trả về rỗng)
      let uploadImagePromise;

      if (this.selectedFile) {
        // Nếu có chọn file -> Gọi API Upload
        const formData = new FormData();
        formData.append("file", this.selectedFile);

        uploadImagePromise = axios
          .post("http://localhost:8081/api/upload/image", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            // Trả về URL ảnh để step sau dùng
            return res.data.url;
          });
      } else {
        // Nếu không chọn file -> Trả về chuỗi rỗng ngay lập tức
        uploadImagePromise = Promise.resolve("");
      }

      // 3. Chuỗi xử lý chính (Chain)
      uploadImagePromise
        .then((avatarUrl) => {
          // --- Lúc này đã có avatarUrl (hoặc rỗng) ---

          const payload = {
            fullName: this.form.fullName,
            email: this.form.email,
            password: this.form.password,
            phoneNumber: this.form.phoneNumber,
            address: this.form.address,
            status: this.form.status,
            role: this.form.role,
            avatar: avatarUrl, // Gán URL vào đây
          };

          console.log("Payload gửi đi:", payload);

          // Gọi API thêm Admin
          return axios.post("http://localhost:8081/api/admin/admins/them-admin", payload, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
        })
        .then((res) => {
          // --- Xử lý khi thành công ---
          alert("Tạo tài khoản Admin thành công!");
          this.$router.push("/admin/management-employees");
        })
        .catch((err) => {
          // --- Xử lý lỗi (cho cả upload và create) ---
          console.error("Lỗi quy trình:", err);

          let message = "Có lỗi xảy ra!";
          if (err.response && err.response.data) {
            message = err.response.data.message || JSON.stringify(err.response.data);
          }
          alert("Thất bại: " + message);
        })
        .finally(() => {
          // --- Luôn chạy để tắt loading ---
          this.isSubmitting = false;
        });
    },
  },
};
</script>

<style scoped>
/* Custom CSS nhỏ để tinh chỉnh */
.x-small {
  font-size: 0.75rem;
}

/* Hiệu ứng hover cho nút upload ảnh */
.rounded-circle.border:hover {
  border-color: var(--bs-primary) !important;
  opacity: 0.9;
}

/* Style cho Floating label input để bỏ viền default xấu của browser khi focus */
.form-control:focus {
  box-shadow: none;
  border: 1px solid var(--bs-primary) !important; /* Viền khi focus */
  background-color: #fff !important;
}

/* Style cho Radio Button Role Selection */
.btn-check:checked + .btn {
  border-width: 2px;
}
</style>
