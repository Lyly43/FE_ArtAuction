<template>
  <div class="container">
    <h4 class="fw-bold text-primary">Auction room management</h4>
    <p class="text-body-secondary">Manage all auction rooms in the system</p>
    <div class="d-flex align-items-center justify-content-lg-end mb-3">
      <button type="button" class="btn btn-primary shadow">
        <i class="fa-solid fa-paper-plane me-3"></i>Create new notification
      </button>
    </div>
    <div class="row mb-4">
      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Tổng số thông báo</h6>
              <i class="fa-solid fa-bell text-primary"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">1222</p>
            <!-- <small class="text-success">+12% so với tháng trước</small> -->
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Đã gửi</h6>
              <i class="fa-solid fa-circle-check text-success"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">100</p>
            <!-- <small class="text-body-secondary">80% tổng số</small> -->
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Thất bại</h6>
              <i class="fa-solid fa-ban text-danger"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">12</p>
            <!-- <small class="text-body-secondary">12% tổng số</small> -->
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Tỉ lệ đọc</h6>
              <i class="fa-solid fa-eye text-primary"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">80%</p>
            <!-- <small class="text-danger">Vi phạm chính sách</small> -->
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
            placeholder="Search by notification"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div class="col-12 col-lg-5 d-flex justify-content-lg-end gap-2 gap-md-4 gap-lg-5 mb-4">
        <select id="options" name="options" class="border rounded-3 px-4">
          <option value="option1">Tất cả</option>
          <option value="option2">Đã gửi</option>
          <option value="option3">Thất bại</option>
        </select>
      </div>
    </div>

    <!-- auction-room -->
    <div class="auction-room">
      <div class="card mb-4">
        <div class="card-body">
          <div class="row mb-3">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center gap-5">
                <h5 class="fw-bold">Phòng đấu giá sắp bắt đầu</h5>
                <small class="text-light border border-primary rounded-3 p-1 fw-bold">Đã gửi</small>
              </div>
              <div class="d-flex align-items-center justify-content-lg-end">
                <p class="">Người nhận: all</p>
              </div>
            </div>
          </div>
          <div>
            <p>Phòng 01 sẽ bắt đầu phiên đấu giá vào lúc 10:00 ngày 26/03/2024</p>
            <small class="text-body-secondary">25/03/2024 09:00</small>
          </div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-body">
          <div class="row mb-3">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center gap-5">
                <h5 class="fw-bold">Phòng đấu giá sắp bắt đầu</h5>
                <small class="text-light border border-primary rounded-3 p-1 fw-bold">Đã gửi</small>
              </div>
              <div class="d-flex align-items-center justify-content-lg-end">
                <p class="">Người nhận: all</p>
              </div>
            </div>
          </div>
          <div>
            <p>Phòng VIP 01 sẽ bắt đầu phiên đấu giá vào lúc 10:00 ngày 26/03/2024</p>
            <small class="text-body-secondary">25/03/2024 09:00</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
