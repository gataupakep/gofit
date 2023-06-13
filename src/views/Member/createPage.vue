<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>TAMBAH MEMBER</h4>
            <hr />
            <form @submit.prevent="store">
              <div class="form-group mb-3">
                <label for="content" class="form-label">ID Member</label>
                <input
                  class="form-control"
                  disabled
                  v-model="member.id_member"
                  placeholder="ID Member di set otomatis"
                />
              </div>

              <div class="form-group mb-3">
                <label class="form-label">Nama Member</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="member.nama"
                  placeholder="Masukkan nama member"
                />

                <!--validation-->
                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                  {{ validation.nama[0] }}
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">Alamat</label>
                <input
                  class="form-control"
                  v-model="member.alamat"
                  placeholder="Masukkan alamat"
                />

                <!--validation-->
                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                  {{ validation.alamat[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Tanggal Lahir</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="member.tgl_lahir"
                  placeholder="YYYY/MM/dd"
                />

                <!--validation-->
                <div
                  v-if="validation.tgl_lahir"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.tgl_lahir[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">No. Telp</label>
                <input
                  class="form-control"
                  v-model="member.no_telp"
                  placeholder="Masukkan no. telp"
                />

                <!--validation-->
                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                  {{ validation.no_telp[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  class="form-select"
                  v-model="member.gender"
                >
                  <option value="" hidden>Masukan Gender</option>
                  <option value="Wanita">Wanita</option>
                  <option value="Pria">Pria</option>
                </select>

                <!-- validation -->
                <div v-if="validation.gender" class="mt-2 alert alert-danger">
                  {{ validation.gender[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Email</label>
                <input
                  class="form-control"
                  v-model="member.email"
                  placeholder="XXXXX@gmail.com"
                />

                <!--validation-->
                <div v-if="validation.email" class="mt-2 alert alert-danger">
                  {{ validation.email[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Password</label>
                <input
                  class="form-control"
                  disabled
                  v-model="member.password"
                  placeholder="Password di set otomatis menjadi tanggal lahir"
                />
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label">Status</label>
                <select
                  disabled
                  name="status"
                  id="status"
                  class="form-select"
                  v-model="member.status"
                >
                  <option value="" hidden>
                    Status Member Akan Menjadi Aktif Setelah Aktivasi
                  </option>
                </select>
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    //state member
    const member = reactive({
      id_member: "",
      nama: "",
      alamat: "",
      tgl_lahir: "",
      no_telp: "",
      gender: "",
      email: "",
      password: "",
      masa_berlaku: "",
      status: "",
      deposit_cash: "",
      deposit_kelas: "",
    });

    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();

    //method store
    function store() {
      // const swalWithBootstrapButtons = Swal.mixin({
      //   customClass: {
      //     confirmButton: "btn btn-success btn-lg",
      //     cancelButton: "btn btn-danger btn-lg",
      //   },
      //   buttonsStyling: false,
      // });

      let id_member = member.id_member;
      let nama = member.nama;
      let alamat = member.alamat;
      let tgl_lahir = member.tgl_lahir;
      let no_telp = member.no_telp;
      let gender = member.gender;
      let email = member.email;
      let password = member.password;
      let masa_berlaku = member.masa_berlaku;
      let status = member.status;
      let deposit_cash = member.deposit_cash;
      let deposit_kelas = member.deposit_kelas;

      axios
        .post("https://jesso.ppcdeveloper.com/api/member", {
          id_member: id_member,
          nama: nama,
          alamat: alamat,
          tgl_lahir: tgl_lahir,
          no_telp: no_telp,
          gender: gender,
          email: email,
          password: password,
          masa_berlaku: masa_berlaku,
          status: status,
          deposit_cash: deposit_cash,
          deposit_kelas: deposit_kelas,
        })
        .then(() => {
          //redirect ke post index
          router.push({
            name: "member.index",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }

    //return
    return {
      member,
      validation,
      router,
      store,
    };
  },
};
</script>

<style></style>
