<template>
    <div id="wrap">
        <span class="title">Hello {{email}}</span>
        <div class="user">
            <input type="button" class="btn" onclick="location.href='/login'" value="LOGIN"/>
            <input type="button" class="btn" onclick="location.href='/signUp'" value="SIGNUP"/>
            <input type="button" class="btn" onclick="location.href='/board'" value="게시판" />
            <div>
                <div v-if="infoF===false">
                <input type="button" class="btn" value="나의정보" @click="infoF=true"/>
                </div>
                <div v-if="infoF===true">
                <input type="button" class="btn" onclick="location.href='/myinfo/nick'" value="닉네임변경" />
                <input type="button" class="btn" onclick="location.href='/myinfo/pass'" value="비밀번호변경" />
                </div>
            </div>
            <button @click="logOut">LOGOUT</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "INDEX",
    data(){
        return{
            email: '',
            infoF: false
        }
    },
    created(){
        this.$http.get('/api/look/email')
        .then((res)=>{
            console.log(res.data);
            this.email = res.data;
        });
    },
    methods: {
        logOut(){
            this.$http.get('/api/logout')
            .then((res)=>{
                this.$router.go('/');
            })
        }
    }
}
</script>