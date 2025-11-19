<template>
  <div class="container">
    <router-link to="/admin/management-artwork" class="text-secondary text-decoration-none"
      >Artwork</router-link
    >
    <hr />
    <div class="row">
      <!-- artwork -->
      <div class="col-12 col-lg-7">
        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
          <!-- Nút chỉ báo (5 nút tương ứng 5 ảnh) -->
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="4"
              aria-label="Slide 5"
            ></button>
          </div>

          <!-- Các slide -->
          <div class="carousel-inner">
            <!-- Ảnh 1 -->
            <div class="carousel-item active" data-bs-interval="10000">
              <div
                class="img-artwork d-flex align-items-center justify-content-center bg-secondary-subtle py-5 mb-3"
              >
                <img
                  src="/src/assets/img/4.png"
                  alt="Artwork"
                  class="img-fluid rounded"
                  style="object-fit: cover"
                />
              </div>
            </div>

            <!-- Ảnh 2 -->
            <div class="carousel-item" data-bs-interval="2000">
              <div
                class="img-artwork d-flex align-items-center justify-content-center bg-secondary-subtle bg-opacity-20 py-5 mb-3"
              >
                <img
                  src="/src/assets/img/4.png"
                  alt="Artwork"
                  class="img-fluid rounded"
                  style="object-fit: cover"
                />
              </div>
            </div>

            <!-- Ảnh 3 -->
            <div class="carousel-item" data-bs-interval="2000">
              <div
                class="img-artwork d-flex align-items-center justify-content-center bg-secondary-subtle bg-opacity-20 py-5 mb-3"
              >
                <img
                  src="/src/assets/img/cotiendan.png"
                  alt="Artwork"
                  class="img-fluid rounded"
                  style="object-fit: cover"
                />
              </div>
            </div>

            <!-- Ảnh 4 -->
            <div class="carousel-item" data-bs-interval="2000">
              <div
                class="img-artwork d-flex align-items-center justify-content-center bg-secondary-subtle bg-opacity-20 py-5 mb-3"
              >
                <img
                  src="/src/assets/img/4.png"
                  alt="Artwork"
                  class="img-fluid rounded"
                  style="object-fit: cover"
                />
              </div>
            </div>

            <!-- Ảnh 5 -->
            <div class="carousel-item" data-bs-interval="2000">
              <div
                class="img-artwork d-flex align-items-center justify-content-center bg-secondary-subtle py-5 mb-3"
              >
                <img
                  src="/src/assets/img/4.png"
                  alt="Artwork"
                  class="img-fluid rounded"
                  style="object-fit: cover"
                />
              </div>
            </div>
          </div>

          <!-- Nút điều hướng -->
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <p class="fw-bold">Certificate, confirmation</p>
      </div>

      <!-- information -->
      <div class="col-12 col-lg-5">
        <p
          class="col-3 border border-dark border-1 rounded-pill p-2 d-flex align-items-center justify-content-center"
        >
          Work
        </p>
        <h3 class="fw-bold text-primary" Đêm đầy sao></h3>
        <p>Nguyễn Văn A</p>
        <div class="card border border-dark border-1 mb-3">
          <div class="card-body">
            <div class="row">
              <div class="col-4 d-flex flex-column gap-1">
                <small class="text-secondary">Year of composition</small>
                <p class="fs-5 fw-bold">2004</p>
              </div>
              <div class="col-4 d-flex flex-column gap-1">
                <small class="text-secondary">Size</small>
                <p class="fs-5 fw-bold">Oil paint</p>
              </div>
              <div class="col-4 d-flex flex-column gap-1">
                <small class="text-secondary">Kích thước</small>
                <p class="fs-5 fw-bold">30*30cm</p>
              </div>
            </div>
            <div class="d-flex flex-column gap-1">
              <small class="text-secondary">Describe</small>
              <p>
                The work beautifully depicts the starry night, combining traditional oil painting
                techniques with modern inspiration. Bright colors, the combination...
              </p>
            </div>
            <hr />
            <div class="d-flex align-items-center justify-content-between">
              <small class="text-secondary">Starting price</small>
              <p class="fs-5 fw-bold mb-0">50.000đ</p>
            </div>
            <hr />
            <div class="d-flex flex-column align-items-center justify-content-center">
              <p class="fw-bold">AI verification</p>
              <i class="fa-solid fa-circle-check text-success fs-4 mb-3"></i>
              <p class="text-success fw-bold mb-0">By the artist</p>
            </div>
            <hr />
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between gap-2">
          <button type="button" class="btn btn-primary rounded-pill shadow fw-bold">Approve</button>
          <button type="button" class="btn btn-danger rounded-pill shadow fw-bold">Reject</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
