<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="mb-4">
      <h4 class="fw-bold text-primary mb-1">Artwork Management</h4>
      <p class="text-body-secondary mb-0">Manage all artwork in the system</p>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Total work</h6>
                <h3 class="fw-bold mb-0">{{ statistics.totalArtworks }}</h3>
              </div>
              <div
                class="bg-secondary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px"
              >
                <i class="fa-solid fa-images"></i>
              </div>
            </div>
            <small class="text-success fw-medium">
              <!-- <i class="fa-solid fa-arrow-up me-1"></i> -->
              Total list of works
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Approved</h6>
                <h3 class="fw-bold mb-0">{{ statistics.approvedArtworks }}</h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px"
              >
                <i class="fa-solid fa-circle-check"></i>
              </div>
            </div>
            <small class="text-body-secondary">Total number of approved products</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Pending</h6>
                <h3 class="fw-bold mb-0">{{ statistics.pendingArtworks }}</h3>
              </div>
              <div
                class="bg-warning-subtle text-warning-emphasis rounded-circle d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px"
              >
                <i class="fa-solid fa-clock"></i>
              </div>
            </div>
            <small class="text-body-secondary">Total number of products pending approval</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Refused</h6>
                <h3 class="fw-bold mb-0">{{ statistics.rejectedArtworks }}</h3>
              </div>
              <div
                class="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px"
              >
                <i class="fa-solid fa-ban"></i>
              </div>
            </div>
            <small class="text-danger fw-medium">Policy violation</small>
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
                placeholder="Search artwork..."
                @input="handleSearch"
              />
            </div>
          </div>
          <div
            class="col-12 col-md-6 col-lg-8 text-md-end d-flex justify-content-md-end justify-content-start align-items-center gap-2"
          >
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
                      Artwork filter
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
                      <div class="row g-2">
                        <div class="col-6">
                          <label class="form-label x-small fw-bold text-secondary"
                            >Thể loại (Genre)</label
                          >
                          <select class="form-select shadow-none bg-light border-0">
                            <option selected value="">Tất cả</option>
                            <option value="Abstract">Trừu tượng</option>
                            <option value="Portrait">Chân dung</option>
                            <option value="Landscape">Phong cảnh</option>
                            <option value="Modern">Hiện đại</option>
                            <option value="Traditional">Truyền thống</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <hr class="border-secondary opacity-10 my-4" />

                    <div class="mb-4">
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2">
                        <i class="fa-solid fa-tag me-1"></i> Price range (VND)
                      </label>

                      <div class="d-flex flex-wrap gap-2 mb-2">
                        <button
                          class="btn btn-sm btn-light border text-secondary active-pill"
                          style="font-size: 0.75rem"
                        >
                          &lt; 5tr
                        </button>
                        <button
                          class="btn btn-sm btn-light border text-secondary"
                          style="font-size: 0.75rem"
                        >
                          5-20tr
                        </button>
                        <button
                          class="btn btn-sm btn-light border text-secondary"
                          style="font-size: 0.75rem"
                        >
                          20-100tr
                        </button>
                        <button
                          class="btn btn-sm btn-light border text-secondary"
                          style="font-size: 0.75rem"
                        >
                          &gt; 100tr
                        </button>
                      </div>

                      <div class="input-group">
                        <input type="text" class="form-control shadow-none" placeholder="Min" />
                        <span
                          class="input-group-text bg-white border-start-0 border-end-0 text-secondary"
                          >-</span
                        >
                        <input type="text" class="form-control shadow-none" placeholder="Max" />
                      </div>
                    </div>

                    <hr class="border-secondary opacity-10 my-4" />

                    <div class="mb-4">
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2">
                        Approval status
                      </label>
                      <div class="bg-light rounded-3 p-3 border">
                        <div class="form-check mb-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="artStatus"
                            id="stNotApproved"
                          />
                          <label class="form-check-label text-secondary" for="stNotApproved">
                            <i class="fa-regular fa-clock me-1"></i> Not Approved
                          </label>
                        </div>
                        <div class="form-check mb-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="artStatus"
                            id="stApproved"
                            checked
                          />
                          <label class="form-check-label text-success fw-medium" for="stApproved">
                            <i class="fa-solid fa-check me-1"></i> Approved
                          </label>
                        </div>
                        <div class="form-check mb-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="artStatus"
                            id="stAuction"
                          />
                          <label class="form-check-label text-primary fw-medium" for="stAuction">
                            <i class="fa-solid fa-gavel me-1"></i> Up for Auction
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="artStatus"
                            id="stRefused"
                          />
                          <label class="form-check-label text-danger" for="stRefused">
                            <i class="fa-solid fa-ban me-1"></i> Refused
                          </label>
                        </div>
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

            <button class="btn btn-primary shadow">
              <i class="fa-solid fa-plus me-2"></i>Add New
            </button>
          </div>
        </div>

        <div class="table-responsive text-nowrap overflow-y-auto">
          <table class="table table-hover align-middle text-nowrap mb-0 w-100">
            <thead class="table-light">
              <tr>
                <th scope="col" class="ps-3 py-3 fw-bold align-middle">Artwork</th>
                <th scope="col" class="ps-3 py-3 fw-bold align-middle">Type</th>
                <th scope="col" class="py-3 fw-bold align-middle">Author</th>
                <th scope="col" class="py-3 fw-bold align-middle">Year</th>
                <th scope="col" class="py-3 fw-bold align-middle">Painting Genre</th>
                <th scope="col" class="py-3 fw-bold align-middle">Size</th>
                <th scope="col" class="py-3 fw-bold align-middle">Starting Price</th>
                <th scope="col" class="py-3 fw-bold align-middle">Created at</th>
                <th scope="col" class="py-3 fw-bold align-middle">Status</th>
                <th scope="col" class="py-3 fw-bold align-middle text-center">
                  <i class="fa-solid fa-ellipsis"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in artworks" :key="item.id">
                <td class="ps-3 align-middle">
                  <div class="d-flex align-items-center gap-3">
                    <img
                      :src="item.avtArtwork"
                      class="rounded border bg-light"
                      style="width: 48px; height: 48px; object-fit: cover"
                      alt="art"
                      loading="lazy"
                    />
                    <div>
                      <p class="mb-0 fw-bold text-dark">{{ item.title }}</p>
                      <small class="text-body-secondary">ID: #{{ item.id }}</small>
                    </div>
                  </div>
                </td>
                <td class="align-middle">{{ item.paintingGenre }}</td>
                <td class="align-middle">{{ item.author }}</td>
                <td class="align-middle">{{ item.yearOfCreation }}</td>
                <td class="align-middle">{{ item.paintingGenre }}</td>
                <td class="align-middle">{{ item.size }}</td>
                <td class="fw-medium text-dark align-middle">
                  {{ formatCurrency(item.startedPrice) }}
                </td>
                <td class="small text-body-secondary align-middle">{{ item.createdAt }}</td>
                <td class="align-middle">
                  <button
                    class="btn badge rounded-pill border fw-normal px-3 py-2"
                    :class="getStatusClass(item.status)"
                  >
                    {{ convertStatus(item.status) }}
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
                        <RouterLink :to="`/admin/artwork-detail/${item.id}`" class="dropdown-item">
                          <i class="fa-solid fa-eye me-2 text-primary"></i>See details
                        </RouterLink>
                      </li>
                      <li>
                        <router-link :to="`/admin/edit-artwork/${item.id}`" class="dropdown-item">
                          <i class="fa-solid fa-pen me-2 text-info"></i>Edit
                        </router-link>
                      </li>
                      <li><hr class="dropdown-divider" /></li>
                      <li>
                        <button
                          class="dropdown-item text-danger"
                          @click="handleDelete(item.id, item.title)"
                        >
                          <i class="fa-solid fa-trash me-2"></i>Delete
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
import axios from "axios";
export default {
  data() {
    return {
      artworks: [],
      search: "",
      isLoading: false,
      statistics: [],
    };
  },
  mounted() {
    this.loadArtworkData();
    this.loadArtworkStatistical();
  },
  methods: {
    formatCurrency(value) {
      if (!value) return "0đ";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    convertStatus(status) {
      switch (status) {
        case 0:
          return "Not approved";
        case 1:
          return "Approved";
        case 2:
          return "Up for auction";
        case 3:
          return "Refused";
      }
    },

    getStatusClass(status) {
      // Sử dụng các class background/text chuẩn của Bootstrap 5.3
      switch (status) {
        case 0:
          return "bg-secondary-subtle border-secondary-subtle text-secondary";
        case 1:
          return "bg-success-subtle border-success-subtle text-success";
        case 2:
          return "bg-warning-subtle border-warning-subtle text-warning-emphasis";
        case 3:
          return "bg-danger-subtle border-danger-subtle text-danger";
      }
    },

    loadArtworkData() {
      axios
        .get("http://localhost:8081/api/admin/artworks/lay-du-lieu-tac-pham", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.artworks = res.data;
          console.log(this.artworks);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    handleSearch() {
      // Xóa bộ đếm cũ nếu người dùng gõ tiếp khi chưa hết giờ
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
        this.loadArtworkData();
        return;
      }
      this.isLoading = true;
      axios
        .get(`http://localhost:8081/api/admin/artworks/tim-kiem-tac-pham?q=${this.search}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.artworks = res.data;
          console.log("Kết quả tìm kiếm:", this.artworks);
        })
        .catch((err) => {
          console.error("Lỗi tìm kiếm:", err);
          this.artworks = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    // Xóa
    handleDelete(artworkId, artworkName) {
      if (!confirm(`Bạn có chắc chắn muốn xóa artwork: ${artworkName}?`)) return;
      axios
        .delete(`http://localhost:8081/api/admin/artworks/xoa-tac-pham/${artworkId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Đã xóa thành công!");
          this.loadArtworkData();
        })
        .catch((err) => {
          console.error("Lỗi khi xóa:", err);
          const message = err.response?.data?.message || "Có lỗi xảy ra khi xóa!";
          alert(message);
        });
    },

    //  card thống kê
    loadArtworkStatistical() {
      axios
        .get(`http://localhost:8081/api/admin/artworks/thong-ke-tac-pham`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.statistics = res.data;
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
<style></style>
