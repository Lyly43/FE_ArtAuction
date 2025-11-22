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
                <h6 class="card-subtitle text-body-secondary mb-1">Total Bill</h6>
                <h3 class="card-text fw-bold mb-0">120</h3>
              </div>
              <div
                class="bg-secondary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-file-lines fs-5"></i>
              </div>
            </div>
            <small class="text-success fw-medium">
              <i class="fa-solid fa-arrow-up me-1"></i>+12 new invoices
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Paid</h6>
                <h3 class="card-text fw-bold mb-0">100</h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-circle-check fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">80% of the total</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Waiting</h6>
                <h3 class="card-text fw-bold mb-0">10</h3>
              </div>
              <div
                class="bg-warning-subtle text-warning-emphasis rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-clock fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">12% of the total</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Overdue</h6>
                <h3 class="card-text fw-bold mb-0">12</h3>
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
                type="text"
                class="form-control bg-transparent border-0 shadow-none"
                placeholder="Search invoices, buyers..."
              />
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-8 text-md-end">
            <button class="btn btn-outline-primary">
              <i class="fa-solid fa-filter me-2"></i>Filter
            </button>
            <!-- <button class="btn btn-primary ms-2">
              <i class="fa-solid fa-plus me-2"></i>Create Invoice
            </button> -->
          </div>
        </div>

        <div class="table-responsive text-nowrap overflow-y-auto">
          <table class="table table-hover align-middle text-nowrap mb-0 w-100">
            <thead class="table-light">
              <tr class="align-middle">
                <th scope="col" class="py-3 fw-bold ps-3">Buyer</th>
                <th scope="col" class="py-3 fw-bold">Artwork</th>
                <th scope="col" class="py-3 fw-bold">Price</th>
                <th scope="col" class="py-3 fw-bold">Service fee</th>
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
              <tr v-for="invoice in invoices" :key="invoice.id">
                <td class="ps-3 align-middle">
                  <div class="d-flex align-items-center gap-2">
                    <div
                      class="bg-secondary-subtle text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                      style="width: 36px; height: 36px; font-size: 0.8rem"
                    >
                      {{ invoice.buyer.charAt(0) }}
                    </div>
                    <div class="fw-medium">{{ invoice.buyer }}</div>
                  </div>
                </td>

                <td class="align-middle">
                  <div class="d-flex align-items-center gap-3">
                    <img
                      :src="invoice.image"
                      alt="artwork"
                      class="rounded border bg-light"
                      style="width: 48px; height: 48px; object-fit: cover"
                    />
                    <div>
                      <div class="fw-medium text-dark">{{ invoice.artwork }}</div>
                      <small class="text-body-secondary" style="font-size: 0.75rem"
                        >Author: {{ invoice.author }}</small
                      >
                    </div>
                  </div>
                </td>

                <td class="text-body-secondary align-middle">
                  {{ formatCurrency(invoice.price) }}
                </td>
                <td class="text-body-secondary align-middle">{{ formatCurrency(invoice.fee) }}</td>
                <td class="text-primary fw-bold align-middle">
                  {{ formatCurrency(invoice.total) }}
                </td>
                <td class="align-middle">
                  <span class="d-inline-flex align-items-center gap-2">
                    <i class="fa-regular fa-credit-card text-secondary"></i>
                    {{ invoice.method }}
                  </span>
                </td>
                <td class="small text-secondary align-middle">{{ invoice.date }}</td>
                <td class="align-middle">
                  <button
                    class="btn badge rounded-pill border fw-normal px-3 py-2"
                    :class="getStatusClass(invoice.status)"
                  >
                    {{ invoice.status }}
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

                      <template v-if="invoice.status === 'Pending' || invoice.status === 'Overdue'">
                        <li>
                          <button
                            class="dropdown-item text-success"
                            @click="confirmPayment(invoice)"
                          >
                            <i class="fa-solid fa-check-double me-2"></i>Confirm Payment
                          </button>
                        </li>
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
          image: "/src/assets/img/2.png", // Đã thêm ảnh
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
          image: "/src/assets/img/2.png", // Đã thêm ảnh
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
          image: "/src/assets/img/2.png", // Đã thêm ảnh
          price: 500000,
          fee: 50000,
          total: 550000,
          method: "E-wallet",
          date: "2025-10-20",
          status: "Overdue",
        },
        {
          id: "INV004",
          buyer: "Phạm Văn D",
          artwork: "Mùa thu Hà Nội",
          image: "/src/assets/img/2.png", // Đã thêm ảnh
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
    formatCurrency(value) {
      if (!value) return "0đ";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    getStatusClass(status) {
      switch (status) {
        case "Paid":
          return "bg-success-subtle border-success-subtle text-success";
        case "Pending":
          return "bg-warning-subtle border-warning-subtle text-warning-emphasis";
        case "Overdue":
          return "bg-danger-subtle border-danger-subtle text-danger";
        case "Cancelled":
          return "bg-secondary-subtle border-secondary-subtle text-secondary";
        default:
          return "bg-light border-light text-dark";
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
  },
};
</script>
