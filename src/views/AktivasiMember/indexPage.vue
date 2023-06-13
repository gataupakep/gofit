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
              :to="{ name: 'aktivasiMember.create' }"
              class="btn btn-md btn-success"
              >TAMBAH TRANSAKSI AKTIVASI</router-link
            >
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Nomor Transaksi</th>
                  <th scope="col">Nama Pegawai</th>
                  <th scope="col">Nama Member</th>
                  <th scope="col">Waktu Aktivasi</th>
                  <th scope="col">Masa Berlaku</th>
                  <th scope="col">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(aktivasiMember, id) in aktivasiMembers" :key="id">
                  <td>{{ aktivasiMember.nomor_transaksi }}</td>
                  <td>{{ aktivasiMember.pegawai.nama_pegawai }}</td>
                  <td>{{ aktivasiMember.member.nama }}</td>
                  <td>{{ aktivasiMember.waktu_aktivasi }}</td>
                  <td>{{ aktivasiMember.masa_berlaku }}</td>
                  <td class="text-center">
                    <button
                      @click.prevent="
                        downloadPDF(
                          aktivasiMember.nomor_transaksi,
                          aktivasiMember.member.id_member,
                          aktivasiMember.waktu_aktivasi,
                          aktivasiMember.waktu_aktivasi,
                          aktivasiMember.pegawai.id_pegawai,
                          aktivasiMember.member.nama,
                          aktivasiMember.pegawai.nama_pegawai
                        )
                      "
                      class="btn btn-sm btn-primary mr-1"
                    >
                      CETAK STRUK
                    </button>
                    <button
                      @click.prevent="aktivasiMemberDelete(aktivasiMember.id)"
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
    let aktivasiMembers = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://jesso.ppcdeveloper.com/api/aktivasiMember")
        .then((response) => {
          //assign state posts with response data

          aktivasiMembers.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function aktivasiMemberDelete(id) {
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
              .delete(`https://jesso.ppcdeveloper.com/api/aktivasiMember/${id}`)
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

    function downloadPDF(
      nomor_transaksi,
      id_member,
      tgl_transaksi,
      tgl_exp,
      id_pegawai,
      nama_member,
      nama_pegawai
    ) {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [9, 25],
      });
      doc.setLineWidth(0.1);
      doc.rect(0.2, 0.2, 24.6, 8.6);
      doc.text("",0.0, 0).setFont(undefined, 'bold');

      doc.text("GoFit", 0.5, 1).setFont(undefined, 'normal');
      doc.text("No Struk", 16, 1);
      doc.text(" : " + nomor_transaksi, 18.5, 1);

      doc.text("Jl. Centralpark No.10 Yogyakarta", 0.5, 2);
      doc.text("Tanggal", 16, 2);
      doc.text(" : " + tgl_transaksi, 18.5, 2).setFont(undefined, 'bold');
      
      doc.text("Member", 0.5, 4).setFont(undefined, 'normal');
      doc.text(" : " + id_member + " / " + nama_member, 6, 4);

      doc.text("Aktivasi Tahunan", 0.5, 5);
      doc.text(" : Rp.3.000.000 ", 6, 5);
      
      doc.text("Masa aktif member", 0.5, 6);
      doc.text(" : " + tgl_exp, 6, 6);

      doc.text("Kasir", 16, 8);
      doc.text(" : " + id_pegawai + " / " + nama_pegawai, 17.3, 8);
      Swal.fire({
        title: "Yakin ingin mencetak struk?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Struk telah dicetak!", "Struk will be on your computer immediately.", "success");
          doc.save("Struk Aktivasi Member.pdf");
        }
      });
    }

    return {
      aktivasiMembers,
      aktivasiMemberDelete,
      downloadPDF,
    };
  },
};
</script>
<style></style>
