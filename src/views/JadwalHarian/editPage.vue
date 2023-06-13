<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>EDIT JADWAL UMUM</h4>
            <hr />

            <form @submit.prevent="update">
              <!-- <div class="form-group mb-3">
                <label for="content" class="form-label">Instruktur</label>
                <select
                  name="id_instruktur"
                  id="id_instruktur"
                  class="form-select"
                  v-model="jadwalHarian.id_instruktur"
                >
                  <option value="" hidden>Masukan Nama Instruktur</option>
                  <option
                    v-for="(instruktur, id) in instrukturs"
                    :key="id"
                    v-bind:value="instruktur.id"
                  >
                    {{ instruktur.nama_instruktur }}
                  </option>
                </select>
                <div
                  v-if="validation.id_instruktur"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.id_instruktur[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Kelas</label>
                <select
                  name="id_kelas"
                  id="id_kelas"
                  class="form-select"
                  v-model="jadwalHarian.id_kelas"
                >
                  <option value="" hidden>Masukan Nama Kelas</option>
                  <option
                    v-for="(classes, id) in kelas"
                    :key="id"
                    v-bind:value="classes.id"
                  >
                    {{ classes.nama_kelas }}
                  </option>
                </select>
                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">
                  {{ validation.id_kelas[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="form-label">Hari</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="jadwalHarian.hari"
                >
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                  <option value="Sabtu">Sabtu</option>
                  <option value="Minggu">Minggu</option>
                </select>
                <div v-if="validation.hari" class="mt-2 alert alert-danger">
                  {{ validation.hari[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="form-label">Sesi</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="jadwalHarian.sesi"
                >
                  <option value="1">Sesi 1 Pagi</option>
                  <option value="2">Sesi 2 Pagi</option>
                  <option value="3">Sesi 1 Sore</option>
                  <option value="4">Sesi 2 Sore</option>
                </select>
                <div v-if="validation.sesi" class="mt-2 alert alert-danger">
                  {{ validation.sesi[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="form-label">Jam Mulai</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="jadwalHarian.waktu_mulai"
                >
                  <option value="08:00:00">08:00:00</option>
                  <option value="09:30:00">09:30:00</option>
                  <option value="17:00:00">17:00:00</option>
                  <option value="18:30:00">18:30:00</option>
                </select>
                <div
                  v-if="validation.waktu_mulai"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.waktu_mulai[0] }}
                </div>
              </div>
              <div class="form-group mb-3">
                <label class="form-label">Jam Selesai</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="jadwalHarian.waktu_selesai"
                >
                  <option value="09:30:00">09:30:00</option>
                  <option value="11:00:00">11:00:00</option>
                  <option value="18:30:00">18:30:00</option>
                  <option value="20:00:00">20:00:00</option>
                </select>
                <div
                  v-if="validation.waktu_selesai"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.waktu_selesai[0] }}
                </div>
              </div> -->

              <div class="form-group mb-3">
                <label class="form-label">Status Kelas</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="jadwalHarian.status_kelas"
                >
                  <option value="Libur">Libur</option>
                  <option value="Aktif">Aktif</option>
                </select>
                <div
                  v-if="validation.waktu_selesai"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.status_kelas[0] }}
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

export default {
  setup() {
    //state jadwalHarian
    const jadwalHarian = reactive({
    //   id_instruktur: "",
    //   id_kelas: "",
    //   sesi: "",
    //   hari: "",
    //   waktu_mulai: "",
    //   waktu_selesai: "",
    //   tanggal: "",
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

      axios
        .get(`https://jesso.ppcdeveloper.com/api/jadwalHarian/${router.params.id}`)
        .then((response) => {
          //assign state posts with response data
        //   jadwalHarian.id_instruktur = response.data.data.id_instruktur;
        //   jadwalHarian.id_kelas = response.data.data.id_kelas;
        //   jadwalHarian.sesi = response.data.data.sesi;
        //   jadwalHarian.hari = response.data.data.hari;
        //   jadwalHarian.waktu_mulai = response.data.data.waktu_mulai;
        //   jadwalHarian.waktu_selesai = response.data.data.waktu_selesai;
        //   jadwalHarian.tanggal = response.data.data.tanggal;
          jadwalHarian.status_kelas = response.data.data.status_kelas;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    //method update
    function update() {
    //   let id_instruktur = jadwalHarian.id_instruktur;
    //   let id_kelas = jadwalHarian.id_kelas;
    //   let sesi = jadwalHarian.sesi;
    //   let hari = jadwalHarian.hari;
    //   let waktu_mulai = jadwalHarian.waktu_mulai;
    //   let waktu_selesai = jadwalHarian.waktu_selesai;
    //   let tanggal = jadwalHarian.tanggal;
      let status_kelas = jadwalHarian.status_kelas;

      axios
        .put(`https://jesso.ppcdeveloper.com/api/jadwalHarian/${router.params.id}`, {
        //   id_instruktur: id_instruktur,
        //   id_kelas: id_kelas,
        //   sesi: sesi,
        //   hari: hari,
        //   waktu_mulai: waktu_mulai,
        //   waktu_selesai: waktu_selesai,
        //   tanggal: tanggal,
          status_kelas: status_kelas,
        })
        .then(() => {
          //redirect ke post index
          router.push({
            name: "jadwalHarian.index",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }

    //return
    return {
      kelas,
      instrukturs,
      jadwalHarian,
      validation,
      router,
      update,
    };
  },
};
</script>

<style></style>
