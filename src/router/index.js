import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue'; 
import Courses from '../pages/Courses.vue'; 
import LoginPage from '../pages/LoginPage.vue'; 
import RegisterPage from '../pages/RegisterPage.vue';
import CourseMainPage from '../pages/CourseMainPage.vue'; 
import UserProfile from '../pages/UserProfile.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/course/:courseId',
    name: 'Course',
    component: CourseMainPage,
    props: true 
  },
  {
    path: '/user-profile/:userId',
    name: 'UserProfile',
    component: UserProfile,
    props: true, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
