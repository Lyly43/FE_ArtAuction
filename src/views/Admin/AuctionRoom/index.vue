<template>
  <div class="container">
    <h4 class="fw-bold text-primary">Auction room management</h4>
    <p class="text-body-secondary">Manage all auction rooms in the system</p>
    <div class="row mb-4">
      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Total users</h6>
              <i class="fa-solid fa-shield text-primary"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">1222</p>
            <small class="text-success">+12% over last month</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Verified</h6>
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
              <h6 class="card-subtitle mb-2 text-body-secondary">Seller</h6>
              <i class="fa-solid fa-users"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">1222</p>
            <small class="text-body-secondary">12% of the total</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Locked</h6>
              <i class="fa-solid fa-ban text-danger"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">1222</p>
            <small class="text-danger">Policy violation</small>
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
            placeholder="Search auction room"
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
        <!-- <button type="button" class="btn btn-primary shadow" @click="goToAddAuctionRoom">
          <i class="fa-solid fa-plus me-3"></i>Tạo phòng
        </button> -->
        <router-link to="/admin/add-auction-room" class="btn btn-primary shadow"
          ><i class="fa-solid fa-plus me-3"></i>Create a room</router-link
        >
      </div>
    </div>

    <!-- auction-room -->
    <div class="auction-room">
      <div class="card mb-4" v-for="room in auctionRooms" :key="room.id">
        <div class="card-body">
          <div class="row">
            <div class="d-flex align-items-center justify-content-between">
              <h5 class="fw-bold">{{ room.name }}</h5>
              <p class="border rounded-3 p-1 fw-bold" :class="getStatusClass(room.status)">
                {{ room.status }}
              </p>
            </div>
            <p>{{ room.type }} - {{ room.artworkName }}</p>
          </div>
          <hr />
          <div class="col-11">
            <div class="row">
              <div class="col-12 col-md-6 col-lg-3">
                <smal class="text-body-secondary">Start time</smal>
                <p>{{ room.startTime }}</p>
              </div>
              <div class="col-12 col-md-6 col-lg-3">
                <smal class="text-body-secondary">Number of participants</smal>
                <div><i class="fa-solid fa-users me-4"></i>{{ room.participants }}</div>
              </div>

              <div class="col-12 col-md-6 col-lg-3">
                <smal class="text-body-secondary">Starting price</smal>
                <p>{{ formatCurrency(room.currentPrice) }}</p>
              </div>
              <div class="col-12 col-md-6 col-lg-3">
                <smal class="text-body-secondary">Current price</smal>
                <p>{{ formatCurrency(room.startPrice) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      auctionRooms: [
        {
          id: 1,
          name: "Autumn Art Auction Room",
          status: "Coming soon",
          type: "Oil painting",
          artworkName: "Phong cảnh mùa thu",
          startTime: "19:00 - 20/10/2023",
          participants: 24,
          startPrice: 100000,
          currentPrice: 200000,
        },
        {
          id: 2,
          name: "Abstract Modern Art",
          status: "In progress",
          type: "Oil painting",
          artworkName: "Phong cảnh mùa thu",
          startTime: "08:00 - 25/10/2023",
          participants: 150,
          startPrice: 5000000,
          currentPrice: 7500000,
        },
        {
          id: 3,
          name: "Vintage Portrait Collection",
          status: "Ended",
          type: "Oil painting",
          artworkName: "Phong cảnh mùa thu",
          startTime: "10:00 - 15/10/2023",
          participants: 45,
          startPrice: 300000,
          currentPrice: 300000, // Giá cuối cùng
        },
      ],
    };
  },

  methods: {
    //Định dạng tiền tệ VND
    formatCurrency(value) {
      if (!value) return "0đ";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    //Lấy class màu sắc dựa trên trạng thái
    getStatusClass(status) {
      switch (status) {
        case "Coming soon":
          return "text-warning border-warning";
        case "In progress":
          return "text-danger border-danger"; // Màu đỏ cho đang diễn ra
        case "Ended":
          return "text-secondary border-secondary"; // Màu xám cho đã kết thúc
        default:
          return "text-dark border-dark";
      }
    },
  },
};
</script>
<style></style>
