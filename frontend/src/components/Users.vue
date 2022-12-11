<template>
    <div>
        <nav>
            <div class="flex justify-center items-center bg-red-300 font-bold text-4xl">
            <h1> URL Shortener </h1>
            </div>
        </nav>
        <nav>
            <div class="flex justify-center items-center bg-red-100 font-bold text-2xl">
            <router-link to="/dashboard"> Dashboard </router-link> 
            </div>
        </nav>
        <nav>
            <div class="flex justify-center items-center bg-red-100 font-bold text-2xl">
            <router-link to="/users"> List </router-link> 
            </div>
        </nav>
        <div class="flex justify-center w-full h-screen bg-neutral-200 text-neutral-900">
            <div class="m-9 p-9 w-full bg-neutral-50 shadow-lg">
                <h1 class="font-bold text-2xl">List Links</h1>
                <h1 class="text-sm"></h1>
        
                <div class="overflow-x-auto relative">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    URL
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Shorten Link
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Edit
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Views
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="dashboard in App.dashboards" :key="dashboard.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{dashboard.destination}}
                                </th>
                                <td class="py-4 px-6" >
                                    <span @click="redirect_link(dashboard.link)">
                                        {{dashboard.link}}</span>
                                    
                                </td>
                                <td>
                                    <router-link :to="'/edit/' + dashboard.id"><span class="material-symbols-outlined mr-3 cursor-pointer">
                                        edit
                                    </span></router-link>
                                    <span @click.prevent="App.deleteDashboard(dashboard.id)" class="material-symbols-outlined text-red-700 cursor-pointer">
                                        delete
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>  
        </div>
        <transition>
            <EditUser v-show="this.menu.edit_dashboard.show"/>
        </transition>
    </div>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import {useApp} from '../stores/index';
import EditUser from './EditUser.vue';
// import { routerLink } from 'vue-router';
export default {
    setup() {
      const App = useApp();
      return {
        App,
        dashboards: [],
      menu: {
        edit_dashboard: {
          show: false,
          data: {},
        }
      },
      input: {
        dashboard: {}
      }
      }
    },
    components: {
    },
    created() {
        this.App.getDashboard();
    },
    methods:{
        async redirect_link(link){
        const res = await axios.get(`http://127.0.0.1:3001/dashboard/redirect/${link}`)
        .catch((err) => {
          console.log(err)
        })
        window.location.href= res.data.links.destination
        },
        async deleteDashboard(dashboard_id) {
        // console.log(error);
        await axios.delete('http://127.0.0.1:3001/users/' + dashboard_id)
        .then((response) => {
          if(response.status) {
            Swal.fire({
              title: 'Success!',
              text: `Succesesfully delete shorten link! ${this.dashboards.find(dashboard => dashboard.id === dashboard_id).link}`,
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
          }
        }, (error) => {
          Swal.fire({
            title: 'Error!',
            text: `Seems like there is an error while deleting link ${this.dashboards.find(dashboard => dashboard.id === dashboard_id).link}<br>${error}`,
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
          });
        });
        }
      },
}
</script>
  