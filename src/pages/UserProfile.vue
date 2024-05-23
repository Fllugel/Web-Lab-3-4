<template>
  <div class="ui raised very padded container segment user-profile" style="margin-top: 30px; margin-bottom: 30px;">
    <div v-if="userData">
      <h1 class="ui header">User Profile</h1>
      <div class="ui list">
        <div class="item mt-1">
          <strong>Username: </strong> 
          <span v-if="!editing">{{ userData.username }}</span>
          <div v-else class="ui input">
            <input type="text" v-model="editedUserData.username">
          </div>
        </div>
        <div class="item mt-1">
          <strong>Email: </strong> 
          <span v-if="!editing">{{ userData.email }}</span>
          <div v-else class="ui input">
            <input type="email" v-model="editedUserData.email">
          </div>
        </div>
        <div class="item mt-1">
          <strong>First Name: </strong> 
          <span v-if="!editing">{{ userData.first_name }}</span>
          <div v-else class="ui input">
            <input type="text" v-model="editedUserData.first_name">
          </div>
        </div>
        <div class="item mt-1">
          <strong>Last Name: </strong> 
          <span v-if="!editing">{{ userData.last_name }}</span>
          <div v-else class="ui input">
            <input type="text" v-model="editedUserData.last_name">
          </div>
        </div>
        <div class="item mt-1">
          <strong>Mobile Phone: </strong> 
          <span v-if="!editing">{{ userData.phone_number }}</span>
          <div v-else class="ui input">
            <input type="text" v-model="editedUserData.phone_number">
          </div>
        </div>
        <div class="item mt-1" style="height: 2.5em;"><strong>Date Joined: </strong> {{ userData.date_joined }}</div>
      </div>
      <div v-if="!editing" style="position: absolute; bottom: 10px; left: 40px;">
        <button @click="startEditing" class="ui basic button">
          <i class="edit icon"></i>Edit Profile
        </button>
      </div>
      <div v-else style="position: absolute; bottom: 10px; left: 40px;">
        <button @click="saveChanges" class="ui green button">
          <i class="save icon"></i>Save Changes
        </button>
        <button @click="cancelEditing" class="ui grey button">
          <i class="cancel icon"></i>Cancel
        </button>
      </div>
      <div style="position: absolute; bottom: 10px; right: 10px;">
        <button @click="logout" class="ui red basic button">
          <i class="sign-out icon"></i>Logout
        </button>
        <button @click="deleteUser" class="ui red button">
          <i class="trash alternate icon"></i>Delete User
        </button>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['userId'],
  data() {
    return {
      userData: null,
      editedUserData: null,
      editing: false
    };
  },
  async created() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/student/${this.userId}`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      this.userData = response.data;
      // Clone userData to editedUserData for editing
      this.editedUserData = { ...response.data };
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },
  methods: {
    async saveChanges() {
      try {
        const token = localStorage.getItem('token');
        await axios.patch(`http://127.0.0.1:8000/student/${this.userId}/`, this.editedUserData, {
          headers: {
            Authorization: `Token ${token}`
          }
        });

        this.userData = { ...this.editedUserData };
        localStorage.setItem('username', this.editedUserData.username);
        this.editing = false;
        window.location.reload();
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    },

    startEditing() {
      this.editing = true;
    },
    cancelEditing() {
      this.editedUserData = { ...this.userData };
      this.editing = false;
    },
    async deleteUser() {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://127.0.0.1:8000/student/${this.userId}`, {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        this.$router.push('/').then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      this.$router.push('/').then(() => {
        window.location.reload();
      });
    },
  },
};
</script>

<style scoped>
.user-profile {
  border: 1px solid rgba(34, 36, 38, .15);
}
</style>
