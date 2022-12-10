<template>
    <div class="w-full h-screen absolute top-0 bg-neutral-900 bg-opacity-50">
        <div class="flex justify-center items-center w-full h-screen text-neutral-900">
            <div class="relative m-9 p-9 w-1/3 bg-neutral-50 shadow-lg">
                <div @click="this.App.closeEditDashboardMenu()" class="h-9 w-9 flex justify-center items-center bg-neutral-800 absolute -right-3 -top-3 rounded-full cursor-pointer">
                    <span class="material-symbols-outlined text-neutral-50">
                        close
                    </span>
                </div>
                <h1 class="font-bold text-2xl">Edit Input</h1>
                
                <div class="mt-3">
                    <div class="lg:col-span-2">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-5">
                        <label for="destination">Destination</label>
                        <input type="text" name="destination" id="destination" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" :value="App.menu.edit_dashboard.data.destination" />
                        </div>
            
                        <div class="md:col-span-5">
                        <label for="link">Link</label>
                        <input type="text" name="link" id="link" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" v-model="App.menu.edit_dashboard.data.link" />
                        </div>
            
                        <div class="md:col-span-5 text-right">
                        <div class="inline-flex items-end">
                            <!-- ini belom -->
                            <button @click="App.editDashboard(App.menu.edit_dashboard.data)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>  
        </div>
    </div>
  </template>
  
  <script>
  import {useApp} from '../stores/index';
  export default {
    data() {
        return {
            dashboard: this.App.menu.edit_dashboard.data
        }
    },
    setup() {
      const App = useApp();
      return {
        App,
      }
    },
    created() {
    },
  }
  </script>
  