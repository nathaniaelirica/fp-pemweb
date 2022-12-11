import { defineStore } from "pinia";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
} from "firebase/firestore";
import Swal from 'sweetalert2';
import router from "../router/index.js";
// import router from "../../router";

// isikan firebaseConfig disini
const firebaseConfig = {
  apiKey: "AIzaSyAl2FJtHkAZ_LVKFLpi50mRrsW8pPetYK0",
  authDomain: "fp-pemweb-ddd4a.firebaseapp.com",
  projectId: "fp-pemweb-ddd4a",
  storageBucket: "fp-pemweb-ddd4a.appspot.com",
  messagingSenderId: "938514468868",
  appId: "1:938514468868:web:67e04aba0ff08084f46551"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export const useApp = defineStore({
    id: "App",
    state: () => ({
      users: [],
      dashboards: [],
      menu: {
        edit_dashboard: {
          show: false,
          data: {},
        }
      },
      input: {
        user: {},
        dashboard: {}
      }
    }),
    actions: {
      // async getUsers() {
      //   // fungsi get users biar masuk firestore
      //   onSnapshot(collection(db, "users"), (querySnapshot) => {
      //     let users = [];
      //     querySnapshot.forEach((doc) => {
      //       users.push({ id: doc.id, ...doc.data() });
      //     });
      //     this.users = users;
      //   },
      //   error => {
      //     Swal.fire({
      //       title: 'Error!',
      //       text: `Seems like there is an error while connecting to Firestore<br>${error}`,
      //       icon: 'error',
      //       confirmButtonText: 'Cool'
      //     });
      //   }
      //   );
      // },
      async getDashboard() {
        // fungsi get dashboards biar masuk firestore
        onSnapshot(collection(db, "dashboards"), (querySnapshot) => {
          let dashboards = [];
          querySnapshot.forEach((doc) => {
            dashboards.push({ id: doc.id, ...doc.data() });
          });
          this.dashboards = dashboards;
        },
        error => {
          Swal.fire({
            title: 'Error!',
            text: `Seems like there is an error while connecting to Firestore<br>${error}`,
            icon: 'error',
            confirmButtonText: 'Cool'
          });
        }
        );
      },

      async login(email, password) {
        // this.loading = true;
        // this.error = null;
          await axios.post('http://127.0.0.1:3001/login', {
            "email": this.input.user.email,
            "password": this.input.user.password,
          })
          .then((response) => {
            console.log(response.data.userid)
            localStorage.setItem("userId", response.data.userid)
            router.push("/dashboard");
          })
          .catch((err) => {
            (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Your account is not registered'
              })
            }
            });
        this.input.user.email = '',
        this.input.user.password = ''
      },
      async register(email, password) {
        this.loading = true;
        this.error = null;
        console.log("register");
        try {
          await axios
            .post('http://127.0.0.1:3001/', {
              // email : this.email,
              // password: this.password,
              "email": this.input.user.email,
              "password": this.input.user.password,
            })
            .then((res) => {
              console.log(res);
              router.push('/login');
            })
            .catch((error) => {
              // Todo: Handle error
              console.log(error);
              // if (
              //   error.response.data.message.code === "auth/email-already-in-use"
              // ) {
              //   alert("Email already in use");
              // }
            });
          this.user = data.user;
          this.token = data.token;
          this.refreshToken = data.refreshToken;
        } catch (error) {
          this.error = error;
          // console.log(error);
        } finally {
          this.loading = false;
        }
        router.push('/dashboard');
      },
      async logout() {
        this.user = null;
        router.push("/login");
      },

      async addDashboard(dashboard) {
        await axios.post('http://127.0.0.1:3001/dashboard', {
          id: dashboard.id,
          destination : dashboard.destination,
          link : dashboard.link
        })
        .then((response) => {
          console.log(response)
          if(response.status) {
            Swal.fire({
              title: 'Success!',
              text: `Succesesfully added Shorten Link!`,
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
          }
        }, (error) => {
          Swal.fire({
            title: 'Error!',
            text: `Seems like there is an error while adding link <br>${error}`,
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
          });
        });
        this.input.dashboard.destination = '';
        this.input.dashboard.link = '';

        router.push('/users');
      },

      async deleteDashboard(dashboard_id) {
        await axios.delete('http://127.0.0.1:3001/users/' + dashboard_id)
        .then((response) => {
          console.log("test");
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
      // showEditDashboardMenu(dashboard_id) {
      //   let dashboard = this.dashboards.find(dashboard => dashboard.id === dashboard_id);
      //   this.menu.edit_dashboard.data = {
      //     id: dashboard.id,
      //     destination: dashboard.destination,
      //     link: dashboard.link,
      //   };
      //   this.menu.edit_dashboard.show = true;
      // },
      // closeEditDashboardMenu() {
      //   this.menu.edit_dashboard.data = {};
      //   this.menu.edit_dashboard.show = false;
      // },
      async editDashboard(dashboard)  {
        await axios.patch('http://127.0.0.1:3001/edit/' + dashboard.id, dashboard)
        .then((response) => {
          if(response.status) {
            console.log("test")
            Swal.fire({
              title: 'Success!',
              text: `Succesesfully update link ${dashboard.link}`,
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
          }
        }, (error) => {
          Swal.fire({
            title: 'Error!',
            text: `Seems like there is an error while updating link ${dashboard.link}<br>${error}`,
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
          });
        });
        // this.closeEditDashboardMenu();
      },
      
    //   checkUsers(user){
    //     // let user = this.users.find(user => user.id === user_id);
    //     if ( this.input.user.email == user.email && this.input.user.password == user.password) {
    //       target.innerHTML += <RouterLink to="/dashboard"></RouterLink>
    //     }
    //     else {
    //         <RouterLink to="/"></RouterLink>
    //   }
    // },
  });   