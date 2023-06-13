<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>TAMBAH PRESENSI MEMBER GYM</h4>
            <hr />
            <form @submit.prevent="store">
              <div class="form-group mb-3">
                <label for="content" class="form-label">Member</label>
                <select
                  name="id_member"
                  id="id_member"
                  class="form-select"
                  v-model="absenMemberGym.id_member"
                >
                  <option value="" hidden>Pilih Member</option>
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

              <div class="form-group mb-3">
                <label for="content" class="form-label">Gym</label>
                <select
                  name="id_booking_gym"
                  id="id_booking_gym"
                  class="form-select"
                  v-model="absenMemberGym.id_booking_gym"
                >
                  <option value="" hidden>
                    Pilih Gym yang telah di booking
                  </option>
                  <option
                    v-for="(booking_gym, id) in booking_gyms"
                    :key="id"
                    v-bind:value="booking_gym.id"
                  >
                    {{
                      booking_gym.nomor_booking +
                      " - (" +
                      booking_gym.tanggal_booking +
                      ") - " +
                      booking_gym.gym.waktu_mulai +
                      " - " +
                      booking_gym.gym.waktu_selesai +
                      " - " +
                      booking_gym.member.id_member
                    }}
                  </option>
                </select>
                <div
                  v-if="validation.id_booking_gym"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.id_booking_gym[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="form-label">Status Kehadiran Member</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="absenMemberGym.status"
                >
                  <option value="" hidden>
                    Masukan Status Kehadiran Member
                  </option>
                  <option value="Hadir">Hadir</option>
                  <option value="Tidak Hadir">Tidak Hadir</option>
                </select>
                <div v-if="validation.status" class="mt-2 alert alert-danger">
                  {{ validation.status[0] }}
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
    //state departemen
    const absenMemberGym = reactive({
      id_member: "",
      id_booking_gym: "",
      status: "",
    });
    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();

    const booking_gyms = ref([]);

    const members = ref([]);

    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://jesso.ppcdeveloper.com/api/bookingGym")
        .then((response) => {
          //assign state posts with response data
          booking_gyms.value = response.data.data;
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
        }).then((result) => {
          if (result.isConfirmed) {
            let id_member = absenMemberGym.id_member;
            let id_booking_gym = absenMemberGym.id_booking_gym;
            let status = absenMemberGym.status;
            axios
              .post("https://jesso.ppcdeveloper.com/api/absenMemberGym", {
                id_member: id_member,
                id_booking_gym: id_booking_gym,
                status: status,
              }).then(() => {
                //redirect ke post index

                router.push({ name: "absenMemberGym.index" });
                swalWithBootstrapButtons.fire(
                  "Added!",
                  "Data has been added.",
                  "success"
                );
              }).catch((error) => {
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
      booking_gyms,
      absenMemberGym,
      members,
      validation,
      router,
      store,
    };
  },
};
</script>

<style></style>
