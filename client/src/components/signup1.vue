<template>
    <div>
        <label for="email">E-MAIL</label>
        <input type="email" name="email" id="email" v-model.trim="email">
        <button type="btn" v-on:click="confirm">인증하기</button>
        <br>
        <label v-if="ver">
            <input type="text" v-model="email_v" />
            <button type="btn" v-on:click="verify">확인</button>
        </label><br/>
        <label for="password">PASSWORD</label>
        <input name="password" type="password" id="password" v-model.trim="password"/><br>
        <label for="name">NAME</label>
        <input name="name" type="text" id="name" v-model.trim="name"/><br>
        <button class="btn" v-on:click="signUp">SIGNUP!</button>
        <v-card-text>
            <v-card-text v-if="ev">
                <v-alert><h4>{{msg}}</h4>
                <button @click="ev=false">확인</button>
                </v-alert>
            </v-card-text>
        </v-card-text>
    </div>
</template>

<script>
export default {
    data(){
        return {
            ver: false,
            email_v: '',
            email: '',
            password: '',
            name: '',
            ev: false,
            msg:'',
            lastV: false
        }
    },
    methods: {
        confirm: function(event){//this.email 확인
            if(!this.email){
                this.ev = true;
                this.msg = '이메일은 필수입니다.';
                return;
            }
            else if(!this.validEmail(this.email)){
                this.ev = true;
                this.msg = '이메일 형식을 확인하세요';
                return;
            }
            this.ver=true;
            const Data = {
                email: this.email
            }
            this.$http.post('/api/confirm1',Data)//이메일 중복여부확인
            .then((res) => {
                alert(res.data);
            })
        },
        verify: function(event){
            console.log(this.email_v);
            this.$http.post('/api/confirm1/verify',{key: this.email_v})//이메일 인증완료
            .then((res) => {
                alert(res.data);
                this.lastV = true;
            })
        },
        validEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
             return re.test(email);
        },
        signUp: function(event){
            if(!this.lastV){
                alert('이메일인증을 진행해주세요.');
                return;
            }
            if(!this.name || !this.password){
                this.ev=true;
                if(!this.passwprd)this.msg='비밀번호는 필수입니다.';
                if(!this.name)this.msg = '이름은 필수입니다.';
                return;
            }
            const formData = {
                email: this.email,
                password: this.password,
                name: this.name
            }
            this.$http.post('/api/signup',formData)
            .then((res) => {
                alert(res.data);
                this.$router.push('/');
            })
        }
    }
}
</script>
