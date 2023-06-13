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
                :to="{ name: 'absenInstruktur.index' }"
                class="btn btn-md btn-success"
                >Tampilkan Data Izin yang Sudah Dikonfirmasi</router-link
              >
              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Nama Instruktur</th>
                    <th scope="col">Nama Instruktur Pengganti</th>
                    <th scope="col">Status Instruktur</th>
                    <th scope="col">Waktu Izin</th>
                    <th scope="col">Konfirmasi Izin</th>
                    <th scope="col">AKSI</th>
                  </tr>
                </thead>
                <tbody v-for="(absenInstruktur, id) in absen_instrukturs" :key="id">
                  <tr v-if="absenInstruktur.confirm == 'Belum Dikonfirmasi'">
                    <td>{{ absenInstruktur.instruktur.nama_instruktur }}</td>
                    <td>{{ absenInstruktur.instrukturpengganti.nama_instruktur }}</td>
                    <td>{{ absenInstruktur.status_instruktur }}</td>
                    <td>{{ absenInstruktur.waktu_perizinan }}</td>
                    <td>{{ absenInstruktur.confirm }}</td>
                    <td class="text-center">
                      <button
                        @click.prevent="absenInstrukturDelete(absenInstruktur.id)"
                        class="btn btn-sm btn-danger ml-1"
                      >
                        DELETE
                      </button>
                      <button
                      @click.prevent="changeStatus(absenInstruktur.id)"
                      type="button"
                      class="btn btn-sm btn-dark"
                    >
                      Ubah Status
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
      let absen_instrukturs = ref([]);
  
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get("https://jesso.ppcdeveloper.com/api/absenInstruktur")
          .then((response) => {
            //assign state posts with response data
  
            absen_instrukturs.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
      function absenInstrukturDelete(id) {
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
                .delete(`https://jesso.ppcdeveloper.com/api/absenInstruktur/${id}`)
                .then(() => {
                  //splice departemen
                  window.location.reload();
                })
                .catch((error) => {
                  console.log(error.response.data);
                });
                swalWithBootstrapButtons.fire(
                "Deleted!",
                "Data has been deleted.",
                "success"
              );
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                "Cancelled!",
                "Data has not been deleted.",
                "error"
              );
            }
          });
      }
  
      function changeStatus(id) {
      Swal.fire({
        title: "Yakin ingin mengubah status izin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Status izin telah diubah!",
              "Status telah berhasil diubah.",
              "success"
            );
            axios
              .post(`https://jesso.ppcdeveloper.com/api/absenInstruktur/${id}`)
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
        absen_instrukturs,
        absenInstrukturDelete,
        changeStatus,
      };
    },
  };
  </script>
  
  <style></style>
  