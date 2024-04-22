import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import {setupRouter} from '@/router'
import {setupStore} from '@/store'
import { setupHttp } from '@/utils/http';

const app = createApp(App);

//设置路由
setupRouter(app);

//设置全局状态
setupStore(app);

//设置网络请求
setupHttp();

app.mount('#app');
