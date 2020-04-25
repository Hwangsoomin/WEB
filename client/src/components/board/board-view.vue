<template>
    <div>
        <span v-if="post.category==='fr'">자유</span>
        <span v-if="post.category==='qu'">질문</span>
        <br/>
        <span>제목: {{post.title}}</span><br/>
        <span>작성자: {{post.auth}}</span>&nbsp;&nbsp;<span>날짜: {{post.date}}</span><br/>
        <span>내용: {{post.content}}</span><br/>
        <button class="btn" v-if="edit" >
            <router-link :to="{ path:'/board/edit/'+post._id}">EDIT</router-link>
        </button>
        <button class="btn" v-if="edit" @click="del=true">DELETE
        </button>
        <v-card-text>
            <v-card-text v-if="del">
                <v-alert><h4>정말 삭제 하시겠습니까?</h4>
                <button v-on:click="Delete">확인</button>
                <button @click="del=false">취소</button>
                </v-alert>
            </v-card-text>
        </v-card-text>
        <!--<h4>Comments</h4>
        <div v-if="comments.length!==0">
            <div v-for="comment in comments" v-bind:key="comment._id">
                <div>
                    <div>
                        <div>{{comment.author.username}}</div>
                        <div>
                            <div>
                                <div>{{comment.text}}</div>
                                <small>
                                    (created: <span>{{comment.createdAt}}</span>)
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="flag">
            <div>
                <textarea name="text" rows="2">{{commentForm.form.text}}</textarea>
            </div>
        </div>-->
    </div>
</template>

<script>
export default {
    created(){
        var id = this.$route.params.id;
        this.$http.get(`/api/board/view/${id}`)//해당 id의 게시글 가져오기
        .then((res) => {
            this.post = res.data;
            //this.comments = res.data.comments;
            this.$http.get('/api/look/email')//지금 현재 이메일가져오기
            .then((res) => {
                this.email = res.data;
                if(this.email != undefined)this.flag = true;
                if(this.email === this.post.auth) this.edit = true;
                else if(this.email !== this.post.auth)this.edit = false;
            });
        });
    },
    data(){
        return{
            post : '',
            email: '',
            edit: '',
            text: '',
            del: false,
            flag: false,
            comments: []
        }
    },
    methods: {
        Delete: function(event){
            var id = this.$route.params.id;
            this.$http.delete(`/api/board/delete/${id}`)
            .then((res) => {
                alert(res.data);
                this.$router.push('/board');
            })
        }
    }
}
</script>