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
            <h3>Member EXP hari ini</h3>
            <router-link
              :to="{ name: 'member.create' }"
              class="btn btn-md btn-success"
              >TAMBAH MEMBER</router-link
            >
            <router-link
              :to="{ name: 'member.indexAll' }"
              class="btn btn-md btn-warning"
              >SHOW ALL DATA MEMBER</router-link
            >
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">ID Member</th>
                  <th scope="col">Nama Member</th>
                  <th scope="col">Alamat</th>
                  <th scope="col">Tanggal Lahir</th>
                  <th scope="col">No. Telp</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Massa Berlaku</th>
                  <th scope="col">Status</th>
                  <th scope="col">Deposit Cash</th>
                  <th scope="col">Deposit Paket</th>
                  <th scope="col">Presensi</th>
                  <th scope="col">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, id) in member_exp" :key="id">
                  <td>{{ member.id_member }}</td>
                  <td>{{ member.nama }}</td>
                  <td>{{ member.alamat }}</td>
                  <td>{{ member.tgl_lahir }}</td>
                  <td>{{ member.no_telp }}</td>
                  <td>{{ member.gender }}</td>
                  <td>{{ member.email }}</td>
                  <td>{{ member.password }}</td>
                  <td>{{ member.masa_berlaku }}</td>
                  <td>{{ member.status }}</td>
                  <td>{{ member.deposit_cash }}</td>
                  <td>{{ member.deposit_kelas }}</td>
                  <td>{{ member.presensi }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{ name: 'member.edit', params: { id: member.id } }"
                      class="btn btn-sm btn-primary mr-1"
                    >
                      EDIT
                    </router-link>

                    <button
                      @click.prevent="memberDelete(member.id)"
                      class="btn btn-sm btn-danger ml-1"
                    >
                      Deaktivasi
                    </button>
                    
                    <button @click.prevent="memberResetPassword(member.id)">
                      Reset Pass
                    </button>
                    
                    <button
                      @click.prevent="
                        downloadPDF(member.id_member, member.nama, member.alamat, member.no_telp)
                      "
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                    >
                      CETAK MEMBER CARD
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
    let member_exp = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://jesso.ppcdeveloper.com/api/member_exp")
        .then((response) => {
          //assign state posts with response data
          member_exp.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function memberDelete(id) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure to deactivate this member?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, deactivate it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`https://jesso.ppcdeveloper.com/api/member_exp/${id}`)
              .then(() => {
                //splice departemen
                swalWithBootstrapButtons.fire(
                  "Deactivate!",
                  "Member has been deactivate.",
                  "success"
                );
                window.location.reload();
              })
              .catch((error) => {
                swalWithBootstrapButtons.fire(
                  "Failed!",
                  "Member has not been deactivate.",
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
              "Member has not been deactivate.",
              "error"
            );
          }
        });
    }

    function memberResetPassword(id) {
      axios
        .put(`https://jesso.ppcdeveloper.com/api/member_exp/${id}`)
        .then(() => {
          //splice member
          member_exp.value.splice(member_exp.value.indexOf(id), 1);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    function downloadPDF(id_member, nama_member, alamat, telepon) {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [9, 15],
      });
      doc.setLineWidth(0.1);
      doc.rect(0.2, 0.2, 14.6, 8.6);
      doc.text("",0.0, 0).setFont(undefined, 'bold');
      
      doc.text("GoFit", 0.5, 1).setFont(undefined, 'normal');
      doc.text("Jl. Centralpark No.10 Yogyakarta", 0.5, 2).setFont(undefined, 'bold');

      doc.text("MEMBER CARD", 0.5, 4).setFont(undefined, 'normal');
      doc.text("Member ID", 0.5, 5);
      doc.text(" : " + id_member, 3.5, 5);

      doc.text("Nama", 0.5, 6);
      doc.text(" : " + nama_member, 3.5, 6);
      
      doc.text("Alamat", 0.5, 7);
      doc.text(" : " + alamat, 3.5, 7);
      
      doc.text("Telpon", 0.5, 8);
      doc.text(" : " + telepon, 3.5, 8);

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
          doc.save("Member card.pdf");
        }
      });
    }

    return {
      member_exp,
      memberResetPassword,
      memberDelete,
      downloadPDF,
    };
  },
};
</script>

<style></style>
