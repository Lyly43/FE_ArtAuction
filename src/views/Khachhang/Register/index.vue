<template>
  <!-- Background chính với gradient và triangles -->
  <div class="login-background">
    <!-- Triangle shapes positioned like in the image -->
    <div class="triangle-1"></div>
    <div class="triangle-2"></div>
    <div class="triangle-3"></div>
    <div class="triangle-5"></div>
    <div class="triangle-6"></div>
    <div class="triangle-7"></div>
    <div class="triangle-8"></div>
    <div class="triangle-9"></div>

    <!-- Nội dung chính -->
    <div class="container container-acc">
      <div class="row d-flex justify-content-around align-items-center  w-100">
        <div class="col-lg-5 col-md-4 col-sm-12 d-flex flex-column d-none d-md-inline"  data-aos="fade-right" data-aos-duration="800">
          <div class="d-flex gap-3 align-items-center mb-auto">
            <img src="../../../assets/img/Logo_AA.png" class="logoLogin" alt="">
            <h3 class="fw-bold m-0"><span class="text-success fw-bold ">Art</span>Auction</h3>
          </div>
          <div class="py-lg-5 my-5">
            <h1 class="text-acc pb-2">Let’s get started !</h1>
            <div class="border border-3 w-75 border-success rounded mb-5"></div>
            <p class="left mb-lg-5 py-3">Becoming a member is the first step toward owning pieces that truly
              inspire, opening the
              door to
              new experiences and meaningful connections.</p>
          </div>
        </div>
        <div class="col-lg-5 col-md-8 col-sm-12 ">
          <div class="card card-acc" data-aos="fade-left" data-aos-duration="800">
            <div class="card-body p-5">
              <!-- form -->
              <div class="d-flex flex-column gap-2">
                <h3 class="text-center text-success fw-bold mb-4">Sign Up</h3>
                <div class="d-flex flex-column gap-3">
                  <!-- Username -->
                  <div class="group-input col-lg-12 col-md-12">
                    <input v-model="tai_khoan.username" type="text" class="form-control" id="username" required @keydown.enter.prevent="DangKy">
                    <label for="username">Username</label>
                    <i class="bi bi-person fa-xl text-success"></i>
                  </div>
                  <!-- Email -->
                  <div class="group-input col-lg-12 col-md-12">
                    <input v-model="tai_khoan.email" type="email" class="form-control" id="email" required @keydown.enter.prevent="DangKy">
                    <label for="email">Email</label>
                    <i class="bi bi-envelope fa-xl text-success"></i>
                  </div>
                  <!-- Password -->
                  <div class="group-input col-lg-12 col-md-12">
                    <input v-model="tai_khoan.password" :type="showPassword ? 'text' : 'password'" class="form-control"
                      id="password" required @keydown.enter.prevent="DangKy">
                    <label for="password">Password</label>
                    <i class="bi fa-xl" :class="showPassword ? 'bi-eye' : 'bi-eye-slash'" @click="togglePassword"
                      style="cursor: pointer;"></i>
                  </div>
                  <!-- RePassword -->
                  <div class="group-input col-lg-12 col-md-12">
                    <input v-model="tai_khoan.confirmPassword" :type="showRePassword ? 'text' : 'password'"
                      class="form-control" id="repassword" required @keydown.enter.prevent="DangKy">
                    <label for="repassword">RePassword</label>
                    <i class="bi fa-xl" :class="showRePassword ? 'bi-eye' : 'bi-eye-slash'" @click="toggleRePassword"
                      style="cursor: pointer;"></i>
                  </div>
                </div>

                <!-- Terms & Conditions -->
                <div class="form-check">
                  <input class="form-check-input border border-success" type="checkbox" id="terms" v-model="acceptTerms"
                    required>
                  <label class="form-check-label text-muted" for="terms">
                    I agree to the <a href="#" class="text-success text-decoration-none">Terms &
                      Conditions</a>
                  </label>
                </div>

                <div class="d-flex flex-column align-items-center gap-3 mt-2">
                  <button class="btn btn-success fw-bold w-100" @click="DangKy()" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ loading ? 'Signing up...' : 'Sign Up' }}
                  </button>


                  <p class="m-0">Already have an account?
                    <router-link to="/login" href="#" class="text-success fw-bold text-decoration-none">Sign
                      In</router-link>
                  </p>
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
import axios from 'axios'
export default {
  data() {
    return {
      showPassword: false,
      showRePassword: false,
      acceptTerms: false,
      loading: false,
      tai_khoan: {},
    }
  },
  mounted() {

  },
  methods: {
    DangKy() {
      // Prevent double click
      if (this.loading) {
        return;
      }

      // Check all required fields
      if (!this.tai_khoan.username || !this.tai_khoan.username.trim()) {
        this.$toast.error("Please enter Username");
        this.tai_khoan.username = "";
        this.$nextTick(() => {
          document.getElementById('username')?.focus();
        });
        return;
      }

      // Validate Username length: ít nhất 3 ký tự và nhỏ hơn 20 ký tự
      const trimmedUsername = this.tai_khoan.username.trim();
      if (trimmedUsername.length < 3) {
        this.$toast.error("Username must be at least 3 characters");
        this.tai_khoan.username = "";
        this.$nextTick(() => {
          document.getElementById('username')?.focus();
        });
        return;
      }
      if (trimmedUsername.length >= 20) {
        this.$toast.error("Username must be less than 20 characters");
        this.tai_khoan.username = "";
        this.$nextTick(() => {
          document.getElementById('username')?.focus();
        });
        return;
      }
      // Cập nhật username đã được trim
      this.tai_khoan.username = trimmedUsername;

      if (!this.tai_khoan.email || !this.tai_khoan.email.trim()) {
        this.$toast.error("Please enter Email");
        this.tai_khoan.email = "";
        this.$nextTick(() => {
          document.getElementById('email')?.focus();
        });
        return;
      }

      // Check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.tai_khoan.email)) {
        this.$toast.error("Invalid email format");
        this.tai_khoan.email = "";
        this.$nextTick(() => {
          document.getElementById('email')?.focus();
        });
        return;
      }

      if (!this.tai_khoan.password || !this.tai_khoan.password.trim()) {
        this.$toast.error("Please enter Password");
        this.tai_khoan.password = "";
        this.$nextTick(() => {
          document.getElementById('password')?.focus();
        });
        return;
      }

      // Validate Password length: ít nhất 6 ký tự
      const trimmedPassword = this.tai_khoan.password.trim();
      if (trimmedPassword.length < 6) {
        this.$toast.error("Password must be at least 6 characters");
        this.tai_khoan.password = "";
        this.tai_khoan.confirmPassword = "";
        this.$nextTick(() => {
          document.getElementById('password')?.focus();
        });
        return;
      }
      if (trimmedPassword.length >= 15) {
        this.$toast.error("Password must be less than 15 characters");
        this.tai_khoan.password = "";
        this.tai_khoan.confirmPassword = "";
        this.$nextTick(() => {
          document.getElementById('password')?.focus();
        });
        return;
      }
      // Cập nhật password đã được trim
      this.tai_khoan.password = trimmedPassword;

      if (!this.tai_khoan.confirmPassword || !this.tai_khoan.confirmPassword.trim()) {
        this.$toast.error("Please enter RePassword");
        this.tai_khoan.confirmPassword = "";
        this.$nextTick(() => {
          document.getElementById('repassword')?.focus();
        });
        return;
      }

      // Check if password and confirmPassword match
      const trimmedConfirmPassword = this.tai_khoan.confirmPassword.trim();
      if (this.tai_khoan.password !== trimmedConfirmPassword) {
        this.$toast.error("Password and RePassword do not match");
        this.tai_khoan.password = "";
        this.tai_khoan.confirmPassword = "";
        this.$nextTick(() => {
          document.getElementById('password')?.focus();
        });
        return;
      }
      // Cập nhật confirmPassword đã được trim
      this.tai_khoan.confirmPassword = trimmedConfirmPassword;

      // Check Terms & Conditions checkbox
      if (!this.acceptTerms) {
        this.$toast.error("Please agree to Terms & Conditions");
        return;
      }

      // If all fields are valid, call register API
      this.loading = true;

      axios.post('http://localhost:8081/register', this.tai_khoan)
        .then(response => {
          if (response.data.status == 1) {
            this.$toast.success(response.data.message);
            console.log(response.data);
             this.$router.push('/login');

          } else {
            this.$toast.error(response.data.message);
            console.log(response.data);
          }

        })
        .catch((res) => {
          if (res.response && res.response.data && res.response.data.errors) {
            const errors = res.response.data.errors;
            // Clear fields that have errors
            if (errors.username) {
              this.tai_khoan.username = "";
            }
            if (errors.email) {
              this.tai_khoan.email = "";
            }
            if (errors.password) {
              this.tai_khoan.password = "";
              this.tai_khoan.confirmPassword = "";
            }

            const list = Object.values(errors);
            list.forEach((v) => {
              this.$toast.error(v[0]);
            });
          } else {
            this.$toast.error("An error occurred during registration");
          }
        })
        .finally(() => {
          this.loading = false;
        })

    },

    registerWithGoogle() {
      console.log('Register with Google clicked');
    },

    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    toggleRePassword() {
      this.showRePassword = !this.showRePassword;
    },
  }
}
</script>
<style></style>
