<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="mb-4">
      <h4 class="fw-bold text-primary mb-1">Quản lý Thông báo</h4>
      <p class="text-body-secondary mb-0">Gửi thông báo đấu giá đến người dùng</p>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <h6 class="fw-bold text-dark mb-3">
            <i class="fa-solid fa-pen-to-square me-2 text-primary"></i>Soạn tin nhắn
          </h6>
          <div class="form-floating">
            <textarea
              class="form-control bg-light border-0"
              placeholder="Soạn nội dung tin nhắn"
              id="messageContent"
              style="height: 100px"
              v-model="formData.message"
            ></textarea>
            <label for="messageContent" class="text-secondary">Soạn nội dung tin nhắn</label>
          </div>
        </div>
      </div>

      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <h6 class="fw-bold text-dark mb-3">
            <i class="fa-solid fa-layer-group me-2 text-info"></i>Hình thức thông báo
          </h6>
          <p class="text-muted small mb-2">Chọn hình thức thông báo</p>
          <select class="form-select bg-light border-0" v-model="formData.type">
            <option value="email">Thông báo qua Gmail</option>
            <option value="system">Thông báo trong Hệ thống</option>
          </select>
        </div>
      </div>

      <template v-if="formData.type === 'email'">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body">
            <h6 class="fw-bold text-dark mb-3">
              <i class="fa-solid fa-envelope-open-text me-2 text-primary"></i>Mục đích gửi Email
            </h6>
            <select class="form-select bg-light border-0" v-model="formData.emailType">
              <option value="auction">Thông báo sắp có phòng đấu giá</option>
              <option value="payment">Thông báo yêu cầu thanh toán</option>
            </select>
          </div>
        </div>

        <template v-if="formData.emailType === 'auction'">
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-body">
              <h6 class="fw-bold text-dark mb-3">
                <i class="fa-solid fa-circle-info me-2 text-warning"></i>Thông tin đấu giá
              </h6>
              <div class="mb-3">
                <label class="form-label small text-secondary">Tên Phòng Đấu giá</label>
                <input
                  type="text"
                  class="form-control bg-light border-0"
                  v-model="formData.auctionName"
                />
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small text-secondary">Ngày đấu giá</label>
                  <input
                    type="date"
                    class="form-control bg-light border-0"
                    v-model="formData.auctionDate"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label small text-secondary">Giờ đấu giá</label>
                  <input
                    type="time"
                    class="form-control bg-light border-0"
                    v-model="formData.auctionTime"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="card border-0 shadow-sm mb-4">
            <div class="card-body">
              <h6 class="fw-bold text-dark mb-3">
                <i class="fa-solid fa-calendar-days me-2 text-success"></i>Lịch trình đấu giá
              </h6>
              <p class="text-muted small mb-3">Các phiên đấu giá liên quan</p>

              <div class="card border-0 bg-light mb-2" v-for="i in 2" :key="i">
                <div class="card-body p-2">
                  <div class="d-flex align-items-center">
                    <div class="rounded overflow-hidden me-3" style="width: 60px; height: 60px">
                      <img
                        src="https://via.placeholder.com/60x60"
                        alt="Art"
                        class="w-100 h-100 object-fit-cover"
                      />
                    </div>
                    <div>
                      <div class="d-flex align-items-center mb-1">
                        <span
                          class="badge bg-primary rounded-circle me-2"
                          style="
                            width: 20px;
                            height: 20px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          "
                          >1</span
                        >
                        <span class="fw-bold text-dark">Đêm đầy sao</span>
                      </div>
                      <div class="small text-secondary">Tác giả: Nguyễn Văn A</div>
                      <div class="small text-primary fw-bold">Giá khởi điểm: 50.000đ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>

      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <h6 class="fw-bold text-dark mb-3">
            <i class="fa-solid fa-user-tag me-2 text-danger"></i>Người nhận thông báo
          </h6>

          <div v-if="formData.type === 'email'">
            <div class="form-check form-switch mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                id="sendAllEmail"
                v-model="formData.sendToAll"
              />
              <label class="form-check-label" for="sendAllEmail">Gửi cho tất cả người dùng</label>
            </div>

            <div v-if="!formData.sendToAll">
              <label class="form-label small text-secondary">Nhập Email người nhận</label>
              <input
                type="email"
                class="form-control bg-light border-0"
                placeholder="example@gmail.com"
                v-model="formData.recipientEmail"
              />
            </div>
            <div v-else class="alert alert-primary small py-2">
              <i class="fa-solid fa-users me-2"></i>Thông báo sẽ được gửi tới toàn bộ danh sách
              email trong hệ thống.
            </div>
          </div>

          <div v-else>
            <div class="form-check form-switch mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                id="sendAllSystem"
                v-model="formData.sendToAll"
              />
              <label class="form-check-label" for="sendAllSystem">Gửi cho tất cả người dùng</label>
            </div>

            <div v-if="!formData.sendToAll">
              <label class="form-label small text-secondary">Nhập ID người dùng (User ID)</label>
              <input
                type="text"
                class="form-control bg-light border-0"
                placeholder="Ví dụ: USR-001, USR-002"
                v-model="formData.recipientId"
              />
              <div class="form-text">
                Nhập ID người dùng để gửi thông báo đẩy (push notification).
              </div>
            </div>

            <div v-else class="alert alert-primary small py-2">
              <i class="fa-solid fa-rss me-2"></i>Thông báo đẩy (Push Notification) sẽ được gửi đến
              toàn bộ thiết bị người dùng.
            </div>
          </div>
        </div>
      </div>

      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <h6 class="fw-bold text-dark mb-3">
            <i class="fa-solid fa-comment-dots me-2 text-secondary"></i>Tin nhắn tùy chỉnh
          </h6>
          <div class="form-floating">
            <textarea
              class="form-control bg-light border-0"
              placeholder="Thêm tin nhắn riêng"
              id="customNote"
              style="height: 100px"
              v-model="formData.customNote"
            ></textarea>
            <label for="customNote" class="text-secondary">Thêm tin nhắn riêng vào thông báo</label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="btn btn-primary w-100 py-2 fw-bold text-uppercase shadow-sm"
        style="background-color: #6f42c1; border-color: #6f42c1"
      >
        <i class="fa-solid fa-paper-plane me-2"></i> Gửi Thông Báo
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        message: "",
        type: "email",
        emailType: "auction",
        auctionName: "",
        auctionDate: "",
        auctionTime: "",
        sendToAll: false,
        recipientEmail: "",
        recipientId: "",
        customNote: "",
      },
    };
  },
  watch: {
    // Reset trạng thái khi đổi hình thức thông báo chính
    "formData.type"() {
      this.formData.sendToAll = false;
      // Nếu chuyển sang email thì reset về mặc định là đấu giá
      if (this.formData.type === "email") {
        this.formData.emailType = "auction";
      }
    },
  },
};
</script>

<style scoped>
.form-control:focus,
.form-select:focus {
  box-shadow: none;
  background-color: #fff !important;
  border: 1px solid #dee2e6 !important;
}
</style>
