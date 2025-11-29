<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="container-xl">
      <form @submit.prevent="saveChanges">
        <div
          class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4"
        >
          <div class="mb-3 mb-md-0">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb mb-1">
                <li class="breadcrumb-item">
                  <router-link to="/admin/management-auction" class="text-decoration-none"
                    >Auction management</router-link
                  >
                </li>
                <li class="breadcrumb-item active text-muted" aria-current="page">Edit</li>
              </ol>
            </nav>
            <div class="d-flex align-items-center gap-3">
              <h4 class="fw-bold text-primary mb-0">Edit: {{ roomForm.roomName }}</h4>
              <span
                class="badge rounded-pill px-3 py-2 border"
                :class="getStatusBadgeClass(roomForm.status)"
              >
                {{ getStatusLabel(roomForm.status) }}
              </span>
            </div>
          </div>

          <div class="d-flex gap-2">
            <button
              type="button"
              class="btn btn-white border shadow-sm fw-medium text-secondary"
              @click="$router.back()"
            >
              <i class="fa-solid fa-xmark me-2"></i>Cancel
            </button>
            <button class="btn btn-primary shadow-sm fw-bold px-4" @click="saveChanges">
              <i class="fa-solid fa-floppy-disk me-2"></i>Save changes
            </button>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-12 col-lg-8">
            <div class="card border-0 shadow-sm rounded-4 mb-4">
              <div
                class="card-header bg-white border-bottom-0 pt-4 px-4 pb-0 d-flex align-items-center justify-content-between"
              >
                <div class="d-flex align-items-center gap-3">
                  <div
                    class="bg-secondary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 40px; height: 40px"
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </div>
                  <h6 class="fw-bold mb-0 text-uppercase text-secondary">General information</h6>
                </div>
              </div>
              <div class="card-body p-4">
                <div class="row g-3">
                  <div class="col-12 col-md-6">
                    <label class="form-label small fw-bold text-secondary">ROOM NAME</label>
                    <input
                      type="text"
                      class="form-control bg-light border-0 fw-medium"
                      v-model="roomForm.roomName"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label small fw-bold text-secondary">Painting Genre</label>
                    <input
                      type="text"
                      class="form-control bg-light border-0"
                      v-model="roomForm.type"
                    />
                  </div>
                  <div class="col-12">
                    <label class="form-label small fw-bold text-secondary">Description</label>
                    <textarea
                      class="form-control bg-light border-0"
                      rows="3"
                      v-model="roomForm.description"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="card border-0 shadow-sm rounded-4 mb-4">
              <div
                class="card-header bg-white border-bottom-0 pt-4 px-4 pb-0 d-flex flex-wrap align-items-center justify-content-between gap-2"
              >
                <div class="d-flex align-items-center gap-3">
                  <div
                    class="bg-danger bg-opacity-10 text-danger rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 40px; height: 40px"
                  >
                    <i class="fa-solid fa-layer-group"></i>
                  </div>
                  <div>
                    <h6 class="fw-bold mb-0 text-uppercase text-secondary">Auction list</h6>
                    <small class="text-muted">There are 6 {{ scheduleList.length }} works</small>
                  </div>
                </div>

                <button
                  type="button"
                  class="btn btn-sm btn-outline-primary fw-bold"
                  data-bs-toggle="modal"
                  data-bs-target="#addArtworkModal"
                >
                  <i class="fa-solid fa-plus me-1"></i> Add work
                </button>
              </div>

              <div class="card-body p-4">
                <div
                  v-if="scheduleList.length === 0"
                  class="text-center py-5 bg-light rounded-3 border border-dashed"
                >
                  <p class="text-muted mb-0">No works yet.</p>
                </div>

                <div v-else class="d-flex flex-column gap-3">
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
                              <h6
                                class="fw-bold mb-0 text-dark text-truncate"
                                style="max-width: 150px"
                              >
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
                          <div class="row g-2 mt-4">
                            <div class="col-4">
                              <small class="form-label x-small text-secondary mb-0"
                                >Starting price</small
                              >
                              <input
                                type="text"
                                class="form-control form-control-sm border-0 shadow-none"
                                placeholder="50.000đ"
                                v-model="item.startPrice"
                              />
                            </div>
                            <div class="col-4">
                              <small class="form-label x-small text-secondary mb-0"
                                >Price step</small
                              >
                              <input
                                type="text"
                                class="form-control form-control-sm border-0 shadow-none"
                                placeholder="10.000đ"
                                v-model="item.stepPrice"
                              />
                            </div>
                            <div class="col-4">
                              <small class="form-label x-small text-secondary mb-0"
                                >Duration(p)</small
                              >
                              <input
                                type="number"
                                class="form-control form-control-sm border-0 shadow-none"
                                placeholder="15"
                                v-model="item.duration"
                              />
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
          </div>

          <div class="col-12 col-lg-4">
            <div class="card border-0 shadow-sm rounded-4 mb-4">
              <div class="card-body p-4 text-center">
                <label class="form-label small fw-bold text-secondary text-uppercase mb-3"
                  >Auction room cover photo</label
                >

                <div
                  class="position-relative d-inline-block w-100 rounded-3 overflow-hidden border border-2 border-dashed group-hover-image"
                  style="height: 220px; cursor: pointer; background-color: #f8f9fa"
                  @click="$refs.fileInput.click()"
                >
                  <div v-if="previewImage" class="w-100 h-100 position-relative">
                    <img
                      :src="previewImage"
                      class="w-100 h-100 object-fit-cover"
                      alt="Cover Preview"
                    />
                    <div
                      class="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex flex-column align-items-center justify-content-center opacity-0 hover-show transition-base"
                    >
                      <i class="fa-solid fa-camera text-white fs-2 mb-2"></i>
                      <span class="text-white fw-bold small">Change photo</span>
                    </div>

                    <button
                      @click.stop="removeCoverImage"
                      type="button"
                      class="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 m-2 shadow-sm"
                      title="Xóa ảnh"
                    >
                      <i class="fa-solid fa-times"></i>
                    </button>
                  </div>

                  <div
                    v-else
                    class="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-muted"
                  >
                    <div class="mb-3 p-3 bg-white rounded-circle shadow-sm">
                      <i class="fa-solid fa-cloud-arrow-up fs-3 text-primary"></i>
                    </div>
                    <span class="fw-medium small">Click to upload photo</span>
                    <small class="text-secondary opacity-75" style="font-size: 0.7rem"
                      >JPG, PNG, WEBP (Max 5MB)</small
                    >
                  </div>
                </div>

                <input
                  type="file"
                  ref="fileInput"
                  class="d-none"
                  accept="image/*"
                  @change="handleFileUpload"
                />

                <!-- <div class="text-start mt-4">
                  <label class="form-label small fw-bold text-secondary text-uppercase"
                    >Trạng thái phòng</label
                  >
                  <select
                    class="form-select border-0 bg-light fw-bold py-2"
                    v-model="roomForm.status"
                    :class="getStatusColor(roomForm.status)"
                    :disabled="!canEdit"
                  >
                    <option :value="2">Coming Soon (Sắp diễn ra)</option>
                    <option :value="1">Live / Running (Đang chạy)</option>
                    <option :value="0">Finished (Đã kết thúc)</option>
                  </select>
                </div> -->
              </div>
            </div>

            <div class="card border-0 shadow-sm rounded-4 mb-4">
              <div class="card-header bg-white border-bottom-0 pt-4 px-4 pb-0">
                <h6 class="fw-bold mb-0 text-uppercase text-secondary">
                  <i class="fa-regular fa-clock me-2"></i>Time
                </h6>
              </div>
              <div class="card-body p-4">
                <div class="mb-3">
                  <label class="form-label small fw-bold text-secondary">Start</label>
                  <input
                    type="datetime-local"
                    class="form-control bg-light border-0"
                    v-model="roomForm.startedAt"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label small fw-bold text-secondary">EXPECTED END</label>
                  <input
                    type="datetime-local"
                    class="form-control bg-light border-0"
                    v-model="roomForm.stoppedAt"
                  />
                </div>
                <div
                  class="alert alert-info border-0 d-flex align-items-center p-2 mb-0 bg-info-subtle text-info-emphasis"
                >
                  <i class="fa-solid fa-stopwatch fs-4 me-3"></i>
                  <div>
                    <small
                      class="d-block text-uppercase fw-bold opacity-75"
                      style="font-size: 0.7rem"
                      >Total duration of the painting</small
                    >
                    <strong class="fs-5">{{ totalDuration }} minute</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="card border-0 shadow-sm rounded-4 mb-4">
              <div class="card-header bg-white border-bottom-0 pt-4 px-4 pb-0">
                <h6 class="fw-bold mb-0 text-uppercase text-secondary">
                  <i class="fa-solid fa-coins me-2"></i>Finance
                </h6>
              </div>
              <div class="card-body p-4">
                <div class="row g-3">
                  <div class="col-12">
                    <label class="form-label small fw-bold text-secondary">DEPOSIT (VND)</label>
                    <div class="input-group">
                      <span class="input-group-text bg-light border-0 fw-bold text-secondary"
                        >₫</span
                      >
                      <input
                        type="text"
                        class="form-control bg-light border-0 fw-bold"
                        v-model="roomForm.depositAmount"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label class="form-label small fw-bold text-secondary"
                      >PAYMENT DUE (Days)</label
                    >
                    <input
                      type="number"
                      class="form-control bg-light border-0"
                      v-model="roomForm.paymentDeadlineDays"
                    />
                  </div>
                  <div class="col-12">
                    <label class="form-label small fw-bold text-secondary"
                      >ADMIN MANAGEMENT (ID)</label
                    >
                    <input
                      type="text"
                      class="form-control bg-light border-0 text-muted"
                      v-model="roomForm.adminId"
                      readonly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="modal fade" id="addArtworkModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header border-bottom-0">
            <h5 class="modal-title fw-bold text-primary">Select a picture from the warehouse</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body bg-light-subtle">
            <div class="row g-2 mb-3">
              <div class="col-md-4">
                <select class="form-select border-0 shadow-sm" v-model="modalFilterCategory">
                  <option value="">All genres</option>
                  <option value="son-dau">Canvas</option>
                  <option value="chan-dung">Portrait painting</option>
                  <option value="phong-canh">Landscape</option>
                </select>
              </div>
              <div class="col-md-8">
                <div class="input-group border-0 shadow-sm">
                  <span class="input-group-text bg-white border-0"
                    ><i class="fa-solid fa-magnifying-glass text-muted"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control border-0"
                    placeholder="Tìm tên tranh..."
                    v-model="modalSearch"
                  />
                </div>
              </div>
            </div>

            <div class="row g-3">
              <div v-for="art in filteredModalArtworks" :key="art.id" class="col-12 col-md-6">
                <div
                  class="card h-100 border-0 shadow-sm cursor-pointer transition-base"
                  :class="{ 'ring-2 ring-primary': isSelected(art.id) }"
                  @click="toggleSelect(art)"
                >
                  <div class="card-body p-2 d-flex align-items-center gap-3">
                    <img
                      :src="art.img"
                      class="rounded border bg-white"
                      style="width: 60px; height: 60px; object-fit: cover"
                    />
                    <div class="flex-grow-1 overflow-hidden">
                      <h6 class="mb-0 text-truncate fw-bold text-dark fs-6">{{ art.name }}</h6>
                      <small class="text-muted">{{ art.author }}</small>
                      <div class="d-flex align-items-center mt-1">
                        <span class="badge bg-light text-secondary border fw-normal me-2">{{
                          art.category
                        }}</span>
                        <small class="text-primary fw-bold">{{ art.basePrice }}</small>
                      </div>
                    </div>
                    <div v-if="isSelected(art.id)" class="text-primary animate-pulse">
                      <i class="fa-solid fa-circle-check fs-3"></i>
                    </div>
                    <div v-else class="text-secondary opacity-25">
                      <i class="fa-regular fa-circle fs-3"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer border-top-0 bg-white">
            <span class="text-muted me-auto small fw-bold"
              >Selected: {{ selectedArtworksTemp.length }} works</span
            >
            <button type="button" class="btn btn-light fw-bold" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary fw-bold px-4"
              data-bs-dismiss="modal"
              @click="confirmAddArtworks"
              :disabled="selectedArtworksTemp.length === 0"
            >
              Add to room
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditAuctionRoomStatic",
  data() {
    return {
      isEditMode: false,
      roomId: "",
      isLoading: false,
      isSaving: false,

      // Dữ liệu Form
      roomForm: {
        roomName: "",
        type: "",
        description: "",
        adminId: "",
        depositAmount: 0,
        paymentDeadlineDays: 3,
        startedAt: "",
        stoppedAt: "",
        status: 2,
        imageAuctionRoom: "",
      },

      // Danh sách tranh
      scheduleList: [],
      previewImage: null,
      selectedFile: null,
      allArtworks: [],
      modalSearch: "",
      modalFilterCategory: "",
      selectedArtworksTemp: [],
    };
  },

  mounted() {
    if (this.$route.params.id) {
      this.roomId = this.$route.params.id;
      this.isEditMode = true;
      this.loadRoomDetail();
    }
    this.loadAddRoomArt(); // Gọi hàm load tranh
  },

  computed: {
    totalDuration() {
      return this.scheduleList.reduce((sum, item) => sum + (parseInt(item.duration) || 0), 0);
    },
    filteredModalArtworks() {
      return this.allArtworks.filter((art) => {
        // Lọc bỏ tranh đã có trong phòng
        const alreadyInRoom = this.scheduleList.some((item) => item.id === art.id);
        if (alreadyInRoom) return false;

        const matchCat = this.modalFilterCategory
          ? art.category === this.modalFilterCategory
          : true;
        const matchSearch = this.modalSearch
          ? art.name.toLowerCase().includes(this.modalSearch.toLowerCase())
          : true;
        return matchCat && matchSearch;
      });
    },
  },

  methods: {
    // --- 1. Load Chi Tiết Phòng ---
    loadRoomDetail() {
      this.isLoading = true;
      axios
        .get(`http://localhost:8081/api/admin/auction-rooms/${this.roomId}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          const data = res.data;
          console.log("API Chi tiết trả về:", data); // F12 xem dòng này để kiểm chứng

          this.roomForm = {
            roomName: data.roomName,
            type: data.type,
            description: data.description,
            adminId: data.admin ? data.admin.id : "",
            depositAmount: data.depositAmount,
            paymentDeadlineDays: 3,
            status: data.status,
            startedAt: data.startedAt ? data.startedAt.slice(0, 16) : "",
            stoppedAt: data.stoppedAt ? data.stoppedAt.slice(0, 16) : "",

            // Lưu link ảnh gốc để gửi đi khi save
            // Thử lấy tất cả các trường có thể chứa ảnh từ Backend
            imageAuctionRoom: data.imageAuctionRoom || data.artworkImage || data.image || "",
          };

          // --- SỬA LOGIC HIỂN THỊ ẢNH (QUAN TRỌNG) ---

          // 1. Ưu tiên: Ảnh bìa phòng (imageAuctionRoom)
          if (data.imageAuctionRoom && data.imageAuctionRoom.trim() !== "") {
            this.previewImage = data.imageAuctionRoom;
          }
          // 2. Ưu tiên nhì: Trường artworkImage (Khả năng cao cái ảnh tím nằm ở đây)
          else if (data.artworkImage && data.artworkImage.trim() !== "") {
            this.previewImage = data.artworkImage;
          }
          // 3. Ưu tiên ba: Trường image (tên chung chung)
          else if (data.image && data.image.trim() !== "") {
            this.previewImage = data.image;
          }
          // 4. Đường cùng: Mới lấy ảnh tác phẩm đầu tiên (Cây nến)
          else if (data.artworks && data.artworks.length > 0) {
            this.previewImage = data.artworks[0].avtArtwork;
          } else {
            this.previewImage = null;
          }

          // Map danh sách tác phẩm
          if (data.artworks && data.artworks.length > 0) {
            this.scheduleList = data.artworks.map((item) => ({
              id: item.artworkId,
              name: item.artworkName,
              author: item.author,
              img: item.avtArtwork,
              startPrice: item.startingPrice,
              stepPrice: item.bidStep,
              duration: item.duration || 15,
              type: item.paintingGenre,
              size: item.size,
              sessionId: item.sessionId,
            }));
          }
        })
        .catch((err) => console.error(err))
        .finally(() => (this.isLoading = false));
    },

    // Xử lý khi người dùng chọn file mới
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Validate loại file (tùy chọn)
        if (!file.type.match("image.*")) {
          alert("Vui lòng chọn file hình ảnh!");
          return;
        }

        // Validate kích thước (ví dụ 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert("Dung lượng ảnh không được quá 5MB");
          return;
        }

        // Lưu file vào biến để gửi đi sau này
        this.selectedFile = file;

        // Tạo URL preview ngay lập tức
        this.previewImage = URL.createObjectURL(file);

        // Reset input để có thể chọn lại cùng 1 file nếu muốn
        event.target.value = null;
      }
    },

    removeCoverImage() {
      this.previewImage = null;
      this.selectedFile = null;
      this.roomForm.imageAuctionRoom = "";
    },

    // --- 2. Load Danh Sách Tranh Cho Modal ---
    loadAddRoomArt() {
      axios
        .get("http://localhost:8081/api/admin/auction-rooms/artworks", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.allArtworks = res.data.map((item) => ({
            id: item.id,
            name: item.title,
            author: item.author,
            category: this.mapCategory(item.paintingGenre, item.material),
            img: item.avtArtwork,
            basePrice: item.startedPrice,
          }));
        })
        .catch((err) => console.error(err));
    },

    // --- 3. Logic Lưu (Update) ---
    saveChanges() {
      if (!this.roomForm.roomName || !this.roomForm.adminId)
        return alert("Thiếu tên phòng hoặc Admin ID!");
      if (this.scheduleList.length === 0) return alert("Cần ít nhất 1 tác phẩm!");

      this.isSaving = true;
      const parseNum = (v) => Number(String(v).replace(/[^0-9]/g, ""));

      const payload = {
        ...this.roomForm,
        depositAmount: parseNum(this.roomForm.depositAmount),
        startedAt:
          this.roomForm.startedAt.length === 16
            ? this.roomForm.startedAt + ":00"
            : this.roomForm.startedAt,
        stoppedAt:
          this.roomForm.stoppedAt.length === 16
            ? this.roomForm.stoppedAt + ":00"
            : this.roomForm.stoppedAt,
        artworks: this.scheduleList.map((item) => ({
          artworkId: item.id,
          startingPrice: parseNum(item.startPrice),
          bidStep: parseNum(item.stepPrice),
          duration: Number(item.duration) || 15,
        })),
      };

      if (this.isEditMode) {
        axios
          .put(`http://localhost:8081/api/admin/auction-rooms/cap-nhat/${this.roomId}`, payload, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then(() => {
            alert("Đã cập nhật phòng thành công!");
            this.$router.push("/admin/management-auction");
          })
          .catch((err) => {
            console.error(err);
            alert("Cập nhật thất bại: " + (err.response?.data?.message || "Lỗi hệ thống"));
          })
          .finally(() => (this.isSaving = false));
      }
    },

    // --- 4. Logic Modal Chọn Tranh ---
    toggleSelect(art) {
      const idx = this.selectedArtworksTemp.findIndex((x) => x.id === art.id);
      if (idx > -1) this.selectedArtworksTemp.splice(idx, 1);
      else this.selectedArtworksTemp.push(art);
    },
    isSelected(id) {
      return this.selectedArtworksTemp.some((x) => x.id === id);
    },
    confirmAddArtworks() {
      this.selectedArtworksTemp.forEach((art) => {
        this.scheduleList.push({
          id: art.id,
          name: art.name,
          author: art.author,
          img: art.img,
          startPrice: art.basePrice,
          stepPrice: 100000,
          duration: 15,
          type: art.paintingGenre,
        });
      });
      // Nếu chưa có ảnh bìa thì lấy ảnh đầu tiên
      if (!this.previewImage && this.scheduleList.length > 0) {
        this.previewImage = this.scheduleList[0].img;
      }
      this.selectedArtworksTemp = [];
    },

    // --- 5. Tiện ích ---
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
    mapCategory(genre, material) {
      if (!genre) return "phong-canh";
      const g = genre.toLowerCase();
      if (g.includes("portrait")) return "chan-dung";
      if (g.includes("landscape")) return "phong-canh";
      return "son-dau";
    },
    formatCurrency(value) {
      if (!value) return "0 ₫";
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    },
    getStatusBadgeClass(status) {
      switch (status) {
        case 1:
          return "bg-danger-subtle text-danger border-danger-subtle";
        case 2:
          return "bg-warning-subtle text-warning-emphasis border-warning-subtle";
        case 0:
          return "bg-secondary-subtle text-secondary border-secondary-subtle";
        default:
          return "bg-light text-dark";
      }
    },
    getStatusLabel(status) {
      switch (status) {
        case 1:
          return "Live Now";
        case 2:
          return "Coming Soon";
        case 0:
          return "Finished";
        default:
          return "Unknown";
      }
    },
    getStatusColor(status) {
      if (status === 1) return "text-danger";
      if (status === 2) return "text-warning-emphasis";
      return "text-secondary";
    },
  },
};
</script>

<style scoped>
/* Custom Style */
.transition-base {
  transition: all 0.2s ease-in-out;
}
.hover-shadow:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05) !important;
}
.cursor-pointer {
  cursor: pointer;
}
.ring-2 {
  box-shadow: 0 0 0 2px var(--bs-primary);
}
</style>
