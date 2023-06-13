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
            <h3 class="bold-underline">Laporan Aktivitas Kelas Bulanan</h3>
            <h5>
              Bulan :
              {{ bulanTerpilih }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tahun :
              {{ tahun }}
            </h5>
            <h5>Tanggal Cetak : {{ tanggalCetak }}</h5>

            <select v-model="bulanTerpilih" @change="getDataLaporan">
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>

            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th>Kelas</th>
                  <th>Instruktur</th>
                  <th>Jumlah Peserta</th>
                  <th>Jumlah Libur</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(laporan, index) in laporanKelas" :key="index">
                  <td>{{ laporan.kelas }}</td>
                  <td>{{ laporan.instruktur }}</td>
                  <td>{{ laporan.jumlah_peserta }}</td>
                  <td>{{ laporan.jumlah_libur }}</td>
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
import { ref, onMounted, watch  } from "vue";
import axios from "axios";

export default {
  setup() {
    //reactive state
    const laporanKelas = ref([]);
    const bulan = ref("");
    const tahun = ref("");
    const tanggalCetak = ref("");
    const bulanTerpilih = ref("");
    const laporanKelasSorted = ref([]);

    const getDataLaporan = () => {
      axios
        .get("https://jesso.ppcdeveloper.com/api/laporanKelas", {
          params: { bulan: bulanTerpilih.value },
        })
        .then((response) => {
          laporanKelas.value = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    };

    // Format tanggal cetak
    const formatDate = (date) => {
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
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

    watch(laporanKelas, (newVal) => {
      laporanKelasSorted.value = newVal.sort((a, b) =>
        a.kelas.localeCompare(b.kelas)
      );
    });

    return {
      laporanKelas: laporanKelasSorted,
      bulan,
      tahun,
      tanggalCetak,
      bulanTerpilih,
      getDataLaporan,
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
