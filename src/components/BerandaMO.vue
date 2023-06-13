<template>
  <header
    class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
  >
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#"
      >Hi, {{ nama_pegawai }} (MO)
    </a>
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
      <button type="button" class="btn btn-danger" @click.prevent="logout">
        Logout
      </button>
    </a>
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
  </header>

  <div class="container-fluid">
    <div class="row">
      <nav
        id="sidebarMenu"
        class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <!-- view jadwal umum -->
            <li class="nav-item">
              <router-link :to="{ name: 'jadwalUmum.index' }" class="nav-link"
                >Jadwal Umum</router-link
              >
            </li>

            <!-- view jadwal harian -->
            <li class="nav-item">
              <router-link :to="{ name: 'jadwalHarian.index' }" class="nav-link"
                >Jadwal Harian</router-link
              >
            </li>

            <!-- view absen instruktur -->
            <li class="nav-item">
              <router-link
                :to="{ name: 'absenInstruktur.index' }"
                class="nav-link"
                >Perizinan Instruktur</router-link
              >
            </li>

            <!-- view laporan -->
            <li class="nav-item">
              <router-link
                :to="{ name: 'laporanPendapatan.index' }"
                class="nav-link"
                >Laporan Pendapatan</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'laporanKelas.index' }" class="nav-link"
                >Laporan Kelas</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'laporanGym.index' }" class="nav-link"
                >Laporan Gym</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'laporanKinerjaInstruktur.index' }"
                class="nav-link"
                >Laporan Instruktur</router-link
              >
            </li>
          </ul>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <!-- View Route -->
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Swal from "sweetalert2";

export default {
  setup() {
    const nama_pegawai = localStorage.getItem("nama_pegawai");

    function logout() {
      Swal.fire({
        title: "Hi, " + nama_pegawai,
        text: "Do you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push({
            path: "/",
            name: "login",
          });
          Swal.fire("Logged out!", "Your has been looged out.", "success");
        }
      });
    }
    
    return {
      logout,
      nama_pegawai,
    };
  },
};
</script>

<style>
body {
  font-size: 0.875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #727272;
}

.sidebar .nav-link.active {
  color: #2470dc;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

/*
    * Navbar
    */
.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .navbar-toggler {
  top: 0.25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>
