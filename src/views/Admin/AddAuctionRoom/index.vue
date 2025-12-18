<template>
  <div class="container py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
      <div class="mb-3 mb-md-0">
        <h4 class="fw-bold text-primary mb-1">Create new auction room</h4>
        <p class="text-body-secondary mb-0">
          Set up information, schedules, and display configurations
        </p>
      </div>
      <!-- <div class="d-flex gap-2">
        <button class="btn btn-light text-danger fw-bold shadow-sm px-4">Hủy bỏ</button>
        <button class="btn btn-primary fw-bold shadow-sm px-4" @click="submitForm">
          <i class="fa-solid fa-check me-2"></i>Hoàn tất
        </button>
      </div> -->
    </div>

    <form @submit.prevent="submitForm">
      <div class="card border-0 shadow-sm mb-4 rounded-3">
        <div class="card-body p-4">
          <div class="d-flex align-items-center mb-4">
            <div
              class="bg-secondary-subtle bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3"
              style="width: 48px; height: 48px"
            >
              <i class="fa-solid fa-pager fs-5"></i>
            </div>
            <div>
              <h5 class="fw-bold mb-0">Basic information</h5>
              <small class="text-muted">Set up general information for the auction room</small>
            </div>
          </div>

          <div class="row g-3">
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold small text-secondary text-uppercase"
                >Auction room name</label
              >
              <input
                type="text"
                class="form-control bg-light border-0"
                placeholder="Enter room name..."
                v-model="roomForm.roomName"
                required
              />
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold small text-secondary text-uppercase"
                >Main genre of work</label
              >
              <input
                type="text"
                class="form-control bg-light border-0"
                placeholder="Ex: Canvas..."
                v-model="roomForm.type"
                required
              />
            </div>
            <div class="col-12">
              <label class="form-label fw-bold small text-secondary text-uppercase"
                >Short description</label
              >
              <textarea
                class="form-control bg-light border-0"
                rows="2"
                placeholder="Detailed description..."
                v-model="roomForm.description"
                required
              ></textarea>
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold small text-secondary text-uppercase">
                Admin in charge
              </label>
              <select class="form-select bg-light border-0" v-model="roomForm.adminId" required>
                <option value="" disabled selected hidden>Select an admin...</option>
                <option v-for="admin in filteredAdmins" :key="admin.id" :value="admin.id">
                  {{ admin.fullName }} (ID: {{ admin.id }})
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="card border-0 shadow-sm mb-4 rounded-3">
        <div class="card-body p-4">
          <div class="d-flex align-items-center mb-4">
            <div
              class="bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center me-3"
              style="width: 48px; height: 48px"
            >
              <i class="fa-solid fa-images fs-5"></i>
            </div>
            <div>
              <h5 class="fw-bold mb-0">Select auction artwork</h5>
              <small class="text-muted">Filter by category and add to list</small>
            </div>
          </div>

          <div class="row g-3 mb-4">
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold small text-secondary text-uppercase"
                >Filter by category</label
              >
              <select v-model="selectedCategory" class="form-select bg-light border-0">
                <option value="" disabled selected hidden>
                  -- Select category to display pictures --
                </option>
                <option value="son-dau">Canvas</option>
                <option value="chan-dung">Portrait painting</option>
                <option value="phong-canh">Landscape</option>
              </select>
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label fw-bold small text-secondary text-uppercase"
                >Quick search</label
              >
              <div class="input-group border-0">
                <span class="input-group-text bg-light border-0 text-secondary"
                  ><i class="fa-solid fa-magnifying-glass"></i
                ></span>
                <input
                  type="text"
                  class="form-control bg-light border-0 shadow-none"
                  placeholder="Enter the name of the picture..."
                  v-model="search"
                />
              </div>
            </div>
          </div>

          <div v-if="selectedCategory">
            <p class="fw-bold text-primary mb-2 small text-uppercase">
              <i class="fa-solid fa-list me-2"></i>List of available works
            </p>

            <div v-if="isLoadingArtworks" class="text-center py-3 text-muted">
              <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
              Loading artworks...
            </div>

            <div class="row g-3" v-if="filteredArtworks.length > 0">
              <div class="col-12 col-md-6" v-for="art in filteredArtworks" :key="art.id">
                <div class="card border h-100" style="cursor: pointer" @click="addToSchedule(art)">
                  <div class="card-body p-2 d-flex align-items-start">
                    <img
                      :src="art.img"
                      class="rounded me-3 border bg-light"
                      style="width: 80px; height: 80px; object-fit: cover"
                    />

                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between">
                        <h6
                          class="fw-bold mb-0 text-dark text-truncate"
                          style="max-width: 200px"
                          :title="art.name"
                        >
                          {{ art.name }}
                        </h6>
                        <small class="badge bg-light text-secondary border">ID: {{ art.id }}</small>
                      </div>
                      <small class="text-muted d-block mb-2">{{ art.author }}</small>

                      <div class="d-flex gap-1 flex-wrap">
                        <span
                          class="badge bg-secondary-subtle text-primary border border-secondary-subtle fw-normal"
                          style="font-size: 0.7rem"
                        >
                          <i class="fa-solid fa-ruler-combined me-1"></i>{{ art.size }}
                        </span>
                        <span
                          class="badge bg-secondary-subtle text-secondary border border-secondary-subtle fw-normal"
                          style="font-size: 0.7rem"
                        >
                          {{ art.type }}
                        </span>
                      </div>
                    </div>

                    <div class="ms-2">
                      <button
                        type="button"
                        class="btn btn-sm btn-primary rounded-circle p-2 d-flex align-items-center justify-content-center"
                        style="width: 32px; height: 32px"
                      >
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-muted py-3 bg-light rounded small">
              No entries are suitable or have been taken.
            </div>
          </div>

          <div v-else class="text-center py-4 bg-light rounded border border-dashed">
            <i class="fa-solid fa-filter text-secondary fs-3 mb-2"></i>
            <p class="text-muted mb-0">
              Please select <b>Category</b> to see the list of pictures.
            </p>
          </div>
        </div>
      </div>

      <div class="card border-0 shadow-sm mb-4 rounded-3" v-if="scheduleList.length > 0">
        <div class="card-body p-4">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <div class="d-flex align-items-center">
              <div
                class="bg-danger bg-opacity-10 text-danger rounded-circle d-flex align-items-center justify-content-center me-3"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-hourglass-half fs-5"></i>
              </div>
              <div>
                <h5 class="fw-bold mb-0">Schedule and Pricing Configuration</h5>
                <small class="text-muted"
                  >Sort order and set price for {{ scheduleList.length }} artwork</small
                >
              </div>
            </div>
            <!-- <span class="badge bg-secondary-subtle text-primary fs-6 px-3 py-2 rounded-pill">
              <i class="fa-regular fa-clock me-1"></i> Total: {{ totalDuration }} minute
            </span> -->
          </div>

          <div class="d-flex flex-column gap-3">
            <div
              class="card border border-secondary-subtle bg-light-subtle"
              v-for="(item, index) in scheduleList"
              :key="item.id"
            >
              <div class="card-body p-3">
                <div class="row align-items-center g-3">
                  <div class="col-12 col-lg-5 d-flex align-items-center gap-3">
                    <div
                      class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                      style="width: 28px; height: 28px; flex-shrink: 0"
                    >
                      {{ index + 1 }}
                    </div>
                    <img
                      :src="item.img"
                      class="rounded border bg-white"
                      style="width: 60px; height: 60px; object-fit: cover"
                    />
                    <div class="flex-grow-1">
                      <div class="d-flex align-items-center gap-2 mb-1">
                        <h6 class="fw-bold mb-0 text-dark text-truncate" style="max-width: 150px">
                          {{ item.name }}
                        </h6>
                        <span
                          class="badge bg-white text-secondary border"
                          style="font-size: 0.65rem"
                          >ID: {{ item.id }}</span
                        >
                      </div>
                      <small class="text-muted d-block">{{ item.author }}</small>
                      <div class="d-flex gap-1 mt-1">
                        <span
                          class="badge bg-white text-secondary border fw-normal"
                          style="font-size: 0.65rem"
                          >{{ item.size }}</span
                        >
                        <span
                          class="badge bg-white text-secondary border fw-normal"
                          style="font-size: 0.65rem"
                          >{{ item.type }}</span
                        >
                      </div>
                    </div>
                  </div>

                  <div class="col-12 col-lg-5">
                    <div class="row g-2">
                      <div class="col-4">
                        <label class="form-label x-small fw-bold text-secondary mb-0"
                          >STARTING PRICE</label
                        >

                        <div class="input-group input-group-sm">
                          <span class="input-group-text bg-white border-end-0 text-success fw-bold"
                            >$</span
                          >
                          <input
                            type="text"
                            class="form-control form-control-sm border-start-0 shadow-none ps-0"
                            placeholder="0.00"
                            v-model="item.startPrice"
                            @blur="formatCurrencyUSD(item)"
                            @focus="unformatCurrency(item)"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-12 col-lg-2 text-end d-flex justify-content-end align-items-center gap-1"
                  >
                    <div class="btn-group shadow-sm" role="group">
                      <button
                        type="button"
                        class="btn btn-sm btn-white bg-white border"
                        @click="moveItem(index, -1)"
                        :disabled="index === 0"
                      >
                        <i class="fa-solid fa-arrow-up"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-white bg-white border"
                        @click="moveItem(index, 1)"
                        :disabled="index === scheduleList.length - 1"
                      >
                        <i class="fa-solid fa-arrow-down"></i>
                      </button>
                    </div>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-danger border-0 ms-2 rounded-circle"
                      @click="removeFromSchedule(index)"
                    >
                      <i class="fa-solid fa-xmark fs-5"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-12 col-lg-6">
          <div class="card border-0 shadow-sm h-100 rounded-3">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-3">
                <div
                  class="bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center me-3"
                  style="width: 48px; height: 48px"
                >
                  <i class="fa-solid fa-clock fs-5"></i>
                </div>
                <h5 class="fw-bold mb-0">Time configuration</h5>
              </div>

              <div class="row g-3 mb-4">
                <div class="col-12 col-md-6">
                  <label class="form-label fw-bold small text-secondary text-uppercase"
                    >Start at</label
                  >
                  <input
                    type="datetime-local"
                    class="form-control bg-light border-0"
                    v-model="roomForm.startedAt"
                    required
                  />
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label fw-bold small text-secondary text-uppercase"
                    >Expected end</label
                  >
                  <input
                    type="datetime-local"
                    class="form-control bg-light border-0"
                    v-model="roomForm.estimatedEndTime"
                    required
                  />
                </div>
                <!-- <div class="col-12 col-md-6">
                  <label class="form-label fw-bold small text-secondary text-uppercase"
                    >Automatic renewal(s)</label
                  >
                  <input type="number" class="form-control bg-light border-0" placeholder="30" />
                </div> -->
                <!-- <div class="col-12 col-md-6">
                  <label class="form-label fw-bold small text-secondary text-uppercase"
                    >Initialization state</label
                  >
                  <select class="form-select bg-light border-0">
                    <option value="schedule">Scheduled</option>
                    <option value="draft">Draft</option>
                  </select>
                </div> -->
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-6">
          <div class="card border-0 shadow-sm h-100 rounded-3">
            <div class="card-body p-4">
              <div class="d-flex align-items-center mb-3">
                <div
                  class="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center me-3"
                  style="width: 48px; height: 48px"
                >
                  <i class="fa-solid fa-images fs-5"></i>
                </div>
                <h5 class="fw-bold mb-0">Cover image</h5>
              </div>

              <div
                class="border rounded-3 d-flex flex-column align-items-center justify-content-center bg-light position-relative overflow-hidden"
                style="height: 400px; border-style: dashed !important; cursor: pointer"
                @click="$refs.fileInput.click()"
              >
                <img
                  v-if="previewImage"
                  :src="previewImage"
                  class="w-100 h-100 object-fit-cover position-absolute"
                  alt="Cover Preview"
                  loading="lazy"
                />

                <div v-else class="text-center text-muted">
                  <i class="fa-solid fa-cloud-arrow-up fs-1 mb-2"></i>
                  <p class="mb-0 small fw-medium">Click to upload photo</p>
                  <small style="font-size: 0.7rem">Support: JPG, PNG, WEBP</small>
                </div>

                <input
                  type="file"
                  ref="fileInput"
                  class="d-none"
                  accept="image/*"
                  @change="handleFileUpload"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex gap-2 mt-4 justify-content-end">
        <button
          class="btn btn-danger text-light fw-bold shadow-sm px-4"
          type="button"
          @click="handleCancel"
        >
          Cancel
        </button>
        <button class="btn btn-primary fw-bold shadow-sm px-4" type="submit">
          <i class="fa-solid fa-check me-2"></i>Completed
        </button>
      </div>
    </form>
  </div>
</template>

<script>
// import { searchForWorkspaceRoot } from "vite";
import axios from "axios";

export default {
  data() {
    return {
      selectedCategory: "",
      allArtworks: [],
      search: "",
      isLoadingArtworks: false,
      scheduleList: [],
      selectedFile: null,
      previewImage: null,

      roomForm: {
        roomName: "",
        type: "",
        description: "",
        adminId: "",
        depositAmount: 0,
        paymentDeadlineDays: 3,
        startedAt: "",
        estimatedEndTime: "",
        status: 2,
        viewCount: 0,
        imageAuctionRoom: "",
      },
      admins: [],
    };
  },

  mounted() {
    this.loadAddRoomArt();
    this.loadAdminData();
  },

  computed: {
    filteredArtworks() {
      if (!this.selectedCategory) return [];

      let filtered = this.allArtworks.filter(
        (art) =>
          art.category === this.selectedCategory &&
          !this.scheduleList.find((item) => item.id === art.id)
      );

      if (this.search) {
        const query = this.search.toLowerCase();
        filtered = filtered.filter((art) => art.name.toLowerCase().includes(query));
      }
      return filtered;
    },
    filteredAdmins() {
      // Kiểm tra nếu chưa có dữ liệu thì trả về mảng rỗng để tránh lỗi
      if (!Array.isArray(this.admins)) return [];

      // Lọc ra những người có role = 3
      return this.admins.filter((admin) => admin.role === 3);
    },
    // totalDuration() {
    //   return this.scheduleList.reduce((sum, item) => sum + (parseInt(item.duration) || 0), 0);
    // },
  },

  methods: {
    loadAddRoomArt() {
      this.isLoadingArtworks = true;
      axios
        .get("http://localhost:8081/api/admin/auction-rooms/artworks", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          console.log("API Data RAW:", res.data);

          this.allArtworks = res.data.map((item) => {
            // Gọi hàm mapCategory
            const cat = this.mapCategory(item.paintingGenre, item.material);
            console.log(`Mapping: ${item.paintingGenre} + ${item.material} => ${cat}`); // DEBUG LOG

            return {
              id: item.id,
              name: item.title,
              author: item.author,
              type: item.paintingGenre,

              category: this.mapCategory(item.paintingGenre, item.material),

              img: item.avtArtwork,
              size: item.size,
              basePrice: item.startedPrice,
            };
          });
        })
        .catch((err) => {
          console.error("ERROR:", err);
        })
        .finally(() => {
          this.isLoadingArtworks = false;
        });
    },

    mapCategory(genre, material) {
      if (!genre) return "phong-canh"; // Mặc định

      const g = genre.toLowerCase();
      const m = material ? material.toLowerCase() : "";

      // 1. Ưu tiên bắt Chân dung trước
      if (g.includes("portrait") || g.includes("chân dung") || g.includes("figure")) {
        return "chan-dung";
      }

      // 2. Tiếp theo bắt Phong cảnh
      if (
        g.includes("landscape") ||
        g.includes("phong cảnh") ||
        g.includes("nature") ||
        g.includes("seascape")
      ) {
        return "phong-canh";
      }

      // 3. Cuối cùng mới bắt Sơn dầu/Canvas (Những tranh còn lại)
      if (
        g.includes("oil") ||
        m.includes("oil") ||
        g.includes("canvas") ||
        m.includes("canvas") ||
        g.includes("acrylic")
      ) {
        return "son-dau";
      }

      // Fallback
      return "phong-canh";
    },

    addToSchedule(artwork) {
      this.scheduleList.push({
        ...artwork,
        startPrice: artwork.basePrice,
        stepPrice: "",
        // duration: "",
      });
    },

    removeFromSchedule(index) {
      this.scheduleList.splice(index, 1);
    },

    moveItem(index, direction) {
      const newIndex = index + direction;
      if (newIndex >= 0 && newIndex < this.scheduleList.length) {
        const temp = this.scheduleList[index];
        this.scheduleList[index] = this.scheduleList[newIndex];
        this.scheduleList[newIndex] = temp;
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Tạo preview để hiển thị ngay lập tức
        this.previewImage = URL.createObjectURL(file);

        // Lưu file gốc để chuẩn bị upload
        this.selectedFile = file;
      }
    },

    submitForm() {
      // 1. Validate dữ liệu đầu vào
      if (!this.roomForm.roomName || !this.roomForm.adminId) {
        alert("Please enter room name and Admin ID!");
        return;
      }
      if (!this.roomForm.startedAt || !this.roomForm.estimatedEndTime) {
        alert("Please select start and end time!");
        return;
      }

      //time bắt đầu phải nhỏ hơn time kết thúc dự kiến
      const startTime = new Date(this.roomForm.startedAt);
      const endTime = new Date(this.roomForm.estimatedEndTime);

      if (startTime >= endTime) {
        alert("The start time must be shorter than the expected end time!");
        return;
      }
      if (this.scheduleList.length === 0) {
        alert("Please add at least 1 piece to the auction!");
        return;
      }

      this.isSubmitting = true;

      // 2. Tạo biến Promise để xác định link ảnh
      let imageProcessPromise;

      if (this.selectedFile) {
        // TRƯỜNG HỢP A: Có chọn file -> Gọi API Upload
        const formData = new FormData();
        formData.append("imageFile", this.selectedFile);

        console.log("Đang upload ảnh...");

        // Gán promise gọi API upload
        imageProcessPromise = axios
          .post("http://localhost:8081/api/admin/uploads/upload-image", formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            return res.data.data.imageUrl;
          });
      } else {
        // TRƯỜNG HỢP B: Không chọn file -> Lấy ảnh mặc định từ tác phẩm đầu tiên
        let fallbackImage = "";
        if (this.scheduleList.length > 0) {
          fallbackImage = this.scheduleList[0].img || "";
        }
        // Tạo một Promise "giả" đã hoàn thành ngay lập tức với giá trị fallbackImage
        imageProcessPromise = Promise.resolve(fallbackImage);
      }

      //Bắt đầu chuỗi xử lý (Chain)
      imageProcessPromise
        .then((finalImageUrl) => {
          console.log("URL ảnh sẽ lưu:", finalImageUrl);

          // Hàm helper parse số
          const parseNumber = (val) => {
            if (!val) return 0;
            return Number(String(val).replace(/[^0-9]/g, ""));
          };

          // Chuẩn bị payload
          const payload = {
            ...this.roomForm,
            depositAmount: parseNumber(this.roomForm.depositAmount),
            paymentDeadlineDays: Number(this.roomForm.paymentDeadlineDays),
            status: Number(this.roomForm.status),
            imageAuctionRoom: finalImageUrl, // Dùng URL nhận được từ bước trên
            startedAt: this.roomForm.startedAt ? this.roomForm.startedAt + ":00" : null,
            estimatedEndTime: this.roomForm.estimatedEndTime
              ? this.roomForm.estimatedEndTime + ":00"
              : null,
            artworks: this.scheduleList.map((item) => ({
              artworkId: item.id,
              startingPrice: parseNumber(item.startPrice),
              bidStep: 10000,
              duration: 15,
            })),
          };

          console.log("Payload gửi đi:", payload);

          return axios.post(
            "http://localhost:8081/api/admin/auction-rooms/tao-phong-hoan-chinh",
            payload,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
        })
        .then((res) => {
          // Xử lý khi Tạo phòng thành công
          alert("Auction room created successfully!");
          this.$router.push("/admin/management-auction");
        })
        .catch((err) => {
          // Xử lý lỗi (cho cả bước Upload ảnh HOẶC bước Tạo phòng)
          console.error("Error process:", err);
          const message = err.response?.data?.message || "An error occurred!";

          if (err.response?.data?.errors) {
            alert("Data error: " + JSON.stringify(err.response.data.errors));
          } else {
            alert("Failure: " + message);
          }
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
    handleCancel() {
      const hasData = this.roomForm.roomName || this.scheduleList.length > 0;

      if (hasData) {
        // Nếu đã nhập dữ liệu, cần xác nhận để tránh mất data
        if (confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
          this.$router.push("/admin/management-auction");
        }
      } else {
        this.$router.push("/admin/management-auction");
      }
    },

    loadAdminData() {
      axios
        .get(`http://localhost:8081/api/admin/admins/lay-du-lieu`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.admins = res.data;
        })
        .catch((err) => console.error(err));
    },

    formatCurrencyUSD(item) {
      if (!item.startPrice) return;

      let val = parseFloat(String(item.startPrice).replace(/[^0-9.]/g, ""));

      if (isNaN(val)) {
        item.startPrice = "";
        return;
      }

      // Format theo chuẩn US (ví dụ: 1,200.50)
      item.startPrice = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(val);
    },
    // Hàm bỏ format khi người dùng click vào để sửa (sự kiện focus)
    unformatCurrency(item) {
      if (!item.startPrice) return;
      // Chuyển từ "1,200.50" thành "1200.50" để dễ sửa
      item.startPrice = String(item.startPrice).replace(/,/g, "");
    },
  },
};
</script>

<style scoped></style>
