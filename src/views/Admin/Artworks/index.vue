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
                <h6 class="card-subtitle text-body-secondary mb-1">Total work</h6>
                <h3 class="fw-bold mb-0">1,222</h3>
              </div>
              <div
                class="bg-secondary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px"
              >
                <i class="fa-solid fa-images"></i>
              </div>
            </div>
            <small class="text-success fw-medium">
              <i class="fa-solid fa-arrow-up me-1"></i>+12 works
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Approved</h6>
                <h3 class="fw-bold mb-0">100</h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px"
              >
                <i class="fa-solid fa-circle-check"></i>
              </div>
            </div>
            <small class="text-body-secondary">80% of the total</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Pending</h6>
                <h3 class="fw-bold mb-0">146</h3>
              </div>
              <div
                class="bg-warning-subtle text-warning-emphasis rounded-circle d-flex align-items-center justify-content-center"
                style="width: 40px; height: 40px"
              >
                <i class="fa-solid fa-clock"></i>
              </div>
            </div>
            <small class="text-body-secondary">12% of the total</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Refused</h6>
                <h3 class="fw-bold mb-0">5</h3>
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
                type="text"
                class="form-control bg-transparent border-0 shadow-none"
                placeholder="Search artwork..."
              />
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-8 text-md-end">
            <button class="btn btn-outline-primary me-2">
              <i class="fa-solid fa-filter me-2"></i>Filter
            </button>
            <button class="btn btn-primary"><i class="fa-solid fa-plus me-2"></i>Add New</button>
          </div>
        </div>

        <div class="table-responsive text-nowrap overflow-y-auto">
          <table class="table table-hover align-middle text-nowrap mb-0 w-100">
            <thead class="table-light">
              <tr>
                <th scope="col" class="ps-3 py-3 fw-bold align-middle">Artwork</th>
                <th scope="col" class="py-3 fw-bold align-middle">Author</th>
                <th scope="col" class="py-3 fw-bold align-middle">Year</th>
                <th scope="col" class="py-3 fw-bold align-middle">Material</th>
                <th scope="col" class="py-3 fw-bold align-middle">Size</th>
                <th scope="col" class="py-3 fw-bold align-middle">Starting Price</th>
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
                      :src="item.image"
                      class="rounded border bg-light"
                      style="width: 48px; height: 48px; object-fit: cover"
                      alt="art"
                      loading="lazy"
                    />
                    <div>
                      <p class="mb-0 fw-bold text-dark">{{ item.name }}</p>
                      <small class="text-body-secondary">ID: #{{ item.id }}</small>
                    </div>
                  </div>
                </td>
                <td>{{ item.author }}</td>
                <td>{{ item.year }}</td>
                <td>{{ item.material }}</td>
                <td>{{ item.size }}</td>
                <td class="fw-medium text-dark">{{ formatCurrency(item.price) }}</td>
                <td>
                  <button
                    class="btn badge rounded-pill border fw-normal px-3 py-2"
                    :class="getStatusClass(item.status)"
                  >
                    {{ item.status }}
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
                        <RouterLink :to="`/admin/artwork-detail`" class="dropdown-item">
                          <i class="fa-solid fa-eye me-2 text-primary"></i>See details
                        </RouterLink>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <i class="fa-solid fa-pen me-2 text-info"></i>Edit
                        </a>
                      </li>
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
    formatCurrency(value) {
      if (!value) return "0đ";
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    getStatusClass(status) {
      // Sử dụng các class background/text chuẩn của Bootstrap 5.3
      switch (status) {
        case "Approved":
          return "bg-success-subtle border-success-subtle text-success";
        case "Sold":
          return "bg-secondary-subtle border-secondary-subtle text-primary";
        case "Pending approval":
          return "bg-warning-subtle border-warning-subtle text-warning-emphasis";
        case "Refused":
          return "bg-danger-subtle border-danger-subtle text-danger";
        default:
          return "bg-secondary-subtle border-secondary-subtle text-secondary";
      }
    },

    handleDelete(item) {
      if (confirm("Are you sure you want to delete this artwork?")) {
        this.artworks = this.artworks.filter((a) => a.id !== item.id);
      }
    },
  },
};
</script>
