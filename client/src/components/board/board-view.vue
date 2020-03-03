<template>
    <div>
        <span v-if="post.category==='fr'">자유</span>
        <span v-if="post.category==='qu'">질문</span>
        <br/>
        <span>{{post.title}}</span><br/>
        <span>{{post.auth}}<span><span>{{post.date}}</span><br/>
        <span>{{post.content}}</span><br/>
        <button class="btn" v-if="edit" >
            <router-link :to="{ path:'/board/edit/'+post._id}">EDIT</router-link>
        </button>
    </div>
</template>

<script>
export default {
    created(){
        var id = this.$route.params.id;
        this.$http.get(`/api/board/view/${id}`)
        .then((res) => {
            this.post = res.data;
            this.$http.get('/api/look/email')
            .then((res) => {
                this.email = res.data;
                if(this.email === this.post.auth) this.edit = true;
                else this.edit = false;
            });
        });
    },
    data(){
        return{
            post : '',
            email: '',
            edit: ''
        }
    }/*,
    methods:{
        Edit(){
            this.$http.get('')
        }
    }*/
}
</script>