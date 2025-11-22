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
  <div class="row mt-4 pt-2">
    <template v-for="(v, k) in list" :key="k">
      <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <div class="card p-0 overflow-hidden auction-card">
          <div class="p-0 position-relative">
            <img :src="v.imageAuctionRoom" class="img-auction" alt="" loading="lazy">
            <div class="">
              <span class="badge position-absolute top-0 start-0 m-3 bg-danger px-3">LIVE</span>
            </div>
            <span class="badge position-absolute top-0 end-0 m-3 bg-success px-3">12:35</span>
            <span class="badge position-absolute bottom-0 end-0 m-3 bg-success">{{ v.viewCount }} bidders</span>
          </div>
          <!-- Nội dung card -->
          <div class="card-body d-flex flex-column gap-3">
            <div class="d-flex flex-column gap-2">
              <p class="fw-bold m-0 text-success fs-5"> {{ v.roomName }} </p>
              <p class="m-0 text-muted small"> {{ v.id }} </p>
              <div class="d-flex gap-2 align-items-center justify-content-between">
                <span class="m-0">Category</span>
                <span class="m-0"> {{ v.type }} </span>
              </div>
              <p class="m-0 small description-clamp"> {{ v.description }} </p>
            </div>
            <div class="mt-auto">
              <div v-if="v.status !== 2" class="">
                <router-link v-if="v.status == 1" :to="`/client/auction-room/${v.id}`" class="w-100">
                  <button class="btn btn-success w-100">Join AuctAuction</button>
                </router-link>
                <div v-else class="w-100">
                  <button class="btn btn-outline-danger w-100">Đã kết thúc</button>
                </div>
              </div>
            </div>
          </div>
        </div>




        <!-- <div class="card p-0 auction-card">

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

            <div class="d-flex justify-content-between mb-1">
              <div class="d-flex flex-column gap-1">
                <p class="fw-bold m-0">Current product</p>
              </div>

              <div class="d-flex flex-column gap-1 text-end">
                <p class="fw-bold m-0">High Price</p>
              </div>
            </div>
            <button class="btn btn-success">Join AuctAuction</button>

          </div>


        </div> -->
      </div>
    </template>

  </div>

</template>
<script>
import axios from 'axios';


export default {
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios
        .get('http://localhost:8081/api/auctionroom/history', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
          }
        })
        .then((res) => {
          this.list = res.data;
          console.log("data loaded history", this.list);

        })
        .catch((err) => {
          console.error(err);
        });
    },

  }
}
</script>
<style></style>
