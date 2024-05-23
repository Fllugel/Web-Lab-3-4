<template>
  <div class="ui raised very padded container segment user-profile">
    <div class="ui two column stackable grid container mt-2">
      <div class="eleven wide column">
        <h1 class="ui header">{{ course.name }}</h1>

        <!-- Introduction -->
        <div class="introduction">
          <p>{{ course.description }}</p>
          <div class="ui success message">
            <div class="header">What you'll learn:</div>
            <ul class="list">
              <li v-for="item in (course.what_you_learn ?? '').split('\n')" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <!-- Video player -->
        <div class="videoplayer mt-2 mb-2">
          <iframe :src="course.video_url" title="YouTube video player"></iframe>
        </div>

        <!-- Requirements -->
        <div class="requirements">
          <div class="ui negative message">
            <div class="header">Requirements:</div>
            <ul class="list">
              <li v-for="item in (course.requirements ?? '').split('\n')" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="five wide column mt-2">
        <!-- Image from course -->
        <img :src="course.image_url" alt="Course Image" style="width: 100%; height: auto; margin-bottom: 10px;">

        <div class="ui warning icon message mt-2">
          <div class="content">
            <div class="header">Looking for help?</div>
            <ul class="list">
              <li>Use our <a href="#">help center</a></li>
              <li>Check our <a href="#">FAQ</a></li>
              <li>Contact <a href="#">admin</a></li>
            </ul>
          </div>
        </div>

        <!-- Enroll Button and Messages -->
        <button class="ui fluid button primary green" @click="enrollInCourse">
          Enroll in Course
        </button>
        <div v-if="successMessage" class="ui positive message">
          <div class="header">Success</div>
          <p>{{ successMessage }}</p>
        </div>
        <div v-if="errorMessage" class="ui negative message">
          <div class="header">Error</div>
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['courseId'],
  data() {
    return {
      course: {},
      successMessage: '',
      errorMessage: ''
    };
  },
  async created() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/course/${this.courseId}/`);
      this.course = response.data;
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  },
  methods: {
    async enrollInCourse() {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        this.errorMessage = 'User not authenticated. Please log in.';
        return;
      }

      try {
        await axios.post(
          `http://127.0.0.1:8000/association/enroll_student/${userId}/${this.courseId}/`,
          {}
        );
        this.successMessage = 'Enrollment successful!';
        this.errorMessage = '';
      } catch (error) {
        console.error('Error enrolling in course:', error);
        this.errorMessage = 'Enrollment failed. Please try again.';
        this.successMessage = '';
      }
    }
  }
};
</script>

<style scoped>
/* Add your component styles here */
</style>
