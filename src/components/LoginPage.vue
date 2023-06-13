<template>
  <div id="app">
    <div id="login">
      <div id="description">
        <h1>GoFit</h1>
        <p>Login</p>
      </div>
      <div id="form">
        <form @submit.prevent="login">
          <div>
            <label for="email">Email</label>
            <input
              type="text"
              id="email"
              v-model="logins.email"
              placeholder="example@gmail.com"
              autocomplete="off"
            />
          </div>
          <div>
            <label for="password">Password</label>
            <i
              class="fas"
              :class="[passwordFieldIcon]"
              @click="hidePassword = !hidePassword"
            ></i>
            <input
              :type="passwordFieldType"
              id="password"
              v-model="logins.password"
              placeholder="**********"
            />
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  setup() {
    // let timerInterval
    const hidePassword = ref(true);
    const passwordFieldIcon = computed(() => ({
      "fa-eye": hidePassword.value,
      "fa-eye-slash": !hidePassword.value,
    }));

    const passwordFieldType = computed(() =>
      hidePassword.value ? "password" : "text"
    );
    const logins = reactive({
      email: "",
      password: "",
    });
    const validation = ref([]);
    const router = useRouter();

    function login() {
      let email = logins.email;
      let password = logins.password;
      axios
        .post('https://jesso.ppcdeveloper.com/api/login', {
          email: email,
          password: password,
        })
        .then((response) => {
          let id = response.data.id;
          let nama_pegawai = response.data.nama_pegawai;
          let role = response.data.role;
          let user = response.data.user;
          
          localStorage.setItem("user", user);
          localStorage.setItem("nama_pegawai", nama_pegawai);
          localStorage.setItem("role", role);
          localStorage.setItem("id", id);
          if (user == "Pegawai") {
            Swal.fire("Login Succes!", "Welcome, " + nama_pegawai + " (" + role + ")", "success");  
            if (role == "MO") {
              router.push({
                path: "/berandaMO",
                name: "berandaMO",
              });
            } else if (role == "Kasir") {
              Swal.fire("Login Succes!", "Welcome, " + nama_pegawai + " (" + role + ")", "success");
              router.push({
                path: "/berandaKasir",
                name: "berandaKasir",
              });
            } else {
              Swal.fire("Login Succes!", "Welcome, " + nama_pegawai + " (" + role + ")", "success");
              router.push({
                path: "/berandaAdmin",
                name: "berandaAdmin",
              });
            }
          }else {
            Swal.fire("Login Gagal!", "Menu untuk user " + user + " hanya tersedia di mobile", "error");
          }

          // Swal.fire({
          //     title: 'Login Succes!',
          //     text: "Welcome, " + nama_pegawai + ", Click anywhere to close",
          //     // icon: "succes",
          //     timer: 2000,
          //     timerProgressBar: true,
          //     didOpen: () => {
          //         // Swal.getIcon("succes")
          //         Swal.showLoading()
          //         timerInterval = setInterval(() => {
          //         }, 100)
          //     },
          //     willClose: () => {
          //         clearInterval(timerInterval)
          //     }
          // })
          
        })
        .catch((error) => {
          validation.value = error.response.data.message;
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: validation.value,
            showConfirmButton: false,
            timer: 1000
            })
        });
    }

    return {
      logins,
      validation,
      router,
      login,
      passwordFieldIcon,
      passwordFieldType,
      hidePassword,
    };
  },
};
</script>

<!-- colour pallete
#7464bc
#8e75e4
#ffffff
#e26972
#f6ea98 
-->



<style>
* {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
}

div#app {
  width: 100%;
  height: 100%;
}

div#app div#login {
  padding: 100px;
  align-items: center;
  /* background-color: #ffffff; */
  background: linear-gradient(0deg, #ffffff, #8e75e4, #000000);
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

div#app div#login div#description {
  border-radius: 10px;
  width: 300px;
  padding: 90px;
  box-shadow: 0px 0px 30px 0px #f6ea98;
  /* background-color: #8e75e4; */
  /* background: linear-gradient(45deg, #ffffff, #f6ea98, #34495e); */
  background: linear-gradient(45deg, #b4bcff, #7464bc, #b52b79);
  background-size: 600% 600%;
  animation: gradientTransition 3s infinite;
}

div#app div#login div#description h1,
div#app div#login div#description p {
  margin: 0;
}

div#app div#login div#description h1 {
  font-size: 4em;
  color: #f6ea98;
  margin-top: 10px;
}

div#app div#login div#description p {
  font-size: 2em;
  color: #f6ea98;
  margin-top: 10px;
}

div#app div#login div#form {
  font-size: 2em;
  background-color: #7464bc;
  border-radius: 10px;
  box-shadow: 0px 0px 30px 0px #f6ea98;
  color: #ecf0f1;
  width: 500px;
  padding: 70px;
}

div#app div#login div#form label,
div#app div#login div#form input {
  outline: none;
  width: 100%;
}

div#app div#login div#form label {
  color: #f6ea98;
  font-size: 0.8em;
}

div#app div#login div#form input {
  background-color: transparent;
  /* border: none; */
  border-radius: 10px;
  color: #f6ea98;
  font-size: 1em;
  margin-bottom: 20px;
}

div#app div#login div#form ::placeholder {
  color: #f6ea98;
  opacity: 1;
}

div#app div#login div#form button {
  border-radius: 100px;
  background-color: #f6ea98;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 1s ease-in-out;
  width: 100%;
}

div#app div#login div#form button:hover {
  /* background: linear-gradient(90deg, #ded9ee, #7464bc, #b52b79, #8e75e4, #228cdc, #7b1d52, #228cdc, #8e75e4, #b52b79, #ded9ee); */
  background: linear-gradient(90deg, #f6ea98, #7464bc, #b52b79, #7464bc, #f6ea98);
  background-size: 600% 600%;
  animation: gradientTransition 5s ease-in-out infinite;
}

@keyframes gradientTransition {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media screen and (max-width: 600px) {
  div#app div#login {
    display: flex;
    flex-direction: column;
  }

  div#app div#login div#description {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }

  div#app div#login div#form {
    max-width: unset;
    width: 100%;
  }

  div#app div#login div#form form {
    max-width: 280px;
    margin: 0 auto;
  }
}
</style>
