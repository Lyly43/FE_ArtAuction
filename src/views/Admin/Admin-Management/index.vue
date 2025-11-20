<template>
  <div class="container">
    <h4 class="fw-bold text-primary">Admin management</h4>
    <p class="text-body-secondary mb-3">Manage administrator accounts and permissions</p>
    <div class="row mb-4">
      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">General Administrator</h6>
              <i class="fa-solid fa-images text-primary"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">10</p>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">In operation</h6>
              <i class="fa-solid fa-circle-check text-success"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">5</p>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">New admin of the month</h6>
              <i class="fa-solid fa-clock text-warning"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">0</p>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Super Admin</h6>
              <i class="fa-solid fa-ban text-danger"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">2</p>
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
            placeholder="Searching for admin..."
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
            <th scope="col">ID</th>
            <th scope="col">Full name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Last login</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>11</td>
            <td>Nguyễn Văn A</td>
            <td>admin1@gmail.com</td>
            <td>0123456789</td>
            <td class="text-primary fw-bold">Super admin</td>
            <td>
              <div
                class="status bg-success-subtle border rounded-3 border-success p-1 text-success text-center d-inline-block"
              >
                Is active
              </div>
            </td>
            <td>10-06-2024 14:30</td>
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
                  <li><RouterLink class="dropdown-item" to="/details">See details</RouterLink></li>
                  <li><RouterLink class="dropdown-item" to="/edit">Edit</RouterLink></li>
                  <li>
                    <button class="dropdown-item text-danger" @click="deleteItem">Delete</button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>

          <tr>
            <td>11</td>
            <td>Nguyễn Văn A</td>
            <td>admin1@gmail.com</td>
            <td>0123456789</td>
            <td class="text-warning fw-bold">Support</td>
            <td>
              <div
                class="status bg-secondary-subtle border rounded-3 border-secondary p-1 text-body-secondary text-center d-inline-block"
              >
                Inactive
              </div>
            </td>
            <td>10-06-2024 14:30</td>
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
                  <li><RouterLink class="dropdown-item" to="/details">See details</RouterLink></li>
                  <li><RouterLink class="dropdown-item" to="/edit">Edit</RouterLink></li>
                  <li>
                    <button class="dropdown-item text-danger" @click="deleteItem">Delete</button>
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
export default {};
</script>
<style></style>
