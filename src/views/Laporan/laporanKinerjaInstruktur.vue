<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Dashboard</h1>
    </div>
  
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h3 class="bold-text">Gofit</h3>
              <h5>Jl. Centralpark No. 10 Yogyakarta</h5>
              <p></p>
              <h3 class="bold-underline">Laporan Kinerja Instruktur Bulanan</h3>
              <h5>Bulan : {{ bulan }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tahun : {{ tahun }}</h5>
              <h5>Tanggal Cetak : {{ tanggalCetak }}</h5>
              
              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th>Nama</th>
                    <th>Jumlah Hadir</th>
                    <th>Jumlah Libur</th>
                    <th>Waktu Terlambat (detik)</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="(laporan, index) in laporanKinerjaInstruktur" :key="index">
                    <td>{{ laporan.nama_instruktur }}</td>
                    <td>{{ laporan.jumlah_hadir }}</td>
                    <td>{{ laporan.jumlah_libur }}</td>
                    <td>{{ laporan.total_terlambat }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  export default {
    setup() {
      //reactive state
      const laporanKinerjaInstruktur = ref([]);
      const bulan = ref("");
      const tahun = ref("");
      const tanggalCetak = ref("");
  
      const getDataLaporan = () => {
        axios
          .get("https://jesso.ppcdeveloper.com/api/laporanKinerjaInstruktur")
          .then((response) => {
            laporanKinerjaInstruktur.value = response.data.data;
            sortByTotalTerlambat();

          })
          .catch((error) => {
            console.error(error);
          });
      };
  
        // Format tanggal cetak
        const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      };
  
      onMounted(() => {
        getDataLaporan();
  
        const now = new Date();
        bulan.value = now.toLocaleString("default", { month: "long" });
        tahun.value = now.getFullYear();
        tanggalCetak.value = formatDate(now);
      });
  
      const sortByTotalTerlambat = () => {
        laporanKinerjaInstruktur.value.sort((a, b) => a.total_terlambat - b.total_terlambat);
      };

      return {
        laporanKinerjaInstruktur,
        bulan,
        tahun,
        tanggalCetak,
        
      };
    },
  };
  </script>
  
  <style scoped>
  .separator {
    border-top: 5px solid #000;
    font: bold;
  }
  .bold-text {
    font-weight: bold;
  }
  
  .bold-underline {
    font-weight: bold;
    text-decoration: underline;
  }
  </style>