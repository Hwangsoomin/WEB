<template>
</template>

<script>
export default {
    name: 'confirm',
    created(){
        alert('들어왔다');
        this.$http.get(`/api${this.$route.fullPath}`)
        .then((res)=>{
            alert(res.data);
            this.$router.push('/');
        })
    }
}
</script>