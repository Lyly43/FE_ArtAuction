<template>
  <div class="row mb-3">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-12 col-md-6 col-sm-12 d-flex align-items-center">
              <h4 class="text-success fw-bold m-0">Auction History</h4>
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
  <!-- Loading Overlay -->
  <div v-if="loading" class="row">
    <div class="col-12 d-flex justify-content-center align-items-center py-5">
      <div class="text-center">
        <div class="spinner-border text-success" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading data...</p>
      </div>
    </div>
  </div>

  <div v-else class="row mb-5">
    <!-- Empty state -->
    <div v-if="list.length === 0" class="col-12">
      <div class="card">
        <div class="card-body text-center py-5">
          <i class="fa-regular fa-inbox fa-3x text-muted mb-3"></i>
          <h5 class="text-muted mb-2">No data</h5>
          <p class="text-muted m-0">You haven't participated in any auction sessions yet.</p>
        </div>
      </div>
    </div>

    <!-- List data -->
    <template v-else v-for="(v, k) in list" :key="k">
      <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <div class="card p-0">
          <!-- <div class="badge p-0">
            <img src="../../../../assets/img/user_test.jpg" class="img-auction" alt="">
            <div class="badge-live d-flex align-items-center gap-2"><i
                class="fa-solid fa-circle fa-sm fw-bold text-white"></i>
              <p class="m-0  fw-bold text-white">LIVE</p>
            </div>
            <div class="badge-success1 d-flex align-items-center gap-2">12:35</div>
            <div class="badge-success2 d-flex align-items-center gap-2">12:35</div>

          </div> -->
          <div class="p-0 position-relative">
            <img :src="v.imageAuctionRoom" class="img-auction" alt="" loading="lazy">
            <div v-if="v.status === 1" class="badge-live d-flex align-items-center gap-2">
              <i class="fa-solid fa-circle fa-sm fw-bold text-white"></i>
              <p class="m-0 fw-bold fa-sm  text-white">LIVE</p>
            </div>
            <span class="badge position-absolute top-0 end-0 m-3 bg-success px-3">12:35</span>
            <span class="badge position-absolute bottom-0 end-0 m-3 bg-success">{{ v.memberIds.length }}
              bidders</span>

          </div>

          <div class="card-body d-flex flex-column gap-3">
            <div class="d-flex flex-column gap-1">
              <p class="fw-bold m-0 text-success fs-5"> {{ v.roomName }} </p>
              <p class="m-0"> {{ v.description }} </p>
            </div>

            <!-- Dòng thông tin -->
            <div class="d-flex justify-content-between mb-1">
              <div class="d-flex flex-column gap-1">
                <p class="fw-bold m-0">Current product</p>
                <!-- <p class="m-0">Product {{ auction.numberOfArtwork }} of 10</p> -->
              </div>

              <div class="d-flex flex-column gap-1 text-end">
                <p class="fw-bold m-0">High Price</p>
                <!-- <p class="m-0">{{ auction.artwork.currentPrice }}</p> -->
              </div>
            </div>
            <button v-if="v.status === 1" class="btn btn-success">Join AuctAuction</button>
            <button v-else-if="v.status === 2" class="btn btn-warning">Reverve Spot</button>
            <button v-else class="btn btn-danger disabled">View Auction</button>

          </div>


        </div>
      </div>
    </template>




  </div>

  <!-- Pagination -->
  <div v-if="list.length > 0" class="row mt-4">
    <div class="col-12 d-flex justify-content-center">
      <nav aria-label="Page navigation">
        <ul class="pagination" :class="{ 'opacity-50 pe-none': loading }">
          <li class="page-item" :class="{ disabled: currentPage === 0 || loading }">
            <a class="page-link px-4" href="#" @click.prevent="goToPage(currentPage - 1)">
              <i class="fa-solid fa-angle-left"></i>
            </a>
          </li>
          <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: page === currentPage, disabled: loading }">
            <a class="page-link" href="#" @click.prevent="goToPage(page)">
              <span v-if="loading && page === currentPage" class="spinner-border spinner-border-sm" role="status"></span>
              <span v-else>{{ page + 1 }}</span>
            </a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage >= totalPages - 1 || loading }">
            <a class="page-link px-4" href="#" @click.prevent="goToPage(currentPage + 1)">
              <i class="fa-solid fa-angle-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

</template>
<script>
import axios from 'axios';


export default {
  data() {
    return {
      list: [],
      currentPage: 0,
      totalPages: 1,
      pageSize: 9,
      loading: false,
    }
  },
  computed: {
    visiblePages() {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(0, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible);

      if (end - start < maxVisible) {
        start = Math.max(0, end - maxVisible);
      }

      for (let i = start; i < end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData(page = this.currentPage) {
      this.loading = true;
      axios
        .post('http://localhost:8081/api/auctionroom/history',
          { page: page, size: this.pageSize },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("token")
            }
          }
        )
        .then((res) => {
          // Nếu API trả về object với content và totalPages
          if (res.data && res.data.content) {
            this.list = res.data.content;
            this.totalPages = res.data.totalPages || 1;
          } else {
            // Nếu API trả về array trực tiếp
            this.list = res.data || [];
            // Ước tính totalPages dựa trên số lượng item
            if (this.list.length < this.pageSize) {
              this.totalPages = page + 1;
            } else {
              this.totalPages = page + 2; // Có thể còn trang tiếp
            }
          }
          // Cập nhật currentPage sau khi load xong
          this.currentPage = page;
          console.log("data loaded history", this.list);
          // Scroll lên đầu
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    goToPage(page) {
      if (page < 0 || page >= this.totalPages || page === this.currentPage || this.loading) return;
      this.loadData(page);
    },

  }
}
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
  box-shadow: none !important;
  outline: none !important;
}

.pagination .page-link:focus {
  box-shadow: none !important;
  outline: none !important;
}

.pagination .page-link:hover {
  background-color: var(--bs-success);
  border-color: var(--bs-success);
  color: white;
}

.pagination .page-item.disabled .page-link {
  color: #6c757d;
  border-color: #dee2e6;
}
</style>
