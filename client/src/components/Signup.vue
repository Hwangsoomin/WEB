<template>
<div>
    <h3>Sign Up</h3>
    <div>
        <label for="name">Name*</label>
        <div>
            <input type="text" id="name" name="name" v-model.trim="name" />
            <span><br/>{{errors.name}}</span>
        </div>
    </div>
    <div>
        <label for="email">Email*</label>
        <div>
            <input type="text" id="email" name="email" v-model.trim="email" />
            <span><br/>{{errors.email}}</span>
        </div>
    </div>
    <div>
        <label for="password">Password*</label>
        <div>
            <input type="password" id="password" name="password" v-model.trim="password"/>
            <span><br/>{{errors.password}}</span>
        </div>
    </div>
    <p>
        <small>*Required</small>
    </p>
    <div>
        <button type="submit" v-on:click="signupSub">Submit</button>
    </div>
</div>
</template>

<script>
export default {
    //잘못된 형식 바로 아래에 뜨게 하는 건데 잘 안됨...
    data(){
        return{
            errors: [
                {email: ''},
                {name: ''},
                {password: ''}
            ],
           email: '',
           name: '',
           password: '',
           number: ''
        }
    },
    methods: {
        signupSub: function(event){
            console.log('들어왔니?');
            const data ={
                name: this.name,
                email: this.email,
                password: this.password,
                key_for_verify: ''
            }
            this.$http.post('/api/signup', data)
            .then((res) => {
                console.log('Wow');
                console.log(res.data.errors);
                console.log(res.data.number);
                this.errors = res.data.errors;
                this.number = res.data.number;
                if(this.number === 2){
                    alert('이미 존재하는 이메일 입니다.');
                }
                else if(this.number === 3){
                    alert('이메일을 확인하여 이메일 인증을 완료해주세요.');
                    this.$router.push('/');
                }
            })
        }
    }
}
</script>