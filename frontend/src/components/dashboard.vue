<template>
  <div>
    <nav>
      <div
        class="flex justify-center items-center bg-red-300 font-bold text-5xl"
      >
        <h1>URL Shortener</h1>
      </div>
    </nav>
    <nav>
      <div
        class="flex justify-center items-center bg-red-100 font-bold text-3xl"
      >
        <router-link to="/dashboard"> Dashboard </router-link>
      </div>
    </nav>
    <nav>
      <div
        class="flex justify-center items-center bg-red-100 font-bold text-3xl"
      >
        <router-link to="/users"> List </router-link>
      </div>
    </nav>
    <div
      class="flex justify-center items-center w-full h-screen bg-neutral-200 text-neutral-900"
    >
      <div class="m-9 p-9 w-96 bg-neutral-50 shadow-lg rounded">
        <h1 class="font-bold text-2xl">Dashboard</h1>
        <h1 class="text-sm">Create New Shorten Link</h1>
        <div class="mt-8">
          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div class="md:col-span-5">
                <label for="destination">Destination</label>
                <input
                  type="url"
                  pattern="https://.*"
                  name="destination"
                  id="destination"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="https://example.com/page"
                  v-model="App.input.dashboard.destination"
                />
              </div>

              <div class="md:col-span-5">
                <label for="link">Shorten Link</label>
                <br />
                <span class="input-group-addon">i.ly/</span>
                <input
                  type="text"
                  name="link"
                  id="link"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  prefixText="i.ly/"
                  v-model="App.input.dashboard.link"
                />
              </div>

              <div class="md:col-span-5 text-right">
                <div class="inline-flex items-end">
                  <button
                    @click="App.addDashboard(App.input.dashboard)"
                    class="bg-red-300 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
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
import { useApp } from "../stores/index";
import { doc, setDoc } from "firebase/firestore";
export default {
  setup() {
    const App = useApp();
    return {
      App,
    };
  },
  created() {},
};
</script>
