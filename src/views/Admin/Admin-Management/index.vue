<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="mb-4">
      <h4 class="fw-bold text-primary mb-1">Admin Management</h4>
      <p class="text-body-secondary mb-0">Manage administrator accounts and permissions</p>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">General Admin</h6>
                <h3 class="fw-bold mb-0">10</h3>
              </div>
              <div
                class="bg-secondary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-user-shield fs-5"></i>
              </div>
            </div>
            <small class="text-success fw-medium">Total admins</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">In Operation</h6>
                <h3 class="fw-bold mb-0">5</h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-circle-check fs-5"></i>
              </div>
            </div>
            <small class="text-success fw-medium">Active now</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">New Admin (Month)</h6>
                <h3 class="fw-bold mb-0">0</h3>
              </div>
              <div
                class="bg-warning-subtle text-warning-emphasis rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-clock fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">Recently added</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Super Admin</h6>
                <h3 class="fw-bold mb-0">2</h3>
              </div>
              <div
                class="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-crown fs-5"></i>
              </div>
            </div>
            <small class="text-danger fw-medium">Highest privilege</small>
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
                placeholder="Searching for admin..."
              />
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-8 text-md-end">
            <button class="btn btn-outline-primary me-2">
              <i class="fa-solid fa-filter me-2"></i>Filter
            </button>
            <button class="btn btn-primary">
              <i class="fa-solid fa-plus me-2"></i>Add New Admin
            </button>
          </div>
        </div>

        <div class="table-responsive text-nowrap overflow-y-auto">
          <table class="table table-hover align-middle text-nowrap mb-0 w-100">
            <thead class="table-light">
              <tr>
                <th scope="col" class="ps-3 py-3 fw-bold align-middle">ID</th>
                <th scope="col" class="py-3 fw-bold align-middle">Full name</th>
                <th scope="col" class="py-3 fw-bold align-middle">Email</th>
                <th scope="col" class="py-3 fw-bold align-middle">Phone Number</th>
                <th scope="col" class="py-3 fw-bold align-middle">Role</th>
                <th scope="col" class="py-3 fw-bold align-middle">Status</th>
                <th scope="col" class="py-3 fw-bold align-middle">Last login</th>
                <th scope="col" class="py-3 fw-bold align-middle text-center">
                  <i class="fa-solid fa-ellipsis"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="ps-3 fw-bold text-secondary align-middle">#11</td>
                <td class="align-middle">
                  <div class="d-flex align-items-center gap-2">
                    <div
                      class="bg-secondary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                      style="width: 32px; height: 32px"
                    >
                      N
                    </div>
                    <span class="fw-medium">Nguyễn Văn A</span>
                  </div>
                </td>
                <td class="text-muted align-middle">admin1@gmail.com</td>
                <td class="align-middle">0123456789</td>
                <td class="align-middle">
                  <span class="text-primary fw-bold"
                    ><i class="fa-solid fa-shield-halved me-1"></i>Super admin</span
                  >
                </td>
                <td class="align-middle">
                  <button
                    class="btn badge bg-success-subtle text-success rounded-pill border border-success-subtle px-3 py-2"
                  >
                    Active
                  </button>
                </td>
                <td class="small text-body-secondary align-middle">10-06-2024 14:30</td>
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
                        <RouterLink class="dropdown-item" to="/details"
                          ><i class="fa-solid fa-eye me-2 text-primary"></i>See details</RouterLink
                        >
                      </li>
                      <li>
                        <RouterLink class="dropdown-item" to="/edit"
                          ><i class="fa-solid fa-pen me-2 text-info"></i>Edit</RouterLink
                        >
                      </li>
                      <li><hr class="dropdown-divider" /></li>
                      <li>
                        <button class="dropdown-item text-danger" @click="deleteItem">
                          <i class="fa-solid fa-trash me-2"></i>Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>

              <tr>
                <td class="ps-3 fw-bold text-secondary align-middle">#12</td>
                <td class="align-middle">
                  <div class="d-flex align-items-center gap-2">
                    <div
                      class="bg-warning-subtle text-warning-emphasis rounded-circle d-flex align-items-center justify-content-center fw-bold"
                      style="width: 32px; height: 32px"
                    >
                      L
                    </div>
                    <span class="fw-medium">Lê Văn B</span>
                  </div>
                </td>
                <td class="text-muted align-middle">support@gmail.com</td>
                <td class="align-middle">0987654321</td>
                <td class="align-middle">
                  <span class="text-warning-emphasis fw-bold"
                    ><i class="fa-solid fa-headset me-1"></i>Support</span
                  >
                </td>
                <td class="align-middle">
                  <button
                    class="btn badge bg-secondary-subtle text-secondary rounded-pill border border-secondary-subtle px-3 py-2"
                  >
                    Inactive
                  </button>
                </td>
                <td class="small text-body-secondary align-middle">09-06-2024 09:15</td>
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
                        <RouterLink class="dropdown-item" to="/details"
                          ><i class="fa-solid fa-eye me-2 text-primary"></i>See details</RouterLink
                        >
                      </li>
                      <li>
                        <RouterLink class="dropdown-item" to="/edit"
                          ><i class="fa-solid fa-pen me-2 text-info"></i>Edit</RouterLink
                        >
                      </li>
                      <li><hr class="dropdown-divider" /></li>
                      <li>
                        <button class="dropdown-item text-danger" @click="deleteItem">
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
  methods: {
    deleteItem() {
      if (confirm("Are you sure you want to delete this admin?")) {
        // Logic delete
      }
    },
  },
};
</script>
