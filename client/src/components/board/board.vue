<template>
    <div>
        <div v-for="post in posts" v-bind:key="post._id">
            <li>
                <span v-if="post.category==='fr'">자유</span>
                <span v-if="post.category==='qu'">질문</span>
                <br/>
                <router-link :to="{ path:'/board/view/'+post._id}">
                <div class="info">
                    <span>{{post.title}}</span><br/>
                    <span>{{post.auth}} {{post.date}}</span><br/>
                </div>
                </router-link>
            </li>
        </div>
    </div>
</template>

<script>
export default {
    name: 'board',
    created() {
        this.$http.get('/api/board')
        .then((res) => {
            this.posts = res.data;
        })
    },
    data(){
        return{
            posts: []
        }
    }
}
</script>