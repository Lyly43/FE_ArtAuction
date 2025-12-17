<template>
  <div class="container-fluid bg-light mb-5">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Loading auction room information...</p>
    </div>

    <!-- Main Content -->
    <div v-else class="container">

      <!-- Progress Steps -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card p-0">
            <div class="card-body">
              <div class="d-flex justify-content-center align-items-center gap-3">
                <div class="text-center">
                  <div class="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                    :class="currentStep >= 1 ? 'bg-success text-white' : 'bg-secondary text-white'"
                    style="width: 40px; height: 40px;">
                    <strong>1</strong>
                  </div>
                  <small :class="currentStep >= 1 ? 'text-success fw-bold' : 'text-muted'">Information</small>
                </div>
                <div class="border-top flex-grow-1" :class="currentStep > 1 ? 'border-success' : 'border-secondary'"
                  style="width: 100px; max-width: 150px; border-width: 3px !important;"></div>
                <div class="text-center">
                  <div class="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                    :class="currentStep >= 2 ? 'bg-success text-white' : 'bg-secondary text-white'"
                    style="width: 40px; height: 40px;">
                    <strong>2</strong>
                  </div>
                  <small :class="currentStep >= 2 ? 'text-success fw-bold' : 'text-muted'">Confirmation</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 1: Auction Information -->
      <div v-show="currentStep === 1">
        <div class="row">
          <!-- Room Details -->
          <div class="col-lg-8">
            <div class="card shadow-md p-0">
              <div class="card-header bg-success text-white">
                <h5 class="m-1"><i class="fa-solid fa-info-circle me-3"></i>Room Details</h5>
              </div>
              <div class="card-body">
                <div class="row d-flex">
                  <div class="col-lg-6">
                    <div class="row gap-3">
                      <div class="col-12">
                        <div class="position-relative overflow-hidden">
                          <img :src="auctionRoom.imageAuctionRoom" class="w-100 rounded-3" alt="Auction Room">
                          <span class="position-absolute top-0 start-0 m-3 badge bg-danger">
                            {{ getStatusText(auctionRoom.status) }}
                          </span>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class=" d-flex justify-content-between alert alert-success py-2 m-0">
                          <p class="m-0 text-muted small">Registered Users</p>
                          <p class="m-0"><strong class="text-success">{{ auctionRoom.viewCount || 0 }}</strong>
                          </p>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="row gap-3">
                      <div class="col-12 d-flex justify-content-between">
                        <p class="m-0  small">Room ID</p>
                        <p class="m-0 fw-semibold">{{ auctionRoom.id }}</p>
                      </div>
                      <div class="col-12 d-flex justify-content-between">
                        <p class="m-0  small">Room Name</p>
                        <p class="m-0 fw-bold">{{ auctionRoom.roomName }}</p>
                      </div>
                      <div class="col-12 d-flex justify-content-between">
                        <p class="m-0  small">Type</p>
                        <p class="m-0"><span class="badge bg-success">{{ auctionRoom.type }}</span></p>
                      </div>
                      <div class="col-12 d-flex justify-content-between">
                        <p class="m-0  small">Start</p>
                        <p class="m-0">{{ formatTime(auctionRoom.startedAt) }}</p>
                      </div>
                      <div class="col-12 d-flex justify-content-between">
                        <p class="m-0  small">End</p>
                        <p class="m-0">{{ formatTime(auctionRoom.stoppedAt) }}</p>
                      </div>
                      <div class="col-12">
                        <p class="m-0  small">Description</p>
                        <p class="m-0 ">{{ auctionRoom.description || 'N/A' }}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Artworks List -->
          <div class="col-lg-4" v-if="sessions.length > 0">
            <div class="card shadow-md border-0 p-0">
              <div class="card-header bg-success text-white">
                <h5 class="m-1"><i class="fa-solid fa-palette me-3"></i>Auction Items ({{ sessions.length }})</h5>
              </div>
              <div class="card-body p-2" style="max-height: 500px; overflow-y: auto;">
                <div class="list-group list-group-flush">
                  <a v-for="(session, index) in sessions" :key="session.id" href="#"
                    class="list-group-item list-group-item-action p-2 mb-2 rounded" data-bs-toggle="modal"
                    data-bs-target="#sessionModal" @click="selectedSession = session">
                    <div class="d-flex gap-3 align-items-center">
                      <!-- Artwork Image -->
                      <div class="flex-shrink-0 position-relative">
                        <img :src="session.imageUrl || 'https://via.placeholder.com/80x80?text=No+Image'"
                          class="rounded" style="width: 80px; height: 80px; object-fit: cover;" alt="Artwork">
                        <span class="position-absolute top-0 start-0 badge bg-success rounded-circle m-1"
                          style="width: 25px; height: 25px; font-size: 0.7rem; padding: 0; display: flex; align-items: center; justify-content: center;">
                          {{ index + 1 }}
                        </span>
                      </div>

                      <!-- Artwork Info -->
                      <div class="flex-grow-1 min-w-0">
                        <h6 class="mb-1 fw-bold text-truncate">{{ session.artworkTitle || session.artworkId }}</h6>
                        <div class="small">
                          <div class="d-flex justify-content-between mb-1">
                            <span class="text-muted">Starting Price:</span>
                            <strong class="text-success">{{ formatUSD(session.startingPrice) }}</strong>
                          </div>
                          <div class="d-flex justify-content-between">
                            <span class="text-muted">Bid Step:</span>
                            <strong class="text-success">{{ formatUSD(session.bidStep) }}</strong>
                          </div>
                        </div>
                      </div>

                      <!-- View Icon -->
                      <div class="flex-shrink-0">
                        <i class="fa-solid fa-chevron-right text-muted"></i>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Next Button -->
          <div class="col-12">
            <div class="text-center mt-4">
              <button class="btn btn-success fs-6 px-5" @click="currentStep = 2">
                Continue <i class="fa-solid fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Session Detail Modal -->
      <div class="modal fade" id="sessionModal" tabindex="-1" aria-labelledby="sessionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content" v-if="selectedSession">
            <div class="modal-header bg-success text-white">
              <h5 class="modal-title" id="sessionModalLabel">
                <i class="fa-solid fa-image me-2"></i>Artwork Details
              </h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row g-4">
                <!-- Artwork Image -->
                <div class="col-6">
                  <div class="card p-0 mb-4">
                    <img
                      :src="selectedSession.artwork?.avtArtwork || selectedSession.imageUrl || selectedSession.artwork?.imageUrls?.[0] || 'https://via.placeholder.com/400x400?text=No+Image'"
                      class="img-fluid rounded shadow-sm w-100" style="max-height: 300px; object-fit: cover;">
                  </div>

                  <!-- <div class="mt-3 d-flex flex-wrap gap-2">
                    <span class="badge" :class="getSessionStatusClass(selectedSession.status)">
                      {{ getSessionStatusText(selectedSession.status) }}
                    </span>
                    <span class="badge bg-info">{{ selectedSession.type }}</span>
                    <span v-if="selectedSession.artwork?.aiVerified" class="badge bg-success">
                      AI Verified
                    </span>
                  </div> -->
                  <div class="mb-4">
                    <h6 class="text-success fw-bold mb-2">Price Information</h6>
                    <div class="row g-2">
                      <div class="col-6">
                        <div class="card p-0">
                          <div class="card-body">
                            <small class="text-muted d-block">Starting Price</small>
                            <strong class="text-success">{{ formatUSD(selectedSession.startingPrice) }}</strong>
                          </div>

                        </div>
                      </div>
                      <div class="col-6">
                        <div class="card p-0">
                          <div class="card-body">
                            <small class="text-muted d-block">Bid Step</small>
                            <strong class="text-warning">{{ formatUSD(selectedSession.bidStep) }}</strong>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>



                  <div>
                    <h6 class="text-success fw-bold mb-2">Time Information </h6>
                    <div class="d-flex justify-content-between mb-2">
                      <span class="text-muted">Start:</span>
                      <p class="m-0">{{ formatTime(selectedSession.startTime) }}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span class="text-muted">End:</span>
                      <p class="m-0">{{ formatTime(selectedSession.endedAt) }}</p>
                    </div>
                  </div>
                </div>

                <!-- Artwork Details -->
                <div class="col-6">
                  <h5 class="fw-bold text-success alert alert-success mb-4">
                    {{ selectedSession.artwork?.title || selectedSession.artworkTitle || selectedSession.artworkId }}
                  </h5>


                  <!-- Artwork Info -->
                  <div class="mb-3" v-if="selectedSession.artwork">
                    <div class="row mb-3">
                      <div class="col-12">
                        <h6 class="text-success fw-bold mb-2">Artwork Information</h6>

                      </div>
                      <div class="col-12 mb-2 d-flex justify-content-between">
                        <span class="text-muted">Owner</span>
                        <strong>{{ selectedSession.artwork.ownerId }}</strong>
                      </div>
                      <div class="col-12 mb-2 d-flex justify-content-between">
                        <span class="text-muted">Genre</span>
                        <strong>{{ selectedSession.artwork.paintingGenre || 'N/A' }}</strong>
                      </div>
                      <div class="col-12 mb-2 d-flex justify-content-between">
                        <span class="text-muted">Year of Creation</span>
                        <strong>{{ selectedSession.artwork.yearOfCreation || 'N/A' }}</strong>
                      </div>
                      <div class="col-12 mb-2 d-flex justify-content-between">
                        <span class="text-muted">Material</span>
                        <strong>{{ selectedSession.artwork.material || 'N/A' }}</strong>
                      </div>
                      <div class="col-12 mb-2 d-flex justify-content-between">
                        <span class="text-muted">Size</span>
                        <strong>{{ selectedSession.artwork.size || 'N/A' }}</strong>
                      </div>
                      <div class="col-12 mb-2 d-flex justify-content-between"
                        v-if="selectedSession.artwork.certificateId">
                        <span class="text-muted">Certificate</span>
                        <strong>{{ selectedSession.artwork.certificateId }}</strong>
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <h6 class="text-success fw-bold mb-1">Description</h6>
                    <p class="text-muted small mb-0">
                      {{ selectedSession.artwork?.description || 'No description available.' }}
                    </p>
                  </div>



                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Registration Form -->
      <div v-show="currentStep === 2">
        <div class="row ">
          <div class="col-lg-6">
            <!-- Profile Summary -->
            <div class="card shadow-md border-0 mb-4 p-0">
              <div class="card-header bg-success text-white">
                <h5 class="m-1"><i class="fa-solid fa-clipboard-check me-3"></i>Registration Profile</h5>
              </div>
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="d-flex align-items-center gap-3">
                      <div class="bg-success text-white rounded p-2">
                        <i class="fa-solid fa-user"></i>
                      </div>
                      <div>
                        <small class="text-muted d-block">User ID</small>
                        <strong>{{ userId }}</strong>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center gap-3">
                      <div class="bg-success text-white rounded p-2">
                        <i class="fa-solid fa-door-open"></i>
                      </div>
                      <div>
                        <small class="text-muted d-block">Auction Room</small>
                        <strong>{{ auctionRoom.roomName }}</strong>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center gap-3">
                      <div class="bg-success text-white rounded p-2">
                        <i class="fa-solid fa-images"></i>
                      </div>
                      <div>
                        <small class="text-muted d-block">Number of Items</small>
                        <strong>{{ sessions.length }} items</strong>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center gap-3">
                      <div class="bg-success text-white rounded p-2">
                        <i class="fa-solid fa-calendar-check"></i>
                      </div>
                      <div>
                        <small class="text-muted d-block">Payment Deadline</small>
                        <strong>{{ auctionRoom.paymentDeadlineDays }} days</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Deposit Card -->
            <div class="card shadow-md border-0 mb-4 p-0 border-warning">
              <div class="card-header bg-warning text-dark">
                <div class="d-flex align-items-center">
                  <i class="fa-solid fa-money-bill-wave fa-xl me-2"></i>
                  <div class="m-1 ">
                    <h5 class="fw-bold m-0">Participation Deposit</h5>
                    <small>Amount required for registration</small>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="text-center my-3">
                  <h2 class="fw-bold text-success mb-0">{{ formatUSD(auctionRoom.depositAmount) }}</h2>
                </div>
                <hr>
                <div class="mb-2">
                  <i class="fa-solid fa-check-circle text-success me-2"></i>
                  <small>100% refund if not winning</small>
                </div>
                <div>
                  <i class="fa-solid fa-calculator text-success me-2"></i>
                  <small>Deducted from total if winning</small>
                </div>
              </div>
            </div>


          </div>
          <div class="col-lg-6">
            <!-- Registration Form -->
            <form @submit.prevent="handleRegister">
              <div class="card shadow-md border-0 mb-4 p-0">
                <div class="card-header bg-success text-white">
                  <h5 class="m-1"><i class="fa-solid fa-credit-card me-3"></i>Payment Information</h5>
                </div>
                <div class="card-body">
                  <!-- Payment Breakdown -->
                  <div class="mb-3">
                    <div class="alert alert-success">
                      <h6 class="fw-bold mb-3 text-success">
                        <i class="fa-solid fa-file-invoice-dollar me-2"></i>Payment Breakdown
                      </h6>
                      <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Registration Fee:</span>
                        <strong>{{ formatUSD(registrationFee) }}</strong>
                      </div>
                      <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Participation Deposit:</span>
                        <strong>{{ formatUSD(auctionRoom.depositAmount) }}</strong>
                      </div>
                      <hr class="my-2 text-">
                      <div class="d-flex justify-content-between mb-1">
                        <span class="fw-bold text-dark">Total Registration:</span>
                        <h6 class="mb-0 text-success fw-bold">{{ formatUSD(totalRegistration) }}</h6>
                      </div>

                    </div>
                  </div>

                  <div class="mb-3">
                    <p class="form-label fw-semibold">Payment Method <span class="text-danger">*</span></p>
                    <select v-model="formData.paymentMethod" class="form-select " required>
                      <option value="">-- Select Method --</option>
                      <option value="bank_transfer">🏦 Bank Transfer</option>
                      <option value="e_wallet">💳 E-Wallet</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <p class="form-label fw-semibold">Notes (optional)</p>
                    <textarea v-model="formData.notes" class="form-control" rows="3"
                      placeholder="Enter notes if any..."></textarea>
                  </div>

                  <div class="form-check">
                    <input v-model="formData.agreedToTerms" class="form-check-input" type="checkbox" id="termsCheck"
                      required>
                    <label class="form-check-label" for="termsCheck">
                      I have read and agree to the
                      <a href="#" class="text-success fw-semibold">Terms & Conditions</a>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="d-grid gap-2 d-md-flex justify-content-center mt-4">
                <button type="button" class="btn btn-outline-secondary btn-lg flex-md-fill" @click="currentStep = 1"
                  :disabled="isSubmitting">
                  <i class="fa-solid fa-arrow-left me-2"></i>Back
                </button>
                <button type="submit" class="btn btn-success btn-lg flex-md-fill"
                  :disabled="isSubmitting || !formData.agreedToTerms">
                  <span v-if="isSubmitting">
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Processing...
                  </span>
                  <span v-else>
                    <i class="fa-solid fa-check-circle me-2"></i>
                    Confirm Registration
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment QR Modal -->
    <div v-if="showPaymentModal">
      <div class="modal-backdrop fade show"></div>
      <div class="modal fade show d-block" tabindex="-1" role="dialog" aria-modal="true" @click.self="closePaymentModal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-success text-white">
              <h5 class="modal-title">
                <i class="fa-solid fa-qrcode me-2"></i>Payment QR
              </h5>
              <button type="button" class="btn-close btn-close-white" @click="closePaymentModal"></button>
            </div>
            <div class="modal-body text-center">
              <div v-if="paymentInfo.qrUrl" class="mb-3">
                <img :src="paymentInfo.qrUrl" alt="Payment QR" class="img-fluid rounded shadow-sm">
              </div>
              <h6 class="fw-bold text-success mb-2">{{ paymentInfo.note }}</h6>
              <p class="text-muted mb-1">{{ paymentInfo.message }}</p>
              <span class="badge" :class="paymentInfo.paid ? 'bg-success' : 'bg-warning text-dark'">
                {{ paymentInfo.paid ? 'Paid' : 'Pending' }}
              </span>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" @click="closePaymentModal">Close</button>
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
      loading: true,
      isSubmitting: false,
      currentStep: 1,
      auctionRoomId: null,
      userId: null,
      selectedSession: null,
      auctionRoom: {
        id: '',
        roomName: '',
        description: '',
        type: '',
        imageAuctionRoom: '',
        depositAmount: 0,
        startedAt: null,
        stoppedAt: null,
        viewCount: 0,
        status: 0,
        paymentDeadlineDays: 7
      },
      sessions: [],
      formData: {
        paymentMethod: '',
        notes: '',
        agreedToTerms: false
      },
      // Payment
      showPaymentModal: false,
      paymentInfo: {
        qrUrl: '',
        note: '',
        paid: false,
        message: ''
      }
    };
  },

  computed: {
    registrationFee() {
      return 7.60; // Phí hồ sơ đăng ký cố định: $1.50 USD
    },
    totalRegistration() {
      return (this.registrationFee || 0) + (this.auctionRoom.depositAmount || 0);
    }
  },

  mounted() {
    this.auctionRoomId = this.$route.params.id;
    this.getUserId();
    this.loadAuctionRoomDetails();
  },

  methods: {
    getUserId() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.userId = payload.userId || payload.sub || 'Unknown';
        } catch (err) {
          console.error('Error parsing token:', err);
          this.userId = 'Unknown';
        }
      }
    },

    loadAuctionRoomDetails() {
      this.loading = true;
      const token = localStorage.getItem('token');

      axios
        .get(`http://localhost:8081/api/auctionroom/complete/${this.auctionRoomId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
          console.log('API Response:', res.data);
          if (res.data) {
            if (res.data.room) {
              this.auctionRoom = res.data.room;
            }
            if (res.data.sessions) {
              // Transform nested structure to flat structure for template compatibility
              this.sessions = res.data.sessions.map(item => ({
                ...item.session,
                artwork: item.artwork,
                // Use artwork's image if session imageUrl is null
                imageUrl: item.session.imageUrl || item.artwork?.avtArtwork,
                // Add artwork title for display
                artworkTitle: item.artwork?.title
              }));
            }
          }
        })
        .catch((err) => {
          console.error('Error loading auction room:', err);
          this.$toast.error('Unable to load auction room information!');
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleRegister() {
      if (!this.formData.agreedToTerms) {
        this.$toast.warning('Please agree to the terms!');
        return;
      }

      this.isSubmitting = true;
      const token = localStorage.getItem('token');

      const requestData = {
        auctionRoomId: this.auctionRoomId,
        userId: this.userId,
        paymentMethod: this.formData.paymentMethod,
        notes: this.formData.notes,
        depositAmount: this.auctionRoom.depositAmount
      };

      console.log('Registering with data:', requestData);

      axios
        .post('http://localhost:8081/api/auctionroom/register', requestData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          console.log('Registration success:', res.data);
          this.$toast.success('Successfully registered for auction!');
          // After register, fetch payment QR
          this.fetchPaymentInfo();
        })
        .catch((err) => {
          console.error('Registration error:', err);
          const errorMsg = err.response?.data?.message || 'Registration failed!';
          this.$toast.error(errorMsg);
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },

    fetchPaymentInfo() {
      const token = localStorage.getItem('token');
      if (!this.auctionRoomId) {
        this.$toast.error('Missing auction room ID');
        return;
      }

      axios
        .get(`http://localhost:8081/api/payment/${this.auctionRoomId}/application-fee-and-deposit`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
          console.log('Payment info:', res.data);
          this.paymentInfo = {
            qrUrl: res.data.qrUrl,
            note: res.data.note,
            paid: res.data.paid,
            message: res.data.message
          };
          this.showPaymentModal = true;
        })
        .catch((err) => {
          console.error('Payment info error:', err);
          this.$toast.error(err.response?.data?.message || 'Không thể tải QR thanh toán');
        });
    },

    closePaymentModal() {
      this.showPaymentModal = false;
    },

    goBack() {
      this.$router.go(-1);
    },

    getStatusText(status) {
      const statusMap = {
        0: 'Not Started',
        1: 'In Progress',
        2: 'Coming Soon'
      };
      return statusMap[status] || 'Unknown';
    },

    getSessionStatusText(status) {
      const statusMap = {
        0: 'Not Started',
        1: 'In Auction',
        2: 'Ended'
      };
      return statusMap[status] || 'Unknown';
    },

    getSessionStatusClass(status) {
      const classMap = {
        0: 'bg-secondary',
        1: 'bg-success',
        2: 'bg-danger'
      };
      return classMap[status] || 'bg-secondary';
    },

    formatUSD(amount) {
      if (!amount && amount !== 0) return '$0.00';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    },

    formatTime(dateString) {
      if (!dateString) return 'Not specified';
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    }
  }
};
</script>

<style scoped>
/* Minimal custom styles - mostly using Bootstrap */
.hover-shadow {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.hover-shadow:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  transform: translateY(-5px);
}
</style>
