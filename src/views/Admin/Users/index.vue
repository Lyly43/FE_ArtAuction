<template>
  <div class="container">
    <h4 class="text-primary fw-bold">User Management</h4>
    <p class="text-body-secondary">Manage all users in the system</p>
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
            placeholder="Username"
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
        <button
          type="button"
          class="btn btn-primary shadow d-flex align-items-center justify-content-center gap-2"
        >
          <i class="fa-solid fa-plus"></i>Add user
        </button>
      </div>
    </div>

    <!-- table  -->
    <div class="table-responsive border border-2 border-outline-success rounded-3 p-3">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr class="">
            <th scope="col">#</th>
            <th scope="col">Full name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone number</th>
            <th scope="col">Gender</th>
            <th scope="col">Date of birth</th>
            <th scope="col">Address</th>
            <th scope="col">CCCD</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Balance</th>
            <th scope="col">Created at</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.fullName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.birthday }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.cccd }}</td>
            <td>{{ user.role }}</td>
            <td>
              <div
                class="status bg-success-subtle border rounded-3 border-success p-1 text-success text-center d-inline-block"
                :class="getStatusClass(user.status)"
              >
                {{ user.status }}
              </div>
            </td>
            <td>{{ formatCurrency(user.balance) }}</td>
            <td>{{ user.createdAt }}</td>
            <div class="dropdown">
              <i
                class="fa-solid fa-ellipsis-vertical"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></i>
              <ul class="dropdown-menu shadow">
                <li>
                  <a class="dropdown-item" href="#"
                    ><i class="fa-solid fa-pen-to-square me-2"></i>Edit</a
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
                    <button class="dropdown-item text-warning-emphasis" @click="handleUnlock">
                      <i class="fa-solid fa-lock me-2"></i>Lock
                    </button>
                  </li>
                </template>
                <template v-if="user.status === 'Locked'">
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <button class="dropdown-item text-success" @click="handleUnlock">
                      <i class="fa-solid fa-lock-open me-2"></i>Unlock
                    </button>
                  </li>
                </template>

                <li><hr class="dropdown-divider" /></li>
                <li><button class="dropdown-item">Auction history</button></li>
                <li><button class="dropdown-item">Transaction history</button></li>
                <li>
                  <button class="dropdown-item text-danger" @click="handleDelete(user)">
                    Delete
                  </button>
                </li>
              </ul>
            </div>
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
    // định dạng tiền tệ
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },

    // lấy màu sắc cho badge trạng thái
    getStatusClass(status) {
      switch (status) {
        case "Approved":
          return "bg-success-subtle border-success text-success";
        case "Locked":
          return "bg-danger-subtle border-danger text-danger";
        case "Pending approval":
          return "bg-warning-subtle border-warning text-warning-emphasis"; // Màu vàng cho chờ duyệt
        default:
          return "bg-light-subtle border-secondary text-secondary";
      }
    },

    //Các hành động (Actions)
    handleApprove(user) {
      if (confirm(`Are you sure you want to approve users ${user.fullName}?`)) {
        user.status = "Approved"; // Cập nhật trạng thái (Thực tế sẽ gọi API)
        alert("Approved successfully!");
      }
    },

    handleReject(user) {
      if (confirm(`Reject the application of ${user.fullName}?`)) {
        alert("Refused!");
      }
    },

    handleLock(user) {
      if (confirm(`Account Lock ${user.fullName}?`)) {
        user.status = "Locked";
        alert("Account locked!");
      }
    },

    handleUnlock(user) {
      if (confirm(`Unlock for ${user.fullName}?`)) {
        user.status = "Approved";
        alert("Unlocked!");
      }
    },

    handleDelete(user) {
      if (confirm("Permanently delete this user?")) {
        // Logic xóa
      }
    },
  },
};
</script>
<style></style>
