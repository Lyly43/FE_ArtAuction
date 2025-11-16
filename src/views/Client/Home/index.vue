<template>

  <div class="container mt-3">
    <!-- ========== Thanh search + filter + tag ========== -->
    <div class="row section1 mb-4">
      <!-- Search + filter -->
      <div class="col-lg-8 col-md-6 col-sm-12 d-flex gap-4">
        <div class="search-bar flex-grow-1">
          <div class="position-relative search-bar-box">
            <input type="text" class="form-control search-control ps-5" placeholder="Type to search..." />
            <span class="position-absolute top-50 search-show translate-middle-y"><i
                class="fa-solid fa-magnifying-glass px-3"></i></span>
            <span class="position-absolute top-50 search-close translate-middle-y">
              <!-- <i class="fa-solid fa-circle-xmark"></i> -->
            </span>
          </div>
        </div>
        <button class="btn btn-outline-success d-flex align-items-center justify-content-center">
          <i class="fa-solid fa-filter"></i>
        </button>
      </div>
      <!-- Tag -->
      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-4 ">
            <button class="btn btn-outline-success w-100">Landscape</button>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-4 ">
            <button class="btn btn-outline-success w-100">Portrait</button>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-4 ">
            <button class="btn btn-outline-success w-100">Folk</button>

          </div>
        </div>
      </div>
    </div>

    <!-- ========== Carousel ========== -->
    <div class="row mb-4">
      <div class="col-12">
        <div id="carouselExampleIndicators" class="carousel slide">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner rounded-3 overflow-hidden">
            <div class="carousel-item active">
              <img src="https://i.pinimg.com/1200x/1b/08/af/1b08af4eab12bd921dc3541ccf6a10b1.jpg" class="d-block w-100"
                style="height: 350px;" alt="..." loading="lazy">
            </div>
            <div class="carousel-item">
              <img src="https://i.pinimg.com/736x/0a/20/fc/0a20fcc7bfacc5a20151f9e791e6b0f8.jpg" class="d-block w-100"
                style="height: 350px;" alt="..." loading="lazy">
            </div>
            <div class="carousel-item">
              <img src="https://i.pinimg.com/736x/00/a4/eb/00a4eb0eca9d3ac72ff6ca2e7421e825.jpg" class="d-block w-100"
                style="height: 350px;" alt="..." loading="lazy">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <!-- <img src="/src/assets/img/3.png" alt="banner" class="img-fluid w-100 rounded" style="height: 300px" /> -->
      </div>
    </div>

    <!-- ========== Tác phẩm nổi bật ========== -->
    <div class="row">
      <h5 class="fw-bold mb-3 text-success">Featured Artwork</h5>

      <!-- Loading state -->
      <!-- <div v-if="loading" class="col-12 text-center py-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2 text-muted">Đang tải tác phẩm...</p>
      </div> -->

      <!-- Error state -->
      <!-- <div v-else-if="error" class="col-12 text-center py-5">
        <div class="alert alert-warning" role="alert">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error }}
        </div>
      </div> -->

      <!-- Content -->
      <template v-for="item in featuredList" :key="item.id">
        <div class="col-12 col-md-6 col-lg-4 mb-4 d-flex">
          <div class="card w-100 p-0">
            <div class="card-body">
              <div class="row">
                <div class="col-4 d-flex align-items-center pe-lg-0">
                  <img :src="item.avtArtwork" alt="thumb" class="w-100 img-thumbnail img-art" loading="lazy" />
                </div>

                <div class="col-8 d-flex flex-column gap-2">
                  <p class="m-0 fw-bold title-clamp">
                    {{ item.title }}
                  </p>
                  <div class="d-flex small justify-content-between align-items-center">
                    <p class="m-0">Author</p>
                    <p class="m-0">
                      {{ item.ownerName }}
                    </p>
                  </div>
                  <div class="d-flex small justify-content-between align-items-center">
                    <p class="m-0">Category</p>
                    <p class="m-0">
                      {{ item.paintingGenre }}
                    </p>
                  </div>

                  <p class="m-0 small description-clamp">
                    {{ item.description }}
                  </p>

                  <!-- <button class="btn btn-outline-success mt-auto">View Details</button> -->
                </div>
              </div>
            </div>

          </div>
        </div>
      </template>

    </div>

    <!-- Danh sách buổi đấu giá  -->
    <div class="row">
      <h5 class="fw-bold mb-3 text-success">Hot Auction Room</h5>

      <template v-for="auction in hotAuctions" :key="auction.id">
        <!-- Card đấu giá -->
        <div class="col-lg-3 col-md-6 col-12 mb-4 d-flex">
          <div class="card p-0 overflow-hidden">
            <div class="p-0 position-relative">
              <img :src="auction.imageAuctionRoom" class="img-auction" alt="" loading="lazy">

              <div class="">
                <span v-if="auction.status === 1"
                  class="badge position-absolute top-0 start-0 m-3 bg-danger px-3">LIVE</span>
                <span v-else-if="auction.status === 2"
                  class="badge position-absolute top-0 start-0 m-3 bg-warning px-3 text-dark">In a few mins</span>
              </div>

              <span v-if="auction.status === 1"
                class="badge position-absolute top-0 end-0 m-3 bg-success px-3">12:35</span>
              <span v-if="auction.status === 1" class="badge position-absolute bottom-0 end-0 m-3 bg-success">{{
                auction.viewCount }}
                bidders</span>
            </div>
            <!-- Nội dung card -->
            <div class="card-body d-flex flex-column gap-3">
              <div class="d-flex flex-column gap-2">
                <p class="fw-bold m-0 text-success fs-5"> {{ auction.roomName }} </p>
                <p class="m-0 text-muted small"> {{ auction.id }} </p>
                <div class="d-flex gap-2 align-items-center justify-content-between">
                  <span class="m-0">Category</span>
                  <span class="m-0"> {{ auction.type }} </span>
                </div>
                <p class="m-0 small description-clamp"> {{ auction.description }} </p>
              </div>
              <div class="mt-auto">
                <div class="" v-if="auction.status === 1">
                  <router-link :to="`/client/auction-room/${auction.id}`" class="w-100">
                    <button class="btn btn-success w-100">Join AuctAuction</button>
                  </router-link>
                </div>

                <div class="" v-else-if="auction.status === 2">
                  <router-link to="" class="w-100">
                    <button class="btn btn-outline-warning w-100">Reserve Spot</button>
                  </router-link>
                </div>
                <!-- <button class="btn btn-success">Join AuctAuction</button> -->
              </div>

            </div>
          </div>
        </div>
      </template>








    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  // name: "ClientHome",
  data() {
    return {
      featuredList: [],
      loading: false,
      error: null,
      hotAuctions: [],
    };
  },

  mounted() {
    this.fetchFeatured();
    this.fetchSixRoomFeatured();
  },

  methods: {
    goToRoom(id) {
      if (!id) return;
      this.$router.push({
        name: 'auction-room',
        params: { id }
      });
    },

    fetchFeatured() {
      this.loading = true;
      axios
        .get("http://localhost:8081/api/artwork/featured")
        .then((res) => {
          this.featuredList = res.data;
          console.log(this.featuredList);

        })
        .catch((err) => {
          this.error = err.message;
        });
    },
    fetchSixRoomFeatured() {
      this.loading = true;
      axios
        .get("http://localhost:8081/api/auctionroom/featuredAuctionRoom")
        .then((res) => {
          this.hotAuctions = res.data.filter(room => room.status !== 0);

          console.log("room home", this.hotAuctions);


        })
        .catch((err) => {
          this.error = err.message;
        });
    },

  },


};
</script>



<style scoped>

</style>
