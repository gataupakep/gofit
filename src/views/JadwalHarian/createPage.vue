<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>TAMBAH JADWAL HARIAN</h4>
            <hr />
            <form @submit.prevent="store">

              <button
                @submit.prevent="store"
                type="submit"
                class="btn btn-primary"
              >
                Start Generate
              </button>
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
    //state departemen
    const jadwalHarian = reactive({
      id_instruktur: "",
      id_kelas: "",
      hari: "",
      sesi: "",
      waktu_mulai: "",
      waktu_selesai: "",
      tanggal: "",
      status_kelas: "",
    });
    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();

    const instrukturs = ref([]);

    const kelas = ref([]);

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

    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://jesso.ppcdeveloper.com/api/kelas")
        .then((response) => {
          //assign state posts with response data
          kelas.value = response.data.data;
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
          text: "Want to generate data?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          reverseButtons: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .post("https://jesso.ppcdeveloper.com/api/jadwalHarian", {})
              .then(() => {
                //redirect ke post index

                router.push({ name: "jadwalHarian.index" });
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
      jadwalHarian,
      instrukturs,
      kelas,
      validation,
      router,
      store,
    };
  },
};
</script>

<style></style>
