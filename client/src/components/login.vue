<template>
    <div>
        <strong>{{message}}</strong>
        <form action="/api/login" method="post">
            <label for="email">E-MAIL</label>
            <input name="email" type="email" required />
            <label for="password">PASSWORD</label>
            <input name="password" type="password" required/>
            <button class="btn">LOGIN!</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "LOGIN",
    data(){
        return {
            message: ''
        }
    },
    mounted(){
        this.$http.get('/api/look/flash')
        .then((res)=>{
            this.message = res.data;
        })
    }
}
</script>