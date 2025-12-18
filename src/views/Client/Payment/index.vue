<template>
  <div class="container mt-3">
    <div class="row mb-4">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="checkout-steps mb-4">
              <div class="step completed">
                <div class="circle">1</div>
                <div class="label me-5 pe-5">Review</div>
                <div class="connector right"></div>
              </div>
              <div class="step current">
                <div class="connector left"></div>
                <div class="circle">2</div>
                <div class="label">Payment</div>
                <div class="connector right"></div>
              </div>
              <div class="step upcoming after-current">
                <div class="connector left"></div>
                <div class="circle">3</div>
                <div class="label">Shipping</div>
                <div class="connector right"></div>
              </div>
              <div class="step upcoming">
                <div class="connector left"></div>
                <div class="circle">4</div>
                <div class="label ms-4 ps-4">Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-lg-7 col-md-6 col-sm-12 d-flex">
        <div class="row">
          <div class="col-12 mb-4">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <p class="fs-5 fw-bold text-success text-center">Personal Information</p>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 mb-3">
                    <label for="" class="mb-1">Receiver</label>
                    <input type="text" class="form-control" v-model="shipping.receiver"
                      placeholder="Receiver full name">
                  </div>
                  <!-- <div class="col-lg-6 col-md-12 col-sm-12 mb-3">
                    <label for="" class="mb-1">Last Name</label>
                    <input type="text" class="form-control">
                  </div> -->
                  <div class="col-lg-12 col-md-12 col-sm-12 mb-3">
                    <label for="" class="mb-1">Email Address</label>
                    <input type="email" class="form-control" v-model="shipping.email" placeholder="Receiver email">
                  </div>
                  <!-- quốc gia -->
                  <div class="col-lg-4 col-md-12 col-sm-12 mb-3">
                    <label for="" class="mb-1">Country</label>
                    <!-- <input type="text" class="form-control"> -->
                    <input type="text" class="form-control" value="Việt Nam" readonly>
                  </div>
                  <!-- tỉnh/thành phố -->
                  <div class="col-lg-4 col-md-12 col-sm-12 mb-3">
                    <label for="" class="mb-1">Province/City</label>
                    <!-- <input type="text" class="form-control"> -->
                    <select class="form-select" v-model="form.cityCode">
                      <option value="" disabled>Select City</option>
                      <option v-for="p in provinces" :key="p.code" :value="p.code">
                        {{ p.name }}
                      </option>
                    </select>
                  </div>
                  <!-- phường/xã -->
                  <div class="col-lg-4 col-md-12 col-sm-12 mb-3">
                    <label for="" class="mb-1">Ward/Commune</label>
                    <!-- <input type="text" class="form-control"> -->
                    <select class="form-select" v-model="form.wardCode" :disabled="wards.length === 0">
                      <option value="" disabled>Select Ward</option>
                      <option v-for="w in wards" :key="w.code" :value="w.code">
                        {{ w.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 mb-3">
                    <label for="" class="mb-1">Street Address</label>
                    <input type="text" class="form-control" v-model="shipping.address"
                      placeholder="House number, street, district">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <!-- card đảm bảo -->
                  <div class="col-6 d-flex">
                    <div class="card border border-2 border-success">
                      <div class="card-body d-flex flex-column justify-content-between gap-3">
                        <div class="d-flex align-items-center gap-4">
                          <i class="fa-solid fa-shield-halved fs-5 text-success"></i>
                          <p class="m-0">256-bit SSL Encryption</p>
                        </div>
                        <div class="d-flex align-items-center gap-4">
                          <i class="fa-solid fa-lock fs-5 text-success"></i>
                          <p class="m-0">PCI DSS Compliant</p>
                        </div>
                        <div class="d-flex align-items-center gap-4">
                          <i class="fa-solid fa-certificate fs-5 text-success"></i>
                          <p class="m-0">Certificate of Authenticity</p>
                        </div>
                        <div class="d-flex align-items-center gap-4">
                          <i class="fa-solid fa-rotate-left fs-5 text-success"></i>
                          <p class="m-0">30-Day Return Policy</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Need Help -->
                  <div class="col-6 d-flex">
                    <div class="card border border-2 border-success">
                      <div class="card-body d-flex flex-column gap-3">
                        <div class="d-flex align-items-center gap-4 text-success ">
                          <i class="fa-solid fa-headset fs-5 text-success"></i>
                          <p class="m-0 fw-bold fs-5">Need Help?</p>
                        </div>
                        <p class="m-0">Our auction specialists are available to assist you.</p>
                        <div class="d-flex align-items-center gap-4">
                          <i class="fa-solid fa-phone fs-5 text-success"></i>
                          <p class="m-0">+84 12 345 678</p>
                        </div>
                        <div class="d-flex align-items-center gap-4">
                          <i class="fa-solid fa-envelope fs-5 text-success"></i>
                          <p class="m-0">nckhc1se11@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5 col-md-6 col-sm-12 d-flex">
        <div class="card">
          <div class="card-body d-flex flex-column justify-content-between">
            <!-- >Order Summary -->
            <div class="">
              <p class="fs-5 fw-bold text-success text-center">Order Summary</p>
            </div>
            <!-- contenr Order -->
            <div v-if="invoice" class="d-flex flex-column justify-content-between h-100">
              <div class="row">
                <div class="col-lg-5">
                  <img :src="invoice.artworkImageUrl" :alt="invoice.artworkTitle"
                    class="img-thumbnail w-100 object-fit-cover" style="max-height: 300px;">
                </div>
                <div class="col-lg-7 d-flex flex-column gap-3 ps-lg-0">
                  <p class="fw-bold fs-5 text-success m-0">{{ invoice.artworkTitle }}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="m-0 text-muted">Owner</p>
                    <p class="m-0">{{ invoice.artistName }}</p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="m-0 text-muted">Auction Room</p>
                    <p class="m-0">{{ invoice.roomName }}</p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="m-0 text-muted">Invoice ID</p>
                    <p class="m-0">{{ invoice.id }}</p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="m-0 text-muted">Winner</p>
                    <p class="m-0">{{ invoice.winnerName }}</p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="m-0 text-muted">Winning Bid</p>
                    <p class="m-0">{{ formatCurrency(invoice.amount) }}</p>
                  </div>
                </div>
              </div>
              <hr class="border-2 border-success">
              <div class="row">
                <div class="col-lg-12 d-flex flex-column gap-2">
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="m-0">Artwork Price</p>
                    <p class="m-0">{{ formatCurrency(invoice.amount) }}</p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="m-0">Buyer's Premium</p>
                    <p class="m-0">{{ formatCurrency(invoice.buyerPremium) }}</p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="m-0">Insurance</p>
                    <p class="m-0">{{ formatCurrency(invoice.insuranceFee) }}</p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="m-0">Shipping &amp; Handling</p>
                    <p class="m-0">{{ formatCurrency(invoice.shippingFee) }}</p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="m-0">Sales Tax</p>
                    <p class="m-0">{{ formatCurrency(invoice.salesTax) }}</p>
                  </div>
                </div>
              </div>
              <hr class="border-2 border-success">
              <div class="row">
                <div class="col-lg-12 d-flex flex-column gap-2">
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="text-success fw-bold m-0 fs-5">Total Amount</p>
                    <p class="text-success fw-bold m-0 fs-5">{{ formatCurrency(invoice.totalAmount) }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="">
              <p class="text-center text-muted my-4">
                No invoice data loaded. Please click \"Confirm &amp; Pay\" to generate payment information.
              </p>
            </div>

            <!-- btn thanh toán -->
            <div class=" mt-3">
              <button class="btn btn-lg fw-bold fs-6 btn-success w-100" @click="payInvoice" data-bs-toggle="modal"
                data-bs-target="#exampleModal" :disabled="loading.payment">
                <span v-if="loading.payment" class="spinner-border spinner-border-sm me-2" role="status"></span>
                <span>{{ loading.payment ? 'Processing...' : 'Confirm & Pay' }}</span>
              </button>
            </div>

          </div>


        </div>


      </div>
    </div>
    <!-- modal qr code thanh toán -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h1 class="modal-title fs-6" id="exampleModalLabel">
              <i class="fa-solid fa-qrcode me-2"></i>Scan the QR code to pay the registration fee &amp; deposit.
            </h1>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <div class="row">
              <div class="col-12 text-center">
                <img v-if="invoice && (invoice.paymentQr || qrUrl)" :src="invoice.paymentQr || qrUrl" class="img-fluid"
                  alt="Payment QR" style="max-width: 260px" />
                <div v-else class="alert alert-danger mt-2 mb-0 py-2 px-3 d-inline-block">
                  <i class="fa-solid fa-triangle-exclamation me-2"></i>
                  QR code is not available. Please try again or contact support.
                </div>
                <p v-if="paymentNote" class="mt-3 mb-1 text-muted small">
                  Transfer content: <span class="fw-bold text-dark">{{ paymentNote }}</span>
                </p>
                <p v-if="paymentMessage" class="mb-0 small" :class="paid ? 'text-success' : 'text-warning'">
                  {{ paymentMessage }}
                </p>
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Đóng</button>
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
      baseV2: 'https://provinces.open-api.vn/api/v2',
      baseV1: 'https://provinces.open-api.vn/api/v1',
      provinces: [],
      wards: [],
      form: {
        cityCode: '',  // giữ dạng string
        wardCode: ''
      },
      // thông tin người nhận / shipping hiển thị trên form
      shipping: {
        receiver: '',
        email: '',
        address: '',
        phone: '',
      },
      loading: {
        provinces: false,
        wards: false,
        payment: false,
      },
      errMsg: '',
      // payment / invoice data
      invoice: null,
      qrUrl: '',
      paymentNote: '',
      paymentMessage: '',
      paid: false,
    }
  },

  computed: {
    roomId() {
      return this.$route.params.roomId;
    },
    invoiceId() {
      return this.$route.params.invoiceId;
    },
  },

  watch: {
    'form.cityCode': {
      handler(newCode) {
        this.form.wardCode = '';
        this.wards = [];
        if (!newCode) return;
        this.loadWardsByProvince(newCode);
      }
    }
  },

  mounted() {
    this.loadProvinces();
    // Có thể sau này gọi API để load thông tin invoice theo invoiceId nếu cần
    this.payInvoice();
  },
  methods: {
    formatCurrency(value) {
      const num = Number(value || 0);
      return num.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    },
    // payInvoice() {
    //   axios.post("http://localhost:8081/api/payment/${this.roomId}/${this.invoiceId}/payment/init", {}, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('token')}`
    //     }
    //   }).then(res => {
    //     console.log(res.data.data.invoice , "sdvsvds");
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // },
    async payInvoice() {
      if (!this.roomId || !this.invoiceId) {
        this.errMsg = 'Missing room or invoice id';
        return;
      }

      this.loading.payment = true;
      this.errMsg = '';

      try {
        const token = localStorage.getItem('token');
        // Gọi API mới trả về { invoice, artwork }
        const res = await axios.post(
          `http://localhost:8081/api/payment/${this.roomId}/${this.invoiceId}/payment/init`,
          {},
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        );

        const raw = res.data || {};
        // Một số API có thể bọc data trong thuộc tính "data"
        const data = raw.data || raw;
        const invoice = data.invoice || null;
        const artwork = data.artwork || null;

        // DEBUG LOG: xem dữ liệu trả về từ backend
        console.log('[Payment] raw response data:', raw);
        console.log('[Payment] normalized data:', data);
        console.log('[Payment] invoice:', invoice);
        console.log('[Payment] artwork:', artwork);

        // Ghép thêm thông tin artwork nếu cần
        this.invoice = invoice
          ? {
            ...invoice,
            artworkImageUrl: invoice.artworkImageUrl || artwork?.avtArtwork || '',
            artworkTitle: invoice.artworkTitle || artwork?.title || '',
          }
          : null;

        // Đổ dữ liệu vào form thông tin cá nhân / giao hàng
        if (this.invoice) {
          this.shipping.receiver = this.invoice.recipientNameText || this.invoice.winnerName || '';
          this.shipping.email = this.invoice.winnerEmail || '';
          this.shipping.address = this.invoice.shippingAddress || '';
          this.shipping.phone = this.invoice.recipientPhone || '';
        }

        // QR + ghi chú thanh toán
        this.qrUrl = this.invoice?.paymentQr || '';
        this.paymentNote = this.invoice?.note || '';

        // Thông tin trạng thái thanh toán (nếu backend có trả về)
        this.paid = !!data.paid || this.invoice?.paymentStatus === 1;
        this.paymentMessage =
          data.message ||
          (this.paid ? 'Payment has been completed successfully.' : 'Please complete the payment via QR code.');
      } catch (error) {
        console.error('Pay invoice error:', error);
        this.errMsg = error.response?.data?.message || 'Payment failed. Please try again.';
      } finally {
        this.loading.payment = false;
      }
    },
    loadProvinces() {
      this.loading.provinces = true;
      this.errMsg = '';

      // TRẢ VỀ promise để chain .finally CHỈ CHẠY SAU KHI Fallback (nếu có) xong
      return axios.get(`${this.baseV2}/`, { params: { depth: 1 } })
        .then(res => {
          const list = Array.isArray(res.data) ? res.data : (res.data.results || res.data);
          this.provinces = list.map(p => ({ code: String(p.code), name: p.name }));
        })
        .catch(eV2 => {
          // Return inner promise để .finally đợi
          return axios.get(`${this.baseV1}/`, { params: { depth: 1 } })
            .then(res => {
              const list = Array.isArray(res.data) ? res.data : (res.data.results || res.data);
              this.provinces = list.map(p => ({ code: String(p.code), name: p.name }));
            })
            .catch(eV1 => {
              this.errMsg = 'Không tải được danh sách tỉnh/thành.';
              console.error('Load provinces failed:', eV2?.message, eV1?.message);
              // đẩy lỗi ra ngoài nếu muốn bắt tiếp ở nơi khác
              throw eV1;
            });
        })
        .finally(() => {
          this.loading.provinces = false;
        });
    },

    loadWardsByProvince(provinceCode) {
      this.loading.wards = true;
      this.errMsg = '';

      return axios.get(`${this.baseV2}/p/${provinceCode}`, { params: { depth: 2 } })
        .then(res => {
          const pv2 = res.data;

          // Case v2 đã có wards trực tiếp (sau sáp nhập)
          if (pv2 && Array.isArray(pv2.wards)) {
            this.wards = pv2.wards.map(w => ({ code: String(w.code), name: w.name }));
            return;
          }

          // Case vẫn còn districts → flatten wards
          if (pv2 && Array.isArray(pv2.districts)) {
            const flat = [];
            pv2.districts.forEach(d => {
              if (Array.isArray(d.wards)) {
                d.wards.forEach(w => flat.push({ code: String(w.code), name: w.name }));
              }
            });
            if (flat.length) {
              this.wards = flat;
              return;
            }
          }

          // Không lấy được từ v2 → RETURN fallback v1 để .finally đợi
          return this.loadWardsByProvinceV1(provinceCode);
        })
        .catch(eV2 => {
          // RETURN fallback v1 để .finally đợi
          return this.loadWardsByProvinceV1(provinceCode)
            .catch(eV1 => {
              this.errMsg = 'Không tải được danh sách phường/xã.';
              console.error('Load wards failed:', eV2?.message, eV1?.message);
              throw eV1;
            });
        })
        .finally(() => {
          this.loading.wards = false;
        });
    },

    loadWardsByProvinceV1(provinceCode) {
      // HÀM NÀY PHẢI RETURN promise để nơi gọi có thể chain tiếp
      return axios.get(`${this.baseV1}/p/${provinceCode}`, { params: { depth: 2 } })
        .then(res => {
          const p = res.data;
          const flat = [];
          if (p && Array.isArray(p.districts)) {
            p.districts.forEach(d => {
              if (Array.isArray(d.wards)) {
                d.wards.forEach(w => flat.push({ code: String(w.code), name: w.name }));
              }
            });
          }
          this.wards = flat;
        });
    }
  },
}
</script>
<style></style>
