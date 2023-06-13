<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT MEMBER</h4>
                        <hr>

                        <form @submit.prevent="update">
                            
                            <div class="form-group mb-3">
                             <label for="content" class="form-label">ID Member</label>
                                <input class="form-control" disabled v-model="member.id_member" placeholder="ID Member di set otomatis">
                            </div>

                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <input type="text" class="form-control" v-model="member.nama" placeholder="Masukkan nama member">

                                <!--validation-->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                        {{validation.nama[0]}}
                                </div>
                            </div>
                            
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Alamat</label>
                                <input class="form-control" v-model="member.alamat" placeholder="Masukkan nama manager">

                                <!--validation-->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                <input type="date" class="form-control" v-model="member.tgl_lahir" placeholder="YYYY/MM/dd">

                                <!--validation-->
                                <div v-if="validation.tgl_lahir" class="mt-2 alert alert-danger">
                                    {{ validation.tgl_lahir[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">No. Telp</label>
                                <input class="form-control" v-model="member.no_telp" placeholder="Masukkan nama manager">

                                <!--validation-->
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                                    {{ validation.no_telp[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Gender</label>
                                <select name="gender" id="gender" class="form-select" v-model="member.gender">
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
                                <input class="form-control" v-model="member.email" placeholder="XXXXX@gmail.com">

                                <!--validation-->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Password</label>
                                <input class="form-control" v-model="member.password" placeholder="Masukan password">

                                <!--validation-->
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ validation.password[0]}}
                                </div>
                            </div>
                  
                            <!-- <div class="form-group mb-3">
                                <label for="content" class="form-label">Masa Berlaku</label>
                                <input type="date" class="form-control" v-model="member.masa_berlaku" placeholder="YYYY/MM/dd"> -->

                                <!--validation-->
                                <!-- <div v-if="validation.masa_berlaku" class="mt-2 alert alert-danger">
                                    {{ validation.masa_berlaku[0]}}
                                </div>
                            </div> -->

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Status</label>
                                <select name="status" id="status" class="form-select" v-model="member.status">
                                    <option value="Tidak Aktif">Tidak Aktif</option>
                                    <option value="Aktif">Aktif</option>
                                </select>

                                <!-- validation -->
                                <div v-if="validation.status" class="mt-2 alert alert-danger">
                                    {{ validation.status[0] }}
                                </div>
                            </div>

                            <!-- <div class="form-group mb-3">
                                <label for="content" class="form-label">Jumlah deposit cash</label>
                                <input class="form-control" v-model="member.deposit_cash" placeholder="Masukkan nama manager">

                                <div v-if="validation.deposit_cash" class="mt-2 alert alert-danger">
                                    {{ validation.deposit_cash[0]}}
                                </div>
                            </div> -->

                            <button type="submit" class="btn btn-primary">SAVE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref, onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import axios from 'axios'

    export default {
        setup() {
            //state member
            const member = reactive({
                id_member: '',
                nama: '',
                alamat: '',
                tgl_lahir: '',
                no_telp: '',
                gender: '',
                email: '',
                password: '',
                masa_berlaku: '',
                status: '',
                deposit_cash: '',
            })

            //state validation
            const validation = ref([])
            //vue router
            const router = useRouter()
            //vue route
            const route = useRoute()

            onMounted(() => {
            //get API from Laravel Backend
                axios.get(`https://jesso.ppcdeveloper.com/api/member/${route.params.id}`)
                .then(response => {
                    //assign state posts with response data
                    member.id_member = response.data.data.id_member
                    member.nama = response.data.data.nama
                    member.alamat = response.data.data.alamat
                    member.tgl_lahir = response.data.data.tgl_lahir
                    member.no_telp = response.data.data.no_telp
                    member.gender = response.data.data.gender
                    member.email = response.data.data.email
                    member.password = response.data.data.password
                    member.masa_berlaku = response.data.data.masa_berlaku
                    member.status = response.data.data.status
                    member.deposit_cash = response.data.data.deposit_cash

                }).catch(error => {
                    console.log(error.response.data)
                })
            })

            //method update
            function update() {
                let id_member = member.id_member
                let nama = member.nama
                let alamat = member.alamat
                let tgl_lahir = member.tgl_lahir
                let no_telp = member.no_telp
                let gender = member.gender
                let email = member.email
                let password = member.password
                let masa_berlaku = member.masa_berlaku
                let status = member.status
                let deposit_cash = member.deposit_cash

                axios.put(`https://jesso.ppcdeveloper.com/api/member/${route.params.id}`, {
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
                }).then(() => {
                        //redirect ke post index
                        router.push({
                            name: 'member.index'
                        })
                    }).catch(error => {
                        //assign state validation with error
                        validation.value = error.response.data
                    })

            }

            //return
            return {
                member,
                validation,
                router,
                update
            }

        }
    }    
</script>

<style>

</style>