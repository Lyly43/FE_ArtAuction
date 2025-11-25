<!-- <template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div
      v-if="isLoading"
      class="d-flex flex-column align-items-center justify-content-center py-5"
      style="min-height: 400px"
    >
      <div
        class="spinner-border text-primary"
        role="status"
        style="width: 3rem; height: 3rem"
      ></div>
      <p class="mt-3 text-secondary fw-medium">Đang tải dữ liệu phòng đấu giá...</p>
    </div>

    <div v-else class="container-xl">
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4"
      >
        <div class="mb-3 mb-md-0">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item">
                <router-link to="/admin/auction-management" class="text-decoration-none"
                  >Quản lý đấu giá</router-link
                >
              </li>
              <li class="breadcrumb-item active text-muted" aria-current="page">Chỉnh sửa</li>
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
            class="btn btn-white border shadow-sm fw-medium text-secondary"
            @click="$router.back()"
          >
            <i class="fa-solid fa-xmark me-2"></i>Hủy bỏ
          </button>
          <button
            class="btn btn-primary shadow-sm fw-bold px-4"
            @click="saveChanges"
            :disabled="isSaving"
          >
            <span v-if="isSaving" class="spinner-border spinner-border-sm me-2"></span>
            <i v-else class="fa-solid fa-floppy-disk me-2"></i>Lưu thay đổi
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
                  class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center"
                  style="width: 40px; height: 40px"
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </div>
                <h6 class="fw-bold mb-0 text-uppercase text-secondary">Thông tin chung</h6>
              </div>
            </div>
            <div class="card-body p-4">
              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <label class="form-label small fw-bold text-secondary">TÊN PHÒNG</label>
                  <input
                    type="text"
                    class="form-control bg-light border-0 fw-medium"
                    v-model="roomForm.roomName"
                    placeholder="Nhập tên phòng..."
                  />
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label small fw-bold text-secondary">LOẠI HÌNH / CHỦ ĐỀ</label>
                  <input
                    type="text"
                    class="form-control bg-light border-0"
                    v-model="roomForm.type"
                    placeholder="VD: Tranh sơn dầu"
                  />
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold text-secondary">MÔ TẢ</label>
                  <textarea
                    class="form-control bg-light border-0"
                    rows="3"
                    v-model="roomForm.description"
                    placeholder="Mô tả chi tiết về phiên đấu giá..."
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
                  <h6 class="fw-bold mb-0 text-uppercase text-secondary">Danh sách đấu giá</h6>
                  <small class="text-muted">Đang có {{ scheduleList.length }} tác phẩm</small>
                </div>
              </div>

              <button
                class="btn btn-sm btn-outline-primary fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#addArtworkModal"
              >
                <i class="fa-solid fa-plus me-1"></i> Thêm tác phẩm
              </button>
            </div>

            <div class="card-body p-4">
              <div
                v-if="scheduleList.length === 0"
                class="text-center py-5 bg-light rounded-3 border border-dashed"
              >
                <p class="text-muted mb-0">Chưa có tác phẩm nào trong phòng này.</p>
              </div>

              <div v-else class="d-flex flex-column gap-3">
                <div
                  v-for="(item, index) in scheduleList"
                  :key="item.id"
                  class="card border border-light-subtle shadow-sm transition-base hover-shadow"
                >
                  <div class="card-body p-3">
                    <div class="row align-items-center g-3">
                      <div class="col-12 col-md-5 d-flex align-items-center gap-3">
                        <div
                          class="d-flex flex-column align-items-center gap-1 text-secondary opacity-50 handle"
                          style="cursor: grab"
                        >
                          <span class="badge bg-light text-secondary border">#{{ index + 1 }}</span>
                        </div>
                        <img
                          :src="item.img || '/src/assets/img/placeholder.png'"
                          class="rounded-3 border object-fit-cover bg-white"
                          style="width: 64px; height: 64px"
                        />
                        <div class="overflow-hidden">
                          <h6
                            class="fw-bold text-truncate mb-1 text-dark"
                            style="max-width: 180px"
                            :title="item.name"
                          >
                            {{ item.name }}
                          </h6>
                          <small class="text-muted d-block">{{ item.author }}</small>
                        </div>
                      </div>

                      <div class="col-12 col-md-5">
                        <div class="row g-2">
                          <div class="col-4">
                            <label
                              class="x-small fw-bold text-secondary mb-0"
                              style="font-size: 0.7rem"
                              >KHỞI ĐIỂM</label
                            >
                            <input
                              type="text"
                              class="form-control form-control-sm bg-light border-0 fw-bold text-primary"
                              v-model="item.startPrice"
                            />
                          </div>
                          <div class="col-4">
                            <label
                              class="x-small fw-bold text-secondary mb-0"
                              style="font-size: 0.7rem"
                              >BƯỚC GIÁ</label
                            >
                            <input
                              type="text"
                              class="form-control form-control-sm bg-light border-0"
                              v-model="item.stepPrice"
                            />
                          </div>
                          <div class="col-4">
                            <label
                              class="x-small fw-bold text-secondary mb-0"
                              style="font-size: 0.7rem"
                              >PHÚT</label
                            >
                            <input
                              type="number"
                              class="form-control form-control-sm bg-light border-0"
                              v-model="item.duration"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-12 col-md-2 text-end">
                        <div class="dropdown">
                          <button
                            class="btn btn-light btn-sm rounded-circle shadow-sm"
                            type="button"
                            data-bs-toggle="dropdown"
                          >
                            <i class="fa-solid fa-ellipsis-vertical text-secondary"></i>
                          </button>
                          <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                            <li>
                              <a
                                class="dropdown-item text-danger fw-medium"
                                href="#"
                                @click.prevent="removeFromSchedule(index)"
                                ><i class="fa-regular fa-trash-can me-2"></i>Xóa bỏ</a
                              >
                            </li>
                            <li><hr class="dropdown-divider" /></li>
                            <li>
                              <a
                                class="dropdown-item"
                                href="#"
                                @click.prevent="moveItem(index, -1)"
                                :class="{ disabled: index === 0 }"
                                ><i class="fa-solid fa-arrow-up me-2"></i>Lên trên</a
                              >
                            </li>
                            <li>
                              <a
                                class="dropdown-item"
                                href="#"
                                @click.prevent="moveItem(index, 1)"
                                :class="{ disabled: index === scheduleList.length - 1 }"
                                ><i class="fa-solid fa-arrow-down me-2"></i>Xuống dưới</a
                              >
                            </li>
                          </ul>
                        </div>
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
              <div class="position-relative mb-3 d-inline-block w-100">
                <img
                  :src="coverImage || '/src/assets/img/4.png'"
                  class="rounded-3 shadow-sm border object-fit-cover bg-light"
                  style="width: 100%; height: 200px"
                />
                <div class="position-absolute bottom-0 start-0 m-2 badge bg-dark bg-opacity-75">
                  Cover Image
                </div>
              </div>

              <div class="text-start mt-3">
                <label class="form-label small fw-bold text-secondary">TRẠNG THÁI PHÒNG</label>
                <select
                  class="form-select border-0 bg-light fw-bold"
                  v-model="roomForm.status"
                  :class="getStatusColor(roomForm.status)"
                >
                  <option :value="2">Coming Soon (Sắp diễn ra)</option>
                  <option :value="1">Live / Running (Đang chạy)</option>
                  <option :value="0">Finished (Đã kết thúc)</option>
                </select>
              </div>
            </div>
          </div>

          <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-header bg-white border-bottom-0 pt-4 px-4 pb-0">
              <h6 class="fw-bold mb-0 text-uppercase text-secondary">
                <i class="fa-regular fa-clock me-2"></i>Thời gian
              </h6>
            </div>
            <div class="card-body p-4">
              <div class="mb-3">
                <label class="form-label small fw-bold text-secondary">BẮT ĐẦU (Start)</label>
                <input
                  type="datetime-local"
                  class="form-control bg-light border-0"
                  v-model="roomForm.startedAt"
                />
              </div>
              <div class="mb-3">
                <label class="form-label small fw-bold text-secondary"
                  >KẾT THÚC DỰ KIẾN (End)</label
                >
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
                  <small class="d-block text-uppercase fw-bold opacity-75" style="font-size: 0.7rem"
                    >Tổng thời lượng tranh</small
                  >
                  <strong class="fs-5">{{ totalDuration }} phút</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-header bg-white border-bottom-0 pt-4 px-4 pb-0">
              <h6 class="fw-bold mb-0 text-uppercase text-secondary">
                <i class="fa-solid fa-coins me-2"></i>Tài chính
              </h6>
            </div>
            <div class="card-body p-4">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label small fw-bold text-secondary">TIỀN CỌC (VND)</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-0 fw-bold text-secondary">₫</span>
                    <input
                      type="text"
                      class="form-control bg-light border-0 fw-bold"
                      v-model="roomForm.depositAmount"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold text-secondary"
                    >HẠN THANH TOÁN (Ngày)</label
                  >
                  <input
                    type="number"
                    class="form-control bg-light border-0"
                    v-model="roomForm.paymentDeadlineDays"
                  />
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold text-secondary">ADMIN QUẢN LÝ (ID)</label>
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
    </div>

    <div class="modal fade" id="addArtworkModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header border-bottom-0">
            <h5 class="modal-title fw-bold text-primary">Chọn tranh từ kho</h5>
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
                  <option value="">Tất cả thể loại</option>
                  <option value="son-dau">Sơn dầu / Canvas</option>
                  <option value="chan-dung">Chân dung</option>
                  <option value="phong-canh">Phong cảnh</option>
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
                        <small class="text-primary fw-bold">{{
                          formatCurrency(art.basePrice)
                        }}</small>
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
              <div v-if="filteredModalArtworks.length === 0" class="col-12 text-center py-4">
                <p class="text-muted">Không tìm thấy tranh phù hợp hoặc đã được thêm hết.</p>
              </div>
            </div>
          </div>
          <div class="modal-footer border-top-0 bg-white">
            <span class="text-muted me-auto small fw-bold"
              >Đã chọn: {{ selectedArtworksTemp.length }} tác phẩm</span
            >
            <button type="button" class="btn btn-light fw-bold" data-bs-dismiss="modal">
              Đóng
            </button>
            <button
              type="button"
              class="btn btn-primary fw-bold px-4"
              data-bs-dismiss="modal"
              @click="confirmAddArtworks"
              :disabled="selectedArtworksTemp.length === 0"
            >
              Thêm vào phòng
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
  name: "EditAuctionRoom",
  data() {
    return {
      roomId: null,
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
      },

      scheduleList: [], // Danh sách tác phẩm hiện tại
      coverImage: null,

      // Modal Data
      allArtworks: [],
      modalSearch: "",
      modalFilterCategory: "",
      selectedArtworksTemp: [],
    };
  },

  created() {
    // 1. Lấy ID từ URL
    this.roomId = this.$route.params.id;
  },

  mounted() {
    if (this.roomId) {
      this.loadRoomData();
    } else {
      alert("Lỗi: Không tìm thấy ID phòng!");
      this.$router.push("/admin/auction-management");
    }
    this.loadAvailableArtworks();
  },

  computed: {
    totalDuration() {
      return this.scheduleList.reduce((sum, item) => sum + (parseInt(item.duration) || 0), 0);
    },
    filteredModalArtworks() {
      return this.allArtworks.filter((art) => {
        // Lọc bỏ những tranh đã có trong phòng
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
    // --- API: LẤY CHI TIẾT PHÒNG ---
    loadRoomData() {
      this.isLoading = true;
      axios
        .get(`http://localhost:8081/api/admin/auction-rooms/lay-du-lieu/${this.roomId}`, {
          // Lưu ý đường dẫn API có thể khác tùy backend của bạn
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          const data = res.data;
          console.log("Dữ liệu chi tiết phòng:", data);

          // 1. Map dữ liệu vào Form
          this.roomForm = {
            roomName: data.roomName,
            type: data.type,
            description: data.description,
            adminId: data.adminId || "ADMIN",
            depositAmount: data.depositAmount,
            paymentDeadlineDays: data.paymentDeadlineDays,
            status: data.status,
            // Cắt chuỗi ngày tháng để vừa với input datetime-local (yyyy-MM-ddThh:mm)
            startedAt: data.startedAt ? data.startedAt.slice(0, 16) : "",
            stoppedAt: data.stoppedAt ? data.stoppedAt.slice(0, 16) : "",
          };

          // 2. Map dữ liệu danh sách tranh (Lưu ý: kiểm tra tên trường auctionItems/artworks từ backend)
          // Giả sử backend trả về 1 list tên là 'auctionItems'
          const items = data.auctionItems || [];

          this.scheduleList = items.map((item) => ({
            id: item.artworkId || item.id, // ID tác phẩm gốc
            name: item.artworkName || item.title,
            author: item.authorName || item.author,
            img: item.image || item.avtArtwork,

            // Thông tin đấu giá
            startPrice: item.startingPrice || item.startPrice,
            stepPrice: item.stepPrice,
            duration: item.duration,
          }));

          // 3. Set Cover Image
          if (this.scheduleList.length > 0) {
            this.coverImage = this.scheduleList[0].img;
          }
        })
        .catch((err) => {
          console.error("Lỗi tải phòng:", err);
          // alert("Không thể tải dữ liệu phòng. Vui lòng thử lại.");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    // --- API: LẤY TRANH TRONG KHO (CHO MODAL) ---
    loadAvailableArtworks() {
      axios
        .get("http://localhost:8081/api/admin/auction-rooms/artworks", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.allArtworks = res.data.map((item) => ({
            id: item.id,
            name: item.title,
            author: item.author,
            category: this.mapCategory(item.paintingGenre), // Helper map category
            img: item.avtArtwork,
            basePrice: item.startedPrice,
          }));
        })
        .catch((err) => console.error(err));
    },

    // --- API: LƯU THAY ĐỔI (PUT) ---
    saveChanges() {
      if (!this.roomForm.roomName) return alert("Vui lòng nhập tên phòng!");

      this.isSaving = true;

      // Payload gửi đi
      const payload = {
        ...this.roomForm,
        // Convert ngày tháng về chuẩn ISO nếu cần (hoặc giữ nguyên nếu backend chấp nhận)
        // Mapping lại list tranh để gửi về backend
        auctionItems: this.scheduleList.map((item) => ({
          artworkId: item.id,
          startingPrice: item.startPrice,
          stepPrice: item.stepPrice,
          duration: item.duration,
        })),
      };

      console.log("Payload gửi đi:", payload);

      axios
        .put(`http://localhost:8081/api/admin/auction-rooms/cap-nhat/${this.roomId}`, payload, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then(() => {
          alert("Cập nhật thành công!");
          this.loadRoomData(); // Load lại để đồng bộ
        })
        .catch((err) => {
          console.error("Lỗi update:", err);
          const msg = err.response?.data?.message || "Có lỗi xảy ra!";
          alert(msg);
        })
        .finally(() => {
          this.isSaving = false;
        });
    },

    // --- LOGIC GIAO DIỆN ---
    removeFromSchedule(index) {
      if (confirm("Bạn có chắc muốn xóa tranh này khỏi phòng?")) {
        this.scheduleList.splice(index, 1);
        // Cập nhật lại ảnh bìa nếu xóa mất ảnh đầu tiên
        if (this.scheduleList.length > 0) this.coverImage = this.scheduleList[0].img;
        else this.coverImage = null;
      }
    },

    moveItem(index, direction) {
      const newIndex = index + direction;
      if (newIndex >= 0 && newIndex < this.scheduleList.length) {
        const temp = this.scheduleList[index];
        this.scheduleList[index] = this.scheduleList[newIndex];
        this.scheduleList[newIndex] = temp;
        // Cập nhật lại ảnh bìa nếu vị trí đầu tiên thay đổi
        this.coverImage = this.scheduleList[0].img;
      }
    },

    // Modal helpers
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
          stepPrice: "100000", // Default logic
          duration: 10, // Default logic
        });
      });
      if (this.scheduleList.length > 0 && !this.coverImage) {
        this.coverImage = this.scheduleList[0].img;
      }
      this.selectedArtworksTemp = [];
    },

    // Utilities
    mapCategory(genre) {
      if (!genre) return "other";
      const g = genre.toLowerCase();
      if (g.includes("portrait")) return "chan-dung";
      if (g.includes("landscape")) return "phong-canh";
      return "son-dau";
    },
    formatCurrency(value) {
      if (!value) return "0đ";
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    },

    // Status Badges
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
</style> -->

<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="container-xl">
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4"
      >
        <div class="mb-3 mb-md-0">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item">
                <a href="#" class="text-decoration-none">Quản lý đấu giá</a>
              </li>
              <li class="breadcrumb-item active text-muted" aria-current="page">Chỉnh sửa</li>
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
            class="btn btn-white border shadow-sm fw-medium text-secondary"
            @click="$router.back()"
          >
            <i class="fa-solid fa-xmark me-2"></i>Hủy bỏ
          </button>
          <button class="btn btn-primary shadow-sm fw-bold px-4" @click="saveChanges">
            <i class="fa-solid fa-floppy-disk me-2"></i>Lưu thay đổi
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
                <h6 class="fw-bold mb-0 text-uppercase text-secondary">Thông tin chung</h6>
              </div>
            </div>
            <div class="card-body p-4">
              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <label class="form-label small fw-bold text-secondary">TÊN PHÒNG</label>
                  <input
                    type="text"
                    class="form-control bg-light border-0 fw-medium"
                    v-model="roomForm.roomName"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label small fw-bold text-secondary">LOẠI HÌNH / CHỦ ĐỀ</label>
                  <input
                    type="text"
                    class="form-control bg-light border-0"
                    v-model="roomForm.type"
                  />
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold text-secondary">MÔ TẢ</label>
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
                  <h6 class="fw-bold mb-0 text-uppercase text-secondary">Danh sách đấu giá</h6>
                  <small class="text-muted">Đang có {{ scheduleList.length }} tác phẩm</small>
                </div>
              </div>

              <button
                class="btn btn-sm btn-outline-primary fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#addArtworkModal"
              >
                <i class="fa-solid fa-plus me-1"></i> Thêm tác phẩm
              </button>
            </div>

            <div class="card-body p-4">
              <div
                v-if="scheduleList.length === 0"
                class="text-center py-5 bg-light rounded-3 border border-dashed"
              >
                <p class="text-muted mb-0">Chưa có tác phẩm nào.</p>
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
                        <div class="row g-2">
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
                            <small class="form-label x-small text-secondary mb-0">Price step</small>
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
              <div class="position-relative mb-3 d-inline-block w-100">
                <img
                  :src="coverImage"
                  class="rounded-3 shadow-sm border object-fit-cover bg-light"
                  style="width: 100%; height: 200px"
                />
                <div class="position-absolute bottom-0 start-0 m-2 badge bg-dark bg-opacity-75">
                  Cover Image
                </div>
              </div>

              <div class="text-start mt-3">
                <label class="form-label small fw-bold text-secondary">TRẠNG THÁI PHÒNG</label>
                <select
                  class="form-select border-0 bg-light fw-bold"
                  v-model="roomForm.status"
                  :class="getStatusColor(roomForm.status)"
                >
                  <option :value="2">Coming Soon (Sắp diễn ra)</option>
                  <option :value="1">Live / Running (Đang chạy)</option>
                  <option :value="0">Finished (Đã kết thúc)</option>
                </select>
              </div>
            </div>
          </div>

          <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-header bg-white border-bottom-0 pt-4 px-4 pb-0">
              <h6 class="fw-bold mb-0 text-uppercase text-secondary">
                <i class="fa-regular fa-clock me-2"></i>Thời gian
              </h6>
            </div>
            <div class="card-body p-4">
              <div class="mb-3">
                <label class="form-label small fw-bold text-secondary">BẮT ĐẦU (Start)</label>
                <input
                  type="datetime-local"
                  class="form-control bg-light border-0"
                  v-model="roomForm.startedAt"
                />
              </div>
              <div class="mb-3">
                <label class="form-label small fw-bold text-secondary"
                  >KẾT THÚC DỰ KIẾN (End)</label
                >
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
                  <small class="d-block text-uppercase fw-bold opacity-75" style="font-size: 0.7rem"
                    >Tổng thời lượng tranh</small
                  >
                  <strong class="fs-5">{{ totalDuration }} phút</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="card border-0 shadow-sm rounded-4 mb-4">
            <div class="card-header bg-white border-bottom-0 pt-4 px-4 pb-0">
              <h6 class="fw-bold mb-0 text-uppercase text-secondary">
                <i class="fa-solid fa-coins me-2"></i>Tài chính
              </h6>
            </div>
            <div class="card-body p-4">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label small fw-bold text-secondary">TIỀN CỌC (VND)</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-0 fw-bold text-secondary">₫</span>
                    <input
                      type="text"
                      class="form-control bg-light border-0 fw-bold"
                      v-model="roomForm.depositAmount"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold text-secondary"
                    >HẠN THANH TOÁN (Ngày)</label
                  >
                  <input
                    type="number"
                    class="form-control bg-light border-0"
                    v-model="roomForm.paymentDeadlineDays"
                  />
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold text-secondary">ADMIN QUẢN LÝ (ID)</label>
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
    </div>

    <div class="modal fade" id="addArtworkModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header border-bottom-0">
            <h5 class="modal-title fw-bold text-primary">Chọn tranh từ kho</h5>
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
                  <option value="">Tất cả thể loại</option>
                  <option value="son-dau">Sơn dầu / Canvas</option>
                  <option value="chan-dung">Chân dung</option>
                  <option value="phong-canh">Phong cảnh</option>
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
              >Đã chọn: {{ selectedArtworksTemp.length }} tác phẩm</span
            >
            <button type="button" class="btn btn-light fw-bold" data-bs-dismiss="modal">
              Đóng
            </button>
            <button
              type="button"
              class="btn btn-primary fw-bold px-4"
              data-bs-dismiss="modal"
              @click="confirmAddArtworks"
              :disabled="selectedArtworksTemp.length === 0"
            >
              Thêm vào phòng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditAuctionRoomStatic",
  data() {
    return {
      // --- DỮ LIỆU GIẢ LẬP (MOCK DATA) ---
      roomForm: {
        roomName: "Phiên đấu giá Mùa Thu 2024",
        type: "Tranh Sơn Dầu",
        description:
          "Bộ sưu tập đặc biệt từ các họa sĩ trẻ tài năng, bao gồm các tác phẩm phong cảnh và chân dung đương đại.",
        adminId: "ADMIN_001",
        depositAmount: "200.000",
        paymentDeadlineDays: 3,
        startedAt: "2024-11-25T09:00",
        stoppedAt: "2024-11-25T12:00",
        status: 2, // 2: Coming soon
      },

      // Danh sách tranh ĐANG có trong phòng (Giả lập)
      scheduleList: [
        {
          id: 101,
          name: "Chiều tím",
          author: "Nguyễn Văn A",
          img: "https://picsum.photos/id/10/200/200",
          startPrice: "5.000.000",
          stepPrice: "500.000",
          duration: 15,
        },
        {
          id: 102,
          name: "Phố cổ",
          author: "Trần Văn B",
          img: "https://picsum.photos/id/15/200/200",
          startPrice: "8.000.000",
          stepPrice: "1.000.000",
          duration: 10,
        },
        {
          id: 103,
          name: "Thiếu nữ",
          author: "Lê Thị C",
          img: "https://picsum.photos/id/20/200/200",
          startPrice: "12.000.000",
          stepPrice: "500.000",
          duration: 20,
        },
      ],

      // Danh sách tất cả tranh trong kho (Dùng cho Modal thêm mới)
      allArtworks: [
        {
          id: 201,
          name: "Hoàng hôn biển",
          author: "Phạm D",
          category: "phong-canh",
          basePrice: "6.000.000",
          img: "https://picsum.photos/id/25/200/200",
        },
        {
          id: 202,
          name: "Tĩnh vật hoa",
          author: "Vũ E",
          category: "son-dau",
          basePrice: "3.500.000",
          img: "https://picsum.photos/id/30/200/200",
        },
        {
          id: 203,
          name: "Chân dung tự họa",
          author: "Ngô F",
          category: "chan-dung",
          basePrice: "15.000.000",
          img: "https://picsum.photos/id/35/200/200",
        },
        {
          id: 204,
          name: "Rừng thông",
          author: "Đỗ G",
          category: "phong-canh",
          basePrice: "9.000.000",
          img: "https://picsum.photos/id/40/200/200",
        },
        {
          id: 205,
          name: "Trừu tượng 1",
          author: "Lý H",
          category: "son-dau",
          basePrice: "20.000.000",
          img: "https://picsum.photos/id/45/200/200",
        },
      ],

      coverImage: "https://picsum.photos/id/10/400/200", // Lấy ảnh đầu tiên làm cover mặc định
      modalSearch: "",
      modalFilterCategory: "",
      selectedArtworksTemp: [],
    };
  },

  computed: {
    totalDuration() {
      return this.scheduleList.reduce((sum, item) => sum + (parseInt(item.duration) || 0), 0);
    },
    // Filter cho Modal
    filteredModalArtworks() {
      return this.allArtworks.filter((art) => {
        // Lọc bỏ những tranh đã có trong phòng
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
    saveChanges() {
      console.log("Dữ liệu đã lưu (Giả lập):", this.roomForm, this.scheduleList);
      alert("Đã lưu thông tin phòng đấu giá thành công!");
    },

    // --- CÁC HÀM LOGIC GIAO DIỆN (KHÔNG GỌI API) ---
    // removeFromSchedule(index) {
    //   if (confirm("Bạn có chắc muốn xóa tranh này khỏi phòng?")) {
    //     this.scheduleList.splice(index, 1);
    //     // Cập nhật lại ảnh bìa
    //     if (this.scheduleList.length > 0) this.coverImage = this.scheduleList[0].img;
    //   }
    // },
    removeFromSchedule(index) {
      this.scheduleList.splice(index, 1);
    },

    // moveItem(index, direction) {
    //   const newIndex = index + direction;
    //   if (newIndex >= 0 && newIndex < this.scheduleList.length) {
    //     const temp = this.scheduleList[index];
    //     this.scheduleList[index] = this.scheduleList[newIndex];
    //     this.scheduleList[newIndex] = temp;
    //     // Update cover
    //     this.coverImage = this.scheduleList[0].img;
    //   }
    // },
    moveItem(index, direction) {
      const newIndex = index + direction;
      if (newIndex >= 0 && newIndex < this.scheduleList.length) {
        const temp = this.scheduleList[index];
        this.scheduleList[index] = this.scheduleList[newIndex];
        this.scheduleList[newIndex] = temp;
      }
    },

    // Logic Modal
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
          stepPrice: "100.000", // Mặc định
          duration: 10, // Mặc định
        });
      });
      if (this.scheduleList.length > 0) this.coverImage = this.scheduleList[0].img;
      this.selectedArtworksTemp = [];
    },

    // Helpers
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
