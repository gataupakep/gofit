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
              :to="{ name: 'depositCash.create' }"
              class="btn btn-md btn-success"
              >TAMBAH TRANSAKSI DEPOSIT CASH</router-link
            >
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Nomor Transaksi</th>
                  <th scope="col">Nama Pegawai</th>
                  <th scope="col">Nama Member</th>
                  <th scope="col">Bonus</th>
                  <th scope="col">Jumlah Top Up</th>
                  <th scope="col">Total Deposit</th>
                  <th scope="col">Sisa Deposit Member</th>
                  <th scope="col">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(depositCash, id) in deposit_cashes" :key="id">
                  <td>{{ depositCash.nomor_transaksi }}</td>
                  <td>{{ depositCash.pegawai.nama_pegawai }}</td>
                  <td>{{ depositCash.member.nama }}</td>
                  <td>{{ depositCash.bonus }}</td>
                  <td>{{ depositCash.jumlah_deposit }}</td>
                  <td>{{ depositCash.total }}</td>
                  <td>{{ depositCash.member.deposit_cash }}</td>
                  <td class="text-center">
                    <button
                      @click.prevent="
                        downloadPDF(
                          depositCash.nomor_transaksi,
                          depositCash.member.id_member,
                          depositCash.bonus,
                          depositCash.pegawai.id_pegawai,
                          depositCash.member.nama,
                          depositCash.pegawai.nama_pegawai,
                          depositCash.member.deposit_cash,
                          depositCash.total,
                          depositCash.created_at,
                          depositCash.jumlah_deposit
                        )
                      "
                      class="btn btn-sm btn-primary mr-1"
                    >
                      CETAK STRUK
                    </button>
                    <button
                      @click.prevent="depositCashDelete(depositCash.id)"
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
    let deposit_cashes = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://jesso.ppcdeveloper.com/api/depositCash")
        .then((response) => {
          //assign state posts with response data

          deposit_cashes.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function depositCashDelete(id) {
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
              .delete(`https://jesso.ppcdeveloper.com/api/depositCash/${id}`)
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
      bonus,
      id_pegawai,
      nama_member,
      nama_pegawai,
      sisa,
      total,
      created_at,
      deposit
    ) {
      const tgl = moment(created_at).format("YYYY-MM-DD HH:mm:ss");
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [10, 25],
      });
      doc.setLineWidth(0.1);
      doc.rect(0.2, 0.2, 24.6, 9.6);
      doc.text("",0.0, 0).setFont(undefined, 'bold');
      
      doc.text("GoFit", 0.5, 1).setFont(undefined, 'normal');
      doc.text("No Struk", 16, 1);
      doc.text(" : " + nomor_transaksi, 18.5, 1);

      doc.text("Jl. Centralpark No.10 Yogyakarta", 0.5, 2);
      doc.text("Tanggal", 16, 2);
      doc.text(" : " + tgl, 18.5, 2).setFont(undefined, 'bold');

      doc.text("Member", 0.5, 4).setFont(undefined, 'normal');
      doc.text(" : " + id_member + " / " + nama_member, 5, 4);
      
      doc.text("Deposit" , 0.5, 5);
      doc.text(" : Rp. "+ deposit.toLocaleString().replace(/,/g,".",), 5, 5);
      
      doc.text("Bonus Deposit", 0.5, 6);
      doc.text(" : Rp. "+ bonus.toLocaleString().replace(/,/g,".",), 5, 6);
      
      doc.text("Sisa Deposit", 0.5, 7);
      doc.text(" : Rp. "+ sisa.toLocaleString().replace(/,/g,".",), 5, 7);

      doc.text("Total Deposit", 0.5, 8);
      doc.text(" : Rp. "+ total.toLocaleString().replace(/,/g,".",), 5, 8);

      doc.text("Kasir", 16, 9);
      doc.text(" : " + id_pegawai + " / " + nama_pegawai, 17.3, 9);

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
          doc.save("Struk Deposit Cash.pdf");
        }
      });
      
    }

    return {
      deposit_cashes,
      depositCashDelete,
      downloadPDF,
    };
  },
};
</script>

<style></style>
