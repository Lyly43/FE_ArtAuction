<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
      <div class="mb-3 mb-md-0">
        <h4 class="fw-bold text-primary mb-1">Auction Room Management</h4>
        <p class="text-body-secondary mb-0">Overview and control of all auction sessions</p>
      </div>
      <div>
        <router-link to="/admin/add-auction-room" class="btn btn-primary shadow-sm px-4 fw-bold">
          <i class="fa-solid fa-plus me-2"></i>Create Room
        </router-link>
      </div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Total Rooms</h6>
                <h3 class="fw-bold mb-0">{{ statistics.totalRooms }}</h3>
              </div>
              <div
                class="bg-secondary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-layer-group fs-5"></i>
              </div>
            </div>
            <small class="text-success fw-medium"
              ><i class="fa-solid fa-arrow-trend-up me-1"></i>+5 new rooms</small
            >
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Live Now</h6>
                <h3 class="fw-bold mb-0">{{ statistics.runningRooms }}</h3>
              </div>
              <div
                class="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-tower-broadcast fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">Currently active sessions</small>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Upcoming</h6>
                <h3 class="fw-bold mb-0">{{ statistics.upcomingRooms }}</h3>
              </div>
              <div
                class="bg-warning-subtle text-warning-emphasis rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-regular fa-calendar-check fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">Scheduled for today</small>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Finished</h6>
                <h3 class="fw-bold mb-0">{{ statistics.completedRooms }}</h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-flag-checkered fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">Completed sessions</small>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm mb-4 rounded-pill overflow-hidden">
      <div class="card-body p-2">
        <div class="row g-2 align-items-center">
          <div class="col-12 col-md-8 col-lg-6">
            <div class="input-group border-0">
              <span class="input-group-text bg-white border-0 ps-3 text-secondary"
                ><i class="fa-solid fa-magnifying-glass"></i
              ></span>
              <input
                v-model="search"
                type="text"
                class="form-control border-0 shadow-none"
                placeholder="Search for auction room..."
                @input="handleSearch"
              />
            </div>
          </div>
          <div class="col-auto ms-auto pe-2">
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
                      Auction room filter
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
                        <i class="fa-solid fa-magnifying-glass me-1"></i> Search
                      </label>
                      <div class="input-group">
                        <span class="input-group-text bg-white text-secondary border-end-0"
                          ><i class="fa-solid fa-gavel"></i
                        ></span>
                        <input
                          type="text"
                          class="form-control border-start-0 shadow-none ps-0"
                          placeholder="Room Name or Room Code..."
                        />
                      </div>
                    </div>

                    <hr class="border-secondary opacity-10 my-4" />

                    <div class="mb-4">
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2">
                        <i class="fa-solid fa-signal me-1"></i> Room status
                      </label>

                      <div class="bg-light rounded-3 p-3 border">
                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" id="stLive" value="1" />
                          <label class="form-check-label text-danger fw-bold" for="stLive">
                            <i
                              class="fa-solid fa-circle fa-beat-fade me-1"
                              style="font-size: 0.5rem"
                            ></i>
                            Live
                          </label>
                        </div>

                        <div class="form-check mb-2">
                          <input class="form-check-input" type="checkbox" id="stComing" value="2" />
                          <label class="form-check-label text-primary fw-medium" for="stComing">
                            <i class="fa-regular fa-clock me-1"></i> Coming Soon
                          </label>
                        </div>

                        <div class="form-check mb-2">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="stFinished"
                            value="0"
                          />
                          <label class="form-check-label text-success fw-medium" for="stFinished">
                            <i class="fa-solid fa-flag-checkered me-1"></i> Finished
                          </label>
                        </div>

                        <div class="d-flex gap-3 mt-2 pt-2 border-top">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="stCanceled" />
                            <label class="form-check-label small text-muted" for="stCanceled"
                              >Canceled</label
                            >
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="stDraft" />
                            <label class="form-check-label small text-muted" for="stDraft"
                              >Draft</label
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr class="border-secondary opacity-10 my-4" />

                    <div class="mb-4">
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2">
                        Auction type
                      </label>
                      <div class="row g-2">
                        <div class="col-6">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="typeEnglish" />
                            <label class="form-check-label" for="typeEnglish"
                              >English Auction</label
                            >
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="typeDutch" />
                            <label class="form-check-label" for="typeDutch">Dutch Auction</label>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="typeSealed" />
                            <label class="form-check-label" for="typeSealed">Sealed Bid</label>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="typeStream" />
                            <label class="form-check-label" for="typeStream">Live Stream</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr class="border-secondary opacity-10 my-4" />

                    <div class="mb-4">
                      <label class="form-label fw-bold text-uppercase small text-secondary mb-2">
                        <i class="fa-regular fa-calendar-days me-1"></i> Time of event
                      </label>

                      <div class="mb-3">
                        <label class="form-label x-small text-secondary fw-bold">Start Time</label>
                        <div class="input-group input-group-sm">
                          <input type="date" class="form-control shadow-none" />
                          <span class="input-group-text bg-light border-0 text-secondary">-</span>
                          <input type="date" class="form-control shadow-none" />
                        </div>
                      </div>

                      <div>
                        <label class="form-label x-small text-secondary fw-bold">End Time</label>
                        <div class="input-group input-group-sm">
                          <input type="date" class="form-control shadow-none" />
                          <span class="input-group-text bg-light border-0 text-secondary">-</span>
                          <input type="date" class="form-control shadow-none" />
                        </div>
                      </div>
                    </div>

                    <hr class="border-secondary opacity-10 my-4" />

                    <div class="mb-2">
                      <!-- <label class="form-label fw-bold text-uppercase small text-secondary mb-2">
                        Chỉ số phòng
                      </label> -->

                      <!-- <div class="mb-3">
                        <label class="form-label x-small text-secondary fw-bold"
                          >Giá khởi điểm (Start Price)</label
                        >
                        <div class="input-group input-group-sm">
                          <input type="text" class="form-control shadow-none" placeholder="Min" />
                          <span class="input-group-text bg-light border-0 text-secondary">-</span>
                          <input type="text" class="form-control shadow-none" placeholder="Max" />
                        </div>
                      </div> -->

                      <div>
                        <label class="form-label x-small text-secondary fw-bold"
                          >Number of participants</label
                        >
                        <div class="btn-group w-100" role="group">
                          <input
                            type="radio"
                            class="btn-check"
                            name="parti"
                            id="partiAll"
                            checked
                          />
                          <label class="btn btn-outline-secondary btn-sm" for="partiAll">All</label>

                          <input type="radio" class="btn-check" name="parti" id="partiLow" />
                          <label class="btn btn-outline-secondary btn-sm" for="partiLow"
                            >&lt; 10</label
                          >

                          <input type="radio" class="btn-check" name="parti" id="partiMid" />
                          <label class="btn btn-outline-secondary btn-sm" for="partiMid"
                            >10-50</label
                          >

                          <input type="radio" class="btn-check" name="parti" id="partiHigh" />
                          <label class="btn btn-outline-secondary btn-sm" for="partiHigh"
                            >&gt; 50</label
                          >
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
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Loading rooms...</p>
      </div>

      <div v-else class="col-12" v-for="room in sortedAuctionRooms" :key="room.id">
        <router-link
          :to="`/admin/testlivestream/${room.id}`"
          class="card border-0 shadow-sm hover-lift transition-base h-100 text-decoration-none position-relative"
          :class="getBorderClass(room.status)"
          style="cursor: pointer"
        >
          <div class="dropdown position-absolute top-0 end-0 mt-3 me-3" style="z-index: 10">
            <button
              class="btn btn-light btn-sm rounded-circle shadow-sm d-flex align-items-center justify-content-center"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="width: 32px; height: 32px; background-color: rgba(255, 255, 255, 0.9)"
              @click.prevent
            >
              <i class="fa-solid fa-ellipsis text-secondary"></i>
            </button>

            <ul class="dropdown-menu dropdown-menu-end border-0 shadow-lg">
              <li v-if="room.status === 'live' || room.status === 'streaming'">
                <a
                  class="dropdown-item py-2 fw-bold text-danger"
                  href="#"
                  @click.prevent="goToLive(room.id)"
                >
                  <i class="fa-solid fa-video me-2 animate-pulse"></i>Vào xem Live
                </a>
              </li>

              <li>
                <router-link :to="`/admin/auction-detail/${room.id}`" class="dropdown-item py-2">
                  <i class="fa-regular fa-eye me-2 text-primary"></i>See Details
                </router-link>
                <!-- <router-link :to="`/admin/edit-auction-room/${room.id}`" class="dropdown-item py-2">
                  <i class="fa-solid fa-pen-to-square me-2"></i>Edit
                </router-link> -->
              </li>

              <li><hr class="dropdown-divider" /></li>

              <li>
                <a
                  class="dropdown-item py-2 text-secondary"
                  href="#"
                  @click.prevent="deleteRoom(room.id)"
                >
                  <i class="fa-regular fa-trash-can me-2"></i>Delete
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body p-4">
            <div class="row align-items-center">
              <div class="col-12 col-lg-4 mb-3 mb-lg-0 border-end-lg pe-lg-4">
                <div class="d-flex align-items-center gap-3">
                  <img
                    :src="room.artworkImage || '/src/assets/img/4.png'"
                    alt="Art"
                    class="rounded-3 shadow-sm border object-fit-cover flex-shrink-0"
                    style="width: 80px; height: 80px"
                  />

                  <div class="overflow-hidden w-100">
                    <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                      <h5
                        class="fw-bold text-primary mb-0 text-truncate"
                        style="max-width: 200px"
                        :title="room.roomName"
                      >
                        {{ room.roomName }}
                      </h5>
                      <span
                        class="badge rounded-pill px-2 py-1 border fw-normal"
                        style="font-size: 0.7rem"
                        :class="getStatusClass(room.status)"
                      >
                        {{ convertStatus(room.status) }}
                      </span>
                    </div>
                    <p class="my-3">{{ room.id }}</p>

                    <small class="text-muted">
                      <i class="fa-solid fa-tag me-1"></i>{{ room.type }}
                    </small>
                    <div>
                      <small class="text-muted"> ID: {{ room.id }} </small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-lg-8 ps-lg-4">
                <div class="row g-3">
                  <div class="col-6 col-md-3">
                    <span class="text-secondary text-uppercase x-small fw-bold d-block mb-1"
                      >Start Time</span
                    >
                    <span class="fw-medium text-dark fs-6">{{ formatDate(room.startedAt) }}</span>
                  </div>
                  <div class="col-6 col-md-3">
                    <span class="text-secondary text-uppercase x-small fw-bold d-block mb-1"
                      >End time</span
                    >
                    <span class="fw-medium text-dark fs-6">{{ formatDate(room.stoppedAt) }}</span>
                  </div>
                  <div class="col-6 col-md-3">
                    <span class="text-secondary text-uppercase x-small fw-bold d-block mb-1"
                      >Participants</span
                    >
                    <span class="fw-medium text-dark fs-6">
                      <div class="d-flex align-items-center">
                        <i class="fa-solid fa-users text-info me-2"></i>
                        <span class="fw-bold text-dark">{{ room.totalMembers }}</span>
                      </div>
                    </span>
                  </div>
                  <div class="col-6 col-md-3">
                    <span class="text-secondary text-uppercase x-small fw-bold d-block mb-1"
                      >Current Price</span
                    >
                    <span class="fw-bold text-primary fs-5">{{
                      formatCurrency(room.currentPrice)
                    }}</span>
                  </div>
                  <!-- <div class="col-6 col-md-3">
                    <span class="text-secondary text-uppercase x-small fw-bold d-block mb-1"
                      >Start Price</span
                    >
                    <span class="fw-medium text-body-secondary">{{
                      formatCurrency(room.startingPrice)
                    }}</span>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <div v-if="!isLoading && auctionRooms.length === 0" class="text-center py-5">
        <p class="text-muted">No auction rooms found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AuctionRoomManagement",
  data() {
    return {
      auctionRooms: [],
      isLoading: false,
      search: "",
      statistics: "",
    };
  },
  mounted() {
    this.loadAuctionData();
    this.loadAuctionStatistical();
  },
  methods: {
    loadAuctionData() {
      this.isLoading = true;
      axios
        .get("http://localhost:8081/api/admin/auction-rooms/lay-du-lieu", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.auctionRooms = res.data;
          console.log("Data Loaded:", this.auctionRooms);
        })
        .catch((err) => {
          console.error("Error loading rooms:", err);
        })
        .finally(() => {
          this.isLoading = false;
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
      if (!this.search.trim()) {
        this.loadAuctionData();
        return;
      }
      this.isLoading = true;
      axios
        .get(`http://localhost:8081/api/admin/auction-rooms/tim-kiem?q=${this.search}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.auctionRooms = res.data;
        })
        .catch((err) => {
          console.error("Search error:", err);
          this.auctionRooms = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    // handleRoomClick(id) {
    //   this.$router.push(`/admin/auction-room/${id}`);
    // },

    // --- HELPER FUNCTIONS ---
    formatCurrency(value) {
      if (value === undefined || value === null) return "0đ";
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    },
    formatDate(dateStr) {
      if (!dateStr) return "Chưa xác định";
      // Cắt chuỗi đơn giản hoặc format lại tùy ý
      return dateStr.replace("T", " ").slice(0, 16);
    },
    convertStatus(status) {
      switch (status) {
        case 0:
          return "Finished";
        case 1:
          return "In progress";
        case 2:
          return "Coming soon";
        default:
          return "Unknown";
      }
    },
    getStatusClass(status) {
      switch (status) {
        case 2:
          return "bg-warning-subtle text-warning-emphasis border-warning-subtle"; // Coming soon
        case 1:
          return "bg-danger-subtle text-danger border-danger-subtle"; // Live
        case 0:
          return "bg-secondary-subtle text-secondary border-secondary-subtle"; // Ended
        default:
          return "bg-light text-dark border";
      }
    },
    getBorderClass(status) {
      switch (status) {
        case 2:
          return "border-start border-4 border-warning";
        case 1:
          return "border-start border-4 border-danger";
        case 0:
          return "border-start border-4 border-secondary";
        default:
          return "";
      }
    },

    //  card thống kê
    loadAuctionStatistical() {
      axios
        .get(`http://localhost:8081/api/admin/auction-rooms/thong-ke`, {
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
  deleteRoom(roomId) {
    if (!confirm(`Bạn có chắc chắn muốn xóa phòng này không?`)) return;

    axios
      .delete(`/api/admin/auction-rooms/xoa/${roomId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        alert("Đã xóa thành công!");
        this.loadAuctionData();
      })
      .catch((err) => {
        console.error("Lỗi khi xóa:", err);
        const message = err.response?.data?.message || "Có lỗi xảy ra khi xóa!";
        alert(message);
      });
  },

  computed: {
    // Đảo ngược thứ tự mảng
    sortedAuctionRooms() {
      return [...this.auctionRooms].reverse();
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
