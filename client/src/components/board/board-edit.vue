<template>
    <div>
        <form v-on:submit.prevent="onSubmit">
            <div>
                <span v-if="post.category==='fr'">자유</span>
                <span v-if="post.category==='qu'">질문</span>
            </div>
            <div>
                <input v-model="post.title" type="text" id="post.title" ref="post.title">
            </div>
            <div>
                <textarea v-model="post.content" id="post.content" ref="post.content"></textarea>
            </div>
            <button type="submit">UPLOAD!</button>
        <form>
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
                    console.log('왜 안들어가');
                    this.post = res.data;
                    if(this.email !== this.post.auth){
                        alert('게시글을 수정할 권한이 없습니다.');
                        this.$router.push('/board');
                    }
                });
            });
    },
    data(){
        return {
            post: '',
            email: ''
        }
    },
    methods: {
        onSubmit(){
            var title = this.$refs.post.title.value;
            var content = this.$refs.post.content.value;
            console.log('에디트 들어옴');
            this.$http.post(`/api/board/edit/${post._id}`,{
                title: title,
                content: content
            })
            .then((res) => {
                alert(res.data);
                this.$router.push('/board/view/'+this.post._id);
            })
        }
    }
    /*actions: {
        submitBoard: function() {
            this.$http.post(`/api/board/edit/${this.post._id}`,{
                content : this.content,
                title: this.title
            })
        }
    }*/
}
</script>