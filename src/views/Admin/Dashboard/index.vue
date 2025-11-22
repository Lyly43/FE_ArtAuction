<template>
  <div class="container-fluid py-4 bg-light-subtle min-vh-100">
    <div class="mb-4">
      <h4 class="fw-bold text-primary mb-1">Dashboard</h4>
      <p class="text-body-secondary mb-0">Overview of the painting auction system</p>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Total users</h6>
                <h3 class="fw-bold mb-0">120</h3>
              </div>
              <div
                class="bg-secondary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-users fs-5"></i>
              </div>
            </div>
            <small class="text-success fw-medium">
              <i class="fa-solid fa-arrow-trend-up me-1"></i>+12.5% over last month
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Artwork</h6>
                <h3 class="fw-bold mb-0">100</h3>
              </div>
              <div
                class="bg-info-subtle text-info rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-image fs-5"></i>
              </div>
            </div>
            <small class="text-success fw-medium">
              <i class="fa-solid fa-arrow-trend-up me-1"></i>+12.5% over last month
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Auction Rooms</h6>
                <h3 class="fw-bold mb-0">10</h3>
              </div>
              <div
                class="bg-warning-subtle text-warning-emphasis rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-hammer fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">23 rooms are in operation</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Bidding</h6>
                <h3 class="fw-bold mb-0">120</h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-chart-line fs-5"></i>
              </div>
            </div>
            <small class="text-success fw-medium">
              <i class="fa-solid fa-arrow-trend-up me-1"></i>+12.5% over last month
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Revenue</h6>
                <h3 class="fw-bold mb-0">100</h3>
              </div>
              <div
                class="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-dollar-sign fs-5"></i>
              </div>
            </div>
            <small class="text-success fw-medium">
              <i class="fa-solid fa-arrow-trend-up me-1"></i>+12.5% over last month
            </small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 class="card-subtitle text-body-secondary mb-1">Active Users</h6>
                <h3 class="fw-bold mb-0">10</h3>
              </div>
              <div
                class="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px"
              >
                <i class="fa-solid fa-user-check fs-5"></i>
              </div>
            </div>
            <small class="text-body-secondary">10 people are active now</small>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-12 col-xl-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white border-0 pt-3">
            <h5 class="text-primary fw-bold mb-0">Nearby auction rooms</h5>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive text-nowrap overflow-y-auto">
              <table class="table table-hover align-middle text-nowrap mb-0 w-100">
                <thead class="table-light">
                  <tr>
                    <th scope="col" class="ps-3 py-3 fw-bold align-middle">Auction room name</th>
                    <th scope="col" class="py-3 fw-bold align-middle">Artwork</th>
                    <th scope="col" class="py-3 fw-bold align-middle">Status</th>
                    <th scope="col" class="py-3 fw-bold align-middle">Current price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="ps-3 fw-medium align-middle">Tranh sơn dầu</td>
                    <td class="align-middle">Tranh phong cảnh mùa thu</td>
                    <td class="align-middle">
                      <button
                        class="btn badge bg-danger-subtle text-danger rounded-pill border border-danger-subtle"
                      >
                        In progress
                      </button>
                    </td>
                    <td class="fw-bold text-dark align-middle">10.000đ</td>
                  </tr>
                  <tr>
                    <td class="ps-3 fw-medium align-middle">Tranh sơn dầu</td>
                    <td class="align-middle">Tranh phong cảnh mùa thu</td>
                    <td class="align-middle">
                      <button
                        class="btn badge bg-warning-subtle text-warning-emphasis rounded-pill border border-warning-subtle"
                      >
                        Coming soon
                      </button>
                    </td>
                    <td class="fw-bold text-dark align-middle">10.000đ</td>
                  </tr>
                  <tr>
                    <td class="ps-3 fw-medium align-middle">Tranh sơn dầu</td>
                    <td class="align-middle">Tranh phong cảnh mùa thu</td>
                    <td class="align-middle">
                      <button
                        class="btn badge bg-secondary-subtle text-secondary rounded-pill border border-secondary-subtle"
                      >
                        End
                      </button>
                    </td>
                    <td class="fw-bold text-dark align-middle">10.000đ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-xl-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white border-0 pt-3">
            <h5 class="text-primary fw-bold mb-0">New Users</h5>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive text-nowrap overflow-y-auto">
              <table class="table table-hover align-middle text-nowrap mb-0 w-100">
                <thead class="table-light">
                  <tr>
                    <th scope="col" class="ps-3 py-3 fw-bold align-middle">Username</th>
                    <th scope="col" class="py-3 fw-bold align-middle">Email</th>
                    <th scope="col" class="py-3 fw-bold align-middle">Registration date</th>
                    <th scope="col" class="py-3 fw-bold align-middle">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="ps-3">
                      <div class="d-flex align-items-center gap-2">
                        <div
                          class="bg-secondary-subtle text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                          style="width: 32px; height: 32px"
                        >
                          N
                        </div>
                        <span class="fw-medium">Nguyễn Thị A</span>
                      </div>
                    </td>
                    <td class="text-muted">a@gmail.com</td>
                    <td>2025-10-22</td>
                    <td>
                      <button
                        class="btn badge bg-success-subtle text-success rounded-pill border border-success-subtle"
                      >
                        Approved
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td class="ps-3">
                      <div class="d-flex align-items-center gap-2">
                        <div
                          class="bg-secondary-subtle text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                          style="width: 32px; height: 32px"
                        >
                          N
                        </div>
                        <span class="fw-medium">Nguyễn Thị A</span>
                      </div>
                    </td>
                    <td class="text-muted">a@gmail.com</td>
                    <td>2025-10-22</td>
                    <td>
                      <button
                        class="btn badge bg-warning-subtle text-warning-emphasis rounded-pill border border-warning-subtle"
                      >
                        Pending
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white border-0 pt-3">
        <h5 class="text-primary fw-bold mb-0">Most recently viewed works</h5>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive text-nowrap overflow-y-auto">
          <table class="table table-hover align-middle text-nowrap mb-0 w-100">
            <thead class="table-light">
              <tr>
                <th scope="col" class="ps-3 py-3 fw-bold align-middle">Artwork</th>
                <th scope="col" class="py-3 fw-bold align-middle">Type</th>
                <th scope="col" class="py-3 fw-bold align-middle">Author</th>
                <th scope="col" class="py-3 fw-bold align-middle">Highest price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="ps-3 fw-bold align-middle text-primary">AAAAAA</td>
                <td class="align-middle">Tranh sơn dầu</td>
                <td class="align-middle">Nguyễn Văn A</td>
                <td class="text-success fw-bold align-middle">200.000.000đ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminLive",
  data() {
    return {
      roomId: "auction-001",
      started: false,
      pc: null,
      localStream: null,
      channel: null,
      screenStream: null,
      rtcConfig: { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] },
      // New data for room creation
      creatingRoom: false,
      newRoomId: null,
    };
  },
  methods: {
    async start() {
      try {
        this.started = true;

        // Signaling nội bộ giữa 2 tab
        this.channel = new BroadcastChannel(`webrtc-room:${this.roomId}`);
        this.channel.onmessage = this.onSignal;

        // Tạo peer + lấy camera/mic
        this.pc = new RTCPeerConnection(this.rtcConfig);
        this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        // Note: Code video element logic should be handled if you uncomment the template part
        // this.$refs.localVideo.srcObject = this.localStream;

        this.localStream.getTracks().forEach((t) => this.pc.addTrack(t, this.localStream));

        // ICE
        this.pc.onicecandidate = (e) => {
          if (e.candidate) this.channel.postMessage({ type: "ice", candidate: e.candidate });
        };

        // Tạo offer gửi sang client
        const offer = await this.pc.createOffer();
        await this.pc.setLocalDescription(offer);
        this.channel.postMessage({ type: "offer", sdp: offer });
      } catch (err) {
        console.error("start error", err);
        this.stop();
      }
    },

    async onSignal(ev) {
      if (!this.pc) return;
      const msg = ev.data;

      if (msg.type === "answer" && msg.sdp) {
        await this.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
      }
      if (msg.type === "ice" && msg.candidate) {
        try {
          await this.pc.addIceCandidate(new RTCIceCandidate(msg.candidate));
        } catch {}
      }
    },

    async shareScreen() {
      if (!this.pc) return;
      try {
        this.screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = this.screenStream.getVideoTracks()[0];
        const sender = this.pc.getSenders().find((s) => s.track && s.track.kind === "video");
        if (sender && screenTrack) sender.replaceTrack(screenTrack);

        // Khi dừng chia sẻ, trả lại camera
        screenTrack.onended = () => {
          if (!this.localStream) return;
          const camTrack = this.localStream.getVideoTracks()[0];
          if (camTrack && sender) sender.replaceTrack(camTrack);
          this.screenStream.getTracks().forEach((t) => t.stop());
          this.screenStream = null;
        };
      } catch (e) {
        console.error("shareScreen error", e);
      }
    },

    stop() {
      this.started = false;

      try {
        this.channel?.close();
      } catch {}
      this.channel = null;

      try {
        this.pc?.getSenders().forEach((s) => s.track && s.track.stop());
      } catch {}
      try {
        this.pc?.close();
      } catch {}
      this.pc = null;

      try {
        this.localStream?.getTracks().forEach((t) => t.stop());
      } catch {}
      this.localStream = null;

      try {
        this.screenStream?.getTracks().forEach((t) => t.stop());
      } catch {}
      this.screenStream = null;

      // if (this.$refs.localVideo) this.$refs.localVideo.srcObject = null;
    },
  },
  beforeUnmount() {
    this.stop();
  },
};
</script>
