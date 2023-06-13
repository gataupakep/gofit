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
              PERIODE :
              {{ tahunTerpilih }}
            </h5>
            <h5>Tanggal Cetak : {{ tanggalCetak }}</h5>
            <router-link
              :to="{ name: 'pendapatanChart.index' }"
              class="btn btn-md btn-success"
              >Tampilkan chart</router-link
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>Pilih Tahun : </label>&nbsp;&nbsp;&nbsp;&nbsp;
            <select v-model="tahunTerpilih" @change="getDataLaporan">
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th>Bulan</th>
                  <th>Aktivasi</th>
                  <th>Deposit</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(laporan, index) in laporanPendapatan" :key="index">
                  <td>{{ laporan.bulan }}</td>
                  <td>{{ laporan.aktivasi }}</td>
                  <td>{{ laporan.total_deposit }}</td>
                  <td>{{ laporan.total }}</td>
                </tr>
                <tr>
                  <td class="separator" colspan="4"></td>
                </tr>
                <tr>
                  <td class="bold-text"></td>
                  <td class="bold-text">Total</td>
                  <td class="bold-text"></td>
                  <td class="bold-text">{{ totalPendapatan }}</td>
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
    const laporanPendapatan = ref([]);
    const bulan = ref("");
    const tahun = ref("");
    const tanggalCetak = ref("");
    const totalPendapatan = ref(0);
    const tahunTerpilih = ref("");

    const getDataLaporan = () => {
      axios
        .get("https://jesso.ppcdeveloper.com/api/laporanPendapatan", {
          params: { tahun: tahunTerpilih.value },
        })
        .then((response) => {
          laporanPendapatan.value = response.data.data;
          updatetotalPendapatan(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    //format mata uang
    const formatCurrency = (value) => {
      return value.toLocaleString("id-ID");
    };

    const updatetotalPendapatan = (laporanPendapatan) => {
      totalPendapatan.value = laporanPendapatan
        .reduce((total, laporan) => total + laporan.total, 0)
        .toLocaleString("id-ID");

      laporanPendapatan.forEach((laporan) => {
        laporan.aktivasi = formatCurrency(laporan.aktivasi);
        laporan.total_deposit = formatCurrency(laporan.total_deposit);
        laporan.total = formatCurrency(laporan.total);
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

    return {
      laporanPendapatan,
      bulan,
      tahun,
      tanggalCetak,
      totalPendapatan,
      tahunTerpilih,
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
