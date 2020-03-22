<template>
    <div>
        <table class="board-table table table-sm border-bottom">
            <thead class="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col" class="author">Author</th>
                    <th scope="col" class="date" >Date</th>
                </tr>
            </thead>

            <tbody>
                <tr v-if="posts===null||posts.length===0">
                    <td colspan=2>There is no data to show :( </td>
                </tr>
                <tr v-for="post in posts" v-bind:key="post._id">
                    <td>
                        <div class="ellipsis" v-if="post.category === 'fr'">자유</div>
                        <div class="ellipsis" v-if="post.category === 'qu'">질문</div>
                    </td>
                    <td>
                        <router-link :to="{ path:'/board/view/'+post._id}"><div class="ellipsis">{{post.title}}</div></router-link>
                    </td>
                    <td class="author">
                        <div class="ellipsis">{{post.auth}}</div>
                    </td>
                    <td class="date">
                        <div class="ellipsis">{{post.date}}</div>
                    </td>
                </tr>
            </tbody>

        </table>
        <div class="col-2">
            <a class="btn btn-primary" href="/board/write">New</a>
        </div>
            <button v-if="previousBtnEnabled" v-on:click="preP">
                <router-link :to="{ path:'/board', query: {page: prePage,limit:limit}}">&laquo;</router-link>
            </button>
            <div v-for="i in maxPage" v-bind:key="i">
                <div v-if="i===1||i===maxPage||(i>=p1&&i<=p2)">
                    <button class="page-item"  v-if="i!==currentPage">
                        <router-link :to="{ path:'/board?page='+i+'&limit='+limit}">{{i}}</router-link>
                    </button>
                    <button v-else>{{i}}</button>
                </div>
                <div v-else-if="i===2||i===pmaxPage">
                    <button><a class="page-link">...</a></button>
                </div>
            </div>
            <button v-if="nextBtnEnabled">
                <router-link :to="{ path:'/board?page='+nextPage+'&limit='+limit}">&raquo;</router-link>
            </button>
    </div>
</template>

<script>
export default {
    name: 'board',
    created() {
        this.$http.get(`/api${this.$route.fullPath}`)
        .then((res) => {
            console.log(res.data);
            this.posts = res.data.posts;
            this.currentPage = res.data.currentPage;
            this.maxPage = res.data.maxPage;
            this.limit = res.data.limit;
            if(this.currentPage > 1)this.previousBtnEnabled = true;
            if(this.currentPage < this.maxPage)this.nextBtnEnabled = true;
            this.nextPage = this.currentPage + 1;
            this.prePage = this.currentPage - 1;
            this.p1 = this.currentPage - 2;
            this.p2 = this.currentPage + 2;
            this.pmaxPage = this.maxPage - 1;
            console.log(this.currentPage);
            console.log(this.maxPage);
            console.log(this.limit);
            console.log(this.previousBtnEnabled);
            console.log(this.nextBtnEnabled);
        })
    },
    data(){
        return{
            posts: [],
            p1: '',
            p2: '',
            previousBtnEnabled: false,
            nextBtnEnabled: false,
            limit: '',
            currentPage: '',
            maxPage: '',
            pmaxPage: '',
            i: 0,
            nextPage: '',
            prePage: ''
        }
    },
    watch:{
        $route(){
            this.$router.go(this.$router.currentRoute);
        }
    },
    methods: {
        /*preP: function(event){
            this.$router.push(`/board?page=${this.prePage}&limit=${this.limit}`);
        }*/
    }
}
</script>