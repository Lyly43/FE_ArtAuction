<template>
  <div class="card border-0 shadow-sm h-100">
    <div
      class="card-header bg-white border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center flex-wrap gap-2"
    >
      <div>
        <h5 class="fw-bold text-primary mb-1">Revenue Chart</h5>
        <p class="text-muted small mb-0">Doanh thu (Million VND)</p>
      </div>
      <div class="d-flex gap-2 align-items-center flex-wrap">
        <div class="input-group input-group-sm shadow-sm" style="width: 180px">
          <span class="input-group-text bg-white border-end-0"
            ><i class="fa-regular fa-calendar"></i
          ></span>
          <input
            type="date"
            class="form-control border-start-0 ps-0"
            v-model="startDate"
            @change="validateDates"
            :max="endDate || undefined"
          />
        </div>
        <span class="text-muted fw-bold">-</span>
        <div class="input-group input-group-sm shadow-sm" style="width: 180px">
          <span class="input-group-text bg-white border-end-0"
            ><i class="fa-regular fa-calendar"></i
          ></span>
          <input
            type="date"
            class="form-control border-start-0 ps-0"
            v-model="endDate"
            @change="validateDates"
            :min="startDate || undefined"
          />
        </div>
        <button
          class="btn btn-primary btn-sm"
          @click="updateChart"
          :disabled="!startDate || !endDate || loading"
        >
          <i class="fa-solid fa-search me-1"></i>
          Apply
        </button>
      </div>
    </div>
    <div class="card-body px-4 pb-4">
      <div v-if="!startDate || !endDate" class="text-center py-5 bg-light text-muted">
        <i class="fa-solid fa-filter fs-1 mb-3 opacity-25"></i>
        <p>Please select date range to view revenue chart</p>
      </div>
      <div v-else-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading data...</p>
      </div>
      <div v-else-if="error" class="text-center py-5 text-danger">
        <i class="fa-solid fa-exclamation-triangle fs-1 mb-3"></i>
        <p>{{ error }}</p>
      </div>
      <div v-else style="height: 400px; position: relative">
        <canvas id="revenueChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import axios from "axios";
Chart.register(...registerables);

export default {
  data() {
    return {
      chart: null,
      startDate: "",
      endDate: "",
      loading: false,
      error: null,
      revenueData: [],
    };
  },
  methods: {
    validateDates() {
      if (this.startDate && this.endDate && this.startDate > this.endDate) {
        this.error = "Start date must be before end date";
        return false;
      }
      this.error = null;
      return true;
    },
    async updateChart() {
      if (!this.startDate || !this.endDate) return;
      if (!this.validateDates()) return;

      this.loading = true;
      this.error = null;

      try {
        const response = await axios.post(
          "http://localhost:8081/api/admin/statistics/revenue",
          {
            startDate: this.startDate,
            endDate: this.endDate,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("key_admin"),
            },
          }
        );

        if (response.data && response.data.status === 1) {
          this.revenueData = response.data.data || [];
          this.renderChart();
        } else {
          this.error = response.data?.message || "Failed to load revenue data";
        }
      } catch (err) {
        console.error("Error fetching revenue data:", err);
        this.error = err.response?.data?.message || "An error occurred while loading data";
      } finally {
        this.loading = false;
      }
    },
    renderChart() {
      if (this.chart) this.chart.destroy();

      if (!this.revenueData || this.revenueData.length === 0) {
        this.error = "No data available for the selected date range";
        return;
      }

      const ctx = document.getElementById("revenueChart");
      if (!ctx) return;

      // Extract labels (dates) and data (totalAmount)
      const labels = this.revenueData.map((item) => item.date || "");
      const amounts = this.revenueData.map((item) => (item.totalAmount || 0) / 1000000); // Convert to million VND

      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Revenue (Million VND)",
              data: amounts,
              borderColor: "#0d6efd",
              backgroundColor: "rgba(13,110,253,0.1)",
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `Revenue: ${context.parsed.y.toFixed(2)} Million VND`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value + "M";
                },
              },
            },
          },
        },
      });
    },
  },
  beforeUnmount() {
    if (this.chart) this.chart.destroy();
  },
};
</script>
