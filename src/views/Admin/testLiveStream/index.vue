<template>
  <div class="container-fluid">
    <!-- Header với thông tin phòng và controls -->
    <div class="row mb-3">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h4 class="mb-1">
                  <i class="fas fa-broadcast-tower text-danger me-2"></i>
                  Admin Live Stream Control
                </h4>
                <small class="text-muted">
                  Mã phòng: <strong>{{ roomID }}</strong>
                </small>
              </div>
              <div class="d-flex gap-2">
                <button @click="dungPhongDauGia" class="btn btn-outline-danger btn-sm" :disabled="isStoppingRoom">
                  <i v-if="isStoppingRoom" class="fas fa-spinner fa-spin me-1"></i>
                  <i v-else class="fas fa-power-off me-1"></i>
                  {{ isStoppingRoom ? 'Đang dừng...' : 'Dừng phòng đấu giá' }}
                </button>
                <button @click="copyInvite" class="btn btn-outline-primary btn-sm">
                  <i class="fas fa-copy me-1"></i>Copy Link
                </button>
              </div>
            </div>

            <!-- Link mời khán giả -->
            <div class="mt-3">
              <label class="form-label fw-bold">Link mời khán giả:</label>
              <div class="input-group">
                <input type="text" class="form-control" :value="inviteLink" readonly>
                <button @click="copyInvite" class="btn btn-outline-secondary" type="button">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Livestream Container -->
    <div class="row">
      <div class="col-8">
        <div class="card p-0">
          <div class="card-body p-0">
            <!-- <div v-if="error" class="alert alert-danger m-3">
              <i class="fas fa-exclamation-triangle me-2"></i>
              {{ error }}
            </div> -->
            <div v-show="error" class="alert alert-danger m-3">...</div>
            <!-- <div v-else ref="container" style="height: 70vh; width: 100%; background-color: #000;">
            </div> -->
            <div ref="container" style="height:70vh;width:100%;background:#000;"></div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="row">
          <div class="col-md-12 mb-3">
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <i class="fas fa-users text-primary me-2"></i>
                  Thống kê
                </h6>
                <div class="row text-center">
                  <div class="col-4">
                    <div class="border-end">
                      <h5 class="text-primary mb-1">{{ viewerCount || 0 }}</h5>
                      <small class="text-muted">Người xem</small>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="border-end">
                      <h5 class="text-success mb-1">
                        <i class="fas fa-clock me-1"></i>{{ duration || '00:00' }}
                      </h5>
                      <small class="text-muted">Livestream</small>
                    </div>
                  </div>
                  <div class="col-4">
                    <h5 class="text-info mb-1">{{ auctionCountdown.currentSession.value?.orderIndex ?? '-' }}</h5>
                    <small class="text-muted">Section</small>
                  </div>
                </div>

                <!-- Countdown Timer -->
                <div v-if="auctionCountdown.currentSession.value && auctionCountdown.countdownSeconds.value > 0"
                  class="mt-3">
                  <div class="alert alert-warning py-2 text-center">
                    <small class="d-block mb-1">
                      <i class="fas fa-hourglass-half me-1"></i>
                      <strong>Thời gian còn lại:</strong>
                    </small>
                    <h4 class="text-danger mb-0 fw-bold">{{ auctionCountdown.countdownDisplay.value }}</h4>
                  </div>
                </div>
                <div v-else-if="auctionCountdown.currentSession.value" class="mt-3">
                  <div class="alert alert-secondary py-2 text-center">
                    <small class="text-muted">Chưa có phiên đấu giá đang chạy</small>
                  </div>
                </div>

                <!-- Thông tin session hiện tại -->
                <div v-if="auctionCountdown.currentSession.value" class="mt-3">
                  <div class="alert alert-info py-2">
                    <small>
                      <i class="fas fa-info-circle me-1"></i>
                      <strong>Session:</strong> {{ auctionCountdown.currentSession.value.sessionId }} |
                      <strong>Bắt đầu:</strong> {{ formatDateTime(auctionCountdown.currentSession.value.startedAt) }}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <button @click="ketThucSection" class="w-100 btn btn-outline-danger" :disabled="isStoppingSection">
              <i v-if="isStoppingSection" class="fas fa-spinner fa-spin me-2"></i>
              <i v-else class="fas fa-stop me-2"></i>
              {{ isStoppingSection ? 'Đang kết thúc...' : 'Kết thúc section' }}
            </button>
          </div>
          <div class="col-6">
            <button @click="batDauSectionMoi" class="w-100 btn btn-success" :disabled="isStartingSection">
              <i v-if="isStartingSection" class="fas fa-spinner fa-spin me-2"></i>
              <i v-else class="fas fa-play me-2"></i>
              {{ isStartingSection ? 'Đang bắt đầu...' : 'Bắt đầu section' }}
            </button>
          </div>

        </div>
      </div>

    </div>

    <!-- Thông tin bổ sung -->
    <div class="row mt-3">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">
              <i class="fas fa-info-circle text-info me-2"></i>
              Hướng dẫn sử dụng
            </h6>
            <ul class="list-unstyled mb-0">
              <li><i class="fas fa-check text-success me-2"></i>Bật camera và microphone để bắt đầu livestream</li>
              <li><i class="fas fa-check text-success me-2"></i>Chia sẻ link cho khán giả để họ có thể xem</li>
              <li><i class="fas fa-check text-success me-2"></i>Sử dụng các nút điều khiển để quản lý buổi đấu giá</li>
              <li><i class="fas fa-exclamation-triangle text-warning me-2"></i>Sử dụng nút "Stop broadcast" của
                ZEGOCLOUD để dừng</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import useAuctionCountdown from '../../../composables/useAuctionCountdown';

export default {
  props: ["id"],
  data() {
    return {
      // id: this.$route.params.id,
      roomID: this.$route.params.id || this.id, // Lấy từ route params

      user: {},

      error: null,
      inviteLink: "",
      zp: null,
      viewerCount: 0,
      duration: "00:00",
      status: "Đang khởi tạo...",
      startTime: null,
      durationInterval: null,
      isStartingSection: false,
      isStoppingSection: false,
      isStoppingRoom: false,

      // Interval để refresh session data
      sessionRefreshInterval: null,
    }
  },
  setup(props, { expose }) {
    // Sử dụng composable cho auction countdown
    const roomID = props.id || window.location.pathname.split('/').pop();

    // Tạo ref để lưu instance của component (để gọi methods)
    let componentInstance = null;

    const auctionCountdown = useAuctionCountdown(roomID, {
      onSessionStarted: (session) => {
        console.log('✅ Session started callback:', session);
      },
      onSessionEnded: (message) => {
        console.log('⏰ Session ended callback:', message);
      },
      onBidAccepted: (message) => {
        console.log('💰 Bid accepted callback:', message);
      },
      onCountdownEnd: (session) => {
        console.log('⏰ Countdown ended callback:', session);
        // Gọi autoStopSession từ component methods
        if (componentInstance && componentInstance.autoStopSession) {
          componentInstance.autoStopSession();
        }
      },
      onRoomStopped: (message) => {
        console.log('🛑 Room stopped callback:', message);
        // Redirect về dashboard khi phòng bị dừng
        if (componentInstance && componentInstance.$toast) {
          componentInstance.$toast.warning('Phòng đấu giá đã bị dừng.');
        }
        if (componentInstance && componentInstance.$router) {
          setTimeout(() => {
            componentInstance.$router.push('/admin/dashboard');
          }, 1000);
        }
      },
      toast: null, // Toast sẽ được xử lý trong component
    });

    return {
      auctionCountdown,
      setComponentInstance: (instance) => {
        componentInstance = instance;
      }
    };
  },
  mounted() {

    this.user = {
      name: localStorage.getItem("name_kh"),
    };

    // Đảm bảo roomID được set từ route params
    if (this.$route.params.id) {
      this.roomID = this.$route.params.id;
    }

    this.startAsHost();

    // Set component instance để composable có thể gọi methods
    if (this.setComponentInstance) {
      this.setComponentInstance(this);
    }

    // Khởi tạo auction countdown composable
    this.auctionCountdown.initialize();
  },
  beforeUnmount() {
    if (this.durationInterval) {
      clearInterval(this.durationInterval);
    }
    if (this.sessionRefreshInterval) {
      clearInterval(this.sessionRefreshInterval);
    }
    if (this.zp) {
      this.zp.destroy();
    }
    // Composable tự động cleanup qua onUnmounted
  },

  methods: {
    copyInvite() {
      if (this.inviteLink) navigator.clipboard?.writeText(this.inviteLink);
    },


    formatDateTime(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },

    // Load session data để cập nhật currentPrice
    loadCurrentSession() {
      axios
        .get(`http://localhost:8081/api/stream/room/${this.roomID}/sessions/current`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
          }
        })
        .then((res) => {
          if (res.data) {
            // Cập nhật currentSession với data mới (bao gồm currentPrice)
            this.currentSession = res.data;
          }
        })
        .catch((err) => {
          // Không log lỗi 404 vì có thể chưa có session
          if (err.response?.status !== 404) {
            console.error('Error loading session:', err);
          }
        });
    },

    startSessionRefresh() {
      // Load ngay lần đầu
      this.loadCurrentSession();

      // Sau đó load mỗi 2 giây để cập nhật currentPrice
      this.sessionRefreshInterval = setInterval(() => {
        this.loadCurrentSession();
      }, 2000);
    },

    stopSessionRefresh() {
      if (this.sessionRefreshInterval) {
        clearInterval(this.sessionRefreshInterval);
        this.sessionRefreshInterval = null;
      }
    },

    startAsHost() {
      this.status = "Đang khởi tạo...";
      const userName = this.user.name;
      const userID = String(this.$page?.props?.auth?.user?.id ?? `h${Date.now()}`);

      let appID = this.$page?.props?.chatRoom?.appID;
      let serverSecret = this.$page?.props?.chatRoom?.serverSecret;

      if (!appID || !serverSecret) {
        const apiBase = `${window.location.protocol}//${window.location.hostname}:8081`;
        axios.get(`${apiBase}/api/stream/token`, {
          params: { roomId: this.roomID },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((res) => {
            appID = res.data?.appID;
            serverSecret = res.data?.token;
            this.continueStartAsHost(appID, serverSecret, userID, userName);
          })
          .catch((e) => {
            console.error('Error fetching credentials:', e);
            this.error = 'Thiếu Zego appID/serverSecret từ backend. Vui lòng kiểm tra cấu hình.';
            this.status = "Lỗi khởi tạo";
          });
        return;
      }

      this.continueStartAsHost(appID, serverSecret, userID, userName);
    },

    continueStartAsHost(appID, serverSecret, userID, userName) {
      if (!appID || !serverSecret) {
        this.error = 'Thiếu Zego appID/serverSecret từ backend. Vui lòng kiểm tra cấu hình.';
        this.status = "Lỗi khởi tạo";
        return;
      }

      try {
        this.status = "Đang tạo token...";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, this.roomID, userID, userName);

        this.status = "Đang kết nối...";
        this.zp = ZegoUIKitPrebuilt.create(kitToken);

        // Lắng nghe event khi livestream bắt đầu
        const zegoEngine = this.zp.expressEngine;
        if (zegoEngine) {
          zegoEngine.on('publisherStateUpdate', (result) => {
            console.log('Publisher state update:', result);
            if (result.state === 'PUBLISHING') {
              console.log('Livestream started - Starting timer...');
              if (!this.startTime) {
                this.startTime = new Date();
                this.startDurationTimer();
                this.status = "Đang livestream";
              }
            }
          });
        }

        // Cấu hình tối giản - để ZEGOCLOUD hoạt động theo mặc định
        this.zp.joinRoom({
          container: this.$refs.container,
          scenario: { mode: ZegoUIKitPrebuilt.LiveStreaming, config: { role: ZegoUIKitPrebuilt.Host } },
          sharedLinks: [{
            name: 'Join as Audience',
            url: `${window.location.origin}/client/auction-room/${this.roomID}?role=audience`,
          }],
          // Cấu hình cho Admin Host
          turnOnCameraWhenJoining: true,
          showMyCameraToggleButton: true,
          showAudioVideoSettingsButton: true,
          showScreenSharingButton: true,
          showTextChat: true,
          showUserList: true,
          showLeaveButton: false,
          showLeaveRoomConfirmDialog: false,
        });





        this.inviteLink = `${window.location.origin}/client/auction-room/${this.roomID}?role=audience`;
        this.status = "Đã sẵn sàng - Nhấn Go Live";

      } catch (error) {
        console.error('Error starting livestream:', error);
        this.error = 'Lỗi khởi tạo livestream: ' + error.message;
        this.status = "Lỗi";
      }
    },

    startDurationTimer() {
      this.durationInterval = setInterval(() => {
        if (this.startTime) {
          const now = new Date();
          const diff = Math.floor((now - this.startTime) / 1000);
          const hours = Math.floor(diff / 3600);
          const minutes = Math.floor((diff % 3600) / 60);
          const seconds = diff % 60;

          // Hiển thị theo định dạng: HH:MM:SS
          if (hours > 0) {
            this.duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          } else {
            this.duration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          }
        }
      }, 1000);
    },

    batDauSectionMoi() {
      if (this.isStartingSection) return;

      this.isStartingSection = true;

      axios
        .post(`http://localhost:8081/api/stream/room/${this.roomID}/start-next`, {}, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
          }
        })
        .then((res) => {
          this.currentSession = res.data;
          console.log("Session started successfully", this.currentSession);
          this.$toast.success(`Đã bắt đầu section mới: ${res.data.sessionId}`);

          // Bắt đầu refresh session data để cập nhật currentPrice
          this.startSessionRefresh();
        })
        .catch((err) => {
          console.error(err);

          // Xử lý lỗi "session already running"
          const errorMessage = err.response?.data?.message || err.message;
          if (errorMessage.includes('session is already running')) {
            this.$toast.error('Đã có session đang chạy! Vui lòng kết thúc session hiện tại trước khi bắt đầu session mới.');
          } else {
            this.$toast.error('Lỗi bắt đầu section: ' + errorMessage);
          }
        })
        .finally(() => {
          this.isStartingSection = false;
        });
    },

    ketThucSection() {
      if (this.isStoppingSection) return;

      // Kiểm tra có session hiện tại không
      if (!this.currentSession || !this.currentSession.sessionId) {
        this.$toast.error('Không có session nào đang chạy để kết thúc');
        return;
      }

      this.isStoppingSection = true;

      axios
        .post(`http://localhost:8081/api/stream/stop-session/${this.currentSession.sessionId}`, {}, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
          }
        })
        .then((res) => {
          console.log("Session stopped successfully", res.data);
          this.$toast.success(`Đã kết thúc section: ${this.currentSession.sessionId}`);
          this.currentSession = null; // Xóa session hiện tại
        })
        .catch((err) => {
          console.error(err);
          this.$toast.error('Lỗi kết thúc section: ' + (err.response?.data?.message || err.message));
        })
        .finally(() => {
          this.isStoppingSection = false;
        });
    },

    formatDateTime(dateString) {
      if (!dateString) return '-';
      try {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      } catch (error) {
        return dateString;
      }
    },

    dungPhongDauGia() {
      if (this.isStoppingRoom) return;

      // Xác nhận trước khi dừng
      if (!confirm('Bạn có chắc chắn muốn dừng phòng đấu giá? Hành động này không thể hoàn tác!')) {
        return;
      }

      this.isStoppingRoom = true;

      axios
        .post(`http://localhost:8081/api/stream/stop/${this.roomID}`, {}, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
          }
        })
        .then((res) => {
          console.log("Room stopped successfully", res.data);
          this.$toast.success('Đã dừng phòng đấu giá thành công!');

          // Redirect về trang chủ hoặc trang quản lý
          this.$router.push('/admin/dashboard');
        })
        .catch((err) => {
          console.error(err);
          this.$toast.error('Lỗi dừng phòng đấu giá: ' + (err.response?.data?.message || err.message));
        })
        .finally(() => {
          this.isStoppingRoom = false;
        });
    },

    // Tự động dừng session khi hết thời gian countdown
    autoStopSession() {
      // Kiểm tra có session hiện tại không (từ composable)
      if (!this.auctionCountdown.currentSession.value || !this.auctionCountdown.currentSession.value.sessionId) {
        console.warn('No active session to auto-stop');
        return;
      }

      // Tránh gọi API nếu đang trong quá trình dừng
      if (this.isStoppingSection) {
        console.warn('Session is already being stopped');
        return;
      }

      console.log('🤖 Auto-stopping session:', this.auctionCountdown.currentSession.value.sessionId);

      axios
        .post(`http://localhost:8081/api/stream/stop-session/${this.auctionCountdown.currentSession.value.sessionId}`, {}, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
          }
        })
        .then((res) => {
          console.log("✅ Session auto-stopped successfully", res.data);
          this.$toast?.success?.('✅ Session đã tự động kết thúc!');

          // Composable sẽ tự động reset khi nhận SESSION_ENDED từ WebSocket
        })
        .catch((err) => {
          console.error('❌ Error auto-stopping session:', err);

          // Chỉ hiển thị lỗi nếu không phải 404 (session đã kết thúc)
          if (err.response?.status !== 404) {
            this.$toast?.error?.('Lỗi tự động kết thúc session: ' + (err.response?.data?.message || err.message));
          } else {
            console.log('Session already ended on server side');
          }
        });
    },


  },

  watch: {
    // Tự động cập nhật roomID khi route params thay đổi
    '$route.params.id'(newId) {
      if (newId) {
        this.roomID = newId;
        this.id = newId;
        // Reconnect WebSocket với roomID mới
        this.disconnectAuctionWebSocket();
        this.connectAuctionWebSocket();
        this.loadCurrentSessionForCountdown();
      }
    }
  },

  computed: {
    countdownDisplay() {
      if (this.countdownSeconds <= 0) return '0:00';
      const minutes = Math.floor(this.countdownSeconds / 60);
      const seconds = this.countdownSeconds % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }
}
</script>
<style></style>
