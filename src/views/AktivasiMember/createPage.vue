<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>TAMBAH TRANSAKSI AKTIVASI</h4>
            <hr />
            <form @submit.prevent="store">
              <div class="form-group mb-3">
                <label for="content" class="form-label">Pegawai</label>
                <input class="form-control" disabled v-model="nama_pegawai" />
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Member</label>
                <select
                  name="id_member"
                  id="id_member"
                  class="form-select"
                  v-model="aktivasiMember.id_member"
                >
                  <option value="" hidden>Masukan ID Member</option>
                  <option
                    v-for="(member, id) in members"
                    :key="id"
                    v-bind:value="member.id"
                  >
                    {{ member.id_member + " - " + member.nama }}
                  </option>
                </select>
                <div
                  v-if="validation.id_member"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.id_member[0] }}
                </div>
              </div>

              <button type="submit" class="btn btn-primary">SAVE</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  setup() {
    const idPegawaiLogged = localStorage.getItem("id");
    const nama_pegawai = localStorage.getItem("nama_pegawai");
    //state departemen
    const aktivasiMember = reactive({
      id_pegawai: "",
      id_member: "",
    });
    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();

    const pegawais = ref([]);

    const members = ref([]);

    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://jesso.ppcdeveloper.com/api/pegawai")
        .then((response) => {
          //assign state posts with response data
          pegawais.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://jesso.ppcdeveloper.com/api/member")
        .then((response) => {
          //assign state posts with response data
          members.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    //method store
    function store() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success btn-lg",
          cancelButton: "btn btn-danger btn-lg",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "Want to save data?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          reverseButtons: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            let id_pegawai = idPegawaiLogged;
            let id_member = aktivasiMember.id_member;
            axios
              .post("https://jesso.ppcdeveloper.com/api/aktivasiMember", {
                id_pegawai: id_pegawai,
                id_member: id_member,
              })
              .then(() => {
                //redirect ke post index
                router.push({ name: "aktivasiMember.index" });
                swalWithBootstrapButtons.fire(
                  "Added!",
                  "Data has been added.",
                  "success"
                );
              })
              .catch((error) => {
                //assign state validation with error
                validation.value = error.response.data.message;
                swalWithBootstrapButtons.fire(
                  "Failed!",
                  validation.value,
                  "error"
                );
              });
          }
        });
    }
    return {
      aktivasiMember,
      pegawais,
      members,
      validation,
      router,
      store,
      idPegawaiLogged,
      nama_pegawai,
    };
  },
};
</script>

<style></style>
