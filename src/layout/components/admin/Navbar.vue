<template>
  <nav class="navbar bg-white px-4 py-2">
    <div class="container-fluid">
      <div class="row align-items-center w-100">
        <!-- Col trái: Search box -->
        <div class="col-12 col-md-6 col-lg-6 mb-2 mb-md-0">
          <div class="position-relative w-100" style="max-width: 350px">
            <input type="text" class="form-control rounded-pill ps-5" placeholder="Search..." />
            <i
              class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            ></i>
          </div>
        </div>

        <!-- Col phải: Notification + User info -->
        <div
          class="col-12 col-md-6 col-lg-6 d-flex align-items-center justify-content-md-end justify-content-start gap-4"
        >
          <!-- Notification -->
          <div class="position-relative">
            <i class="bi bi-bell fs-5"></i>
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style="font-size: 0.6rem"
            >
              2
            </span>
          </div>

          <!-- User info -->
          <div class="d-flex align-items-center">
            <div
              class="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center"
              style="width: 36px; height: 36px"
            >
              AD
            </div>
            <div class="ms-2 lh-sm">
              <p class="mb-0 fw-semibold">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
