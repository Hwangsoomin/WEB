<template>
    <div id="wrap">
        <span class="title">Hello {{email}}</span>
        <div class="user">
            <input type="button" class="btn" onclick="location.href='/login'" value="LOGIN"/>
            <input type="button" class="btn" onclick="location.href='/signup'" value="SIGNUP"/>
            <input type="button" class="btn" onclick="location.href='/board'" value="게시판" />
            <button @click="logOut">LOGOUT</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "INDEX",
    data(){
        return{
            email: ''
        }
    },
    created(){
        this.$http.get('/api/look/email')
        .then((res)=>{
            console.log(res.data);
            this.email = res.data;
        })
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