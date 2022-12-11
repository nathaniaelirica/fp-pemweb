<template>
  <div class="flex justify-center items-center w-full h-screen bg-neutral-200 text-neutral-900">
    <div class="m-9 p-9 w-96 bg-neutral-50 shadow-lg">
      <h1 class="font-bold text-2xl">Register</h1>
      <h1 class="text-sm">Please fill out all the fields.</h1>

      <div class="mt-8">
        <div class="lg:col-span-2">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
            <div class="md:col-span-5">
              <label for="full_name">Full Name</label>
              <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" v-model="App.input.user.name" />
            </div>

            <div class="md:col-span-5">
              <label for="email">Email Address</label>
              <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" v-model="App.input.user.email" placeholder="email@domain.com" />
            </div>

            <div class="md:col-span-5">
              <label for="password">Password</label>
              <input type="password" name="password" id="password" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" v-model="App.input.user.password" />
            </div>

            <div class="md:col-span-5 text-right">
              <div class="inline-flex items-end">
                  <h3>Already have an account?</h3><router-link to="/login"><h3 class="linklogin"> Login</h3></router-link>
                  <!-- <router-link to="/"><button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Register</button></router-link> -->
              </div>
              <br>
              <br>
              <div class="inline-flex items-end">
                <button @click="App.register(email, password)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<style>
.linklogin{
    color:red;
    text-decoration: underline red;
}
</style>

<script>
import {useApp} from '../stores/index';
export default {
  setup() {
    const App = useApp();
    return {
      App,
    }
  },
  created() {
  }
}
</script>
