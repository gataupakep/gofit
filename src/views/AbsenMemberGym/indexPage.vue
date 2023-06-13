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
              :to="{ name: 'absenMemberGym.create' }"
              class="btn btn-md btn-success"
              >TAMBAH PRESENSI GYM</router-link
            >
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Nomor Struk</th>
                  <th scope="col">Nama Member</th>
                  <th scope="col">Tanggal Presensi</th>
                  <th scope="col">Status Member</th>
                  <th scope="col">Slot Waktu yang Diambil</th>
                  <th scope="col">Tanggal Mulai Gym</th>
                  <th scope="col">AKSI</th>
                </tr>
              </thead>
              <tbody v-for="(absenMemberGym, id) in absen_member_gym" :key="id">
                <tr>
                  <td>{{ absenMemberGym.nomor_struk }}</td>
                  <td>{{ absenMemberGym.member.nama }}</td>
                  <td>{{ absenMemberGym.tanggal_presensi }}</td>
                  <td>{{ absenMemberGym.status }}</td>
                  <td>{{ absenMemberGym.booking_gym.gym.waktu_mulai + " - " + absenMemberGym.booking_gym.gym.waktu_selesai }}</td>
                  <td>{{ absenMemberGym.booking_gym.gym.tanggal }}</td>
                  <td class="text-center">
                    <button
                      @click.prevent="
                        downloadPDF(
                          absenMemberGym.nomor_struk,
                          absenMemberGym.tanggal_presensi,
                          absenMemberGym.member.id_member,
                          absenMemberGym.member.nama,
                          absenMemberGym.booking_gym.gym.waktu_mulai,
                          absenMemberGym.booking_gym.gym.waktu_selesai,
                        )
                      "
                      class="btn btn-sm btn-primary mr-1"
                    >
                      CETAK STRUK
                    </button>

                    <button
                      @click.prevent="absenMemberGymDelete(absenMemberGym.id)"
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
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";

export default {
  setup() {
    //reactive state
    let absen_member_gym = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://jesso.ppcdeveloper.com/api/absenMemberGym")
        .then((response) => {
          //assign state posts with response data

          absen_member_gym.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function absenMemberGymDelete(id) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure to deactivate this absenMemberGym?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, deactivate it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`https://jesso.ppcdeveloper.com/api/absenMemberGym/${id}`)
              .then(() => {
                //splice departemen
                swalWithBootstrapButtons.fire(
                  "Deleted!",
                  "Data Deleted!",
                  "success",
                  window.location.reload(),
                );
                
              })
              .catch((error) => {
                swalWithBootstrapButtons.fire(
                  "Failed!",
                  "Failed to delete data",
                  "error"
                );
                console.log(error.response.data);
              });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Cancelled!",
              "Data has not been deactivate.",
              "error"
            );
          }
        });
    }

    function downloadPDF(
      nomor_struk,
      tanggal_presensi,
      id_member,
      nama_member,
      waktu_mulai,
      waktu_selesai,
      
    ) {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [10, 12],
      });
      
      Swal.fire({
        title: 'Apakah anda ingin mencetak struk?',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
        denyButtonText: `Cancel`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          doc.setLineWidth(0.1);
          doc.rect(0.2, 0.2, 11.6, 9.6);
          doc.text("Go Fit", 0.5, 1);
          doc.text("Jl. Centralpark No.10 Yogyakarta", 0.5, 2).setFont(undefined, 'bold');
          doc.text('STRUK PRESENSI GYM', 0.5, 4).setFont(undefined, 'normal');
          doc.text("No Struk", 0.5, 5);
          doc.text(": " + nomor_struk, 5, 5);
          
          doc.text("Tanggal", 0.5, 6);
          doc.text(": " + tanggal_presensi, 5, 6).setFont(undefined, 'bold');

          doc.text("MEMBER", 0.5, 8).setFont(undefined, 'normal');
          doc.text(": " + id_member + " / " + nama_member, 5, 8);
          
          doc.text("Slot Waktu", 0.5, 9);
          doc.text(": " + waktu_mulai + " - " + waktu_selesai, 5, 9);

          doc.save("Struk Absensi Gym.pdf");

          Swal.fire("Struk telah dicetak!", "Struk will be on your computer immediately.", "success");

        } else if (result.isDenied) {
          Swal.fire("Struk tidak jadi dicetak!", "canceled making struk.", "error");
        }
      })
    }

    return {
      absen_member_gym,
      absenMemberGymDelete,
      downloadPDF,
    };
  },
};
</script>

<style></style>
