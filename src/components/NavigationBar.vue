<template>
  <div class="pusher">
    <div class="ui inverted vertical center aligned segment">
      <div class="ui container">
        <div class="ui small secondary inverted pointing menu">
          <!-- Add dynamic class binding to apply 'active' class based on route -->
          <router-link to="/" class="item" exact :class="{ 'active': $route.path === '/' }">Home</router-link>
          <router-link to="/courses" class="item" :class="{ 'active': $route.path === '/courses' }">Courses</router-link>
          <div class="right item">
            <!-- Conditionally render username if logged in -->
            <router-link v-if="isLoggedIn" :to="'/user-profile/' + userId" class="ui inverted green button">
              <i class="user icon"></i>{{ username }}
            </router-link>
            <!-- If not logged in, display login and register button -->
            <router-link v-else to="/login" class="ui inverted green button">
              <i class="sign-in icon"></i>Log in
            </router-link>
            <!-- Register button -->
            <router-link to="/register" v-if="!isLoggedIn" class="ui inverted white button register-button" style="margin-left: 8px;">
              <i class="add user icon"></i>Register
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      username: '',
      token: '',
      userId: '' 
    };
  },
  computed: {
    isLoggedIn() {
      return !!this.token;
    }
  },
  created() {
    // Fetch username, token, and userId from localStorage on component creation
    this.username = localStorage.getItem('username');
    this.token = localStorage.getItem('token');
    this.userId = localStorage.getItem('userId'); 
  },
};
</script>

<style scoped>

</style>
