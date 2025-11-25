<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="mb-4">
      <h4 class="text-primary fw-bold mb-1">Manage Invoices</h4>
      <p class="text-body-secondary mb-0">Track and manage all invoices in the system</p>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Total Bill</h6>
                <h3 class="card-text fw-bold mb-0">{{ statistics.totalInvoices }}</h3>
              </div>
              <div
                class="bg-secondary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-file-lines fs-5"></i>
              </div>
            </div>
            <small class="text-success fw-medium">
              <i class="fa-solid fa-arrow-up me-1"></i>Total invoices
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Paid</h6>
                <h3 class="card-text fw-bold mb-0">{{ statistics.paidInvoices }}</h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-circle-check fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">Total invoices paid</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Waiting</h6>
                <h3 class="card-text fw-bold mb-0">{{ statistics.pendingInvoices }}</h3>
              </div>
              <div
                class="bg-warning-subtle text-warning-emphasis rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-clock fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">Total pending invoices</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Overdue</h6>
                <h3 class="card-text fw-bold mb-0">{{ statistics.failedInvoices }}</h3>
              </div>
              <div
                class="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-ban fs-5"></i>
              </div>
            </div>
            <small class="text-danger fw-medium">Need to process</small>
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
                placeholder="Search invoices, buyers..."
                @input="handleSearch"
              />
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-8 text-md-end">
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
                      Invoice filter
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
                        <i class="fa-solid fa-user-tag me-1"></i> Buyer Information
                      </label>

                      <div class="d-flex flex-column gap-2">
                        <!-- <div class="input-group">
                          <span class="input-group-text bg-white text-secondary border-end-0"
                            ><i class="fa-solid fa-magnifying-glass"></i
                          ></span>
                          <input
                            type="text"
                            class="form-control border-start-0 shadow-none ps-0"
                            placeholder="Tên, Email hoặc SĐT..."
                          />
                        </div> -->

                        <div class="input-group">
                          <span class="input-group-text bg-white text-secondary border-end-0"
                            ><i class="fa-solid fa-id-card"></i
                          ></span>
                          <input
                            type="text"
                            class="form-control border-start-0 shadow-none ps-0"
                            placeholder="Buyer ID (#)"
                          />
                        </div>
                      </div>
                    </div>

                    <hr class="border-secondary opacity-10 my-4" />

                    <div class="mb-4">
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2">
                        <i class="fa-solid fa-image me-1"></i> Related works
                      </label>
                      <div class="row g-2">
                        <!-- <div class="col-12">
                          <div class="input-group">
                            <span class="input-group-text bg-white text-secondary border-end-0"
                              ><i class="fa-solid fa-palette"></i
                            ></span>
                            <input
                              type="text"
                              class="form-control border-start-0 shadow-none ps-0"
                              placeholder="Name of the work..."
                            />
                          </div>
                        </div> -->
                        <div class="col-6">
                          <div class="input-group">
                            <span class="input-group-text bg-white text-secondary border-end-0"
                              ><i class="fa-solid fa-palette"></i
                            ></span>
                            <input
                              type="text"
                              class="form-control shadow-none"
                              placeholder="Artwork ID"
                            />
                          </div>
                        </div>
                        <!-- <div class="col-6">
                          <input
                            type="text"
                            class="form-control shadow-none"
                            placeholder="Tên nghệ sĩ"
                          />
                        </div> -->
                      </div>
                    </div>

                    <hr class="border-secondary opacity-10 my-4" />

                    <div class="mb-4">
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2">
                        Status and Method
                      </label>

                      <div class="mb-3">
                        <label class="form-label x-small fw-bold text-secondary"
                          >Invoice status</label
                        >
                        <div class="d-flex flex-wrap gap-2">
                          <input
                            type="checkbox"
                            class="btn-check"
                            id="stPending"
                            autocomplete="off"
                          />
                          <label class="btn btn-outline-warning btn-sm rounded-pill" for="stPending"
                            >Pending</label
                          >

                          <input type="checkbox" class="btn-check" id="stPaid" autocomplete="off" />
                          <label class="btn btn-outline-success btn-sm rounded-pill" for="stPaid"
                            >Paid</label
                          >

                          <input
                            type="checkbox"
                            class="btn-check"
                            id="stFailed"
                            autocomplete="off"
                          />
                          <label class="btn btn-outline-danger btn-sm rounded-pill" for="stFailed"
                            >Overdue</label
                          >

                          <input
                            type="checkbox"
                            class="btn-check"
                            id="stRefund"
                            autocomplete="off"
                          />
                          <label
                            class="btn btn-outline-secondary btn-sm rounded-pill"
                            for="stRefund"
                            >Refunded</label
                          >
                        </div>
                      </div>

                      <div>
                        <label class="form-label x-small fw-bold text-secondary"
                          >Payment method</label
                        >
                        <select class="form-select shadow-none bg-light border-0">
                          <option selected value="">Tất cả</option>
                          <option value="vnpay">VNPay QR</option>
                          <option value="momo">Ví MoMo</option>
                          <option value="banking">Chuyển khoản ngân hàng</option>
                          <option value="visa">Thẻ Visa/Mastercard</option>
                        </select>
                      </div>
                    </div>

                    <hr class="border-secondary opacity-10 my-4" />

                    <div class="mb-4">
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2">
                        <i class="fa-solid fa-money-bill-wave me-1"></i> Total amount (VND)
                      </label>

                      <div class="d-flex flex-wrap gap-2 mb-2">
                        <button
                          class="btn btn-sm btn-light border text-secondary active-pill"
                          style="font-size: 0.75rem"
                        >
                          &lt; 1M
                        </button>
                        <button
                          class="btn btn-sm btn-light border text-secondary"
                          style="font-size: 0.75rem"
                        >
                          1M-10M
                        </button>
                        <button
                          class="btn btn-sm btn-light border text-secondary"
                          style="font-size: 0.75rem"
                        >
                          &gt; 10M
                        </button>
                      </div>

                      <div class="input-group">
                        <input type="number" class="form-control shadow-none" placeholder="Min" />
                        <span
                          class="input-group-text bg-white border-start-0 border-end-0 text-secondary"
                          >-</span
                        >
                        <input type="number" class="form-control shadow-none" placeholder="Max" />
                      </div>
                    </div>

                    <hr class="border-secondary opacity-10 my-4" />

                    <div class="mb-2">
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2">
                        <i class="fa-regular fa-calendar-check me-1"></i> Creation time
                      </label>

                      <div class="btn-group w-100 mb-2" role="group">
                        <input
                          type="radio"
                          class="btn-check"
                          name="dateQuick"
                          id="dateToday"
                          autocomplete="off"
                        />
                        <label class="btn btn-outline-light text-dark border btn-sm" for="dateToday"
                          >Today</label
                        >

                        <input
                          type="radio"
                          class="btn-check"
                          name="dateQuick"
                          id="dateWeek"
                          autocomplete="off"
                        />
                        <label class="btn btn-outline-light text-dark border btn-sm" for="dateWeek"
                          >This week</label
                        >

                        <input
                          type="radio"
                          class="btn-check"
                          name="dateQuick"
                          id="dateMonth"
                          autocomplete="off"
                          checked
                        />
                        <label class="btn btn-outline-light text-dark border btn-sm" for="dateMonth"
                          >This month</label
                        >
                      </div>

                      <div class="input-group input-group-sm">
                        <span class="input-group-text bg-light text-secondary">From</span>
                        <input type="date" class="form-control shadow-none" />
                        <span class="input-group-text bg-light text-secondary">To</span>
                        <input type="date" class="form-control shadow-none" />
                      </div>

                      <div class="form-check mt-2">
                        <input class="form-check-input" type="checkbox" id="filterPaidDate" />
                        <!-- <label class="form-check-label small text-secondary" for="filterPaidDate">
                          Áp dụng cho ngày thanh toán (Paid Date)
                        </label> -->
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
            <!-- <button class="btn btn-primary ms-2">
              <i class="fa-solid fa-plus me-2"></i>Create Invoice
            </button> -->
          </div>
        </div>

        <div class="table-responsive text-nowrap overflow-y-auto">
          <table class="table table-hover align-middle text-nowrap mb-0 w-100">
            <thead class="table-light">
              <tr class="align-middle">
                <th scope="col" class="py-3 fw-bold ps-3">BuyerID</th>
                <th scope="col" class="py-3 fw-bold">ArtworkID</th>
                <th scope="col" class="py-3 fw-bold">Price</th>
                <!-- <th scope="col" class="py-3 fw-bold">Service fee</th> -->
                <th scope="col" class="py-3 fw-bold">Total</th>
                <th scope="col" class="py-3 fw-bold">Payment method</th>
                <th scope="col" class="py-3 fw-bold">Created at</th>
                <th scope="col" class="py-3 fw-bold">Status</th>
                <th scope="col" class="py-3 fw-bold text-center">
                  <i class="fa-solid fa-ellipsis"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(v, i) in invoices" :key="i">
                <tr>
                  <td class="ps-3 align-middle">
                    {{ v.userId }}
                  </td>

                  <td class="align-middle">
                    {{ v.artworkId }}
                  </td>

                  <td class="text-body-secondary align-middle">
                    {{ formatCurrency(v.amount) }}
                  </td>
                  <td class="text-body-secondary align-middle">{{ formatCurrency(v.fee) }}</td>
                  <td class="text-primary fw-bold align-middle">
                    {{ formatCurrency(v.totalAmount) }}
                  </td>
                  <td class="align-middle">
                    <span class="d-inline-flex align-items-center gap-2">
                      <i class="fa-regular fa-credit-card text-secondary"></i>
                      {{ v.paymentMethod }}
                    </span>
                  </td>
                  <td class="small text-secondary align-middle">
                    {{ v.createdAt }}
                  </td>
                  <td class="align-middle">
                    <button
                      class="btn badge rounded-pill border fw-normal px-3 py-2"
                      :class="getStatusClass(v.invoiceStatus)"
                    >
                      {{ convertStatus(v.invoiceStatus) }}
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
                          <a class="dropdown-item" href="#">
                            <i class="fa-solid fa-eye me-2 text-info"></i>See details
                          </a>
                        </li>
                        <li>
                          <button class="dropdown-item">
                            <i class="fa-solid fa-download me-2 text-secondary"></i>Download PDF
                          </button>
                        </li>

                        <li><hr class="dropdown-divider" /></li>

                        <template v-if="v.invoiceStatus === 0 || v.invoiceStatus === 2">
                          <li>
                            <button class="dropdown-item text-success" @click="confirmPayment(v)">
                              <i class="fa-solid fa-check-double me-2"></i>Confirm Payment
                            </button>
                          </li>
                          <li><hr class="dropdown-divider" /></li>
                        </template>

                        <li>
                          <button class="dropdown-item text-danger" @click="handleDelete(v.id)">
                            <i class="fa-solid fa-ban me-2"></i>Delete invoice
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </template>
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
      invoices: [],
      isLoading: false,
      search: "",
      statistics: {},
      searchTimeout: null,
    };
  },

  mounted() {
    this.loadInvoiceData();
    this.loadInvoiceStatistical();
  },

  methods: {
    formatCurrency(value) {
      if (!value) return "0₫";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    loadInvoiceData() {
      axios
        .get("http://localhost:8081/api/admin/invoices/lay-du-lieu", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.invoices = res.data.data;
          console.log("test", res.data.data || []);
        })
        .catch((err) => {
          console.log("lỗi");

          console.error(err);
        });
    },
    convertStatus(status) {
      switch (status) {
        case 0:
          return "Pending";
        case 1:
          return "Paid";
        case 2:
          return "Overdue";
        // default:
        //   return "Unknown";
      }
    },
    getStatusClass(status) {
      switch (status) {
        case 1:
          return "bg-success-subtle border-success-subtle text-success";
        case 0:
          return "bg-warning-subtle border-warning-subtle text-warning-emphasis";
        case 2:
          return "bg-danger-subtle border-danger-subtle text-danger";
        // case "Cancelled":
        //   return "bg-secondary-subtle border-secondary-subtle text-secondary";
      }
    },

    confirmPayment(invoice) {
      if (confirm(`Confirmation of receipt of full payment from ${invoice.buyer}?`)) {
        invoice.status = "Paid";
      }
    },

    cancelInvoice(invoice) {
      if (confirm("Are you sure you want to CANCEL this invoice?")) {
        invoice.status = "Cancelled";
      }
    },

    handleSearch() {
      //Xóa bộ đếm cũ nếu người dùng gõ tiếp khi chưa hết giờ
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
        this.loadInvoiceData();
        return;
      }
      this.isLoading = true;
      axios
        .get(`http://localhost:8081/api/admin/invoices/tim-kiem?q=${this.search}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.invoices = res.data.data;
          console.log("Kết quả tìm kiếm:", this.invoices);
        })
        .catch((err) => {
          console.error("Lỗi tìm kiếm:", err);
          this.invoices = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    handleDelete(invoiceId) {
      if (!confirm(`Bạn có chắc chắn muốn xóa invoice này không?`)) return;
      axios
        .delete(`http://localhost:8081/api/admin/invoices/xoa/${invoiceId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Đã xóa thành công!");
          this.loadAdminData();
        })
        .catch((err) => {
          console.error("Lỗi khi xóa:", err);
          const message = err.response?.data?.message || "Có lỗi xảy ra khi xóa!";
          alert(message);
        });
    },

    //  card thống kê
    loadInvoiceStatistical() {
      axios
        .get(`http://localhost:8081/api/admin/invoices/thong-ke`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.statistics = res.data.data;
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
<style>
/* Custom Scrollbar cho phần body lọc */
.custom-scrollbar {
  max-height: calc(100vh - 140px); /* Trừ đi header và footer */
  overflow-y: auto;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #dee2e6;
  border-radius: 10px;
}

/* Style cho các nút chọn Role (Selection Chips) */
.btn-check:checked + .btn-outline-light {
  background-color: #e7f1ff; /* Nền xanh nhạt */
  border-color: #0d6efd !important; /* Viền xanh */
  color: #0d6efd !important; /* Chữ xanh */
  font-weight: bold;
}

/* Hiệu ứng focus cho các input text */
.form-control:focus,
.form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1); /* Bóng mờ xanh nhạt */
}

/* Style cho các nút chọn nhanh thời gian */
.active-pill {
  background-color: #0d6efd !important;
  color: white !important;
  border-color: #0d6efd !important;
}
</style>
