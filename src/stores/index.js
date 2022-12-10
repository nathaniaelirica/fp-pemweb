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
      // nambahin user di register
      // async addUser(user) {
      //   await axios.post('http://127.0.0.1:3001/users', {
      //     nama: user.name,
      //     email: user.email,
      //     password: user.password
      //   })
      //   .then((response) => {
      //     if(response.status) {
      //       Swal.fire({
      //         title: 'Success!',
      //         text: `Succesesfully added user ${user.name}`,
      //         icon: 'success',
      //         timer: 1500,
      //         showConfirmButton: false,
      //       });
      //     }
      //   }, (error) => {
      //     Swal.fire({
      //       title: 'Error!',
      //       text: `Seems like there is an error while adding user ${user.name}<br>${error}`,
      //       icon: 'error',
      //       timer: 1500,
      //       showConfirmButton: false,
      //     });
      //   });
      //   this.input.user.name = '';
      //   this.input.user.email = '';
      //   this.input.user.password = '';
      // },

      // async userRegister( email, password ) {
      //   try {
      //     await axios.post('http://127.0.0.1:3001/', {
      //       email: email, 
      //       password: password
      //     })
      //       Swal.fire({
      //         title: 'Success!',
      //         text: `Succesesfully registered`,
      //         icon: 'success',
      //         timer: 1500,
      //         showConfirmButton: false,
      //     });
      //   } catch (error) {
      //     switch(error.code) {
      //       case 'auth/email-already-in-use':
      //         Swal.fire({
      //           title: 'Error!',
      //           text: `Email already in use`,
      //           icon: 'error',
      //           timer: 1500,
      //           showConfirmButton: false,
      //         });
      //         break
      //       case 'auth/invalid-email':
      //         Swal.fire({
      //           title: 'Error!',
      //           text: `Invalid email`,
      //           icon: 'error',
      //           timer: 1500,
      //           showConfirmButton: false,
      //         });
      //         break
      //         case 'auth/operation-not-allowed':
      //           Swal.fire({
      //             title: 'Error!',
      //             text: `Operation not allowed`,
      //             icon: 'error',
      //             timer: 1500,
      //             showConfirmButton: false,
      //           });
      //           break
      //         default:
      //           Swal.fire({
      //             title: 'Error!',
      //             text: `Something went wrong`,
      //             icon: 'error',
      //             timer: 1500,
      //             showConfirmButton: false,
      //           });
      //     }

      //     return

      //   }
      //   router.push('/dashboard')
      // },

      // async userLogin(email, password) {
      //   try {
      //     await axios.post('http://127.0.0.1:3001/login', {
      //       email: email, 
      //       password: password
      //     })
      //       Swal.fire({
      //         title: 'Success!',
      //         text: `Succesesfully logged in`,
      //         icon: 'success',
      //         timer: 1500,
      //         showConfirmButton: false,
      //     });
      //   } catch (error) {
      //     switch(error.code) {
      //       case 'auth/user-not-found':
      //         Swal.fire({
      //           title: 'Error!',
      //           text: `User not found`,
      //           icon: 'error',
      //           timer: 1500,
      //           showConfirmButton: false,
      //         });
      //         break
      //       case 'auth/wrong-password':
      //         Swal.fire({
      //           title: 'Error!',
      //           text: `Wrong password`,
      //           icon: 'error',
      //           timer: 1500,
      //           showConfirmButton: false,
      //         });
      //         break
      //         default:
      //           Swal.fire({
      //             title: 'Error!',
      //             text: `Something went wrong`,
      //             icon: 'error',
      //             timer: 1500,
      //             showConfirmButton: false,
      //           });
      //     }

      //     return

      //   }
      //   router.push('/dashboard')
      // },

      async login(email, password) {
        this.loading = true;
        this.error = null;
        try {
          await axios.post('http://127.0.0.1:3001/login', {
            "email": this.input.user.email,
            "password": this.input.user.password,
          })
          .then((res) => {
            console.log(res)
            this.router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
        } catch (error) {
          console.log(error);
          this.error = error;
        } finally {
          // this.sessionCheck();
          router.push('/dashboard');
          this.loading = false;
        }
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
        this.token = null;
        this.refreshToken = null;
      },
      async signOut() {
        this.loading = true;
        try {
          axios.post(URL_API + "api/signout", {
            user: document.cookie.split("; ").find((row) => row.startsWith("session=")).split("=")[1]
          }, {
            headers: {
              "Authorization": "Bearer " + document.cookie.split("; ").find((row) => row.startsWith("session=")).split("=")[1]
            }
          })
          .then((res) => {
            this.user.logged_in = false;
            router.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
        } catch (error) {
          console.log(error);
          this.error = error;
        } finally {
          document.cookie = "session=; max-age=0";
          this.loading = false;
        }
      },

      async addDashboard(dashboard) {
        await axios.post('http://127.0.0.1:3001/dashboard', {
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
        // console.log(error);
        await axios.delete('http://127.0.0.1:3001/dashboard/' + dashboard_id)
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
      showEditDashboardMenu(dashboard_id) {
        let dashboard = this.dashboards.find(dashboard => dashboard.id === dashboard_id);
        this.menu.edit_dashboard.data = {
          id: dashboard.id,
          destination: dashboard.destination,
          link: dashboard.link,
        };
        this.menu.edit_dashboard.show = true;
      },
      closeEditDashboardMenu() {
        this.menu.edit_dashboard.data = {};
        this.menu.edit_dashboard.show = false;
      },
      async editDashboard(dashboard)  {
        await axios.patch('http://127.0.0.1:3001/dashboard/' + dashboard.id, dashboard)
        .then((response) => {
          if(response.status) {
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
        this.closeEditDashboardMenu();
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