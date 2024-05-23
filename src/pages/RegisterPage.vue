<template>
    <div class="ui raised very padded text container segment" style="margin-top: 50px; margin-bottom: 50px;">
      <div class="ui green ribbon label">Register</div>
      <div class="content" style="margin-top: 15px;">
        <form class="ui form" @submit.prevent="register">
          <!-- Input fields for registration -->
          <div class="field">
            <label>Username</label>
            <input type="text" v-model="username" placeholder="Username">
          </div>
          <div class="field">
            <label>Email</label>
            <input type="email" v-model="email" placeholder="Email">
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" v-model="password1" placeholder="Password">
          </div>
          <div class="field">
            <label>Confirm Password</label>
            <input type="password" v-model="password2" placeholder="Confirm Password">
          </div>
          <div class="field">
            <label>First Name</label>
            <input type="text" v-model="firstName" placeholder="First Name">
          </div>
          <div class="field">
            <label>Last Name</label>
            <input type="text" v-model="lastName" placeholder="Last Name">
          </div>
          <div class="field" style="margin-bottom: 15px;">
            <label>Phone Number</label>
            <input type="text" v-model="phoneNumber" placeholder="Phone Number">
          </div>
          <!-- Submit button -->
          <button type="submit" class="ui fluid large green submit button">Register</button>
          <!-- Display error messages -->
          <div v-if="error" class="ui red message">
            <div v-for="(messages, field) in error.errors" :key="field">
              <strong>{{ field }}</strong>
              <ul>
                <li v-for="message in messages" :key="message">{{ message }}</li>
              </ul>
            </div>
          </div>
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
        email: '',
        password1: '',
        password2: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        error: null,
      };
    },
    methods: {
      async register() {
        this.error = null;
  
        try {
          const response = await axios.post('http://127.0.0.1:8000/student/register/', {
            username: this.username,
            email: this.email,
            password1: this.password1,
            password2: this.password2,
            first_name: this.firstName,
            last_name: this.lastName,
            phone_number: this.phoneNumber,
          });
  
          if (response.data.success) {
            this.$router.push('/login');
          } else {
            this.error = response.data;
          }
        } catch (error) {
          this.error = 'An error occurred: ' + error.message;
          console.error(this.error);
        }
      },
    },
  };
  </script>
  