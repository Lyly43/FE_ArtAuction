<template>
  <div class="container">
    <h4 class="text-primary fw-bold">Report Management</h4>
    <p class="text-body-secondary">Handle violation reports and complaints from users</p>
    <div class="row mb-4">
      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">General report</h6>
              <i class="fa-solid fa-file-lines text-primary"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">120</p>
            <small class="text-success">+12 new reports</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Pending processing</h6>
              <i class="fa-solid fa-clock text-warning"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">100</p>
            <small class="text-danger">Need to consider</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">In progress</h6>
              <i class="fa-solid fa-hourglass-start"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">10</p>
            <small class="text-warning">Processing</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Resolved</h6>
              <i class="fa-solid fa-circle-check text-success"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">12</p>
            <small class="text-body-secondary">12% of the total</small>
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
            placeholder="Search for report..."
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
            <th scope="col">Annunciator</th>
            <th scope="col">Object type</th>
            <th>Object Name</th>
            <th scope="col">Content</th>
            <th scope="col">Created at</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in reports" :key="item.id">
            <td>{{ item.reporter }}</td>
            <td>{{ item.objectType }}</td>
            <td>{{ item.objectName }}</td>
            <td>{{ item.content }}</td>
            <td>{{ item.createdAt }}</td>
            <td>
              <div
                class="status border rounded-3 p-1 text-success text-center d-inline-block"
                :class="getStatusClass(item.status)"
              >
                {{ item.status }}
              </div>
            </td>
            <td>
              <div class="dropdown">
                <i
                  class="fa-solid fa-ellipsis-vertical"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></i>
                <ul class="dropdown-menu">
                  <li>
                    <button class="dropdown-item">
                      <i class="fa-solid fa-eye me-2 text-primary"></i>See details
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item">
                      <i class="fa-solid fa-arrow-up-right-from-square me-2 text-info"></i>View the
                      accused
                    </button>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <button class="dropdown-item">
                      <i class="fa-solid fa-triangle-exclamation text-warning me-2"></i>Warning
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item">
                      <i class="fa-solid fa-ban text-danger me-2"></i>Block
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
      reports: [
        {
          id: 1,
          reporter: "Nguyễn Văn A",
          objectType: "User",
          objectName: "Trần Thị B",
          content: "Spam tin nhắn lừa đảo trong phòng đấu giá...",
          createdAt: "2025-10-22 14:00",
          status: "Pending",
        },
        {
          id: 2,
          reporter: "Lê Văn C",
          objectType: "Artwork",
          objectName: "Tranh Mùa Thu",
          content: "Đây là tranh chép, không phải tranh gốc...",
          createdAt: "2025-10-22 15:30",
          status: "Resolved",
        },
        {
          id: 2,
          reporter: "Lê Văn C",
          objectType: "Artwork",
          objectName: "Tranh Mùa Thu",
          content: "Đây là tranh chép, không phải tranh gốc...",
          createdAt: "2025-10-22 15:30",
          status: "Rejected",
        },
      ],
    };
  },
  methods: {
    // Lấy màu trạng thái
    getStatusClass(status) {
      switch (status) {
        case "Pending":
          return "bg-warning-subtle text-warning-emphasis border-warning";
        case "Resolved":
          return "bg-success-subtle text-success border-success";
        case "Rejected":
          return "bg-danger-subtle text-danger border-danger";
        default:
          return "bg-light text-dark";
      }
    },

    // viewDetails(item) {
    //   alert(`Xem chi tiết báo cáo về: ${item.objectName}`);
    // },

    // blockUser(item) {
    //   if (confirm(`Bạn có chắc muốn KHÓA tài khoản ${item.objectName}?`)) {
    //     alert("Đã khóa tài khoản!");
    //     item.status = "Resolved";
    //   }
    // },
  },
};
</script>
<style></style>
