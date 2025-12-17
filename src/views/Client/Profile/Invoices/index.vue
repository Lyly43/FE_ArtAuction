<template>
  <div class="row mb-3">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-12 col-md-6 col-sm-12 d-flex align-items-center">
              <h4 class="text-success fw-bold m-0">Artwork Management</h4>
            </div>
          </div>
          <hr class="text-success ">
          <div class="row d-flex align-items-center justify-content-between mt-3 ">
            <div class="col-lg-6 col-md-12 col-sm-12 d-flex align-items-center gap-3 mb-lg-0 mb-3">
              <input type="date" class="form-control">
              <p class="fw-bold">_</p>
              <input type="date" class="form-control">
            </div>
            <div class="col-lg-5 col-md-12 col-sm-12">
              <div class="input-group">
                <input type="text" class="form-control border border-2 border-success " placeholder="Search....">
                <button class="btn btn-success input-group-text"><i class="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="">
    <div v-if="loading" class="text-center">Loading...</div>
    <!-- <div v-else-if="error" class="text-danger">{{ error }}</div> -->
    <div v-else class="row">
      <div v-for="item in invoices" :key="item.id" class="col-12 col-lg-6 col-md-6 d-flex">
        <div class="card w-100 overflow-hidden mb-4">
          <div class="card-body d-flex flex-column">
            <div class="row gap-2">
              <div class="col-12 d-flex align-items-center justify-content-between">
                <p class="fs-6  m-0">Id Invoice</p>
                <p class="m-0 fw-bold">{{ item.id }}</p>
              </div>
              <div class="col-12 d-flex align-items-center justify-content-between">
                <p class="fs-6  m-0">Id Room</p>
                <p class="m-0 fw-bold">{{ item.auctionRoomId }}</p>
              </div>
            </div>
            <hr>
            <div class="row ">
              <div class="col-12 d-flex align-items-center justify-content-between mb-2">
                <p class="m-0">Payment Time</p>
                <p class="m-0">{{ item.createdAt }}</p>
              </div>
              <div class="col-6">
                <img :src="item.artworkAvt" alt="" class="img-thumbnail img-invoice w-100 object-fit-cover" style="height: 150px;">
              </div>
              <div class="col-6">
                <p class=" m-0 small text-truncate">{{ item.artworkId }}</p>

                <p class="m-0 fw-bold">{{ item.artworkTitle }}</p>

              </div>
            </div>
            <hr>
            <div class="row mt-auto">
              <div class="col-12 d-flex align-items-center justify-content-between mb-3">
                <p class="m-0 fw-bold text-success">Total </p>
                <p class="m-0 fw-bold">{{ formatCurrency(item.totalAmount) }}</p>
              </div>
              <div class="col-12">
                <div v-if="item.paymentStatus === 1" class="d-flex gap-2">
                  <button class="btn btn-outline-success w-100">View Details</button>
                  <button class="btn btn-success w-100">Paid</button>
                </div>
                <div v-else class="d-flex gap-2">
                  <button class="btn btn-outline-danger w-100">View Details</button>
                  <button class="btn btn-danger w-100">Unpaid</button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Pagination Controls -->
  <div class="row my-4" v-if="totalPages > 1">
    <div class="col-12 d-flex justify-content-center">
      <nav aria-label="Invoice pagination">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 0 }">
            <a class="page-link px-4" href="#" @click.prevent="prevPage">
              <i class="fa-solid fa-angle-left"></i>
            </a>
          </li>
          <li class="page-item" v-for="page in displayedPageNumbers" :key="page"
            :class="{ active: page === currentPage + 1 }">
            <a class="page-link" href="#" @click.prevent="goToPage(page - 1)">
              {{ page }}
            </a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage >= totalPages - 1 }">
            <a class="page-link px-4" href="#" @click.prevent="nextPage">
              <i class="fa-solid fa-angle-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ClientInvoices",
  data() {
    return {
      invoices: [],
      loading: false,
      error: null,
      currentPage: 0,
      totalPages: 1,
      pageSize: 6,
    };
  },

  computed: {
    displayedPageNumbers() {
      const pages = [];
      const maxPagesToShow = 5;
      let startPage = Math.max(1, this.currentPage + 1 - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    }
  },

  methods: {
    formatCurrency(value) {
      const num = Number(value || 0);
      return num.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },

    fetchInvoices() {
      this.loading = true;
      axios
        .post("http://localhost:8081/api/invoice/my-invoice",
          { page: this.currentPage, size: this.pageSize },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("token")
            }
          }
        )
        .then((res) => {
          this.invoices = res.data || [];
          // Ước tính totalPages
          if (this.invoices.length < this.pageSize) {
            this.totalPages = this.currentPage + 1;
          } else {
            this.totalPages = this.currentPage + 2;
          }
          console.log("data loaded invoice", this.invoices);
        })
        .catch((err) => {
          this.error = err.message;
          console.error("Fetch invoices error:", err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.fetchInvoices();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.fetchInvoices();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    goToPage(pageNumber) {
      if (pageNumber >= 0 && pageNumber < this.totalPages && pageNumber !== this.currentPage) {
        this.currentPage = pageNumber;
        this.fetchInvoices();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
  },

  mounted() {
    this.fetchInvoices();
  },
};
</script>



<style scoped>
.pagination .page-link {
  color: var(--bs-success);
  border-color: var(--bs-success);
}

.pagination .page-item.active .page-link {
  background-color: var(--bs-success) !important;
  border-color: var(--bs-success) !important;
  color: white !important;
}

.pagination .page-link:hover {
  background-color: var(--bs-success);
  border-color: var(--bs-success);
  color: white;
}

.pagination .page-link:focus {
  box-shadow: none !important;
  outline: none !important;
}

.pagination .page-item.disabled .page-link {
  color: #6c757d;
  border-color: #dee2e6;
}
</style>
