<template>
    <div>
        <label for="password"><h4>현재 비밀번호를 입력하세요: </h4>
            <input type="password" id="password" v-model.trim="password">
        </label>
        <label for="npassword"><h4>변경할 비밀번호를 입력하세요: </h4>
            <input type="password" id="npassword" v-model.trim="npassword">
        </label>
        <label for="nnpassword"><h4>변경할 비밀번호를 다시 한번 입력하세요: </h4>
            <input type="password" id="nnpassword" v-model.trim="nnpassword">
        </label>
        <button class="btn" v-on:click="modify">변경</button>
    </div>
</template>

<script>
export default {
    created(){
        this.$http.get('/api/look/all')
        .then((res) => {
            if(res.data===false){
                alert('로그인 먼저 해주세요!')
                this.$router.push('/login');
            }
        });
    },
    data(){
        return{
            password: '',
            npassword: '',
            nnpassword: ''
        }
    },
    methods: {
        modify: function(event){
            this.$http.post('/api/look/pass',{pass: this.password})
            .then((res) => {
                if(res.data=true){
                    if(this.npassword===this.nnpassword){
                        this.$http.post('/api/modify/password',{password: this.npassword})
                        .then((res) => {
                            alert(res.data);
                            this.$router.push('/');
                        })
                    }
                    else {
                        alert('변경하려는 비밀번호가 일치하지않습니다.');
                        return;
                    }
                }
            })
        }
    }
}
</script>