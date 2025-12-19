<template>
  <div class="container">
    <!-- card balance -->
    <div class="row">
      <div class="col-lg-9 col-md-12 d-flex">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="card-subtitle text-secondary">Số dư khả dụng</h6>
              <i @click="toggleHidden"
                :class="isHidden ? 'fa-solid fa-eye-slash text-body-secondary' : 'fa-solid fa-eye text-body-secondary'"></i>
            </div>
            <div class="mt-2 fs-5">
              <span v-if="isHidden">*******</span>
              <span v-else>{{ Number(balance || 0).toLocaleString('vi-VN') }} ₫</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card">
          <div class="card-body">
            <button type="button"
              class="btn btn-light btn-transaction border border-success w-100 d-flex flex-column align-items-center justify-content-center"
              data-bs-toggle="modal" data-bs-target="#NapModal">
              <i class="fa-solid fa-plus"></i>
              <p class="mb-0">Nạp tiền</p>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- hành động -->

    <!-- history (demo) -->
    <div class="card mt-3">
      <div class="card-body">
        <h6>Lịch sử giao dịch</h6>
        <div class="d-flex justify-content-between align-items-center border rounded p-3 mb-2">
          <div class="d-flex align-items-center">
            <div class="rounded-circle bg-light d-flex justify-content-center align-items-center me-3"
              style="width:32px;height:32px">
              <i class="bi bi-arrow-up-right text-success"></i>
            </div>
            <div>
              <div class="fw-bold">Nạp tiền từ VietQR</div>
              <small class="text-muted">2025-10-13</small>
            </div>
          </div>
          <div class="text-end">
            <div class="fw-bold text-success">+500.000 ₫</div>
            <span class="badge bg-light text-success border border-success">Hoàn thành</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="NapModal" tabindex="-1" aria-labelledby="NapModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="NapModalLabel">Nhập số tiền cần nạp</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-7">
                <div class="mb-3">
                  <label class="form-label">Số tiền</label>
                  <input v-model="nap.amount" type="" class="form-control" placeholder="Ví dụ: 200000" />
                  <small class="text-muted">Tối thiểu 10.000 ₫</small>
                </div>

                <div class="mb-3">
                  <label class="form-label">Nội dung chuyển khoản (tùy chọn)</label>
                  <input v-model="nap.note" type="text" class="form-control"
                    placeholder="Nếu để trống, hệ thống sẽ sinh tự động" />
                </div>
              </div>
              <div class="col-lg-5">
                <!-- <img :src="nap.qrUrl" alt="QR Code" class="img-fluid" /> -->
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success" v-on:click="Nap()" data-bs-toggle="modal"
              data-bs-target="#QRModal">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
    <!-- QR Modal -->
    <div class="modal fade" id="QRModal" tabindex="-1" aria-labelledby="QRModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-6" id="QRModalLabel">Quét mã để nạp tiền</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
          </div>
          <div class="modal-body text-center">
            <template v-if="nap.qrUrl">
              <img :src="nap.qrUrl" alt="QR Code" class="img-fluid rounded mb-3" style="max-width:320px;" />
              <div class="small text-muted">Mã giao dịch: {{ nap.transactionId || '—' }}</div>
            </template>
            <template v-else>
              <div class="d-flex justify-content-center py-5">
                <div class="spinner-border" role="status"></div>
              </div>
              <div class="small text-muted">Đang tạo QR…</div>
            </template>
            <p v-if="statusMessage?.status === 0" class="mb-0 text-warning mt-3">
              <i class="bi bi-exclamation-triangle me-2"></i>
              {{ statusMessage?.message || "Giao dịch chưa được xác nhận" }}
            </p>


          </div>
          <div class="modal-footer">
            <!-- <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Đóng</button> -->
            <button type="button" class="btn btn-success w-100 fs-6" @click="checkTransaction" :disabled="checking">
              <span v-if="checking" class="spinner-border spinner-border-sm me-2"></span>
              {{ checking ? 'Đang kiểm tra...' : 'check' }}
            </button>
          </div>
        </div>
      </div>
    </div>



    <!-- FORM NHẬP TIỀN -->
    <!-- <div v-if="showDepositForm"
      class="overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
      <div class="modal-box bg-white rounded shadow" @click.stop>
        <h5 class="text-center mb-4">Nhập số tiền cần nạp</h5>

        <div class="mb-3">
          <label class="form-label">Số tiền</label>
          <input v-model="depositAmount" inputmode="numeric" type="" class="form-control" placeholder="Ví dụ: 200000" />
          <small class="text-muted">Tối thiểu 10.000 ₫</small>
        </div>

        <div class="mb-3">
          <label class="form-label">Nội dung chuyển khoản (tùy chọn)</label>
          <input v-model="depositNote" type="text" class="form-control"
            placeholder="Nếu để trống, hệ thống sẽ sinh tự động" />
        </div>

        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-secondary" @click="closeAll" :disabled="loading">Hủy</button>
          <button class="btn btn-success" @click="createDeposit" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Xác nhận
          </button>
        </div>
      </div>
    </div> -->

    <!-- HIỂN THỊ QR + VERIFY -->
    <!-- <div v-if="showQR"
      class="qr-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
      @click="closeAll">
      <div class="bg-white p-3 border border-5 border-white rounded-4 shadow-lg text-center" @click.stop>
        <img :src="qrCodeUrl" alt="QR Code" class="qr-only rounded" />
        <div class="mt-3">
          <div class="small text-muted">Mã giao dịch</div>
          <div class="fw-semibold">{{ currentTransactionId }}</div>
        </div>
        <div class="mt-3 d-flex justify-content-center gap-2">
          <button class="btn btn-outline-secondary" @click="copyContent">Sao chép nội dung</button>
          <button class="btn btn-primary" @click="verifyNow" :disabled="verifying">
            <span v-if="verifying" class="spinner-border spinner-border-sm me-2"></span>
            Tôi đã chuyển xong
          </button>
        </div>
        <div class="form-text mt-2">
          Hệ thống đang tự động kiểm tra mỗi {{ pollIntervalSec }} giây.
          <button class="btn btn-link p-0 ms-1" @click="togglePolling">{{ polling ? 'Tắt tự kiểm tra' : 'Bật tự kiểm
            tra' }}</button>
        </div>
        <div class="mt-2">
          <span v-if="verifyMessage" :class="verifyClass">{{ verifyMessage }}</span>
        </div>
        <div class="mt-3">
          <button class="btn btn-outline-dark" @click="closeAll">Đóng</button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WalletPage",
  data() {
    return {
      isHidden: true,
      balance: 0,
      frozenBalance: 0,
      showDepositForm: false,
      depositAmount: "",
      depositNote: "",
      loading: false,

      showQR: false,
      qrCodeUrl: "",
      currentTransactionId: "",
      verifying: false,
      verifyMessage: "",
      verifySuccess: false,

      polling: true,
      pollTimer: null,
      pollIntervalSec: 5,


      nap: {
        amount: "",
        note: "",
        qrUrl: "",
        transactionId: ""
      },
      statusMessage: null,
      checking: false,
      modalResetHandlers: {
        nap: null,
        qr: null
      }
    };
  },
  computed: {
    formattedBalance() {
      const n = Number(this.balance || 0);
      return n.toLocaleString("vi-VN") + " ₫";
    },
    formattedFrozenBalance() {
      const n = Number(this.frozenBalance || 0);
      return n.toLocaleString("vi-VN") + " ₫";
    },
  },
  mounted() {
    // Ẩn/hiện số dư theo localStorage
    const saved = localStorage.getItem("wallet_Hidden");
    if (saved !== null) this.isHidden = saved === "true";
    this.fetchWallet();

    // Lắng nghe sự kiện đóng modal để reset dữ liệu
    this.$nextTick(() => {
      const napModalElement = document.getElementById('NapModal');
      const qrModalElement = document.getElementById('QRModal');

      if (napModalElement) {
        this.modalResetHandlers.nap = () => {
          this.resetModalData();
        };
        napModalElement.addEventListener('hidden.bs.modal', this.modalResetHandlers.nap);
      }

      if (qrModalElement) {
        this.modalResetHandlers.qr = () => {
          this.resetModalData();
        };
        qrModalElement.addEventListener('hidden.bs.modal', this.modalResetHandlers.qr);
      }
    });
  },
  beforeUnmount() {
    // Cleanup event listeners
    const napModalElement = document.getElementById('NapModal');
    const qrModalElement = document.getElementById('QRModal');

    if (napModalElement && this.modalResetHandlers.nap) {
      napModalElement.removeEventListener('hidden.bs.modal', this.modalResetHandlers.nap);
    }

    if (qrModalElement && this.modalResetHandlers.qr) {
      qrModalElement.removeEventListener('hidden.bs.modal', this.modalResetHandlers.qr);
    }
  },
  // beforeUnmount() {
  //   this.clearPoll();
  // },
  methods: {
    Nap() {
      const raw = (this.nap.amount || "").toString().replace(/[^\d]/g, "");
      const amount = Number(raw);
      if (!amount || amount < 10000) {
        this.$toast.error("Vui lòng nhập số tiền hợp lệ (≥ 10.000₫)");
        return;
      }

      // Reset QR state so the modal shows a spinner while loading
      this.nap.qrUrl = "";
      this.nap.transactionId = "";

      axios
        .post(
          "http://localhost:8081/api/wallets/topups",
          { amount, note: this.nap.note },
          {
            headers: {
              Authorization: "Bearer " + (localStorage.getItem("token") || ""),
            },
          }
        )
        .then((res) => {
          const data = res && res.data ? res.data : {};
          this.nap.transactionId = data.transactionId || "";
          this.nap.qrUrl = data.qrImageUrl || data.qrUrl || "";
          if (data.noteUsed) this.nap.note = data.noteUsed;
        })
        .catch(() => {
          this.$toast.error("Không thể tạo mã QR. Vui lòng thử lại.");
        });

    },



    // ====== BALANCE ======
    fetchWallet() {
      const userId = this.getCurrentUserId();
      if (!userId) return;
      axios
        .get(
          `http://localhost:8081/api/wallets/getWallet`,
          {
            headers: {
              Authorization: "Bearer " + (localStorage.getItem("token") || "")
            }
          }
        )
        .then((res) => {
          const data = res && res.data ? res.data : {};
          this.balance = data.balance ?? 0;
          this.frozenBalance = data.frozenBalance ?? 0;
        })
        .catch((e) => {
          console.error("Fetch wallet error:", e);
        });
    },

    getCurrentUserId() {
      const token = localStorage.getItem("token");
      if (!token) return "";
      try {
        const base = token.split(".")[1];
        const norm = base.replace(/-/g, "+").replace(/_/g, "/");
        const pad = "=".repeat((4 - (norm.length % 4)) % 4);
        const payload = JSON.parse(atob(norm + pad));
        return (
          payload.userId ||
          payload.id ||
          payload.uid ||
          (payload.user && (payload.user.id || payload.user.userId)) ||
          payload.sub || ""
        );
      } catch (_) {
        return "";
      }
    },

    // ====== UI ======
    toggleHidden() {
      this.isHidden = !this.isHidden;
      localStorage.setItem("wallet_Hidden", String(this.isHidden));
    },

    checkTransaction() {


      this.checking = true;

      axios
        .post(
          `http://localhost:8081/api/wallets/${this.nap.transactionId}/verify-capture`,
          {},
          {
            headers: {
              Authorization: "Bearer " + (localStorage.getItem("token") || ""),
            },
          }
        )
        .then((res) => {
          const data = res && res.data ? res.data : {};

          // Kiểm tra status (API trả về status là number: 0 hoặc 1)
          if (data.status === 1) {
            // Status = 1: Đóng modal và hiện toast
            this.$toast.success(data.message || "Nạp tiền thành công");
            console.log("data", data);

            this.$nextTick(() => {
              const modalElement = document.getElementById('QRModal');
              if (modalElement) {
                // eslint-disable-next-line no-undef
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                  modal.hide();
                }
              }
            });
            this.fetchWallet();
            // Reset statusMessage sau khi đóng modal
            this.statusMessage = null;
          } else if (data.status === 0) {
            // Status = 0: Hiển thị message trong QRModal
            this.statusMessage = data;
          }
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || "Không thể kiểm tra giao dịch. Vui lòng thử lại.";
          this.$toast.error(errorMessage);
        })
        .finally(() => {
          this.checking = false;
        });
    },

    resetModalData() {
      // Reset dữ liệu nạp tiền
      this.nap = {
        amount: "",
        note: "",
        qrUrl: "",
        transactionId: ""
      };
      // Reset status message
      this.statusMessage = null;
      // Reset checking state
      this.checking = false;
    },

  }
};
</script>

<style>
.btn-transaction:hover {
  box-shadow: 0 0 20px var(--bs-success);
  background-color: white;
}

.overlay {
  z-index: 1050;
}

.modal-box {
  padding: 50px 30px;
  width: 500px;
}

.qr-overlay {
  z-index: 1100;
}

.qr-only {
  width: 300px;
  height: 300px;
  object-fit: contain;
}
</style>
