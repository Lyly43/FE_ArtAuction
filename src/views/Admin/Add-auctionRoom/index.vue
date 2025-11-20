<template>
  <div class="container">
    <div class="card mb-3">
      <div class="card-body">
        <div class="d-flex align-items-center mb-3">
          <div
            class="icon-box me-3 d-flex align-items-center justify-content-center bg-secondary bg-opacity-10 rounded-3"
          >
            <i class="fa-solid fa-pager text-primary"></i>
          </div>
          <div class="">
            <h5 class="card-title fw-bold">Thông tin cơ bản</h5>
            <p class="card-subtitle mb-2 text-body-secondary">
              Thiết lập thông tin cơ bản về phòng đấu giá
            </p>
          </div>
        </div>
        <hr />
        <div class="row mb-3">
          <div class="col-12 col-lg-6 mb-3">
            <label for="roomName" class="form-label">Tên phòng đấu giá</label>
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control bg-secondary bg-opacity-10"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>

          <div class="col-12 col-lg-6">
            <label for="typeOfArtwork" class="form-label">Loại tác phẩm</label>
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control bg-secondary bg-opacity-10"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
        </div>

        <label for="description" class="form-label">Short description</label>
        <div class="input-group">
          <textarea
            class="form-control bg-secondary bg-opacity-10 mb-3"
            aria-label="With textarea"
          ></textarea>
        </div>

        <div class="col-6">
          <label for="typeOfArtwork" class="form-label">Admin phụ trách</label>
          <div class="input-group flex-nowrap">
            <input
              type="text"
              class="form-control bg-secondary bg-opacity-10"
              placeholder=""
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Chọn tác phẩm đấu giá -->
    <div class="card mb-3">
      <div class="card-body">
        <div class="d-flex align-items-center mb-3">
          <div
            class="icon-box me-3 d-flex align-items-center justify-content-center bg-secondary bg-opacity-10 rounded-3"
          >
            <i class="fa-solid fa-images text-primary"></i>
          </div>
          <div class="">
            <h5 class="card-title fw-bold">Chọn tác phẩm đấu giá</h5>
            <p class="card-subtitle mb-2 text-body-secondary mb-3">
              Tìm kiếm và chọn các tác phẩm theo thể loại
            </p>
          </div>
        </div>

        <hr />
        <div class="row mb-3">
          <div class="col-12 col-lg-6 mb-3">
            <label for="roomName" class="form-label">Lọc theo thể loại</label>
            <div>
              <select
                v-model="selectedCategory"
                id="options"
                name="options"
                class="py-2 w-100 rounded-2 bg-secondary bg-opacity-10 border"
              >
                <option value="">-- Chọn thể loại --</option>
                <option value="option1">Tranh sơn dầu</option>
                <option value="option2">Tranh chân dung</option>
              </select>
            </div>
          </div>

          <div class="col-12 col-lg-6">
            <label for="typeOfArtwork" class="form-label">Tìm kiếm tác phẩm</label>
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control bg-secondary bg-opacity-10"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
        </div>

        <!-- Danh sách tác phẩm -->
        <div class="mb-3">
          <p>Danh sách tác phẩm</p>
          <div class="border border-2 border-outline-primary bg-secondary bg-opacity-10 p-3">
            <div class="row">
              <div class="col-12 col-lg-6 mb-3">
                <div class="card p-2">
                  <div class="row d-flex align-items-center">
                    <div class="col-4">
                      <img
                        src="/src/assets/img/4.png"
                        alt="Artwork"
                        class="img-fluid rounded"
                        style="max-height: 100px; object-fit: cover"
                      />
                    </div>
                    <div class="col-8 d-flex flex-column gap-1">
                      <small class="fw-bold">ID: 111</small>
                      <p class="fw-bold mb-0">Sắc màu đại dương</p>
                      <small>Tác giả: Nguyễn Văn B</small>
                      <small>Kích thước: 30 * 30cm</small>
                      <small class="text-danger">Sơn dầu</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-lg-6">
                <div class="card p-2">
                  <div class="row d-flex align-items-center">
                    <div class="col-4">
                      <img
                        src="/src/assets/img/4.png"
                        alt="Artwork"
                        class="img-fluid rounded"
                        style="max-height: 100px; object-fit: cover"
                      />
                    </div>
                    <div class="col-8 d-flex flex-column gap-1">
                      <small class="fw-bold">ID: 111</small>
                      <p class="fw-bold mb-0">Sắc màu đại dương</p>
                      <small>Tác giả: Nguyễn Văn B</small>
                      <small>Kích thước: 30 * 30cm</small>
                      <small class="text-danger">Sơn dầu</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- tác phẩm đã chọn - thiết lập giá -->
        <div class="mb-3">
          <p>Tác phẩm đã chọn <span>(1)</span> - thiết lập giá</p>
          <div class="border border-2 border-outline-primary bg-secondary bg-opacity-10 p-3">
            <div class="card w-100 mb-3 shadow-sm border-0">
              <div class="card-body">
                <!-- Hàng chứa ảnh và thông tin -->
                <div class="row g-3 align-items-center">
                  <!-- Ảnh -->
                  <div class="col-12 col-md-3 text-center">
                    <img
                      src="/src/assets/img/4.png"
                      alt="Artwork"
                      class="img-fluid rounded"
                      style="max-height: 150px; object-fit: cover"
                    />
                  </div>

                  <!-- Thông tin -->
                  <div class="col-12 col-md-8">
                    <div class="d-flex flex-column gap-1">
                      <small class="fw-bold">ID: 111</small>
                      <p class="fw-bold mb-0">Sắc màu đại dương</p>
                      <small>Tác giả: Nguyễn Văn B</small>
                      <small>Kích thước: 30 × 30cm</small>
                      <small class="text-danger">Sơn dầu</small>
                      <small class="text-body-secondary">Giá khởi điểm: 50.000đ</small>
                    </div>
                  </div>

                  <!-- Nút xóa -->
                  <div class="col-12 col-md-1 text-end">
                    <i class="fa-solid fa-xmark text-danger fs-5" role="button"></i>
                  </div>
                </div>

                <hr />

                <!-- Hàng nhập thời gian và bước giá -->
                <div class="row g-3">
                  <div class="col-12 col-lg-6">
                    <label for="duration" class="form-label">Thời gian dự kiến (phút)</label>
                    <input
                      type="number"
                      id="duration"
                      class="form-control bg-secondary bg-opacity-10"
                      placeholder="Nhập số phút..."
                    />
                  </div>

                  <div class="col-12 col-lg-6">
                    <label for="minStep" class="form-label">Bước giá tối thiểu (VNĐ)</label>
                    <input
                      type="text"
                      id="minStep"
                      class="form-control bg-secondary bg-opacity-10"
                      placeholder="Nhập bước giá..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tổng thời gian dự kiến -->
        <div class="alert alert-primary bg-opacity-10 border-0 d-flex align-items-start">
          <div class="me-3">
            <i class="fa-regular fa-clock text-primary fs-4"></i>
          </div>
          <div>
            <h6 class="fw-semibold text-primary mb-1">Tổng thời gian dự kiến</h6>
            <h4 class="fw-bold text-primary mb-1">15 phút</h4>
            <small class="text-muted"
              >Thời gian thực tế có thể thay đổi tùy theo tình hình đấu giá</small
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Sắp xếp theo thứ tự phiên đấu giá -->
    <div class="card w-100 mb-3">
      <div class="card-body">
        <div class="d-flex align-items-center mb-3">
          <div
            class="icon-box me-3 d-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-3"
          >
            <i class="fa-solid fa-hourglass-half text-danger"></i>
          </div>
          <div class="">
            <h5 class="card-title fw-bold">Lịch trình đấu giá</h5>
            <p class="card-subtitle mb-2 text-body-secondary">
              Lên lịch thời gian bắt đầu và kết thúc cho phòng đấu giá
            </p>
          </div>
        </div>
        <hr />

        <div class="card mb-3 border-0 alert alert-primary">
          <div class="card-body d-flex align-items-center">
            <img
              src="/src/assets/img/hoasen.png"
              alt="Tranh"
              class="rounded me-3"
              style="width: 80px; height: 80px; object-fit: cover"
            />

            <div class="flex-grow-1">
              <div class="d-flex align-items-center mb-1">
                <span class="badge bg-primary me-2 rounded-circle" style="width: 24px; height: 24px"
                  >1</span
                >
                <h6 class="mb-0 fw-semibold">Đêm đầy sao</h6>
              </div>
              <p class="mb-1 text-muted small">Tác giả: Nguyễn Văn A</p>
              <p class="mb-0 text-primary fw-bold">Giá khởi điểm: 50.000đ</p>
            </div>
          </div>
        </div>

        <div class="card mb-3 border-0 alert alert-primary">
          <div class="card-body d-flex align-items-center">
            <img
              src="/src/assets/img/hoasen.png"
              alt="Tranh"
              class="rounded me-3"
              style="width: 80px; height: 80px; object-fit: cover"
            />

            <div class="flex-grow-1">
              <div class="d-flex align-items-center mb-1">
                <span class="badge bg-primary me-2 rounded-circle" style="width: 24px; height: 24px"
                  >2</span
                >
                <h6 class="mb-0 fw-semibold">Đêm đầy sao</h6>
              </div>
              <p class="mb-1 text-muted small">Tác giả: Nguyễn Văn A</p>
              <p class="mb-0 text-primary fw-bold">Giá khởi điểm: 50.000đ</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cấu hình thời gian -->
    <div class="card w-100 mb-3">
      <div class="card-body">
        <div class="d-flex align-items-center mb-3">
          <div
            class="icon-box me-3 d-flex align-items-center justify-content-center bg-warning bg-opacity-10 rounded-3"
          >
            <i class="fa-solid fa-alarm-clock text-warning"></i>
          </div>
          <div class="">
            <h5 class="card-title fw-bold">Cấu hình thời gian</h5>
            <p class="card-subtitle mb-2 text-body-secondary">
              Lên lịch thời gian bắt đầu và kết thúc cho phòng đấu giá
            </p>
          </div>
        </div>
        <hr />
        <div class="row mb-3">
          <div class="col-12 col-lg-6 mb-3">
            <label for="roomName" class="form-label">Thời gian bắt đầu</label>
            <div class="input-group flex-nowrap">
              <input
                type="datetime-local"
                class="form-control bg-secondary bg-opacity-10"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>

          <div class="col-12 col-lg-6">
            <label for="typeOfArtwork" class="form-label">Thời gian kết thúc dự kiến</label>
            <div class="input-group flex-nowrap">
              <input
                type="datetime-local"
                class="form-control bg-secondary bg-opacity-10"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-12 col-lg-6 mb-3">
            <label for="roomName" class="form-label">Thời gian tự động gia hạn (s)</label>
            <div class="input-group flex-nowrap">
              <input
                type="number"
                class="form-control bg-secondary bg-opacity-10"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <small class="text-body-secondary">VD: +30s khi có bid cuối trong 30s cuối</small>
          </div>

          <div class="col-12 col-lg-6">
            <label for="status" class="form-label">Trạng thái khởi tạo</label>
            <select
              id="status"
              name="status"
              class="form-select bg-secondary bg-opacity-10 border-0 rounded-3 py-2"
            >
              <option value="schedule">Scheduled</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Cấu hình tài chính -->
    <div class="card w-100 mb-3">
      <div class="card-body">
        <div class="d-flex align-items-center mb-3">
          <div
            class="icon-box me-3 d-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-3"
          >
            <i class="fa-solid fa-dollar-sign text-success"></i>
          </div>
          <div class="">
            <h5 class="card-title fw-bold">Thiết lập tiền cọc và thanh toán</h5>
            <p class="card-subtitle mb-2 text-body-secondary">
              Thiết lập thông tin cơ bản về phòng đấu giá
            </p>
          </div>
        </div>
        <hr />
        <div class="row mb-3">
          <div class="col-12 col-lg-6 mb-3">
            <label for="roomName" class="form-label">Tiền đặt cọc (VNĐ)</label>
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control bg-secondary bg-opacity-10"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>

          <div class="col-12 col-lg-6">
            <label for="typeOfArtwork" class="form-label"
              >Thời hạn thanh toán sau khi thắng (ngày)</label
            >
            <div class="input-group flex-nowrap">
              <input
                type="number"
                class="form-control bg-secondary bg-opacity-10"
                placeholder=""
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cấu hình thông báo và hiển thị -->
    <div class="card w-100 mb-3">
      <div class="card-body">
        <div class="d-flex align-items-center mb-3">
          <div
            class="icon-box me-3 d-flex align-items-center justify-content-center bg-warning bg-opacity-10 rounded-3"
          >
            <i class="fa-solid fa-bell text-warning"></i>
          </div>
          <div class="">
            <h5 class="card-title fw-bold">Cấu hình thông báo và hiển thị</h5>
            <p class="card-subtitle mb-2 text-body-secondary">
              Quản lý thông báo và quyền truy cập
            </p>
          </div>
        </div>
        <hr />
        <div class="mb-4">
          <label>Thông báo trước khi bắt đầu (phút)</label>
          <div class="input-group">
            <input
              type="text"
              class="form-control bg-secondary bg-opacity-10"
              placeholder=""
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <small class="text-body-secondary">Gửi thông báo cho người dùng trước khi bắt đầu</small>
        </div>

        <div
          class="w-100 bg-secondary bg-opacity-10 px-3 py-2 border rounded-2 d-flex align-items-center justify-content-between mb-4"
        >
          <div>
            <p class="mb-1">Thông báo khi kết thúc</p>
            <small class="text-body-secondary">Gửi thông báo cho người thắng</small>
          </div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="switchCheckChecked"
              checked
            />
          </div>
        </div>

        <div
          class="w-100 bg-secondary bg-opacity-10 px-3 py-2 border rounded-2 d-flex align-items-center justify-content-between"
        >
          <div>
            <p class="mb-1">Hiển thị công khai trên trang chủ</p>
            <small class="text-body-secondary"
              >Cho phép người dùng thấy phiên này trước khi bắt đầu</small
            >
          </div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="switchCheckChecked"
              checked
            />
          </div>
        </div>
      </div>
    </div>

    <!-- button -->
    <div class="d-flex align-items-center justify-content-between mb-5">
      <button type="button" class="btn btn-danger">Cancel</button>
      <button type="button" class="btn btn-primary">Create</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: "", // thể loại đã chọn
      artworks: [
        // danh sách tác phẩm theo thể loại
        {
          id: 111,
          name: "Sắc màu đại dương",
          author: "Nguyễn Văn B",
          size: "30×30cm",
          type: "Tranh sơn dầu",
          category: "option1",
          img: "/src/assets/img/4.png",
        },
        {
          id: 222,
          name: "Chân dung thiếu nữ",
          author: "Trần Văn C",
          size: "50×60cm",
          type: "Tranh chân dung",
          category: "option2",
          img: "/src/assets/img/4.png",
        },
      ],
      selectedArtwork: null, // tác phẩm đã chọn
    };
  },

  // computed: {
  //   filteredArtworks() {
  //     if (!this.selectedCategory) return [];
  //     return this.artworks.filter((a) => a.category === this.selectedCategory);
  //   },
  // },

  // methods: {
  //   selectArtwork(item) {
  //     this.selectedArtwork = item;
  //   },
  // },
};
</script>

<style></style>
