<template>
  <div class="container">
    <h4 class="text-primary fw-bold">Manage invoices</h4>
    <p class="text-body-secondary">Track and manage all invoices in the system</p>
    <div class="row mb-4">
      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Total bill</h6>
              <i class="fa-solid fa-file-lines text-primary"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">120</p>
            <small class="text-success">+12 new invoices</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Paid</h6>
              <i class="fa-solid fa-circle-check text-success"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">100</p>
            <small class="text-body-secondary">80% of the total</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Waiting for payment</h6>
              <i class="fa-solid fa-clock text-warning"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">10</p>
            <small class="text-body-secondary">12% of the total</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Overdue</h6>
              <i class="fa-solid fa-ban text-danger"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">12</p>
            <small class="text-danger">Need to process</small>
          </div>
        </div>
      </div>
    </div>

    <!-- search -->
    <div class="row align-items-stretch">
      <div class="col-12 col-lg-7 mb-4">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search for invoices..."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div class="col-12 col-lg-5 d-flex justify-content-lg-end gap-2 gap-md-4 gap-lg-5 mb-4">
        <button
          class="btn btn-outline-primary d-flex align-items-center justify-content-center py-1"
        >
          <i class="fa-solid fa-filter"></i>
        </button>
      </div>
    </div>

    <!-- table  -->
    <div class="table-responsive border border-2 border-outline-success rounded-3 p-3">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr class="bg-secondary">
            <th scope="col">Buyer</th>
            <th scope="col">Artwork</th>
            <th scope="col">Price</th>
            <th scope="col">Service fee</th>
            <th scope="col">Total</th>
            <th scope="col">Payment method</th>
            <th scope="col">Created at</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.id">
            <td>{{ invoice.buyer }}</td>
            <td>{{ invoice.artwork }}</td>
            <td>{{ formatCurrency(invoice.price) }}</td>
            <td>{{ formatCurrency(invoice.fee) }}</td>
            <td class="fw-bold">{{ formatCurrency(invoice.total) }}</td>
            <td>{{ invoice.method }}</td>
            <td>{{ invoice.date }}</td>
            <td>
              <div
                class="status border rounded-3 p-1 text-center d-inline-block"
                :class="getStatusClass(invoice.status)"
              >
                {{ invoice.status }}
              </div>
            </td>
            <td>
              <div class="dropdown">
                <i
                  class="fa-solid fa-ellipsis-vertical"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style="cursor: pointer; padding: 8px"
                ></i>

                <ul class="dropdown-menu shadow">
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

                  <template v-if="invoice.status === 'Pending' || invoice.status === 'Overdue'">
                    <li>
                      <button class="dropdown-item text-success" @click="confirmPayment(invoice)">
                        <i class="fa-solid fa-check-double me-2"></i>Payment confirmation
                      </button>
                    </li>
                    <!-- <li>
                    <button
                      class="dropdown-item text-warning-emphasis"
                      @click="sendReminder(invoice)"
                    >
                      <i class="fa-regular fa-paper-plane me-2"></i>Send reminders
                    </button>
                  </li> -->
                    <li><hr class="dropdown-divider" /></li>
                  </template>

                  <li>
                    <button class="dropdown-item text-danger" @click="cancelInvoice(invoice)">
                      <i class="fa-solid fa-ban me-2"></i>Cancel invoice
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
</template>
<script>
export default {
  data() {
    return {
      invoices: [
        {
          id: "INV001",
          buyer: "Nguyễn Văn A",
          artwork: "Thiên nhiên hoang dã",
          price: 100000,
          fee: 10000,
          total: 110000,
          method: "Transfer",
          date: "2025-10-22",
          status: "Paid",
        },
        {
          id: "INV002",
          buyer: "Trần Thị B",
          artwork: "Chân dung thiếu nữ",
          price: 2000000,
          fee: 200000,
          total: 2200000,
          method: "Transfer",
          date: "2025-10-25",
          status: "Pending",
        },
        {
          id: "INV003",
          buyer: "Lê Văn C",
          artwork: "Hoàng hôn trên biển",
          price: 500000,
          fee: 50000,
          total: 550000,
          method: "E-wallet",
          date: "2025-10-20",
          status: "Overdue",
        },

        {
          id: "INV003",
          buyer: "Lê Văn C",
          artwork: "Hoàng hôn trên biển",
          price: 500000,
          fee: 50000,
          total: 550000,
          method: "E-wallet",
          date: "2025-10-20",
          status: "Overdue",
        },
      ],
    };
  },

  methods: {
    //Định dạng tiền tệ
    formatCurrency(value) {
      if (!value) return "0đ";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    // Lấy màu sắc trạng thái
    getStatusClass(status) {
      switch (status) {
        case "Paid":
          return "bg-success-subtle border-success text-success";
        case "Pending":
          return "bg-warning-subtle border-warning text-warning-emphasis";
        case "Overdue":
          return "bg-danger-subtle border-danger text-danger";
        case "Cancelled":
          return "bg-secondary-subtle border-secondary text-secondary";
        default:
          return "bg-light border-secondary text-secondary";
      }
    },

    confirmPayment(invoice) {
      if (confirm(`Confirmation of receipt of full payment from ${invoice.buyer}?`)) {
        invoice.status = "Paid";
      }
    },
    // sendReminder(invoice) {
    //   alert(`Đã gửi email nhắc nợ tới ${invoice.buyer}!`);
    // },

    cancelInvoice(invoice) {
      if (confirm("Are you sure you want to CANCEL this invoice?")) {
        invoice.status = "Cancelled";
      }
    },
  },
};
</script>
<style></style>
