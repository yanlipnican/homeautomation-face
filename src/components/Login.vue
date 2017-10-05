<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-8 col-md-6 col-lg-4 mr-auto ml-auto mt-5">
                <div class="row">
                    <div class="col-12 mb-4">
                        <h3>Login</h3>
                    </div>
                    <div class="col-12">
                        <label for="">name</label>
                        <el-input></el-input>
                    </div>
                    <div class="col-12 mt-1">
                        <label for="">email</label>
                        <el-input></el-input>
                    </div>
                    <div class="col-12 mt-3">
                        <el-button :loading="loading" v-on:click="login()" type="primary">Log in</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        login: function () {
            if (this.loading) {
                return;
            }
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.$router.push('/dashboard');
            }, 2000);
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
