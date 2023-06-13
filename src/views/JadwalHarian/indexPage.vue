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
              :to="{ name: 'jadwalHarian.create' }"
              class="btn btn-md btn-success"
              >GENERATE JADWAL HARIAN</router-link
            >
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Nama Instruktur</th>
                  <th scope="col">Nama Kelas</th>
                  <th scope="col">Hari</th>
                  <th scope="col">Sesi</th>
                  <th scope="col">Waktu Mulai</th>
                  <th scope="col">Waktu Selesai</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Status</th>
                  <th scope="col">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(jadwalHarian, id) in jadwalHarians" :key="id">
                  <td>{{ jadwalHarian.instruktur.nama_instruktur }}</td>
                  <td>{{ jadwalHarian.kelas.nama_kelas }}</td>
                  <td>{{ jadwalHarian.hari }}</td>
                  <td>{{ jadwalHarian.sesi }}</td>
                  <td>{{ jadwalHarian.waktu_mulai }}</td>
                  <td>{{ jadwalHarian.waktu_selesai }}</td>
                  <td>{{ jadwalHarian.tanggal }}</td>
                  <td>{{ jadwalHarian.status_kelas }}</td>
                  <td class="text-center">
                    <!-- <router-link
                      :to="{
                        name: 'jadwalHarian.edit',
                        params: { id: jadwalHarian.id },
                      }"
                      class="btn btn-sm btn-primary mr-1"
                    >
                      EDIT
                    </router-link> -->
                    <button
                      @click.prevent="changeStatus(jadwalHarian.id)"
                      type="button"
                      class="btn btn-sm btn-dark"
                    >
                      Ubah Status
                    </button>
                    <button
                      @click.prevent="jadwalHarianDelete(jadwalHarian.id)"
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
    let jadwalHarians = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://jesso.ppcdeveloper.com/api/jadwalHarian")
        .then((response) => {
          //assign state posts with response data

          jadwalHarians.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function jadwalHarianDelete(id) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`https://jesso.ppcdeveloper.com/api/jadwalHarian/${id}`)
              .then(() => {
                //splice departemen
                window.location.reload();
              })
              .catch((error) => {
                console.log(error.response.data);
              });
            swalWithBootstrapButtons.fire("Data has been deleted.");
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire("Cancelled");
          }
        });
    }

    function changeStatus(id) {
      Swal.fire({
        title: "Yakin ingin mengubah status kelas?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Status kelas telah diubah!",
              "Status telah berhasil diubah.",
              "success"
            );
            axios
              .put(`https://jesso.ppcdeveloper.com/api/jadwalHarian/${id}`)
              .then(() => {
                //splice departemen
                // jadwalHarians.value.splice(jadwalHarians.value.indexOf(id),1)
                window.location.reload();
              });
          }
        })

        .catch((error) => {
          console.log(error.response.data);
        });
    }
    return {
      jadwalHarians,
      jadwalHarianDelete,
      changeStatus,
    };
  },
};
</script>

<style></style>
