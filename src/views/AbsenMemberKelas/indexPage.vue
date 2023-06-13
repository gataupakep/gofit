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
            <!-- <router-link
              :to="{ name: 'absenMemberKelas.create' }"
              class="btn btn-md btn-success"
              >TAMBAH PRESENSI KELAS</router-link
            > -->
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Nama Instruktur</th>
                  <th scope="col">Nama Kelas</th>
                  <th scope="col">Nama Member</th>
                  <th scope="col">Nomor Struk</th>
                  <th scope="col">Tanggal Presensi</th>
                  <th scope="col">Status Member</th>
                  <th scope="col">AKSI</th>
                </tr>
              </thead>
              <tbody v-for="(absenMemberKelas, id) in absen_member_kelas" :key="id">
                <tr>
                  <td>{{ absenMemberKelas.instruktur.nama_instruktur }}</td>
                  <td>{{ absenMemberKelas.booking_class.jadwal_harian.kelas.nama_kelas }}</td>
                  <td>{{ absenMemberKelas.member.nama }}</td>
                  <td>{{ absenMemberKelas.nomor_struk }}</td>
                  <td>{{ absenMemberKelas.tanggal_presensi }}</td>
                  <td>{{ absenMemberKelas.status }}</td>
                  <td class="text-center">
                    <button v-if="absenMemberKelas.booking_class.metode_pembayaran == 'Cash'"
                      @click.prevent="
                        downloadPDF(
                          absenMemberKelas.nomor_struk,
                          absenMemberKelas.tanggal_presensi,
                          absenMemberKelas.member.id_member,
                          absenMemberKelas.member.nama,
                          absenMemberKelas.booking_class.jadwal_harian.kelas.nama_kelas,
                          absenMemberKelas.instruktur.nama_instruktur,
                          absenMemberKelas.booking_class.jadwal_harian.kelas.class_detail.harga,
                          absenMemberKelas.member.deposit_cash,
                        )
                      "
                      class="btn btn-sm btn-primary mr-1"
                    >
                      CETAK STRUK REGULER
                    </button>
                    <button v-if="absenMemberKelas.booking_class.metode_pembayaran == 'Paket'"
                      @click.prevent="
                        downloadPDFPaket(
                          absenMemberKelas.nomor_struk,
                          absenMemberKelas.tanggal_presensi,
                          absenMemberKelas.member.id_member,
                          absenMemberKelas.member.nama,
                          absenMemberKelas.booking_class.jadwal_harian.kelas.nama_kelas,
                          absenMemberKelas.instruktur.nama_instruktur,
                          absenMemberKelas.member.deposit_kelas,
                          absenMemberKelas.member.deposit_class.masa_berlaku,
                        )
                      "
                      class="btn btn-sm btn-primary mr-1"
                    >
                      CETAK STRUK PAKET
                    </button>
                    
                    <button
                      @click.prevent="absenMemberKelasDelete(absenMemberKelas.id)"
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
    let absen_member_kelas = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://jesso.ppcdeveloper.com/api/absenMemberKelas")
        .then((response) => {
          //assign state posts with response data

          absen_member_kelas.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function absenMemberKelasDelete(id) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure to deactivate this absenMemberKelas?",
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
              .delete(`https://jesso.ppcdeveloper.com/api/absenMemberKelas/${id}`)
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
      nama_kelas,
      instruktur,
      harga_kelas,
      sisa_deposit_cash,
      
    ) {
      const doc = new jsPDF({
        orientation: "potrait",
        unit: "cm",
        format: [15, 15],
      });
      
      Swal.fire({
        title: 'Apakah anda ingin mencetak struk?',
        icon: 'question',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Struk Absensi Kelas Reguler',
        denyButtonText: `Struk Absensi Kelas Paket`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          doc.setLineWidth(0.1);
          doc.rect(0.2, 0.2, 14.6, 14.6);
          doc.text("Go Fit", 0.5, 1);
          doc.text("Jl. Centralpark No.10 Yogyakarta", 0.5, 2).setFont(undefined, 'bold');
          doc.text('STRUK PRESENSI KELAS', 0.5, 4).setFont(undefined, 'normal');
          doc.text("No Struk", 0.5, 5);
          doc.text(": " + nomor_struk, 5, 5);
          
          doc.text("Tanggal", 0.5, 6);
          doc.text(": " + tanggal_presensi, 5, 6).setFont(undefined, 'bold');

          doc.text("MEMBER", 0.5, 8).setFont(undefined, 'normal');
          doc.text(": " + id_member + " / " + nama_member, 5, 8);
          
          doc.text("Kelas", 0.5, 9);
          doc.text(": " + nama_kelas, 5, 9);
          
          doc.text("Instruktur", 0.5, 10);
          doc.text(": " + instruktur, 5, 10);

          doc.text("Tarif", 0.5, 11);
          doc.text(": Rp." + harga_kelas.toLocaleString().replace(/,/g,".",), 5, 11);

          doc.text("Sisa Deposit", 0.5, 12);
          doc.text(": Rp." + sisa_deposit_cash.toLocaleString().replace(/,/g,".",), 5, 12);
          doc.save("Struk Absensi Kelas Reguler.pdf");

          Swal.fire("Struk telah dicetak!", "Struk will be on your computer immediately.", "success");

        } else if (result.isDenied) {
          // doc.setLineWidth(0.1);
          // doc.rect(0.2, 0.2, 14.6, 14.6);
          // doc.text("Go Fit", 0.5, 1);
          // doc.text("Jl. Centralpark No.10 Yogyakarta", 0.5, 2).setFont(undefined, 'bold');
          // doc.text('STRUK PRESENSI KELAS PAKET', 0.5, 4).setFont(undefined, 'normal');
          // doc.text("No Struk", 0.5, 5);
          // doc.text(": " + nomor_struk, 5, 5);
          
          // doc.text("Tanggal", 0.5, 6);
          // doc.text(": " + tanggal_presensi, 5, 6).setFont(undefined, 'bold');

          // doc.text("MEMBER", 0.5, 8).setFont(undefined, 'normal');
          // doc.text(": " + id_member + " / " + nama_member, 5, 8);
          
          // doc.text("Kelas", 0.5, 9);
          // doc.text(": " + nama_kelas, 5, 9);
          
          // doc.text("Instruktur", 0.5, 10);
          // doc.text(": " + instruktur, 5, 10);

          // doc.text("Sisa Deposit", 0.5, 11);
          // doc.text(": " + sisa_deposit_paket  + "x", 5, 11);

          // doc.text("Berlaku Sampai", 0.5, 12);
          // doc.text(": " + masa_berlaku, 5, 12);
          // doc.save("Struk Absensi Kelas Paket.pdf");

          // Swal.fire("Struk telah dicetak!", "Struk will be on your computer immediately.", "success");
        }
      })
    }

    function downloadPDFPaket(
      nomor_struk,
      tanggal_presensi,
      id_member,
      nama_member,
      nama_kelas,
      instruktur,
      sisa_deposit_paket,
      masa_berlaku,
      
    ) {
      const doc = new jsPDF({
        orientation: "potrait",
        unit: "cm",
        format: [15, 15],
      });
      
      Swal.fire({
        title: 'Apakah anda ingin mencetak struk?',
        icon: 'question',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Struk Absensi Kelas Paket',
        denyButtonText: `Struk Absensi Kelas Paket`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          doc.setLineWidth(0.1);
          doc.rect(0.2, 0.2, 14.6, 14.6);
          doc.text("Go Fit", 0.5, 1);
          doc.text("Jl. Centralpark No.10 Yogyakarta", 0.5, 2).setFont(undefined, 'bold');
          doc.text('STRUK PRESENSI KELAS PAKET', 0.5, 4).setFont(undefined, 'normal');
          doc.text("No Struk", 0.5, 5);
          doc.text(": " + nomor_struk, 5, 5);
          
          doc.text("Tanggal", 0.5, 6);
          doc.text(": " + tanggal_presensi, 5, 6).setFont(undefined, 'bold');

          doc.text("MEMBER", 0.5, 8).setFont(undefined, 'normal');
          doc.text(": " + id_member + " / " + nama_member, 5, 8);
          
          doc.text("Kelas", 0.5, 9);
          doc.text(": " + nama_kelas, 5, 9);
          
          doc.text("Instruktur", 0.5, 10);
          doc.text(": " + instruktur, 5, 10);

          doc.text("Sisa Deposit", 0.5, 11);
          doc.text(": " + sisa_deposit_paket  + "x", 5, 11);

          doc.text("Berlaku Sampai", 0.5, 12);
          doc.text(": " + masa_berlaku, 5, 12);
          doc.save("Struk Absensi Kelas Paket.pdf");

          Swal.fire("Struk telah dicetak!", "Struk will be on your computer immediately.", "success");

        }
      })
    }

    return {
      absen_member_kelas,
      absenMemberKelasDelete,
      downloadPDF,
      downloadPDFPaket,
    };
  },
};
</script>

<style></style>