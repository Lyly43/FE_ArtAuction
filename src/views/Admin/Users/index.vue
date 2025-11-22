<template>
  <div class="container-fluid py-4 bg-light-subtle">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="text-primary fw-bold mb-1">User Management</h4>
        <p class="text-body-secondary mb-0">Manage access and user information</p>
      </div>
      <button class="btn btn-primary shadow-sm">
        <i class="fa-solid fa-plus me-2"></i>Add New User
      </button>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Total Users</h6>
                <h3 class="fw-bold mb-0">1,222</h3>
              </div>
              <div class="icon-box bg-secondary-subtle text-primary rounded-3 p-2">
                <i class="fa-solid fa-shield fa-lg"></i>
              </div>
            </div>
            <small class="text-success fw-medium">
              <i class="fa-solid fa-arrow-trend-up me-1"></i>+12%
            </small>
            <span class="text-body-secondary small ms-1">vs last month</span>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Verified</h6>
                <h3 class="fw-bold mb-0">100</h3>
              </div>
              <div class="icon-box bg-success-subtle text-success rounded-3 p-2">
                <i class="fa-solid fa-circle-check fa-lg"></i>
              </div>
            </div>
            <small class="text-body-secondary">80% of total users</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Sellers</h6>
                <h3 class="fw-bold mb-0">146</h3>
              </div>
              <div class="icon-box bg-info-subtle text-info rounded-3 p-2">
                <i class="fa-solid fa-users fa-lg"></i>
              </div>
            </div>
            <small class="text-body-secondary">12% of total users</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Locked</h6>
                <h3 class="fw-bold mb-0">5</h3>
              </div>
              <div class="icon-box bg-danger-subtle text-danger rounded-3 p-2">
                <i class="fa-solid fa-ban fa-lg"></i>
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
                placeholder="Search by name, email..."
              />
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-8 text-md-end">
            <button class="btn btn-outline-primary me-2">
              <i class="fa-solid fa-filter me-1"></i> Filter
            </button>
            <!-- <button class="btn btn-outline-secondary">
              <i class="fa-solid fa-download me-1"></i> Export
            </button> -->
          </div>
        </div>

        <div class="table-responsive overflow-y-auto">
          <table class="table table-hover align-middle text-nowrap">
            <thead class="table-light">
              <tr>
                <th scope="col" class="fw-bold">ID</th>
                <th scope="col" class="fw-bold">User Info</th>
                <th scope="col" class="fw-bold">Phone</th>
                <th scope="col" class="fw-bold">Role</th>
                <th scope="col" class="fw-bold">Address</th>
                <th scope="col" class="fw-bold">Status</th>
                <th scope="col" class="fw-bold">Balance</th>
                <th scope="col" class="fw-bold">Date</th>
                <th scope="col" class="fw-bold">
                  <i class="fa-solid fa-ellipsis"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td class="text-center text-secondary fw-medium align-middle">#{{ user.id }}</td>
                <td class="align-middle">
                  <div class="d-flex align-items-center">
                    <div
                      class="avatar fs-5 bg-secondary-subtle text-secondary rounded-circle me-2 d-flex align-items-center justify-content-center fw-bold flex-shrink-0 border border-2"
                      style="width: 40px; height: 40px"
                    >
                      {{ user.fullName.charAt(0) }}
                    </div>
                    <div>
                      <div class="fw-bold text-dark">{{ user.fullName }}</div>
                      <div class="small text-muted">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="align-middle">{{ user.phone }}</td>
                <td class="align-middle">
                  <span
                    class="badge bg-secondary-subtle text-secondary border border-secondary-subtle rounded-pill fw-normal"
                  >
                    {{ user.role }}
                  </span>
                </td>

                <td class="align-middle">
                  {{ user.address }}
                </td>

                <td class="align-middle">
                  <button
                    class="btn"
                    :class="['badge rounded-pill border fw-normal', getStatusClass(user.status)]"
                  >
                    {{ user.status }}
                  </button>
                </td>
                <td class="text-start fw-medium text-dark align-middle">
                  {{ formatCurrency(user.balance) }}
                </td>
                <td class="small text-muted align-middle">{{ user.createdAt }}</td>

                <td class="text-center align-middle">
                  <div class="dropdown">
                    <button
                      class="btn btn-sm btn-light rounded-circle"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <i class="fa-solid fa-ellipsis-vertical text-secondary"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
                      <!-- <li><h6 class="dropdown-header">Actions</h6></li> -->
                      <li>
                        <a class="dropdown-item" href="#"
                          ><i class="fa-solid fa-pen-to-square me-2 text-primary"></i>Edit
                          details</a
                        >
                      </li>

                      <template v-if="user.status === 'Pending approval'">
                        <li><hr class="dropdown-divider" /></li>
                        <li>
                          <button class="dropdown-item text-success" @click="handleApprove(user)">
                            <i class="fa-solid fa-check me-2"></i>Approve
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item text-danger" @click="handleReject(user)">
                            <i class="fa-solid fa-xmark me-2"></i>Reject
                          </button>
                        </li>
                      </template>

                      <template v-if="user.status === 'Approved'">
                        <li><hr class="dropdown-divider" /></li>
                        <li>
                          <button class="dropdown-item text-warning" @click="handleLock(user)">
                            <i class="fa-solid fa-lock me-2"></i>Lock Account
                          </button>
                        </li>
                      </template>

                      <template v-if="user.status === 'Locked'">
                        <li><hr class="dropdown-divider" /></li>
                        <li>
                          <button class="dropdown-item text-success" @click="handleUnlock(user)">
                            <i class="fa-solid fa-lock-open me-2"></i>Unlock
                          </button>
                        </li>
                      </template>

                      <li><hr class="dropdown-divider" /></li>
                      <li>
                        <button class="dropdown-item text-danger" @click="handleDelete(user)">
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

        <!-- <nav class="d-flex justify-content-between align-items-center mt-4">
          <small class="text-body-secondary">Showing 3 of 1222 users</small>
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          id: 1,
          fullName: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          phone: "0123456789",
          gender: "Nam",
          birthday: "01/01/1990",
          address: "123 Đường ABC, Quận XYZ, TP.HCM",
          cccd: "123456789012",
          role: "Buyer",
          status: "Approved",
          balance: 5000000,
          createdAt: "2025-10-22",
        },
        {
          id: 2,
          fullName: "Trần Thị B",
          email: "tranthib@example.com",
          phone: "0987654321",
          gender: "Nữ",
          birthday: "05/05/1995",
          address: "456 Đường DEF, Hà Nội",
          cccd: "987654321001",
          role: "Buyer",
          status: "Locked",
          balance: 200000,
          createdAt: "2025-10-20",
        },
        {
          id: 3,
          fullName: "Lê Văn C",
          email: "levanc@example.com",
          phone: "0369852147",
          gender: "Nam",
          birthday: "12/12/2000",
          address: "789 Đường GHI, Đà Nẵng",
          cccd: "112233445566",
          role: "Seller",
          status: "Pending approval",
          balance: 0,
          createdAt: "2025-11-01",
        },
      ],
    };
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
    getStatusClass(status) {
      switch (status) {
        case "Approved":
          return "bg-success-subtle border-success-subtle text-success";
        case "Locked":
          return "bg-danger-subtle border-danger-subtle text-danger";
        case "Pending approval":
          return "bg-warning-subtle border-warning-subtle text-warning-emphasis";
        default:
          return "bg-secondary-subtle border-secondary-subtle text-secondary";
      }
    },
    // handleApprove(user) {
    //   if (confirm(`Approve user ${user.fullName}?`)) {
    //     user.status = "Approved";
    //   }
    // },
    // handleReject(user) {
    //   if (confirm(`Reject application of ${user.fullName}?`)) {
    //     alert("Refused!");
    //   }
    // },
    // handleLock(user) {
    //   if (confirm(`Lock account ${user.fullName}?`)) {
    //     user.status = "Locked";
    //   }
    // },
    // handleUnlock(user) {
    //   if (confirm(`Unlock account for ${user.fullName}?`)) {
    //     user.status = "Approved";
    //   }
    // },
    // handleDelete(user) {
    //   if (confirm("Permanently delete this user?")) {
    //     // Delete logic
    //   }
    // },
  },
};
</script>

<style scoped></style>
