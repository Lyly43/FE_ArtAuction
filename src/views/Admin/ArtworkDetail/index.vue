<template>
  <div class="container py-5">
    <div class="mb-4">
      <router-link to="/admin/management-artwork" class="btn btn-outline-secondary border-0 ps-0">
        <i class="fa-solid fa-arrow-left me-2"></i>Back to Artwork List
      </router-link>
    </div>

    <div v-if="isLoading" class="py-5 text-center text-secondary">
      <div class="spinner-border text-primary mb-3" role="status"></div>
      <p class="mb-0">Loading artwork...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger border-0 shadow-sm">
      <i class="fa-solid fa-circle-exclamation me-2"></i>{{ error }}
    </div>

    <div v-else-if="artwork" class="row g-5">
      <div class="col-12 col-lg-7">
        <div class="card border-0 shadow-sm overflow-hidden">
          <div id="artworkCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-indicators" v-if="allImages.length > 1">
              <button
                v-for="(img, index) in allImages"
                :key="'ind-' + index"
                type="button"
                data-bs-target="#artworkCarousel"
                :data-bs-slide-to="index"
                :class="{ active: index === 0 }"
                :aria-current="index === 0"
              ></button>
            </div>

            <div class="carousel-inner bg-light" v-if="allImages.length">
              <div
                v-for="(img, index) in allImages"
                :key="'slide-' + index"
                class="carousel-item"
                :class="{ active: index === 0 }"
              >
                <div
                  class="d-flex align-items-center justify-content-center"
                  style="height: 500px; background-color: #f8f9fa"
                >
                  <img
                    :src="img.src"
                    class="d-block mw-100 mh-100 shadow-sm"
                    :alt="img.alt"
                    style="object-fit: contain"
                  />
                </div>
                <div class="carousel-caption d-none d-md-block" v-if="img.type === 'cert'">
                  <span class="badge bg-dark bg-opacity-75 fs-6">
                    <i class="fa-solid fa-file-contract me-2"></i>Certificate / Confirmation
                  </span>
                </div>
              </div>
            </div>

            <div
              v-else
              class="bg-light d-flex align-items-center justify-content-center"
              style="height: 500px"
            >
              <div class="text-center text-secondary">
                <i class="fa-regular fa-image fa-3x mb-3"></i>
                <p class="fw-semibold mb-0">No images available</p>
              </div>
            </div>

            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#artworkCarousel"
              data-bs-slide="prev"
              v-if="allImages.length > 1"
            >
              <span
                class="carousel-control-prev-icon bg-dark rounded-circle p-3"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#artworkCarousel"
              data-bs-slide="next"
              v-if="allImages.length > 1"
            >
              <span
                class="carousel-control-next-icon bg-dark rounded-circle p-3"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <!-- <div class="mt-3 text-center text-muted small">
          <i class="fa-solid fa-images me-1"></i>
          Includes {{ artworkImages.length }} artwork photos and
          {{ certImages.length }} certificates.
        </div> -->
      </div>

      <div class="col-12 col-lg-5">
        <div class="h-100 d-flex flex-column">
          <div class="mb-3">
            <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
              <span class="badge text-primary border rounded-pill px-3">
                {{ artwork.paintingGenre || "Original Work" }}
              </span>
              <span class="badge rounded-pill px-3" :class="getStatusClass(artwork.status)">
                {{ convertStatus(artwork.status) }}
              </span>
            </div>
            <h2 class="fw-bold text-dark mb-1">{{ artwork.title || "Artwork" }}</h2>
            <p class="text-secondary fs-5 mb-0">
              Artist: <span class="fw-semibold text-dark">{{ artwork.author || "N/A" }}</span>
            </p>
          </div>

          <div class="card border-0 shadow-sm bg-light mb-4">
            <div class="card-body p-4">
              <div class="row g-3 text-center mb-4">
                <div class="col-4 border-end">
                  <small class="text-uppercase text-secondary" style="font-size: 0.75rem"
                    >Year</small
                  >
                  <div class="fw-bold fs-5 text-dark">{{ artwork.yearOfCreation || "—" }}</div>
                </div>
                <div class="col-4 border-end">
                  <small class="text-uppercase text-secondary" style="font-size: 0.75rem"
                    >Material</small
                  >
                  <div class="fw-bold fs-5 text-dark">{{ artwork.material || "—" }}</div>
                </div>
                <div class="col-4">
                  <small class="text-uppercase text-secondary" style="font-size: 0.75rem"
                    >Size</small
                  >
                  <div class="fw-bold fs-5 text-dark">{{ artwork.size || "—" }}</div>
                </div>
              </div>

              <div class="mb-4">
                <h6 class="fw-bold text-secondary text-uppercase small">Description</h6>
                <p class="text-body-secondary mb-0" style="text-align: justify">
                  {{ artwork.description || "No description provided." }}
                </p>
              </div>

              <div class="bg-white p-3 rounded border">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="text-secondary fw-medium">Starting Price</span>
                  <div class="input-group input-group-sm" style="max-width: 180px">
                    <span class="input-group-text bg-light border-0 fw-bold text-secondary">$</span>
                    <input
                      type="number"
                      class="form-control text-end fw-semibold border-0 bg-light shadow-none"
                      v-model.number="editedStartingPrice"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <!-- <small class="d-block text-end text-muted mt-1" style="font-size: 0.75rem">
                  ≈ {{ formatVND(editedStartingPrice * exchangeRate) }}
                </small>

                <small
                  class="d-block text-end text-success fst-italic"
                  v-if="editedStartingPrice > 0"
                  style="font-size: 0.7rem"
                >
                  Ready to approve
                </small> -->
              </div>
            </div>
          </div>

          <div
            class="alert d-flex align-items-center shadow-sm mb-4"
            :class="
              artwork.aiVerified ? 'alert-success border-success' : 'alert-danger border-danger'
            "
            role="alert"
          >
            <div class="fs-1 me-3" :class="artwork.aiVerified ? 'text-success' : 'text-danger'">
              <i
                class="fa-solid"
                :class="artwork.aiVerified ? 'fa-shield-check' : 'fa-shield-xmark'"
              ></i>
            </div>
            <div>
              <h6 class="alert-heading fw-bold mb-0">
                {{ artwork.aiVerified ? "AI Verification Passed" : "AI Verification Failed" }}
              </h6>
              <small>
                {{
                  artwork.aiVerified
                    ? "Confirmed by Artist & System AI Analysis"
                    : "Rejected by Artist & System AI Analysis"
                }}
              </small>
            </div>
            <div class="ms-auto">
              <i
                class="fa-solid fs-3"
                :class="artwork.aiVerified ? 'fa-check-circle' : 'fa-circle-xmark'"
              ></i>
            </div>
          </div>

          <div class="mt-auto d-grid gap-2 d-md-flex" v-if="artwork.status === 0">
            <button
              type="button"
              class="btn btn-danger btn-lg flex-grow-1 shadow-sm"
              @click="handleApproval('reject')"
              :disabled="actionLoading === 'reject'"
            >
              <span
                v-if="actionLoading === 'reject'"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              <i class="fa-solid fa-xmark me-2" v-else></i>Reject
            </button>
            <button
              type="button"
              class="btn btn-primary btn-lg flex-grow-1 shadow-sm"
              @click="handleApproval('approve')"
              :disabled="actionLoading === 'approve'"
            >
              <span
                v-if="actionLoading === 'approve'"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              <i class="fa-solid fa-check me-2" v-else></i>Approve
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5 text-secondary">No artwork data found.</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      artwork: null,
      isLoading: false,
      error: null,
      actionLoading: "",
      editedStartingPrice: 0,
      exchangeRate: 25400,
    };
  },
  computed: {
    artworkImages() {
      if (!this.artwork) return [];
      const gallery =
        this.artwork.artworkImages || this.artwork.images || this.artwork.gallery || [];
      if (Array.isArray(gallery) && gallery.length) {
        return gallery.map((img, index) => {
          if (typeof img === "string") {
            return {
              src: img,
              alt: `${this.artwork.title || "Artwork"} - ${index + 1}`,
              type: "art",
            };
          }
          return {
            src: img.src || img.url,
            alt: img.alt || img.description || `Artwork - ${index + 1}`,
            type: "art",
          };
        });
      }
      if (this.artwork.avtArtwork) {
        return [
          {
            src: this.artwork.avtArtwork,
            alt: this.artwork.title || "Artwork thumbnail",
            type: "art",
          },
        ];
      }
      return [];
    },
    certImages() {
      if (!this.artwork) return [];
      const certificates =
        this.artwork.certImages ||
        this.artwork.certificateImages ||
        this.artwork.certificates ||
        [];
      if (!Array.isArray(certificates)) return [];
      return certificates.map((img, index) => {
        if (typeof img === "string") {
          return {
            src: img,
            alt: `Certificate - ${index + 1}`,
            type: "cert",
          };
        }
        return {
          src: img.src || img.url,
          alt: img.alt || img.description || `Certificate - ${index + 1}`,
          type: "cert",
        };
      });
    },
    allImages() {
      return [...this.artworkImages, ...this.certImages];
    },
  },
  created() {
    this.fetchArtwork();
  },
  watch: {
    "$route.params.id"(newId, oldId) {
      if (newId && newId !== oldId) {
        this.fetchArtwork();
      }
    },
  },
  methods: {
    fetchArtwork() {
      const artworkId = this.$route.params.id;
      if (!artworkId) {
        this.error = "Artwork ID is missing.";
        return;
      }
      this.isLoading = true;
      this.error = null;
      axios
        .get(`http://localhost:8081/api/admin/artworks/${artworkId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.artwork = res.data;
          this.editedStartingPrice = res.data?.startedPrice ?? res.data?.price ?? 0;
        })
        .catch((err) => {
          console.error(err);
          this.error = err.response?.data?.message || "Failed to fetch artwork detail.";
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    formatCurrency(value) {
      if (!value) return "$0.00";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    },
    convertStatus(status) {
      switch (status) {
        case 0:
          return "Not approved";
        case 1:
          return "Approved";
        case 2:
          return "In Auction";
        case 3:
          return "Refused";
      }
    },
    getStatusClass(status) {
      switch (status) {
        case 0:
          return "bg-secondary-subtle text-secondary border-secondary-subtle";
        case 1:
          return "bg-success-subtle text-success border-success-subtle";
        case 2:
          return "bg-warning-subtle text-warning-emphasis border-warning-subtle";
        case 3:
          return "bg-danger-subtle text-danger border-danger-subtle";
      }
    },
    //CHUYỂN USD -> VND
    handleApproval(action) {
      if (!this.artwork?.id) return;

      // Validate giá USD
      if (action === "approve") {
        const priceUSD = Number(this.editedStartingPrice);
        if (!priceUSD || priceUSD <= 0) {
          window.alert("Please enter a valid Starting Price (USD) greater than 0.");
          return;
        }
      }
      const endpoint =
        action === "approve"
          ? `http://localhost:8081/api/admin/artworks/approve/${this.artwork.id}`
          : `http://localhost:8081/api/admin/artworks/reject/${this.artwork.id}`;

      const payload =
        action === "approve" ? { startedPrice: Number(this.editedStartingPrice) } : {};

      this.actionLoading = action;
      axios
        .post(endpoint, payload, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          window.alert(
            action === "approve"
              ? "Artwork approved successfully."
              : "Artwork rejected successfully."
          );
          this.fetchArtwork();
        })
        .catch((err) => {
          console.error(err);
          window.alert(
            err.response?.data?.message || `Failed to ${action} the artwork. Please try again.`
          );
        })
        .finally(() => {
          this.actionLoading = "";
        });
    },

    formatVND(value) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    },
  },
};
</script>

<style scoped></style>
