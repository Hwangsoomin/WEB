<template>
    <div>
        <form id="board_write" method="post" action="/api/board/write">
            <div>
                <select name ="category">
                    <option value="fr" selected>자유</option>
                    <option value="qu">질문</option>
                </select>
            </div>
            <div>
                <input name="title" type="text" placeholder="title" /><br />
            </div>
            <div>
                {{email}} {{date}}
            </div>
            <div>
                <input name="content" type="textarea" placeholder="content를 입력해주세요" /><br />
            </div>
            <button class="btn">WRITE!</button>
        </form>
    </div>
</template>

<script>
export default {
    created(){
        this.$http.get('/api/look/login')
        .then((res) => {
            if(!res.data){
                alert("로그인한 사용자만 작성할 수 있습니다.");
                this.$router.push('/');
            }
            else{
                this.email = res.data.email;
            }
        })
    },
    data(){
        return {
            email: '',
            date: new Date()
        }
    }
}
</script>

