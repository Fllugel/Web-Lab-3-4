<template>
  <div class="courses-page">
    <div class="ui fluid action input search-bar">
      <input type="text" v-model="searchQuery" @keyup.enter="searchCourses" placeholder="Search courses...">
      <button class="ui green button" @click="searchCourses">Search</button>
    </div>
    <div class="course-list">
      <div v-for="course in courses" :key="course.id" class="course" @click="navigateToCourse(course.id)">
        <div class="course-info">
          <h2>{{ course.name }}</h2>
          <p>{{ course.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoursesPage',
  data() {
    return {
      courses: [],
      searchQuery: ''
    };
  },
  methods: {
    async fetchCourses() {
      try {
        let url = 'http://127.0.0.1:8000/course/';
        if (this.searchQuery.trim() !== '') {
          url = `http://127.0.0.1:8000/course/courses/search/${encodeURIComponent(this.searchQuery)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        this.courses = data;
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    },
    async searchCourses() {
      try {
        let url = 'http://127.0.0.1:8000/course/';
        if (this.searchQuery.trim() !== '') {
          url = `http://127.0.0.1:8000/course/courses/search/${encodeURIComponent(this.searchQuery)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        this.courses = data;
      } catch (error) {
        console.error('Error searching courses:', error);
      }
    },
    navigateToCourse(courseId) {
      this.$router.push(`/course/${courseId}`); 
    }
  },
  mounted() {
    // Fetch all courses when the component is mounted
    this.fetchCourses();
  }
};
</script>


<style scoped>
/* Styles for CoursesPage.vue */
.courses-page {
  padding: 20px;
}
.search-bar {
  margin-bottom: 20px;
}
.course {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer; /* Add pointer cursor to indicate clickable */
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}
.course-info {
  flex-grow: 1;
}
</style>
