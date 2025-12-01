<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="mb-4">
      <h4 class="fw-bold text-primary mb-1">Dashboard</h4>
      <p class="text-body-secondary mb-0">Overview of the painting auction system</p>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Total users</h6>

                <h3 class="fw-bold mb-0">{{ statistics?.totalUsers?.total }}</h3>
              </div>
              <div
                class="bg-secondary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-users fs-5"></i>
              </div>
            </div>

            <small class="text-secondary fw-medium"> Total number of users </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Artwork</h6>

                <h3 class="fw-bold mb-0">{{ statistics?.totalArtworks?.total }}</h3>
              </div>
              <div
                class="bg-info-subtle text-info rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-image fs-5"></i>
              </div>
            </div>

            <small class="text-secondary fw-medium"> Total number of works </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Auction Rooms</h6>

                <h3 class="fw-bold mb-0">{{ statistics?.totalAuctionRooms }}</h3>
              </div>
              <div
                class="bg-warning-subtle text-warning-emphasis rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-hammer fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">Total number of auction rooms</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Bidding</h6>

                <h3 class="fw-bold mb-0">{{ statistics?.totalBids?.total }}</h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-chart-line fs-5"></i>
              </div>
            </div>

            <small class="text-secondary fw-medium"> Total number of bids </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Revenue</h6>
                <h3 class="fw-bold mb-0">
                  {{ formatCurrency(statistics?.revenue?.currentMonth || 0) }}
                </h3>
              </div>
              <div
                class="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-dollar-sign fs-5"></i>
              </div>
            </div>
            <small class="text-success fw-medium">
              <i class="fa-solid fa-arrow-trend-up me-1"></i>
              {{ statistics?.revenue?.percentage || 0 }}% over last month
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-secondary fw-bold mb-1">Active Users</h6>
                <h3 class="fw-bold mb-0">{{ statistics?.activeUsers || 0 }}</h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-user-check fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">Number of active people</small>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-xl-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white border-0 pt-3">
            <h5 class="text-primary fw-bold mb-0">Nearby auction rooms</h5>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive text-nowrap overflow-y-auto" style="max-height: 400px">
              <table class="table table-hover align-middle text-nowrap mb-0 w-100">
                <thead class="table-light sticky-top">
                  <tr>
                    <th scope="col" class="ps-3 py-3 fw-bold">Room Name</th>
                    <th scope="col" class="py-3 fw-bold">Current Artwork</th>
                    <th scope="col" class="py-3 fw-bold">Status</th>
                    <th scope="col" class="py-3 fw-bold text-end pe-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isLoading">
                    <td colspan="4" class="text-center py-4 text-muted">Loading data...</td>
                  </tr>

                  <tr v-else-if="!topAuctionRooms || topAuctionRooms.length === 0">
                    <td colspan="4" class="text-center py-4 text-muted">No rooms found.</td>
                  </tr>

                  <template v-for="(room, index) in topAuctionRooms" :key="room.id">
                    <tr
                      class="cursor-pointer"
                      data-bs-toggle="collapse"
                      :data-bs-target="'#room-' + room.id"
                      aria-expanded="false"
                    >
                      <td class="ps-3 fw-medium text-primary">
                        <i
                          class="fa-solid fa-chevron-down text-muted me-2"
                          style="font-size: 0.8rem"
                        ></i>
                        {{ room.roomName }}
                      </td>

                      <td>
                        <div class="d-flex align-items-center">
                          <img
                            :src="room.sessions?.[0]?.avtArtwork"
                            alt="Art"
                            class="rounded border me-2"
                            style="width: 40px; height: 40px; object-fit: cover"
                            @error="$event.target.src = '/src/assets/img/default-art.png'"
                          />
                          <div class="d-flex flex-column">
                            <span class="fw-medium" style="font-size: 0.9rem">
                              {{ room.sessions?.[0]?.artworkTitle }}
                            </span>
                            <small class="text-muted" style="font-size: 0.7rem">
                              Room has {{ room.sessions ? room.sessions.length : 0 }} items
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span
                          class="badge rounded-pill border px-2 py-1"
                          :class="getStatusClass(room.status)"
                        >
                          {{ convertStatus(room.status) }}
                        </span>
                      </td>

                      <td class="small text-body-secondary text-end pe-3">View details</td>
                    </tr>

                    <tr>
                      <td colspan="4" class="p-0 border-0">
                        <div class="collapse bg-light-subtle" :id="'room-' + room.id">
                          <div class="p-3">
                            <h6
                              class="fw-bold text-primary mb-2 small text-uppercase ps-2 border-start border-4 border-secondary-subtle"
                            >
                              List of works ({{ room.sessions ? room.sessions.length : 0 }})
                            </h6>

                            <table class="table table-sm table-borderless mb-0 align-middle">
                              <thead class="text-secondary small border-bottom">
                                <tr>
                                  <th class="ps-2">Artwork Info</th>
                                  <th class="text-end pe-2">Current price</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(session, sIndex) in room.sessions" :key="session.id">
                                  <td class="ps-2">
                                    <div class="d-flex align-items-center">
                                      <span class="me-2 text-muted small fw-bold"
                                        >#{{ sIndex + 1 }}</span
                                      >
                                      <img
                                        :src="session.avtArtwork"
                                        class="rounded border me-2"
                                        style="width: 32px; height: 32px; object-fit: cover"
                                        @error="
                                          $event.target.src = '/src/assets/img/default-art.png'
                                        "
                                      />
                                      <span class="fw-medium text-dark" style="font-size: 0.85rem">
                                        {{ session.artworkTitle }}
                                      </span>
                                    </div>
                                  </td>
                                  <td class="text-end text-muted pe-2">
                                    {{ formatCurrency(session.currentPrice) }}
                                  </td>
                                </tr>

                                <tr v-if="!room.sessions || room.sessions.length === 0">
                                  <td colspan="2" class="text-center text-muted small fst-italic">
                                    There are no auctions yet.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
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

      <div class="col-12 col-xl-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white border-0 pt-3">
            <h5 class="text-primary fw-bold mb-0">New Users</h5>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive text-nowrap overflow-y-auto">
              <table class="table table-hover align-middle text-nowrap mb-0 w-100">
                <thead class="table-light">
                  <tr class="align-middle">
                    <th scope="col" class="ps-3 py-3 fw-bold align-middle">Username</th>
                    <th scope="col" class="py-3 fw-bold align-middle">Email</th>
                    <th scope="col" class="py-3 fw-bold align-middle">Registration date</th>
                    <th scope="col" class="py-3 fw-bold align-middle">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isLoading">
                    <td colspan="4" class="text-center py-4 text-muted">Loading...</td>
                  </tr>

                  <tr v-else-if="!newUsers || newUsers.length === 0">
                    <td colspan="4" class="text-center py-4 text-muted">No new users.</td>
                  </tr>

                  <tr v-for="user in newUsers" :key="user.id">
                    <td class="ps-3 align-middle">
                      <div class="d-flex align-items-center gap-2">
                        <img
                          :src="user.avt"
                          alt="User Avatar"
                          class="rounded-circle border"
                          style="width: 32px; height: 32px; object-fit: cover"
                        />

                        <!-- <div
                          v-else
                          class="bg-secondary-subtle text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                          style="width: 32px; height: 32px"
                        >
                          {{ user.fullName ? user.fullName.charAt(0).toUpperCase() : "U" }}
                        </div> -->
                        <span class="fw-medium">{{ user.username }}</span>
                      </div>
                    </td>
                    <td class="text-muted align-middle">{{ user.email }}</td>
                    <td class="small align-middle">{{ user.createdAt }}</td>
                    <td class="align-middle">
                      <span
                        class="badge rounded-pill border"
                        :class="getStatusClassUser(user.status)"
                      >
                        {{ convertStatusUser(user.status) }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white border-0 pt-3">
        <h5 class="text-primary fw-bold mb-0">The most expensive works</h5>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive text-nowrap overflow-y-auto">
          <table class="table table-hover align-middle text-nowrap mb-0 w-100">
            <thead class="table-light">
              <tr>
                <th scope="col" class="ps-3 py-3 fw-bold align-middle">Artwork</th>
                <th scope="col" class="py-3 fw-bold align-middle">Type</th>
                <th scope="col" class="py-3 fw-bold align-middle">Author</th>
                <th scope="col" class="py-3 fw-bold align-middle">Highest price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="art in topArtworks" :key="art.id">
                <td class="ps-3 align-middle">
                  <div class="d-flex align-items-center gap-3">
                    <img
                      :src="art.artworkImageUrl"
                      class="rounded border bg-light"
                      style="width: 48px; height: 48px; object-fit: cover"
                      alt="art"
                      loading="lazy"
                    />
                    <div>
                      <p class="mb-0 fww-medium">{{ art.artworkTitle }}</p>
                      <small class="text-body-secondary">ID: {{ art.sessionId }}</small>
                    </div>
                  </div>
                </td>
                <td class="align-middle">{{ art.paintingGenre }}</td>
                <td class="align-middle">{{ art.winnerName }}</td>
                <td class="text-success fw-bold align-middle">
                  {{ formatCurrency(art.totalAmount) }}
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
  name: "AdminLive",
  data() {
    return {
      statistics: {},
      isLoading: false,
      topAuctionRooms: [],
      newUsers: [],
      topArtworks: [],
    };
  },

  mounted() {
    this.loadInvoiceStatistical();
    this.loadTopAuction();
    this.loadUserData();
    this.loadArtworkData();
  },
  methods: {
    formatCurrency(value) {
      if (!value) return "$0";

      // Giả sử tỷ giá 1 USD = 25,400 VND
      const exchangeRate = 25400;
      const usdValue = value / exchangeRate;

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2, // Giữ lại 2 số lẻ (ví dụ: $12.50)
      }).format(usdValue);
    },

    //  card thống kê
    loadInvoiceStatistical() {
      axios
        .get(`http://localhost:8081/api/admin/dashboard/thong-ke`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data && res.data.data) {
            this.statistics = res.data.data;
          } else {
            this.statistics = {};
          }
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

    //
    loadTopAuction() {
      this.isLoading = true;
      axios
        .get(`http://localhost:8081/api/admin/dashboard/top-auction-rooms`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("API Response Gốc:", res.data);

          if (res.data && Array.isArray(res.data.data)) {
            this.topAuctionRooms = res.data.data;
          } else {
            // Fallback nếu API trả về mảng trực tiếp
            this.topAuctionRooms = res.data;
          }

          console.log("Mảng phòng đấu giá (Final):", this.topAuctionRooms);
        })
        .catch((err) => {
          console.error("Lỗi tìm kiếm:", err);
          this.topAuctionRooms = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    convertStatus(status) {
      switch (status) {
        case 0:
          return "Finished";
        case 1:
          return "Live";
        case 2:
          return "Upcoming";
        default:
          return "Unknown";
      }
    },
    getStatusClass(status) {
      switch (status) {
        case 1: // Live
          return "bg-danger-subtle text-danger border-danger-subtle";
        case 2: // Upcoming
          return "bg-warning-subtle text-warning-emphasis border-warning-subtle";
        case 0: // Finished
          return "bg-secondary-subtle text-secondary border-secondary-subtle";
        default:
          return "bg-light text-dark border";
      }
    },

    // new users
    loadUserData() {
      axios
        .get(`http://localhost:8081/api/admin/dashboard/top-new-users`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.newUsers = res.data;
          console.log(this.newUsers);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    convertStatusUser(status) {
      switch (status) {
        case 1:
          return "Active";
        case 0:
          return "Inactive";
        default:
          return "Unknown";
      }
    },
    getStatusClassUser(status) {
      switch (status) {
        case 1:
          return "bg-success-subtle border-success-subtle text-success";
        case 0:
          return "bg-secondary-subtle border-secondary-subtle text-secondary";
        // default:
        //   return "bg-secondary-subtle border-secondary-subtle text-secondary";
      }
    },

    // Top 10 Session có giá cao nhất
    loadArtworkData() {
      axios
        .get("http://localhost:8081/api/admin/dashboard/top-sessions", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.topArtworks = res.data;
          console.log(this.topArtworks);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
