<template>
  <div class="container">
    <h4 class="fw-bold text-primary">Artwork management</h4>
    <p class="text-body-secondary mb-3">Manage all artwork in the system</p>
    <div class="row mb-4">
      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Total work</h6>
              <i class="fa-solid fa-images text-primary"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">1222</p>
            <small class="text-success">+12 works</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Approved</h6>
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
              <h6 class="card-subtitle mb-2 text-body-secondary">Pending approval</h6>
              <i class="fa-solid fa-clock text-warning"></i>
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
              <h6 class="card-subtitle mb-2 text-body-secondary">Refuse</h6>
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
            placeholder="Product search..."
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
      </div>
    </div>

    <!-- table  -->
    <div class="table-responsive border border-2 border-outline-success rounded-3 p-3">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr class="bg-secondary">
            <th scope="col">Artwork</th>
            <th scope="col">Author</th>
            <th scope="col">Year of composition</th>
            <th scope="col">Material</th>
            <th scope="col">Size</th>
            <th scope="col">Starting price</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in artworks" :key="item.id">
            <td>
              <div class="d-flex align-items-center gap-3">
                <img
                  :src="item.image"
                  class="img rounded"
                  style="width: 50px; height: 50px; object-fit: cover"
                />
                <p class="mb-0 fw-medium">{{ item.name }}</p>
              </div>
            </td>
            <td>{{ item.author }}</td>
            <td>{{ item.year }}</td>
            <td>{{ item.material }}</td>
            <td>{{ item.size }}</td>
            <td>{{ formatCurrency(item.price) }}</td>
            <td>
              <div
                class="status border rounded-3 p-1 text-center d-inline-block"
                :class="getStatusClass(item.status)"
              >
                {{ item.status }}
              </div>
            </td>
            <td>
              <div class="dropdown">
                <i
                  class="fa-solid fa-ellipsis-vertical"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style="cursor: pointer; padding: 8px"
                ></i>
                <ul class="dropdown-menu shadow">
                  <li>
                    <RouterLink :to="`/admin/artwork-detail`" class="dropdown-item">
                      <i class="fa-solid fa-eye me-2 text-primary"></i>See details
                    </RouterLink>
                  </li>

                  <li class="dropdown-item"><i class="fa-solid fa-pen me-2 text-info"></i>Edit</li>

                  <li><hr class="dropdown-divider" /></li>

                  <li>
                    <button class="dropdown-item text-danger" @click="handleDelete(item)">
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
</template>
<script>
export default {
  data() {
    return {
      artworks: [
        {
          id: 1,
          image: "/src/assets/img/2.png",
          name: "Painting name",
          author: "Nguyễn Văn A",
          year: 2004,
          material: "Tranh sơn dầu",
          size: "30*40 cm",
          price: 50000,
          status: "Approved",
        },
        {
          id: 2,
          image: "/src/assets/img/2.png",
          name: "Mùa thu vàng",
          author: "Trần Thị B",
          year: 2020,
          material: "Sơn mài",
          size: "50*60 cm",
          price: 1200000,
          status: "Sold",
        },
        {
          id: 3,
          image: "/src/assets/img/2.png",
          name: "Hoàng hôn trên biển",
          author: "Lê Văn C",
          year: 2023,
          material: "Màu nước",
          size: "20*30 cm",
          price: 0,
          status: "Pending approval",
        },
      ],
    };
  },

  methods: {
    // định dạng tiền tệ (VND)
    formatCurrency(value) {
      if (!value) return "0đ";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    // lấy class màu sắc status
    getStatusClass(status) {
      switch (status) {
        case "Approved":
          return "bg-success-subtle border-success text-success";
        case "Sold":
          return "bg-warning-subtle border-warning text-warning-emphasis";
        case "Pending approval":
          return "bg-secondary bg-opacity-10 border-secondary text-secondary";
        case "Refused":
          return "bg-danger-subtle border-danger text-danger";
        default:
          return "bg-light border-dark text-dark";
      }
    },

    //delete item
    deleteItem(item) {
      if (confirm("Are you sure you want to delete this artwork?")) {
        this.artworks = this.artworks.filter((a) => a.id !== item.id);
        alert("Deleted successfully!");
      }
    },
  },
};
</script>
<style></style>
