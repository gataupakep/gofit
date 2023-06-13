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
            <h3 class="bold-underline">Laporan Pendapatan Bulanan</h3>
            <h5>
              Tahun:
              {{ tahunTerpilih }}
            </h5>
            <router-link
              :to="{ name: 'laporanPendapatan.index' }"
              class="btn btn-md btn-success"
              >Tampilkan Data</router-link
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>Pilih Tahun: </label>&nbsp;&nbsp;&nbsp;&nbsp;
            <select v-model="tahunTerpilih" @change="getDataLaporan">
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <!-- Grafik -->
            <div>
              <canvas id="myChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  setup() {
    const laporan_pendapatan_bulanan = ref([]);
    const bulan = ref("");
    const tahunTerpilih = ref("");
    let chart = null; // Variabel untuk menyimpan instance grafik

    const getDataLaporan = () => {
      axios
        .get("https://jesso.ppcdeveloper.com/api/laporanPendapatan", {
          params: { tahun: tahunTerpilih.value },
        })
        .then((response) => {
          laporan_pendapatan_bulanan.value = response.data.data;

          // Hapus grafik sebelumnya jika sudah ada
          if (chart) {
            chart.destroy();
          }

          const ctx = document.getElementById("myChart");
          chart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: laporan_pendapatan_bulanan.value.map((item) =>
                item.bulan.substring(0, 3)
              ),
              datasets: [
                {
                  label: "Total Perbulannya",
                  data: laporan_pendapatan_bulanan.value.map(
                    (item) => item.total
                  ),
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                  ],
                  borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });

          const now = new Date();
          bulan.value = now.toLocaleString("default", { month: "long" });
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    };

    onMounted(() => {
      getDataLaporan();
    });

    return {
      laporan_pendapatan_bulanan,
      bulan,
      tahunTerpilih,
      getDataLaporan,
    };
  },
};
</script>
