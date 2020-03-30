<template>
    <div>
        <table align="center">
            <thead class="thead-light">
                <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Date</th>
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
        <button v-if="previousBtnEnabled">
            <router-link :to="{ path:'/board', query: {page: prePage,limit:limit}}">&laquo;</router-link>
        </button>
        <span v-for="i in maxPage" v-bind:key="i">
            <span v-if="i===1||i===maxPage||(i>=p1&&i<=p2)">
                <button class="page-item"  v-if="i!==currentPage">
                    <router-link :to="{ path:'/board?page='+i+'&limit='+limit}">{{i}}</router-link>
                </button>
                <button v-else>{{i}}</button>
            </span>
            <span v-else-if="i===2||i===pmaxPage">
                <button><a class="page-link">...</a></button>
            </span>
        </span>
        <button v-if="nextBtnEnabled">
            <router-link :to="{ path:'/board?page='+nextPage+'&limit='+limit}">&raquo;</router-link>
        </button>
        <div>
            <label>Search</label>
            <div>
                <select v-model="searchType">
                    <option disabled value="">Select one</option>
                    <option>Title,Content</option>
                    <option>Title</option>
                    <option>Content</option>
                </select>
                <input minlength="3" type="text" name="searchText" v-model.trim="searchText">
                <div>
                    <button class="btn" v-on:click="subS">Search</button>
                </div>
                <v-card-text>
                    <v-card-text v-if="flag">
                    <v-alert><h4>검색대상을 선택하였는지, 검색할 내용이 3글자이상인지 확인하여주세요.</h4></v-alert>
                    </v-card-text>
                </v-card-text>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'board',
    created() {
        this.$http.get(`/api${this.$route.fullPath}`)
        .then((res) => {
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
            prePage: '',
            searchType: '',
            searchText: '',
            flag: false
        }
    },
    watch:{
        $route(){
            this.$router.go(this.$router.currentRoute);
        }
    },
    methods: {
        async subS(){
            if(this.searchType.length < 1)this.flag = true;
            else if(this.searchText.length < 3)this.flag = true;
            else await this.$router.push(`/board?searchType=${this.searchType}&searchText=${this.searchText}`);
        }
    }
}
</script>