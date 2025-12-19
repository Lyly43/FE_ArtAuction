<template>
  <div class="row mb-3">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-12 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
              <h4 class="text-success fw-bold m-0">Artwork Management</h4>
              <div class=" d-flex align-items-center gap-3">
                <div class="d-flex align-items-center gap-3 mb-lg-0 mb-3">
                  <input type="date" class="form-control" v-model="searchForm.dateFrom" placeholder="From date"
                    @change="onDateChange">
                  <p class="fw-bold">_</p>
                  <input type="date" class="form-control" v-model="searchForm.dateTo" placeholder="To date"
                    @change="onDateChange">
                </div>
                <button class="btn btn-outline-secondary" @click="resetSearch" :disabled="isSearching" title="Reset search">
                  <i class="fa-solid fa-rotate-left"></i>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12 mb-3">
      <div class=" card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-4 col-md-12 col-sm-12 d-flex align-items-center">
              <img src="https://picsum.photos/200/300" class="img-thumbnail img-square" alt="...">
            </div>
            <div class="col-lg-8">
              <div class="row mt-3">
                <div class="col-lg-12 col-md-12 col-sm-12 d-flex flex-column gap-3 ">
                  <div class="d-flex justify-content-between align-items-center">
                    <h5 class="m-0 fw-bold">Starry Night Over the Rhône</h5>
                    <div class="m-0 alert alert-accent2 border-start border-0 border-3 border-success fw-bold px-5 py-1"
                      role="alert">Won</div>
                    <!-- <div class="m-0 alert alert-danger border-start border-0 border-3 border-danger fw-bold px-5 py-1" role="alert">Lost</div> -->
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="m-0 ">Vincent van Gogh</p>
                    <p class="m-0 text-success fw-bold">My Bid: <span class="ps-3 fw-bold">$15,750</span></p>
                  </div>
                  <hr>
                </div>

                <div
                  class="col-lg-3 col-md-6 col-sm-12 d-flex flex-md-column justify-content-xs-between justify-content-sm-between gap-2 mb-lg-0 mb-3">
                  <p class="m-0 fw-bold">Participants</p>
                  <p class="m-0 ">15</p>
                </div>
                <div
                  class="col-lg-3 col-md-6 col-sm-12 d-flex flex-md-column justify-content-xs-between justify-content-sm-between gap-2 mb-lg-0 mb-3">
                  <p class="m-0 fw-bold">Total Bids</p>
                  <p class="m-0 ">24</p>
                </div>
                <div
                  class="col-lg-3 col-md-6 col-sm-12 d-flex flex-md-column justify-content-xs-between justify-content-sm-between gap-2 mb-lg-0 mb-3">
                  <p class="m-0 fw-bold">Starting Price</p>
                  <p class="m-0 ">$12,000</p>
                </div>
                <div
                  class="col-lg-3 col-md-6 col-sm-12 d-flex flex-md-column justify-content-xs-between justify-content-sm-between gap-2 mb-lg-0 mb-3">
                  <p class="m-0 fw-bold">Final Price</p>
                  <p class="m-0 ">$15,750</p>
                </div>

              </div>


            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Hiển thị thông báo khi không tìm thấy kết quả -->
    <div v-if="isSearchMode && displayedArtworks.length === 0" class="col-12">
      <div class="text-center py-5">
        <i class="fa-solid fa-magnifying-glass fa-3x text-muted mb-3"></i>
        <h4 class="text-muted mb-2">No matching results found</h4>
        <p class="text-muted">Please try again with different search criteria</p>
        <button class="btn btn-success mt-3" @click="resetSearch">
          <i class="fa-solid fa-rotate-left me-2"></i>View all
        </button>
      </div>
    </div>

    <!-- Danh sách artwork -->
    <template v-else v-for="(v, k) in displayedArtworks" :key="k">
      <div class="col-lg-12 mb-3">
        <div class=" card p-0">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-4 col-md-12 col-sm-12 d-flex align-items-center">
                <img :src="v.avtArtwork" class="img-thumbnail img-square" alt="...">
                <!-- <img src="https://picsum.photos/200/300" class="img-thumbnail img-square" alt="..."> -->
              </div>
              <div class="col-lg-8">
                <div class="row mt-3">
                  <div class="col-lg-12 col-md-12 col-sm-12 d-flex flex-column gap-2 ">
                    <div class="d-flex justify-content-between align-items-center">
                      <h5 class="m-0 fw-bold">{{ v.title }}</h5>
                      <p class="m-0 text-success fw-bold">My Bid:
                        <span class="ps-3 fw-bold">{{ v.myLatestBidAmount }}</span>
                      </p>
                      <!-- <div
                        class="m-0 alert alert-accent2 border-start border-0 border-3 border-success fw-bold px-5 py-1"
                        role="alert">Won</div> -->
                      <!-- <div class="m-0 alert alert-danger border-start border-0 border-3 border-danger fw-bold px-5 py-1" role="alert">Lost</div> -->
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                      <p class="m-0 ">
                        {{ v.ownerName }}
                      </p>

                    </div>
                    <hr class="my-2">
                  </div>

                  <div
                    class="col-lg-3 col-md-6 col-sm-12 d-flex flex-md-column justify-content-xs-between justify-content-sm-between gap-2 mb-lg-0 mb-3">
                    <p class="m-0 fw-bold">Participants</p>
                    <p class="m-0 ">15</p>
                  </div>
                  <div
                    class="col-lg-3 col-md-6 col-sm-12 d-flex flex-md-column justify-content-xs-between justify-content-sm-between gap-2 mb-lg-0 mb-3">
                    <p class="m-0 fw-bold">Total Bids</p>
                    <p class="m-0 ">24</p>
                  </div>
                  <div
                    class="col-lg-3 col-md-6 col-sm-12 d-flex flex-md-column justify-content-xs-between justify-content-sm-between gap-2 mb-lg-0 mb-3">
                    <p class="m-0 fw-bold">Starting Price</p>
                    <p class="m-0 ">$ {{ v.startedPrice }}</p>
                  </div>
                  <div
                    class="col-lg-3 col-md-6 col-sm-12 d-flex flex-md-column justify-content-xs-between justify-content-sm-between gap-2 mb-lg-0 mb-3">
                    <p class="m-0 fw-bold">Final Price</p>
                    <!-- <p class="m-0 ">$ {{ v.currentPrice }}</p> -->
                  </div>

                </div>


              </div>
            </div>
          </div>

        </div>

      </div>
    </template>

  </div>


</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      listmanage: [],
      // Form tìm kiếm
      searchForm: {
        dateFrom: "",
        dateTo: ""
      },
      isSearching: false,
      isSearchMode: false, // Đánh dấu đang ở chế độ tìm kiếm
      searchResults: [] // Kết quả tìm kiếm
    }
  },
  computed: {
    // Hiển thị kết quả tìm kiếm hoặc danh sách ban đầu
    displayedArtworks() {
      if (this.isSearchMode) {
        return this.searchResults;
      }
      return this.listmanage;
    }
  },

  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios
        .get('http://localhost:8081/api/artwork/my-artworks', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
          }
        })
        .then((res) => {
          // Đảm bảo listmanage là array
          this.listmanage = Array.isArray(res.data) ? res.data : [];
          console.log("data loaded management", this.listmanage);
        })
        .catch((err) => {
          console.error(err);
          this.$toast.error("Unable to load artworks");
        });
    },

    // ========== TÌM KIẾM ARTWORK ==========
    searchArtworks() {
      // Kiểm tra nếu đang tìm kiếm thì không làm gì
      if (this.isSearching) {
        return;
      }

      // Lấy token từ localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        this.$toast.error("Please login to search");
        return;
      }

      // Chuẩn bị dữ liệu tìm kiếm - chỉ dùng dateFrom và dateTo
      const searchData = {};

      // Thêm dateFrom và dateTo nếu có
      if (this.searchForm.dateFrom) {
        searchData.dateFrom = this.searchForm.dateFrom;
      }
      if (this.searchForm.dateTo) {
        searchData.dateTo = this.searchForm.dateTo;
      }

      // Kiểm tra xem có ít nhất một date được chọn không
      if (Object.keys(searchData).length === 0) {
        this.$toast.info("Please select at least one date");
        return;
      }

      // Bắt đầu tìm kiếm
      this.isSearching = true;
      this.isSearchMode = true;

      console.log('🔍 [SEARCH ARTWORK] Sending search request:', searchData);

      axios
        .post("http://localhost:8081/api/artwork/search", searchData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
          console.log('✅ [SEARCH ARTWORK] API Response received:', res.data);

          // Kiểm tra cấu trúc response
          if (res.data && res.data.success !== undefined) {
            // Response có dạng { success, message, data, count }
            if (res.data.success && Array.isArray(res.data.data)) {
              this.searchResults = res.data.data;
              const count = res.data.count || res.data.data.length;
              this.$toast.success(res.data.message || `Found ${count} artwork(s)`);
            } else {
              this.searchResults = [];
              this.$toast.info(res.data.message || "No results found");
            }
          } else if (Array.isArray(res.data)) {
            // Response trực tiếp là array
            this.searchResults = res.data;
            this.$toast.success(`Found ${res.data.length} artwork(s)`);
          } else {
            this.searchResults = [];
            this.$toast.info("No results found");
          }

          console.log('✅ [SEARCH ARTWORK] Final results:', this.searchResults.length, 'items');
        })
        .catch((err) => {
          console.error('❌ [SEARCH ARTWORK] API Error:', err);
          this.searchResults = [];
          const errorMessage = err.response?.data?.message || "Search failed. Please try again.";
          this.$toast.error(errorMessage);
        })
        .finally(() => {
          this.isSearching = false;
        });
    },

    // Reset tìm kiếm và quay về danh sách ban đầu
    resetSearch() {
      // Reset form tìm kiếm
      this.searchForm = {
        dateFrom: "",
        dateTo: ""
      };
      this.isSearchMode = false;
      this.searchResults = [];

      // Reload lại danh sách ban đầu
      this.loadData();

      this.$toast.info("Search reset. Showing all artworks");
    },

    // Tự động search khi date thay đổi
    onDateChange() {
      // Chỉ search nếu có ít nhất một date được chọn
      if (this.searchForm.dateFrom || this.searchForm.dateTo) {
        this.searchArtworks();
      }
    },
  },
}
</script>
<style></style>

<style></style>
