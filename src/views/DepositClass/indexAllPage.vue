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
              :to="{ name: 'depositClass.create' }"
              class="btn btn-md btn-success"
              >TAMBAH TRANSAKSI DEPOSIT KELAS</router-link
            >
            <router-link
              :to="{ name: 'depositClass.index' }"
              class="btn btn-md btn-warning"
              >SHOW EXP NOW DATA DEPOSIT KELAS ONLY</router-link
            >
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Nomor Transaksi</th>
                  <th scope="col">Nama Pegawai</th>
                  <th scope="col">Nama Member</th>
                  <th scope="col">Jenis Kelas</th>
                  <th scope="col">Deposit Kelas</th>
                  <th scope="col">Masa Berlaku</th>
                  <th scope="col">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(depositClass, id) in deposit_classes" :key="id">
                  <td>{{ depositClass.nomor_transaksi }}</td>
                  <td>{{ depositClass.pegawai.nama_pegawai }}</td>
                  <td>{{ depositClass.member.nama }}</td>
                  <td>{{ depositClass.kelas.nama_kelas }}</td>
                  <td>{{ depositClass.deposit_kelas }}</td>
                  <td>{{ depositClass.masa_berlaku }}</td>
                  <td class="text-center">
                    <button
                      @click.prevent="
                        downloadPDF(
                          depositClass.nomor_transaksi,
                          depositClass.member.id_member,
                          depositClass.kelas.nama_kelas,
                          depositClass.pegawai.id_pegawai,
                          depositClass.member.nama,
                          depositClass.pegawai.nama_pegawai,
                          depositClass.deposit_kelas,
                          depositClass.masa_berlaku,
                          depositClass.created_at
                        )
                      "
                      class="btn btn-sm btn-primary mr-1"
                    >
                      CETAK STRUK
                    </button>
                    <button
                      @click.prevent="depositClassDelete(depositClass.id)"
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
import moment from "moment";

export default {
  setup() {
    //reactive state
    let deposit_classes = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://jesso.ppcdeveloper.com/api/depositClass")
        .then((response) => {
          //assign state posts with response data

          deposit_classes.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function depositClassDelete(id) {
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
              .delete(`https://jesso.ppcdeveloper.com/api/depositClass/${id}`)
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
      kelas,
      id_pegawai,
      nama_member,
      nama_pegawai,
      deposit,
      masa_berlaku,
      created_at
    ) {
      const tgl = moment(created_at).format("YYYY-MM-DD HH:mm:ss");
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [10, 30],
      });

      doc.setLineWidth(0.1);
      doc.rect(0.2, 0.2, 29.6, 9.6);
      doc.text("",0.0, 0).setFont(undefined, 'bold');

      doc.text("GoFit", 0.5, 1).setFont(undefined, 'normal');
      doc.text("No Struk", 21, 1);
      doc.text(" : " + nomor_transaksi, 23.5, 1);

      doc.text("Jl. Centralpark No.10 Yogyakarta", 0.5, 2);
      doc.text("Tanggal", 21, 2);
      doc.text(" : " + tgl, 23.5, 2).setFont(undefined, 'bold');

      doc.text("Member", 0.5, 4).setFont(undefined, 'normal');
      doc.text(" : " + id_member + " / " + nama_member, 9, 4);

      doc.text("Deposit(bayar 5 gratis 1)", 0.5, 5);
      doc.text(" : Rp.750.000,- (5 x Rp.150.000)", 9, 5);

      doc.text("Jenis Kelas", 0.5, 6);
      doc.text(" : " + kelas, 9, 6);

      doc.text("Total Deposit " + kelas, 0.5, 7);
      doc.text(" : " + deposit, 9, 7);
      
      doc.text("Berlaku sampai dengan", 0.5, 8);
      doc.text(" : " + masa_berlaku, 9, 8);

      doc.text("Kasir", 21, 9);
      doc.text(" : " + id_pegawai + " / " + nama_pegawai, 22.3, 9);
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
          doc.save("Struk Deposit Class.pdf");
        }
      });
    }

    return {
      deposit_classes,
      depositClassDelete,
      downloadPDF,
    };
  },
};
</script>

<style></style>
