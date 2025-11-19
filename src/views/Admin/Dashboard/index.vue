<template>
  <div class="container py-3">
    <!-- <h4 class="text-primary">🎬 Admin Livestream</h4> -->

    <!-- Card tạo phòng mới -->
    <!-- <div class="row mb-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-primary">🎥 Tạo phòng livestream mới</h5>
            <p class="card-text">Tạo một phòng auction mới và bắt đầu livestream</p>
            <button class="btn btn-success btn-lg" :disabled="creatingRoom" @click="createNewRoom">
              <span v-if="creatingRoom" class="spinner-border spinner-border-sm me-2"></span>
              {{ creatingRoom ? "Đang tạo..." : "Tạo phòng mới" }}
            </button>
            <div v-if="newRoomId" class="mt-2">
              <small class="text-muted"
                >Room ID: <strong>{{ newRoomId }}</strong></small
              >
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- Phần livestream cũ -->
    <!-- <div class="card">
      <div class="card-body">
        <h5 class="card-title">📺 Livestream hiện tại</h5>
        <div class="d-flex gap-2 mb-3">
          <input v-model="roomId" class="form-control" placeholder="Room ID" style="max-width:240px" />
          <button class="btn btn-primary" :disabled="started" @click="start">Start</button>
          <button class="btn btn-secondary" :disabled="!started" @click="shareScreen">Share Screen</button>
          <button class="btn btn-danger" :disabled="!started" @click="stop">Stop</button>
        </div>

        <video ref="localVideo" autoplay playsinline muted
               style="width:100%;border-radius:8px;border:1px solid #ddd"></video>
        <p class="mt-2 text-muted">Status: {{ started ? 'Broadcasting' : 'Idle' }}</p>
      </div>
    </div> -->

    <h4 class="fw-bold text-primary">Dashboard</h4>
    <p class="text-body-secondary">Overview of the painting auction system</p>
    <div class="row mb-4 d-flex align-items-center justify-content-between">
      <div class="col-12 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Total users</h6>
              <i class="fa-solid fa-users text-primary"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">120</p>
            <small class="text-success">+12.5% ​​over last month</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Artwork</h6>
              <i class="fa-solid fa-image"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">100</p>
            <small class="text-success">+12.5% ​​over last month</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Phòng đấu giá</h6>

              <i class="fa-solid fa-hammer"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">10</p>
            <small class="text-body-secondary">23 rooms are in operation</small>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4 d-flex align-items-center justify-content-between">
      <div class="col-12 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Bidding</h6>
              <i class="fa-solid fa-chart-line text-success"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">120</p>
            <small class="text-success">+12.5% ​​over last month</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Revenue</h6>
              <i class="fa-solid fa-dollar-sign text-warning"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">100</p>
            <small class="text-success">+12.5% ​​over last month</small>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <h6 class="card-subtitle mb-2 text-body-secondary">Active</h6>
              <i class="fa-solid fa-user-check text-success"></i>
            </div>
            <p class="card-text fw-bold fs-5 mb-2">10</p>
            <small class="text-body-secondary">10 people are active</small>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4 d-flex align-items-center justify-content-between">
      <!-- Phòng đấu giá gần đây -->
      <div class="col-12 col-lg-6">
        <div class="border border-1 border-secondary p-3 bg-light h-100 rounded-2">
          <h5>Nearby auction rooms</h5>
          <div class="table-responsive mt-4">
            <table class="table table-hover align-middle">
              <thead class="table-light">
                <tr class="bg-secondary">
                  <th scope="col">Auction room name</th>
                  <th scope="col">Artwork</th>
                  <th scope="col">Status</th>
                  <th scope="col">Current price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tranh sơn dầu</td>
                  <td>Tranh phong cảnh mùa thu</td>
                  <td><small class="text-danger shadow">In progress</small></td>
                  <td>10.000đ</td>
                </tr>

                <tr>
                  <td>Tranh sơn dầu</td>
                  <td>Tranh phong cảnh mùa thu</td>
                  <td><small class="text-warning shadow">Coming soon</small></td>
                  <td>10.000đ</td>
                </tr>

                <tr>
                  <td>Tranh sơn dầu</td>
                  <td>Tranh phong cảnh mùa thu</td>
                  <td><small class="text-body-secondary shadow">End</small></td>
                  <td>10.000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Người dùng mới -->
      <div class="col-12 col-lg-6">
        <div class="border border-1 border-secondary p-3 bg-light h-100 rounded-2">
          <h5>New User</h5>
          <div class="table-responsive mt-4">
            <table class="table table-hover align-middle">
              <thead class="table-light">
                <tr class="bg-secondary">
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Registration date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nguyễn Thị A</td>
                  <td>a@gmail.com</td>
                  <td>2025-10-22</td>
                  <td><small class="text-success shadow">Approved</small></td>
                </tr>

                <tr>
                  <td>Nguyễn Thị A</td>
                  <td>a@gmail.com</td>
                  <td>2025-10-22</td>
                  <td><small class="text-body-secondary shadow">Pending approval</small></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Tác phẩm được quan tâm gần đây nhất -->
    <div class="border border-1 border-secondary p-3 bg-light mt-3 rounded-2">
      <h5>Most recently viewed works</h5>
      <div class="table-responsive mt-4">
        <table class="table table-hover align-middle">
          <thead class="table-light fw-bold">
            <tr class="bg-secondary fw-bold">
              <th scope="col">Artwork</th>
              <th scope="col">Type</th>
              <th scope="col">Author</th>
              <th scope="col">Highest price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AAAAAA</td>
              <td>Tranh sơn dầu</td>
              <td>Nguyễn Văn A</td>
              <td>200.000.000đ</td>
            </tr>
          </tbody>
        </table>
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
        this.$refs.localVideo.srcObject = this.localStream;
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

      if (this.$refs.localVideo) this.$refs.localVideo.srcObject = null;
    },
  },
  beforeUnmount() {
    this.stop();
  },
};
</script>
