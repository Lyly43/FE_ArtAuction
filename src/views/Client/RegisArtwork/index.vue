<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <div class="card shadow-lg border-0">
          <div class="card-header bg-success text-white py-4">
            <h3 class="mb-0 text-center">
              <i class="fas fa-palette me-2"></i>
              Đăng ký tác phẩm tham gia đấu giá
            </h3>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="submitArtwork">
              <div class="row">
                <!-- Left Column -->
                <div class="col-lg-6">
                  <!-- Title -->
                  <div class="mb-3">
                    <label class="form-label fw-bold">
                      Tên tác phẩm <span class="text-danger">*</span>
                    </label>
                    <input
                      v-model="formData.title"
                      type="text"
                      class="form-control"
                      :class="{'is-invalid': errors.title}"
                      placeholder="Nhập tên tác phẩm"
                      required
                    />
                    <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
                  </div>

                  <!-- Description -->
                  <div class="mb-3">
                    <label class="form-label fw-bold">
                      Mô tả <span class="text-danger">*</span>
                    </label>
                    <textarea
                      v-model="formData.description"
                      class="form-control"
                      :class="{'is-invalid': errors.description}"
                      rows="4"
                      placeholder="Mô tả chi tiết về tác phẩm"
                      required
                    ></textarea>
                    <div v-if="errors.description" class="invalid-feedback">{{ errors.description }}</div>
                  </div>

                  <!-- Starting Price -->
                  <div class="mb-3">
                    <label class="form-label fw-bold">
                      Giá khởi điểm (VND) <span class="text-danger">*</span>
                    </label>
                    <input
                      v-model.number="formData.startedPrice"
                      type="number"
                      class="form-control"
                      :class="{'is-invalid': errors.startedPrice}"
                      placeholder="Nhập giá khởi điểm"
                      min="0"
                      step="1000"
                      required
                    />
                    <div v-if="errors.startedPrice" class="invalid-feedback">{{ errors.startedPrice }}</div>
                    <small class="text-muted">
                      Giá: {{ formatCurrency(formData.startedPrice) }}
                    </small>
                  </div>

                  <!-- Year of Creation -->
                  <div class="mb-3">
                    <label class="form-label fw-bold">
                      Năm sáng tác <span class="text-danger">*</span>
                    </label>
                    <input
                      v-model.number="formData.yearOfCreation"
                      type="number"
                      class="form-control"
                      :class="{'is-invalid': errors.yearOfCreation}"
                      placeholder="Nhập năm sáng tác"
                      :min="1900"
                      :max="currentYear"
                      required
                    />
                    <div v-if="errors.yearOfCreation" class="invalid-feedback">{{ errors.yearOfCreation }}</div>
                  </div>
                </div>

                <!-- Right Column -->
                <div class="col-lg-6">
                  <!-- Painting Genre -->
                  <div class="mb-3">
                    <label class="form-label fw-bold">
                      Thể loại <span class="text-danger">*</span>
                    </label>
                    <select
                      v-model="formData.paintingGenre"
                      class="form-select"
                      :class="{'is-invalid': errors.paintingGenre}"
                      required
                    >
                      <option value="">-- Chọn thể loại --</option>
                      <option value="Landscape">Phong cảnh (Landscape)</option>
                      <option value="Portrait">Chân dung (Portrait)</option>
                      <option value="Abstract">Trừu tượng (Abstract)</option>
                      <option value="Still Life">Tĩnh vật (Still Life)</option>
                      <option value="Contemporary">Đương đại (Contemporary)</option>
                      <option value="Traditional">Truyền thống (Traditional)</option>
                      <option value="Modern">Hiện đại (Modern)</option>
                      <option value="Other">Khác</option>
                    </select>
                    <div v-if="errors.paintingGenre" class="invalid-feedback">{{ errors.paintingGenre }}</div>
                  </div>

                  <!-- Material -->
                  <div class="mb-3">
                    <label class="form-label fw-bold">
                      Chất liệu <span class="text-danger">*</span>
                    </label>
                    <select
                      v-model="formData.material"
                      class="form-select"
                      :class="{'is-invalid': errors.material}"
                      required
                    >
                      <option value="">-- Chọn chất liệu --</option>
                      <option value="Oil">Sơn dầu (Oil)</option>
                      <option value="Acrylic">Acrylic</option>
                      <option value="Watercolor">Màu nước (Watercolor)</option>
                      <option value="Ink">Mực (Ink)</option>
                      <option value="Mixed Media">Hỗn hợp (Mixed Media)</option>
                      <option value="Digital">Kỹ thuật số (Digital)</option>
                      <option value="Other">Khác</option>
                    </select>
                    <div v-if="errors.material" class="invalid-feedback">{{ errors.material }}</div>
                  </div>

                  <!-- Size -->
                  <div class="mb-3">
                    <label class="form-label fw-bold">
                      Kích thước <span class="text-danger">*</span>
                    </label>
                    <input
                      v-model="formData.size"
                      type="text"
                      class="form-control"
                      :class="{'is-invalid': errors.size}"
                      placeholder="VD: 70x50cm hoặc 100x80x5cm"
                      required
                    />
                    <div v-if="errors.size" class="invalid-feedback">{{ errors.size }}</div>
                    <small class="text-muted">Định dạng: ChiềuDài x ChiềuRộng (x ChiềuCao nếu có)</small>
                  </div>

                  <!-- Certificate File -->
                  <div class="mb-3">
                    <label class="form-label fw-bold">
                      File chứng nhận <span class="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      class="form-control"
                      @change="handleCertificateUpload"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <small class="text-muted">Định dạng: PDF, JPG, PNG (Tối đa 5MB)</small>

                    <!-- Certificate file name display -->
                    <div v-if="certificateFile" class="mt-2">
                      <div class="alert alert-success py-2 mb-0 d-flex align-items-center justify-content-between">
                        <div>
                          <i class="fas fa-file-check me-2"></i>
                          <span>{{ certificateFile.name }}</span>
                        </div>
                        <button
                          type="button"
                          class="btn btn-sm btn-danger"
                          @click="removeCertificate"
                        >
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                    <div v-if="errors.certificateId" class="invalid-feedback d-block">{{ errors.certificateId }}</div>
                  </div>

                  <!-- Image Upload (Required) -->
                  <div class="mb-3">
                    <label class="form-label fw-bold">
                      Hình ảnh tác phẩm <span class="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      class="form-control"
                      @change="handleFileUpload"
                      accept="image/*"
                      required
                    />
                    <small class="text-muted">Định dạng: JPG, PNG, WEBP (Tối đa 5MB)</small>

                    <!-- Preview Image -->
                    <div v-if="imagePreview" class="mt-3">
                      <img :src="imagePreview" class="img-thumbnail" style="max-height: 200px;" alt="Preview">
                      <button
                        type="button"
                        class="btn btn-sm btn-danger mt-2"
                        @click="removeImage"
                      >
                        <i class="fas fa-times me-1"></i>Xóa ảnh
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Submit Buttons -->
              <div class="row mt-4">
                <div class="col-12">
                  <div class="d-flex justify-content-between align-items-center">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="resetForm"
                      :disabled="isSubmitting"
                    >
                      <i class="fas fa-redo me-2"></i>Đặt lại
                    </button>

                    <button
                      type="submit"
                      class="btn btn-success btn-lg px-5"
                      :disabled="isSubmitting"
                    >
                      <i v-if="isSubmitting" class="fas fa-spinner fa-spin me-2"></i>
                      <i v-else class="fas fa-paper-plane me-2"></i>
                      {{ isSubmitting ? 'Đang gửi...' : 'Đăng ký tác phẩm' }}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Info Card -->
        <div class="card border-info mt-4">
          <div class="card-body">
            <h6 class="text-info mb-2">
              <i class="fas fa-info-circle me-2"></i>Lưu ý:
            </h6>
            <ul class="mb-0 small">
              <li>Tất cả các trường có dấu <span class="text-danger">*</span> là bắt buộc</li>
              <li>Hình ảnh tác phẩm là <strong>bắt buộc</strong>, nên rõ nét và chất lượng cao</li>
              <li>File chứng nhận là <strong>bắt buộc</strong>, chấp nhận PDF hoặc hình ảnh (JPG, PNG)</li>
              <li>Giá khởi điểm phải lớn hơn 0 và là bội số của 1,000 VND</li>
              <li>Năm sáng tác phải từ năm 1900 đến hiện tại</li>
              <li>Tác phẩm sẽ được xét duyệt trong vòng 24-48 giờ</li>
            </ul>
          </div>
        </div>

        <!-- AI Detection Result Card -->
        <div v-if="showAIDetectionResult" class="card border-danger mt-4 shadow-lg">
          <div class="card-header bg-danger text-white">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Phát hiện hình ảnh AI
              </h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                @click="closeAIDetectionResult"
              ></button>
            </div>
          </div>
          <div class="card-body">
            <div class="text-center mb-3">
              <div class="alert alert-danger mb-3">
                <i class="fas fa-robot fa-3x mb-3"></i>
                <h5>{{ aiDetectionResult?.message || 'Hình ảnh được phát hiện là AI' }}</h5>
                <h4 class="mt-2 mb-0">
                  <span class="badge bg-danger fs-5">
                    AI: {{ formatProbability(aiDetectionResult?.aiProbability) }}%
                  </span>
                </h4>
              </div>

              <div class="row text-center mb-3">
                <div class="col-6">
                  <div class="card bg-light">
                    <div class="card-body py-3">
                      <h6 class="text-muted mb-1">AI Probability</h6>
                      <h3 class="text-danger mb-0">
                        {{ formatProbability(aiDetectionResult?.aiProbability) }}%
                      </h3>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card bg-light">
                    <div class="card-body py-3">
                      <h6 class="text-muted mb-1">Human Probability</h6>
                      <h3 class="text-success mb-0">
                        {{ formatProbability(aiDetectionResult?.humanProbability) }}%
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <p class="text-muted mb-3">
                Hình ảnh của bạn có khả năng cao được tạo bởi AI.
                Nếu bạn cho rằng đây là lỗi, vui lòng báo cáo để chúng tôi xem xét lại.
              </p>

              <div class="d-flex justify-content-center gap-2">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeAIDetectionResult"
                >
                  <i class="fas fa-times me-2"></i>Đóng
                </button>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="handleReportAI"
                >
                  <i class="fas fa-flag me-2"></i>Báo cáo sai sót
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        title: '',
        description: '',
        startedPrice: 0,
        yearOfCreation: new Date().getFullYear(),
        paintingGenre: '',
        material: '',
        size: '',
        certificateId: '',
        status: 0 // 0 = Pending approval
      },
      errors: {},
      isSubmitting: false,
      imageFile: null,
      imagePreview: null,
      certificateFile: null,
      currentYear: new Date().getFullYear(),
      // AI Detection Result
      showAIDetectionResult: false,
      aiDetectionResult: null
    }
  },

  methods: {
    // Validate form
    validateForm() {
      this.errors = {};
      let isValid = true;

      // Title
      if (!this.formData.title || this.formData.title.trim().length < 3) {
        this.errors.title = 'Tên tác phẩm phải có ít nhất 3 ký tự';
        isValid = false;
      }

      // Description
      if (!this.formData.description || this.formData.description.trim().length < 10) {
        this.errors.description = 'Mô tả phải có ít nhất 10 ký tự';
        isValid = false;
      }

      // Starting Price
      if (!this.formData.startedPrice || this.formData.startedPrice <= 0) {
        this.errors.startedPrice = 'Giá khởi điểm phải lớn hơn 0';
        isValid = false;
      }

      // Year of Creation
      if (!this.formData.yearOfCreation ||
          this.formData.yearOfCreation < 1900 ||
          this.formData.yearOfCreation > this.currentYear) {
        this.errors.yearOfCreation = `Năm sáng tác phải từ 1900 đến ${this.currentYear}`;
        isValid = false;
      }

      // Painting Genre
      if (!this.formData.paintingGenre) {
        this.errors.paintingGenre = 'Vui lòng chọn thể loại';
        isValid = false;
      }

      // Material
      if (!this.formData.material) {
        this.errors.material = 'Vui lòng chọn chất liệu';
        isValid = false;
      }

      // Size
      if (!this.formData.size || this.formData.size.trim().length < 3) {
        this.errors.size = 'Vui lòng nhập kích thước';
        isValid = false;
      }

      // Certificate File
      if (!this.certificateFile) {
        this.errors.certificateId = 'Vui lòng chọn file chứng nhận';
        isValid = false;
      }

      return isValid;
    },

    // Handle file upload
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          this.$toast?.error?.('Kích thước file không được vượt quá 5MB');
          event.target.value = '';
          return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          this.$toast?.error?.('Vui lòng chọn file hình ảnh');
          event.target.value = '';
          return;
        }

        this.imageFile = file;

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    // Remove image
    removeImage() {
      this.imageFile = null;
      this.imagePreview = null;
    },

    // Handle certificate file upload
    handleCertificateUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          this.$toast?.error?.('Kích thước file không được vượt quá 5MB');
          event.target.value = '';
          return;
        }

        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
          this.$toast?.error?.('Vui lòng chọn file PDF hoặc hình ảnh (JPG, PNG)');
          event.target.value = '';
          return;
        }

        this.certificateFile = file;
      }
    },

    // Remove certificate
    removeCertificate() {
      this.certificateFile = null;
    },

    // Format currency
    formatCurrency(value) {
      if (!value) return '0 VND';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(value);
    },

    // Format probability percentage
    formatProbability(value) {
      if (value === null || value === undefined || isNaN(value)) return '0.00';
      return Number(value).toFixed(2);
    },

    // Submit form
    submitArtwork() {
      // Validate
      if (!this.validateForm()) {
        this.$toast?.error?.('Vui lòng kiểm tra lại các thông tin đã nhập');
        return;
      }

      // Kiểm tra bắt buộc phải có ảnh
      if (!this.imageFile) {
        this.$toast?.error?.('Vui lòng chọn hình ảnh tác phẩm');
        return;
      }

      this.isSubmitting = true;

      // Prepare form data for multipart/form-data
      const formData = new FormData();

      // Tạo metadata object theo yêu cầu của backend
      const metadata = {
        title: this.formData.title,
        description: this.formData.description,
        startedPrice: this.formData.startedPrice,
        yearOfCreation: this.formData.yearOfCreation,
        paintingGenre: this.formData.paintingGenre,
        material: this.formData.material,
        size: this.formData.size,
        certificateId: this.formData.certificateId,
        status: this.formData.status
      };

      // Append metadata as JSON string
      formData.append('metadata', JSON.stringify(metadata));

      // Append image if exists
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      // Append certificate file if exists
      if (this.certificateFile) {
        formData.append('certificate', this.certificateFile);
      }

      // Debug: log formData
      console.log('Sending metadata:', metadata);
      console.log('Sending image:', this.imageFile?.name);
      console.log('Sending certificate:', this.certificateFile?.name);

      // Send to API
      axios
        .post('http://localhost:8081/api/artworks/ingest', formData, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
            // Không set Content-Type, để browser tự động set boundary cho multipart/form-data
          }
        })
        .then((res) => {
          console.log('Artwork registered:', res.data);

          // Kiểm tra AI detection result
          const prediction = res.data.prediction;
          const aiProbability = parseFloat(res.data.aiProbability) || 0;
          const humanProbability = parseFloat(res.data.humanProbability) || 0;
          const status = res.data.status;

          console.log('AI Probability:', res.data.aiProbability);
          console.log('Human Probability:', res.data.humanProbability);

          // Nếu phát hiện là AI hoặc status = false
          if (prediction === 'AI' || status === false) {
            // Lưu thông tin AI detection
            this.aiDetectionResult = {
              prediction: prediction,
              aiProbability: aiProbability,
              humanProbability: humanProbability,
              message: res.data.message
            };

            console.log('Setting aiDetectionResult:', this.aiDetectionResult);

            // Hiển thị kết quả AI detection
            this.showAIDetectionResult = true;
            this.isSubmitting = false;

            // Scroll đến vị trí kết quả AI detection
            this.$nextTick(() => {
              const resultCard = document.querySelector('.border-danger');
              if (resultCard) {
                resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            });
          } else {
            // Nếu là Human - success
            const successMessage = res.data.message || 'Đăng ký tác phẩm thành công! Chờ xét duyệt.';
            this.$toast?.success?.(successMessage);

            // Reset form
            this.resetForm();

            // Redirect về home sau 2 giây
            setTimeout(() => {
              this.$router.push('/');
            }, 2000);
          }
        })
        .catch((err) => {
          console.error('Error submitting artwork:', err);

          if (err.response?.data?.message) {
            this.$toast?.error?.('Lỗi: ' + err.response.data.message);
          } else {
            this.$toast?.error?.('Có lỗi xảy ra khi đăng ký tác phẩm. Vui lòng thử lại.');
          }
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },

    // Reset form
    resetForm() {
      this.formData = {
        title: '',
        description: '',
        startedPrice: 0,
        yearOfCreation: new Date().getFullYear(),
        paintingGenre: '',
        material: '',
        size: '',
        certificateId: '',
        status: 0
      };
      this.errors = {};
      this.imageFile = null;
      this.imagePreview = null;
      this.certificateFile = null;
    },

    // Close AI Detection Result
    closeAIDetectionResult() {
      this.showAIDetectionResult = false;
      this.aiDetectionResult = null;
    },

    // Handle Report AI Image
    handleReportAI() {
      // Chức năng đang được phát triển
      this.$toast?.info?.('Chức năng báo cáo đang được phát triển. Vui lòng thử lại sau!');
      console.log('Report AI detection:', this.aiDetectionResult);

      // Đóng result card sau khi thông báo
      setTimeout(() => {
        this.closeAIDetectionResult();
      }, 1000);
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 15px;
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #044a42 0%, #066a5e 100%);
}

.form-label {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.form-control:focus,
.form-select:focus {
  border-color: #044a42;
  box-shadow: 0 0 0 0.2rem rgba(4, 74, 66, 0.25);
}

.btn-success {
  background: linear-gradient(135deg, #044a42 0%, #066a5e 100%);
  border: none;
  transition: all 0.3s ease;
}

.btn-success:hover {
  background: linear-gradient(135deg, #033831 0%, #055548 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(4, 74, 66, 0.3);
}

.btn-success:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.img-thumbnail {
  border: 2px solid #044a42;
  border-radius: 8px;
}

.invalid-feedback {
  display: block;
}

/* Responsive */
@media (max-width: 768px) {
  .card-body {
    padding: 1.5rem !important;
  }

  .btn-lg {
    width: 100%;
    margin-top: 1rem;
  }

  .d-flex.justify-content-between {
    flex-direction: column;
    gap: 1rem;
  }

  .btn-secondary {
    width: 100%;
  }

  /* AI Detection buttons on mobile */
  .card.border-danger .d-flex.gap-2 {
    flex-direction: column;
    width: 100%;
  }

  .card.border-danger .d-flex.gap-2 button {
    width: 100%;
  }
}

/* AI Detection Result Card */
.fa-robot {
  color: #dc3545;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.card.border-danger {
  border-width: 3px;
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header.bg-danger {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
</style>
