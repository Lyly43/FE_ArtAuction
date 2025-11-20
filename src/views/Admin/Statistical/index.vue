<template>
  <div class="container">
    <h4 class="text-primary fw-bold">Analysis & Reporting</h4>
    <p class="text-body-secondary">System performance statistics and analysis</p>
    <div class="row mb-4 d-flex align-items-center justify-content-between">
      <div class="col-12 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">New User</h6>
              <i class="fa-solid fa-users text-primary"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">120</p>
            <small class="text-body-secondary">This month</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Revenue</h6>
              <i class="fa-solid fa-chart-line text-success"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">100</p>
            <small class="text-body-secondary">This month</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Auction room</h6>
              <i class="fa-solid fa-hourglass-start text-danger"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">10</p>
            <small class="text-body-secondary">This month</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts  -->
    <div class="row">
      <div class="col-12 col-lg-6">
        <div class="frame border border-2 border-secondary p-3 bg-light mt-3">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <h5>Revenue chart (million VND)</h5>
            <i class="fa-solid fa-chart-simple"></i>
          </div>
          <div class="card" style="width: 100%">
            <canvas id="revenueChart"></canvas>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-6">
        <div class="frame border border-2 border-secondary p-3 bg-light mt-3">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <h5>Painting genre</h5>
            <i class="fa-solid fa-image"></i>
          </div>
          <div class="card" style="width: 100%">
            <canvas id="userChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted } from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default {
  data() {
    return {
      revenueChart: null,
      userChart: null,
    };
  },

  mounted() {
    // Biểu đồ doanh thu
    const revenueChartCtx = document.getElementById("revenueChart");
    this.revenueChartCtx = new Chart(revenueChartCtx, {
      type: "line",
      data: {
        labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"], // trục x
        datasets: [
          {
            lable: "Doanh thu (triệu đồng)",
            data: [10, 25, 20, 40, 60, 80],
            borderColor: "#0d6efd",
            backgroundColor: "rgba(13,110,253,0.2)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true, // chart sẽ tự điều chỉnh kích thước khi container thay đổi
        plugins: { legend: { display: false } }, //ẩn legend.
        scales: { y: { beginAtZero: true } }, //trục y bắt đầu từ 0.
      },
    });

    // Biểu đồ tỷ lệ loại
    const userCtx = document.getElementById("userChart");
    this.userChart = new Chart(userCtx, {
      type: "bar",
      data: {
        labels: [
          "Tranh sơn dầu",
          "Tranh phong cảnh",
          "Tranh ký họa",
          "Tranh trừu tượng",
          "Tranh chân dung",
        ],
        datasets: [
          {
            data: [100, 150, 200, 250, 220, 300],
            label: "Tranh",
            backgroundColor: "rgba(25, 135, 84, 0.6)",
            borderColor: "#198754",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });
  },

  beforeUnmount() {
    // Hủy chart khi component bị gỡ để tránh memory leak
    if (this.revenueChart) this.revenueChart.destroy();
    if (this.userChart) this.userChart.destroy();
  },
};
</script>
<style>
.frame {
  height: 400px;
}
</style>
