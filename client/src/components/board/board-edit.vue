<template>
    <div>
        <span v-if="Post.category==='fr'">자유</span>
        <span v-if="Post.category==='qu'">질문</span><br/>
        <label>제목:
            <input v-model.trim="Post.title" type="text">
        </label><br/>
        <label>내용:
            <textarea v-model.trim="Post.content"></textarea>
        </label><br/>
            <button type="submit" v-on:click="onSubmit">UPLOAD!</button>
    </div>
</template>

<script>
export default {
    created(){
        var id = this.$route.params.id;
        this.$http.get('/api/look/email')
            .then((res) => {
                this.email = res.data;
                this.$http.get(`/api/board/view/${id}`)
                .then((res) => {
                    this.Post = res.data;
                    if(this.email !== this.Post.auth){
                        alert('게시글을 수정할 권한이 없습니다.');
                        this.$router.push('/board');
                    }
                });
            });
    },
    data(){
        return {
            Post: '',
            email: ''
        }
    },
    methods: {
        onSubmit: function(event){
            if(!this.Post.title){
                alert('제목을 작성해주세요.');
                return;
            }
            if(!this.Post.content){
                alert('내용을 작성해주세요.');
                return;
            }
            const formData = {
                title: this.Post.title,
                content: this.Post.content
            }
            this.$http.put(`/api/board/edit/${this.Post._id}`,formData)
            .then((res) => {
                alert(res.data);
                this.$router.push('/board/view/'+this.Post._id);
            })
        }
    }
}
</script>