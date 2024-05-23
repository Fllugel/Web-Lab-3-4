<template>
  <div class="ui raised very padded text container segment" style="margin-top: 50px; margin-bottom: 50px;">
    <div class="ui green ribbon label">Login</div>
    <div class="content" style="margin-top: 15px;">
      <form class="ui form" @submit.prevent="login">
        <div class="field">
          <label>Username</label>
          <input type="text" v-model="username" placeholder="Username">
        </div>
        <div class="field" style="margin-bottom: 15px;">
          <label>Password</label>
          <input type="password" v-model="password" placeholder="Password">
        </div>
        <button type="submit" class="ui fluid large green submit button">Login</button>
        <!-- Display error message -->
        <div v-if="error" class="ui red message">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      token: '',
      userId: '', 
      error: '', 
    };
  },
  methods: {
    async login() {
      this.error = '';

      try {
        const response = await axios.post('http://127.0.0.1:8000/student/login/', {
          username: this.username,
          password: this.password,
        });

        if (response.data.success) {
          this.token = response.data.token;
          this.userId = response.data.user_id; 
          localStorage.setItem('token', this.token);
          localStorage.setItem('username', this.username);
          localStorage.setItem('userId', this.userId);
          this.$router.push('/').then(() => {
            window.location.reload();
          });
        } else {
          this.error = 'Incorrect username or password';
          console.log('Incorrect username or password');
        }
      } catch (error) {
        this.error = 'An error occurred: ' + error.message; 
        console.error(this.error);
      }
    },
  },
};
</script>
