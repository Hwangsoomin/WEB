<template>
    <div>
        <div v-if="flag===false">
            <label for="password"><h4>{{msg}}</h4></label><br/>
            <input type="password" id="password" v-model.trim="password"/>
            <button type="btn" v-on:click="checkPass">확인</button>
        </div>
        <div v-if="flag===true">
            <div>이름: {{name}}</div>
            <div>이메일: {{email}}</div>
            <div>
                <label for="nickname">닉네임: 
                    <input type="text" id="nickname" name="nickname" v-model.trim="nickname" placeholder="닉네임입력이 가능합니다">
                </label>
            </div>
            <button type="btn" v-on:click="modify">변경</button>
        </div>
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
            this.name = res.data.name;
            this.email = res.data.email;
            if(res.data.nickname!=undefined)this.nickname = res.data.nickname;
        });
    },
    data(){
        return{
            name: '',
            email: '',
            password: '',
            nickname: '',
            flag: false,
            msg: '비밀번호를 입력하세요: '
        }
    },
    methods: {
        checkPass: function(event){
            this.$http.post('/api/look/pass',{pass: this.password})
            .then((res) => {
                if(res.data!=false){
                    this.flag=true;
                    this.password = res.data;
                }
                else this.msg='비밀번호가 일치하지 않습니다. 비밀번호를 다시 입력하세요: ';
            });
        },
        modify: function(event){
            const Data = {
                nickname: this.nickname
            }
            this.$http.post('/api/modify/nickname',Data)
            .then((res) => {
                alert(res.data);
                this.$router.push('/');
            });
        }
    }
}
</script>