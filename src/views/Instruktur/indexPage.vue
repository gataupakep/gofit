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
              :to="{ name: 'instruktur.create' }"
              class="btn btn-md btn-success"
              >TAMBAH INSTRUKTUR</router-link
            >
            <button
              @click.prevent="resetLate"
              type="button"
              class="btn btn-md btn-dark"
            >
              Reset Terlambat
            </button>
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Nama instruktur</th>
                  <th scope="col">Alamat</th>
                  <th scope="col">Tanggal Lahir</th>
                  <th scope="col">Gender</th>
                  <th scope="col">No Telp</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Jumlah Terlambat</th>
                  <th scope="col">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(instruktur, id) in instrukturs" :key="id">
                  <td>{{ instruktur.nama_instruktur }}</td>
                  <td>{{ instruktur.alamat }}</td>
                  <td>{{ instruktur.tgl_lahir }}</td>
                  <td>{{ instruktur.gender }}</td>
                  <td>{{ instruktur.no_telp }}</td>
                  <td>{{ instruktur.email }}</td>
                  <td>{{ instruktur.password }}</td>
                  <td>{{ instruktur.keterlambatan }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'instruktur.edit',
                        params: { id: instruktur.id },
                      }"
                      class="btn btn-sm btn-primary mr-1"
                    >
                      EDIT
                    </router-link>
                    <button
                      @click.prevent="instrukturDelete(instruktur.id)"
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
import Swal from "sweetalert2";

export default {
  setup() {
    //reactive state
    let instrukturs = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://jesso.ppcdeveloper.com/api/instruktur")
        .then((response) => {
          //assign state posts with response data
          instrukturs.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function instrukturDelete(id) {
      axios
        .delete(`https://jesso.ppcdeveloper.com/api/instruktur/${id}`)
        .then(() => {
          //splice instruktur
          //   instrukturs.value.splice(instrukturs.value.indexOf(id), 1);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    function resetLate() {
      Swal.fire({
        title: "Yakin ingin mereset jumlah terlambat semua instruktur?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .post(`https://jesso.ppcdeveloper.com/api/instruktur_reset_terlambat`)
              .then(() => {
                //splice departemen
                // jadwalHarians.value.splice(jadwalHarians.value.indexOf(id),1)
                window.location.reload();
                Swal.fire(
                  "Reseted!",
                  "Keterlambatan telah berhasil di reset.",
                  "success"
                );
              });
          }
        })
        .catch((error) => {
          Swal.fire(
            "Failed!",
            "Reset hanya bisa dilakukan setiap awal bulan",
            "error"
          );
          console.log(error.response.data);
          
        });
    }
    return {
      instrukturs,
      instrukturDelete,
      resetLate,
    };
  },
};
</script>

<style></style>
