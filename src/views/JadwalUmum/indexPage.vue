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
            <router-link
              :to="{ name: 'jadwalUmum.create' }"
              class="btn btn-md btn-success"
              >TAMBAH JADWAL UMUM</router-link
            >
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Nama Instruktur</th>
                  <th scope="col">Nama Kelas</th>
                  <th scope="col">Sesi</th>
                  <th scope="col">Hari</th>
                  <th scope="col">Waktu Mulai</th>
                  <th scope="col">Waktu Selesai</th>
                  <th scope="col">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(jadwalUmum, id) in jadwalUmums" :key="id">
                  <td>{{ jadwalUmum.instruktur.nama_instruktur }}</td>
                  <td>{{ jadwalUmum.kelas.nama_kelas }}</td>
                  <td>{{ jadwalUmum.sesi }}</td>
                  <td>{{ jadwalUmum.hari }}</td>
                  <td>{{ jadwalUmum.waktu_mulai }}</td>
                  <td>{{ jadwalUmum.waktu_selesai }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'jadwalUmum.edit',
                        params: { id: jadwalUmum.id },
                      }"
                      class="btn btn-sm btn-primary mr-1"
                    >
                      EDIT
                    </router-link>
                    <button
                      @click.prevent="jadwalUmumDelete(jadwalUmum.id)"
                      class="btn btn-sm btn-danger ml-1"
                    >
                      DELETE
                    </button>
                  </td>
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
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  setup() {
    //reactive state
    let jadwalUmums = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://jesso.ppcdeveloper.com/api/jadwalUmum")
        .then((response) => {
          //assign state posts with response data

          jadwalUmums.value = response.data.data;
          let idjadwal = response.data.id;

          localStorage.setItem("idjadwal", idjadwal);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function jadwalUmumDelete(id) {
      axios
        .delete(`https://jesso.ppcdeveloper.com/api/jadwalUmum/${id}`)
        .then(() => {
          //splice departemen
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    return {
      jadwalUmums,
      jadwalUmumDelete,
    };
  },
};
</script>

<style></style>
