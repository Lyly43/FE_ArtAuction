<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="mb-4">
      <h4 class="text-primary fw-bold mb-1">Analysis & Reporting</h4>
      <p class="text-body-secondary mb-0">System performance statistics and analysis</p>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-md-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">New User</h6>
                <h3 class="fw-bold mb-0">120</h3>
              </div>
              <div
                class="bg-secondary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-users fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">
              <span class="text-success fw-medium"><i class="fa-solid fa-arrow-up"></i> 12%</span>
              vs last month
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Revenue</h6>
                <h3 class="fw-bold mb-0">100</h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-chart-line fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">
              <span class="text-success fw-medium"><i class="fa-solid fa-arrow-up"></i> 5%</span> vs
              last month
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Auction Room</h6>
                <h3 class="fw-bold mb-0">10</h3>
              </div>
              <div
                class="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-hourglass-start fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">Active rooms this month</small>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-12 col-lg-6">
        <div class="card border-0 shadow-sm h-100">
          <div
            class="card-header bg-white border-0 pt-3 pb-0 d-flex justify-content-between align-items-center"
          >
            <h5 class="card-title fw-bold text-primary mb-0">Revenue Chart</h5>
            <span class="badge bg-secondary-subtle text-primary">Million VND</span>
          </div>
          <div class="card-body">
            <div style="position: relative; height: 300px; width: 100%">
              <canvas id="revenueChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-6">
        <div class="card border-0 shadow-sm h-100">
          <div
            class="card-header bg-white border-0 pt-3 pb-0 d-flex justify-content-between align-items-center"
          >
            <h5 class="card-title fw-bold text-success mb-0">Painting Genre</h5>
            <i class="fa-solid fa-image text-secondary"></i>
          </div>
          <div class="card-body">
            <div style="position: relative; height: 300px; width: 100%">
              <canvas id="userChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< Updated upstream
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

=======
// import { onMounted } from "vue";
// import { Chart, registerables } from "chart.js";

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
// Chart.register(...registerables);
>>>>>>> Stashed changes
export default {
  name: 'BarChart',
  components: { Bar },

  data() {
    return {
      list_data: [],
      is_view: false,
      chartData: {
        labels: [],
        datasets: []
      },
      // revenueChart: null,
      // userChart: null,
    };
  },

  mounted() {
    // --- Biểu đồ doanh thu ---
    const revenueChartCtx = document.getElementById("revenueChart");
    // Lưu vào biến this.revenueChart để có thể destroy sau này
    this.revenueChart = new Chart(revenueChartCtx, {
      type: "line",
      data: {
        labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
        datasets: [
          {
            label: "Doanh thu (triệu đồng)", // Đã sửa lỗi chính tả: lable -> label
            data: [10, 25, 20, 40, 60, 80, 85, 90, 75, 60, 95, 100], // Đã thêm dữ liệu mẫu cho đủ 12 tháng
            borderColor: "#0d6efd",
            backgroundColor: "rgba(13,110,253,0.1)",
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#0d6efd",
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Quan trọng để chart fill theo div cha
        plugins: {
          legend: { display: true, position: "top" }, // Hiển thị legend cho rõ
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { borderDash: [2, 4], color: "#e9ecef" }, // Grid nét đứt cho đẹp
          },
          x: {
            grid: { display: false },
          },
        },
      },
    });

    // --- Biểu đồ tỷ lệ loại ---
    const userCtx = document.getElementById("userChart");
    this.userChart = new Chart(userCtx, {
      type: "bar",
      data: {
        labels: ["Sơn dầu", "Phong cảnh", "Ký họa", "Trừu tượng", "Chân dung"],
        datasets: [
          {
            label: "Số lượng",
            data: [100, 150, 200, 250, 220],
            backgroundColor: [
              "rgba(25, 135, 84, 0.7)",
              "rgba(13, 110, 253, 0.7)",
              "rgba(255, 193, 7, 0.7)",
              "rgba(220, 53, 69, 0.7)",
              "rgba(13, 202, 240, 0.7)",
            ],
            borderColor: "transparent",
            borderRadius: 4, // Bo góc cột
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            grid: { borderDash: [2, 4], color: "#e9ecef" },
          },
          x: {
            grid: { display: false },
          },
        },
      },
    });
  },

  methods: {
    thongKe() {
      axios
        .post("http://localhost:8081/api/admin/statistics/users-registration" , this.search, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("key_admin")
          }
        })
          .then((res) => {
            if (res.data.status) {
              this.is_view = true;
              this.chartData = {
                labels: res.data.labels,
                datasets: res.data.datasets
              };
              this.list_data = res.data.data;
            } else {
              this.$toast.error(res.data.message);
            }

          })
    }
  },

  beforeUnmount() {
    // Hủy chart khi component bị gỡ để tránh memory leak
    if (this.revenueChart) this.revenueChart.destroy();
    if (this.userChart) this.userChart.destroy();
  },
};
</script>
