<template>
  <div class="container">

    <div class="row">
      <div class="col-3 ">
        <div class="card">
          <div class="card-body d-flex align-items-center justify-content-center flex-column gap-3">
            <img v-bind:src="thong_tin.avt" class="rounded-circle border border-3 border-success" alt="avt"
              style="width: 150px; aspect-ratio: 1/1;" />

            <p class="m-0">{{ thong_tin.email }}</p>

            <!-- nút đổi avt -->
            <button class="btn btn-outline-success w-100 d-flex align-items-center justify-content-center gap-2 "
              @click="triggerFileInput" :disabled="uploadingAvatar">
              <div v-if="uploadingAvatar" class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <i v-else class="fa-solid fa-rotate"></i>
              <p class="m-0 p-0">{{ uploadingAvatar ? 'Đang xử lý ảnh...' : 'Change Avatar' }}</p>
            </button>

            <!-- input file ẩn -->
            <input type="file" ref="file" style="display: none" accept="image/*" @change="handleFileChange" />
            <button type="button" class="btn btn-success w-100" data-bs-toggle="modal"
              data-bs-target="#exampleModal">Change Password</button>

          </div>
        </div>

      </div>

      <div class="col-9">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="mb-3 col-lg-12">
                <label class="m-1">Full name</label>
                <input type="text" class="form-control" v-model="thong_tin.username" />
              </div>

              <div class="mb-3 col-lg-6">
                <label class="m-1">Contact Number</label>
                <input type="text" class="form-control" v-model="thong_tin.phonenumber" />
              </div>

              <div class="mb-3 col-lg-6">
                <label class="m-1">Identification</label>
                <input type="text" class="form-control" v-model="thong_tin.cccd">
              </div>

              <div class="mb-3 col-lg-6">
                <label class="m-1">Gender</label>
                <select v-model="thong_tin.gender" class="form-select" id="gender">
                  <option disabled value="">-- Choose Gender --</option>
                  <option v-for="option in genderOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
              <div class="mb-3 col-lg-6">
                <label class="m-1">Date of Birth</label>
                <input type="date" class="form-control" v-model="thong_tin.dateOfBirth" />
              </div>
              <div class="mb-3 col-lg-12">
                <label class="m-1">Address</label>
                <input type="text" class="form-control" v-model="thong_tin.address" />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-lg-12 d-flex justify-content-end gap-3">
                <button type="button" class="btn btn-success w-md-100 w-md-auto" @click="updateProfile()"
                  :disabled="loading">
                  <span v-if="loading">Saving...</span>
                  <span class="fs-6" v-else>Save changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>




      </div>
    </div>


  </div>

  <!-- Modal change password -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-flex flex-column">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
            <p class="text-muted small m-0">Password management to secure your account</p>
          </div>

          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row mb-2">
            <div class="col-lg-4">
              <label for="">Mật khẩu cũ</label>
            </div>
            <div class="col-lg-8">
              <!-- <input v-model="doi_mat_khau.old_password" type="password" placeholder="Nhập mật khẩu cũ" class="form-control"> -->
              <input placeholder="Nhập mật khẩu cũ" class="form-control">
            </div>
          </div>

          <div class="row mb-2">
            <div class="col-lg-4">
              <label for="">Mật khẩu mới</label>
            </div>
            <div class="col-lg-8">
              <input type="password" placeholder="Nhập mật khẩu mới" class="form-control">
              <!-- <input v-model="doi_mat_khau.new_password" type="password" placeholder="Nhập mật khẩu mới" class="form-control"> -->
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-lg-4">
              <label for="">Nhập lại Mật khẩu mới </label>
            </div>
            <div class="col-lg-8">
              <input type="password" placeholder="Nhập lại mật khẩu mới" class="form-control">
              <!-- <input v-model="doi_mat_khau.re_password" type="password" placeholder="Nhập lại mật khẩu mới" class="form-control"> -->
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" >Save changes</button>
          <!-- <button type="button" class="btn btn-primary" @click="doiMatKhau()">Save changes</button> -->
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
      thong_tin: {
        username: "",
        email: "",
        phonenumber: "",
        cccd: "",
        address: "",
        avt: "",
        dateOfBirth: "",

      },
      gender: "",
      accountOwner: "",
      bankAccount: "",
      banks: [],
      bankName: "",
      loading: false,
      uploadingAvatar: false,
      error: null,
      avtPreview: "",
      genderOptions: [
        { value: 0, label: "Male" },
        { value: 1, label: "Female" },
        { value: 2, label: "Other" },
      ],
    };
  },

  mounted() {
    // this.loadEmail();
    // this.loadAvt();
    this.fetchBankName();
    this.loadUserData();
  },

  methods: {
    loadUserData() {
      axios
        .get('http://localhost:8081/api/user/info', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
          }
        })
        .then((res) => {
          this.thong_tin = res.data;
          console.log(this.thong_tin);

        })
        .catch((err) => {
          console.error(err);
          this.$toast.error("Không thể tải thông tin người dùng!");
        });
    },

    // loadEmail() {
    //   this.email = localStorage.getItem("email_kh") || "";
    // },

    loadAvt() {
      this.avt = localStorage.getItem("userAvt") || "";
    },

    // mở input file
    triggerFileInput() {
      this.$refs.file.click();
    },

    // chọn file
    async handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Kiểm tra xem có phải là ảnh không
        if (!file.type.startsWith('image/')) {
          this.$toast.error('Vui lòng chọn file ảnh!');
          return;
        }

        this.uploadingAvatar = true; // Bắt đầu loading
        this.avtPreview = URL.createObjectURL(file); // hiển thị preview

        // Compress ảnh trước khi upload
        try {
          const compressedFile = await this.compressImage(file);
          await this.uploadAvatar(compressedFile); // gọi API upload với ảnh đã compress
        } catch (error) {
          console.error('Lỗi compress ảnh:', error);
          this.$toast.error('Có lỗi khi xử lý ảnh!');
        } finally {
          this.uploadingAvatar = false; // Kết thúc loading
        }
      }
    },

    // Hàm compress ảnh với độ nén cao
    compressImage(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;

          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Giảm kích thước tối đa xuống 500x500 (cho avatar không cần quá lớn)
            const maxWidth = 500;
            const maxHeight = 500;
            let width = img.width;
            let height = img.height;

            // Tính toán tỷ lệ resize
            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
            }

            canvas.width = width;
            canvas.height = height;

            // Enable image smoothing để ảnh mượt hơn khi resize
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Vẽ ảnh lên canvas với kích thước mới
            ctx.drawImage(img, 0, 0, width, height);

            // Convert canvas sang blob với chất lượng 0.65 (65%) - giảm mạnh hơn
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  // Kiểm tra nếu ảnh vẫn còn quá lớn, compress thêm lần nữa
                  if (blob.size > 200 * 1024) { // Nếu > 200KB
                    // Compress thêm lần nữa với chất lượng thấp hơn
                    canvas.toBlob(
                      (secondBlob) => {
                        if (secondBlob) {
                          const compressedFile = new File([secondBlob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                          });

                          this.logCompressionResult(file.size, compressedFile.size);
                          resolve(compressedFile);
                        } else {
                          reject(new Error('Second compression failed'));
                        }
                      },
                      'image/jpeg',
                      0.5 // Chất lượng 50% cho file lớn
                    );
                  } else {
                    // Tạo file mới từ blob
                    const compressedFile = new File([blob], file.name, {
                      type: 'image/jpeg',
                      lastModified: Date.now()
                    });

                    this.logCompressionResult(file.size, compressedFile.size);
                    resolve(compressedFile);
                  }
                } else {
                  reject(new Error('Canvas to blob failed'));
                }
              },
              'image/jpeg',
              0.65 // Chất lượng 65%
            );
          };

          img.onerror = () => {
            reject(new Error('Image load failed'));
          };
        };

        reader.onerror = () => {
          reject(new Error('File read failed'));
        };
      });
    },

    // Helper function để log kết quả compression
    logCompressionResult(originalSize, compressedSize) {
      const originalKB = (originalSize / 1024).toFixed(2);
      const compressedKB = (compressedSize / 1024).toFixed(2);
      const reducedPercent = (((originalSize - compressedSize) / originalSize) * 100).toFixed(2);

      console.log('%c📊 Image Compression Results:', 'color: #044a42; font-weight: bold; font-size: 14px');
      console.log(`%c   Original:    ${originalKB} KB`, 'color: #ff6b6b');
      console.log(`%c   Compressed:  ${compressedKB} KB`, 'color: #51cf66');
      console.log(`%c   Reduced by:  ${reducedPercent}%`, 'color: #339af0; font-weight: bold');
      console.log(`%c   Final size:  ${compressedKB} KB ${compressedSize < 100 * 1024 ? '✅' : compressedSize < 200 * 1024 ? '⚠️' : '❌'}`, 'color: #868e96');
    },

    // upload avatar dùng async/await
    async uploadAvatar(file) {
      const formData = new FormData();
      formData.append("avatarFile", file);

      try {
        const res = await axios.put("http://localhost:8081/api/user/profile/avatar", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            // "Content-Type": "multipart/form-data",
          },
        });

        console.log("Upload thành công:", res.data);

        // Cập nhật avatar mới vào thong_tin
        this.thong_tin.avt = res.data.avt || res.data;

        //lưu vào localStorage để giữ lại sau reload
        localStorage.setItem("userAvt", this.thong_tin.avt);
        localStorage.setItem("avatar_kh", this.thong_tin.avt);

        // Xóa preview vì đã có link thật
        this.avtPreview = "";

        // Emit event để thông báo cho các component khác (như MenuClient) cập nhật avatar
        window.dispatchEvent(new CustomEvent('avatar-updated', {
          detail: { avatar: this.thong_tin.avt }
        }));

        this.$toast.success("Cập nhật avatar thành công!");
      } catch (err) {
        console.error("Upload avatar error:", err);
        this.$toast.error("Upload avatar thất bại!");
        throw err; // Throw để catch ở handleFileChange
      }
    },

    //  update thông tin
    updateProfile() {
      this.loading = true;
      this.error = null;


      axios
        .put("http://localhost:8081/api/user/profile", this.thong_tin, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if(res.data.status){
            this.loadUserData();
            this.$toast.success("Cập nhật thông tin thành công!");
            console.log("Update response:", res.data.data);
          }else{
            this.$toast.error(res.data.message);
          }

        })
        .catch((err) => {
          this.error = "Cập nhật thất bại!";
          this.$toast.error("Cập nhật thông tin thất bại!");
          console.log("Update error:", err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // tên ngân hàng
    fetchBankName() {
      axios
        .get("https://api.vietqr.io/v2/banks")
        .then((res) => {
          this.banks = res.data.data;
        })
        .catch((err) => {
          console.error("Lỗi lấy danh sách ngân hàng:", err);
          this.$toast.error("Không thể tải danh sách ngân hàng!");
        });
    },
  },


};
</script>

<style scoped>
.circle-bg {
  width: 30px;
  height: 30px;
  background: rgba(0, 123, 255, 0.1);
  box-shadow: 0 0 30px rgba(0, 123, 255, 0.2);
}

/* .info,
.button {
  border: 1px solid #044a42 !important;
  transition: all 0.3s ease;
} */

.button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background-color: rgba(4, 74, 66, 0.05) !important;
}

.button:hover:not(:disabled) {
  background-color: rgba(4, 74, 66, 0.1) !important;
  transform: translateY(-1px);
}

/* .form-control {
  background-color: transparent !important;
  border: 1px solid #cad0db;
} */

/* span {
  font-size: 10px;
} */
</style>
