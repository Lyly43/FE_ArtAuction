<template>
  <div class="container-fluid bg-light min-vh-100 py-4">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Đang tải thông tin phòng đấu giá...</p>
    </div>

    <!-- Main Content -->
    <div v-else class="container">

      <!-- Progress Steps -->
      <div class="row mb-5">
        <div class="col-12">
          <div class="card p-0">
            <div class="card-body">
              <div class="d-flex justify-content-center align-items-center gap-3">
                <div class="text-center">
                  <div class="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                    :class="currentStep >= 1 ? 'bg-success text-white' : 'bg-secondary text-white'"
                    style="width: 40px; height: 40px;">
                    <strong>1</strong>
                  </div>
                  <small :class="currentStep >= 1 ? 'text-success fw-bold' : 'text-muted'">Thông tin</small>
                </div>
                <div class="border-top flex-grow-1" :class="currentStep > 1 ? 'border-success' : 'border-secondary'"
                  style="width: 100px; max-width: 150px; border-width: 3px !important;"></div>
                <div class="text-center">
                  <div class="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                    :class="currentStep >= 2 ? 'bg-success text-white' : 'bg-secondary text-white'"
                    style="width: 40px; height: 40px;">
                    <strong>2</strong>
                  </div>
                  <small :class="currentStep >= 2 ? 'text-success fw-bold' : 'text-muted'">Xác nhận</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 1: Auction Information -->
      <div v-show="currentStep === 1">
        <div class="row">
          <!-- Room Details -->
          <div class="col-lg-7">
            <div class="card p-0">
              <div class="card-header bg-success text-white">
                <h5 class="mb-0"><i class="fa-solid fa-info-circle me-2"></i>Chi Tiết Phòng</h5>
              </div>
              <div class="card-body">
                <div class="row d-flex">
                  <div class="col-lg-6">
                    <div class="row gap-3">
                      <div class="col-12">
                        <div class="position-relative overflow-hidden">
                          <img :src="auctionRoom.imageAuctionRoom" class="w-100 rounded-3" alt="Auction Room">
                          <span class="position-absolute top-0 start-0 m-3 badge bg-danger">
                            {{ getStatusText(auctionRoom.status) }}
                          </span>
                        </div>
                      </div>
                      <!-- <div class="col-12 d-flex justify-content-between">
                        <p class="m-0 text-muted small">Số tác phẩm</p>
                        <p class="m-0 text-end"><strong class="text-success">{{ sessions.length }}</strong></p>
                      </div> -->
                      <div class="col-12">
                        <div class=" d-flex justify-content-between alert alert-success py-2 m-0">
                          <p class="m-0 text-muted small">Người đăng ký</p>
                          <p class="m-0"><strong class="text-success">{{ auctionRoom.viewCount || 0 }}</strong>
                          </p>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="row gap-3">
                      <div class="col-12 d-flex justify-content-between">
                        <p class="m-0 text-muted small">Mã phòng</p>
                        <p class="m-0 fw-semibold">{{ auctionRoom.id }}</p>
                      </div>
                      <div class="col-12 d-flex justify-content-between">
                        <p class="m-0 text-muted small">Tên phòng</p>
                        <p class="m-0 fw-bold">{{ auctionRoom.roomName }}</p>
                      </div>
                      <div class="col-12 d-flex justify-content-between">
                        <p class="m-0 text-muted small">Loại hình</p>
                        <p class="m-0"><span class="badge bg-info">{{ auctionRoom.type }}</span></p>
                      </div>
                      <div class="col-12 d-flex justify-content-between">
                        <p class="m-0 text-muted small">Bắt đầu</p>
                        <p class="m-0">{{ formatTime(auctionRoom.startedAt) }}</p>
                      </div>
                      <div class="col-12 d-flex justify-content-between">
                        <p class="m-0 text-muted small">Kết thúc</p>
                        <p class="m-0">{{ formatTime(auctionRoom.stoppedAt) }}</p>
                      </div>
                      <div class="col-12">
                        <p class="m-0 text-muted small">Mô tả</p>
                        <p class="m-0 ">{{ auctionRoom.description || 'N/A' }}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Artworks List -->
          <div class="col-5" v-if="sessions.length > 0">
            <div class="card shadow-sm border-0">
              <div class="card-header bg-success text-white">
                <h5 class="mb-0"><i class="fa-solid fa-palette me-2"></i>Tác Phẩm Đấu Giá ({{ sessions.length }})</h5>
              </div>
              <div class="card-body p-2" style="max-height: 500px; overflow-y: auto;">
                <div class="list-group list-group-flush">
                  <a v-for="(session, index) in sessions" :key="session.id" href="#"
                    class="list-group-item list-group-item-action p-2 mb-2 rounded" data-bs-toggle="modal"
                    data-bs-target="#sessionModal" @click="selectedSession = session">
                    <div class="d-flex gap-3 align-items-center">
                      <!-- Artwork Image -->
                      <div class="flex-shrink-0 position-relative">
                        <img :src="session.imageUrl || 'https://via.placeholder.com/80x80?text=No+Image'"
                          class="rounded" style="width: 80px; height: 80px; object-fit: cover;" alt="Artwork">
                        <span class="position-absolute top-0 start-0 badge bg-success rounded-circle m-1"
                          style="width: 25px; height: 25px; font-size: 0.7rem; padding: 0; display: flex; align-items: center; justify-content: center;">
                          {{ index + 1 }}
                        </span>
                      </div>

                      <!-- Artwork Info -->
                      <div class="flex-grow-1 min-w-0">
                        <h6 class="mb-1 fw-bold text-truncate">{{ session.artworkId }}</h6>
                        <div class="small">
                          <div class="d-flex justify-content-between mb-1">
                            <span class="text-muted">Giá khởi điểm:</span>
                            <strong class="text-success">{{ formatCurrency(session.startingPrice) }}</strong>
                          </div>
                          <div class="d-flex justify-content-between">
                            <span class="text-muted">Bước giá:</span>
                            <strong class="text-warning">{{ formatCurrency(session.bidStep) }}</strong>
                          </div>
                        </div>
                      </div>

                      <!-- View Icon -->
                      <div class="flex-shrink-0">
                        <i class="fa-solid fa-chevron-right text-muted"></i>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Next Button -->
          <div class="col-12">
            <div class="text-center mt-3">
              <button class="btn btn-primary btn-lg px-5" @click="currentStep = 2">
                Tiếp tục <i class="fa-solid fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Session Detail Modal -->
      <div class="modal fade" id="sessionModal" tabindex="-1" aria-labelledby="sessionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content" v-if="selectedSession">
            <div class="modal-header bg-success text-white">
              <h5 class="modal-title" id="sessionModalLabel">
                <i class="fa-solid fa-image me-2"></i>Chi Tiết Tác Phẩm
              </h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row g-4">
                <!-- Artwork Image -->
                <div class="col-md-5">
                  <img :src="selectedSession.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image'"
                    class="img-fluid rounded shadow-sm w-100" style="max-height: 300px; object-fit: cover;"
                    alt="Artwork">
                  <div class="mt-3">
                    <span class="badge" :class="getSessionStatusClass(selectedSession.status)">
                      {{ getSessionStatusText(selectedSession.status) }}
                    </span>
                    <span class="badge bg-info ms-2">{{ selectedSession.type }}</span>
                  </div>
                </div>

                <!-- Artwork Details -->
                <div class="col-md-7">
                  <h4 class="fw-bold text-success mb-3">{{ selectedSession.artworkId }}</h4>

                  <div class="mb-4">
                    <h5 class="text-muted small mb-2">THÔNG TIN GIÁ</h5>
                    <div class="row g-2">
                      <div class="col-6">
                        <div class="card bg-light border-0">
                          <div class="card-body p-3">
                            <small class="text-muted d-block">Giá khởi điểm</small>
                            <strong class="text-success">{{ formatCurrency(selectedSession.startingPrice) }}</strong>
                          </div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="card bg-light border-0">
                          <div class="card-body p-3">
                            <small class="text-muted d-block">Giá hiện tại</small>
                            <strong class="text-primary">{{ formatCurrency(selectedSession.currentPrice) }}</strong>
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="card bg-light border-0">
                          <div class="card-body p-3">
                            <small class="text-muted d-block">Bước giá</small>
                            <strong class="text-warning">{{ formatCurrency(selectedSession.bidStep) }}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mb-4">
                    <h5 class="text-muted small mb-2">THỐNG KÊ</h5>
                    <div class="d-flex justify-content-between mb-2">
                      <span class="text-muted">Số lượt đấu giá:</span>
                      <strong>{{ selectedSession.bidCount || 0 }} lượt</strong>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span class="text-muted">Lượt xem:</span>
                      <strong>{{ selectedSession.viewCount || 0 }} lượt</strong>
                    </div>
                  </div>

                  <div>
                    <h5 class="text-muted small mb-2">THỜI GIAN</h5>
                    <div class="d-flex justify-content-between mb-2">
                      <span class="text-muted">Bắt đầu:</span>
                      <strong>{{ formatTime(selectedSession.startTime) }}</strong>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span class="text-muted">Kết thúc:</span>
                      <strong>{{ formatTime(selectedSession.endedAt) }}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Registration Form -->
      <div v-show="currentStep === 2">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <!-- Profile Summary -->
            <div class="card shadow-sm border-0 mb-4">
              <div class="card-header bg-primary text-white">
                <h5 class="mb-0"><i class="fa-solid fa-clipboard-check me-2"></i>Hồ Sơ Đăng Ký</h5>
              </div>
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="d-flex align-items-center gap-2">
                      <div class="bg-success text-white rounded p-2">
                        <i class="fa-solid fa-user"></i>
                      </div>
                      <div>
                        <small class="text-muted d-block">User ID</small>
                        <strong>{{ userId }}</strong>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center gap-2">
                      <div class="bg-success text-white rounded p-2">
                        <i class="fa-solid fa-door-open"></i>
                      </div>
                      <div>
                        <small class="text-muted d-block">Phòng đấu giá</small>
                        <strong>{{ auctionRoom.roomName }}</strong>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center gap-2">
                      <div class="bg-success text-white rounded p-2">
                        <i class="fa-solid fa-images"></i>
                      </div>
                      <div>
                        <small class="text-muted d-block">Số tác phẩm</small>
                        <strong>{{ sessions.length }} items</strong>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center gap-2">
                      <div class="bg-success text-white rounded p-2">
                        <i class="fa-solid fa-calendar-check"></i>
                      </div>
                      <div>
                        <small class="text-muted d-block">Thời hạn thanh toán</small>
                        <strong>{{ auctionRoom.paymentDeadlineDays }} ngày</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Deposit Card -->
            <div class="alert alert-warning border-warning shadow-sm mb-4">
              <div class="d-flex align-items-center mb-3">
                <i class="fa-solid fa-money-bill-wave fa-2x text-warning me-3"></i>
                <div>
                  <h5 class="alert-heading mb-0">Tiền Cọc Tham Gia</h5>
                  <small>Số tiền cần thanh toán để đăng ký</small>
                </div>
              </div>
              <div class="text-center my-3">
                <h2 class="fw-bold text-danger mb-0">{{ formatCurrency(auctionRoom.depositAmount) }}</h2>
              </div>
              <hr>
              <div class="mb-2">
                <i class="fa-solid fa-check-circle text-success me-2"></i>
                <small>Hoàn trả 100% nếu không thắng đấu giá</small>
              </div>
              <div>
                <i class="fa-solid fa-calculator text-success me-2"></i>
                <small>Trừ vào tổng giá trị nếu thắng đấu giá</small>
              </div>
            </div>

            <!-- Registration Form -->
            <form @submit.prevent="handleRegister">
              <div class="card shadow-sm border-0 mb-4">
                <div class="card-header bg-success text-white">
                  <h5 class="mb-0">Thông Tin Thanh Toán</h5>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label class="form-label fw-semibold">Phương thức thanh toán *</label>
                    <select v-model="formData.paymentMethod" class="form-select form-select-lg" required>
                      <option value="">-- Chọn phương thức --</option>
                      <option value="bank_transfer">🏦 Chuyển khoản ngân hàng</option>
                      <option value="e_wallet">💳 Ví điện tử (MoMo, ZaloPay)</option>
                      <option value="credit_card">💎 Thẻ tín dụng/Ghi nợ</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label class="form-label fw-semibold">Ghi chú (tùy chọn)</label>
                    <textarea v-model="formData.notes" class="form-control" rows="3"
                      placeholder="Nhập ghi chú nếu có..."></textarea>
                  </div>

                  <div class="form-check">
                    <input v-model="formData.agreedToTerms" class="form-check-input" type="checkbox" id="termsCheck"
                      required>
                    <label class="form-check-label" for="termsCheck">
                      Tôi đã đọc và đồng ý với
                      <a href="#" class="text-primary fw-semibold">Điều khoản & Điều kiện</a>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="d-grid gap-2 d-md-flex">
                <button type="button" class="btn btn-outline-secondary btn-lg flex-md-fill" @click="currentStep = 1"
                  :disabled="isSubmitting">
                  <i class="fa-solid fa-arrow-left me-2"></i>Quay lại
                </button>
                <button type="submit" class="btn btn-success btn-lg flex-md-fill"
                  :disabled="isSubmitting || !formData.agreedToTerms">
                  <span v-if="isSubmitting">
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Đang xử lý...
                  </span>
                  <span v-else>
                    <i class="fa-solid fa-check-circle me-2"></i>
                    Xác Nhận Đăng Ký
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: true,
      isSubmitting: false,
      currentStep: 1,
      auctionRoomId: null,
      userId: null,
      selectedSession: null,
      auctionRoom: {
        id: '',
        roomName: '',
        description: '',
        type: '',
        imageAuctionRoom: '',
        depositAmount: 0,
        startedAt: null,
        stoppedAt: null,
        viewCount: 0,
        status: 0,
        paymentDeadlineDays: 7
      },
      sessions: [],
      formData: {
        paymentMethod: '',
        notes: '',
        agreedToTerms: false
      }
    };
  },

  mounted() {
    this.auctionRoomId = this.$route.params.id;
    this.getUserId();
    this.loadAuctionRoomDetails();
  },

  methods: {
    getUserId() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.userId = payload.userId || payload.sub || 'Unknown';
        } catch (err) {
          console.error('Error parsing token:', err);
          this.userId = 'Unknown';
        }
      }
    },

    loadAuctionRoomDetails() {
      this.loading = true;
      const token = localStorage.getItem('token');

      axios
        .get(`http://localhost:8081/api/auctionroom/room/${this.auctionRoomId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
          console.log('API Response:', res.data);
          if (res.data) {
            if (res.data.room) {
              this.auctionRoom = res.data.room;
            }
            if (res.data.sessions) {
              this.sessions = res.data.sessions;
            }
          }
        })
        .catch((err) => {
          console.error('Error loading auction room:', err);
          this.$toast.error('Không thể tải thông tin phòng đấu giá!');
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleRegister() {
      if (!this.formData.agreedToTerms) {
        this.$toast.warning('Vui lòng đồng ý với điều khoản!');
        return;
      }

      this.isSubmitting = true;
      const token = localStorage.getItem('token');

      const requestData = {
        auctionRoomId: this.auctionRoomId,
        userId: this.userId,
        paymentMethod: this.formData.paymentMethod,
        notes: this.formData.notes,
        depositAmount: this.auctionRoom.depositAmount
      };

      console.log('Registering with data:', requestData);

      axios
        .post('http://localhost:8081/api/auctionroom/register', requestData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          console.log('Registration success:', res.data);
          this.$toast.success('Đăng ký tham gia đấu giá thành công!');

          setTimeout(() => {
            this.$router.push('/client/auction');
          }, 2000);
        })
        .catch((err) => {
          console.error('Registration error:', err);
          const errorMsg = err.response?.data?.message || 'Đăng ký thất bại!';
          this.$toast.error(errorMsg);
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },

    goBack() {
      this.$router.go(-1);
    },

    getStatusText(status) {
      const statusMap = {
        0: 'Chưa bắt đầu',
        1: 'Đang diễn ra',
        2: 'Sắp diễn ra'
      };
      return statusMap[status] || 'Không xác định';
    },

    getSessionStatusText(status) {
      const statusMap = {
        0: 'Chưa bắt đầu',
        1: 'Đang đấu giá',
        2: 'Đã kết thúc'
      };
      return statusMap[status] || 'Không xác định';
    },

    getSessionStatusClass(status) {
      const classMap = {
        0: 'bg-secondary',
        1: 'bg-success',
        2: 'bg-danger'
      };
      return classMap[status] || 'bg-secondary';
    },

    formatCurrency(amount) {
      if (!amount) return '0 VNĐ';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(amount);
    },

    formatTime(dateString) {
      if (!dateString) return 'Chưa xác định';
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    }
  }
};
</script>

<style scoped>
/* Minimal custom styles - mostly using Bootstrap */
.hover-shadow {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.hover-shadow:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  transform: translateY(-5px);
}
</style>
