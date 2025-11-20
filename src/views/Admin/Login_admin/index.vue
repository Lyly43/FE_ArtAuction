<template>
  <div
    class="login-page d-flex justify-content-center align-items-center position-relative overflow-hidden vh-100"
  >
    <div
      class="form-login border border-3 rounded-5 opacity-1 d-flex flex-column justify-content-center align-items-center gap-3"
    >
      <h3 class="text-light fw-bold">LOGIN IN</h3>
      <p class="text-light">Please enter your Login and your Password</p>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control rounded-5"
          placeholder="Username or email"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div class="input-group mb-3">
        <input
          type="password"
          class="form-control rounded-5"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
