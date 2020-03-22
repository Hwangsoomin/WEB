<template>
    <div class="dropbox">
        <input class="input-file" type="file" name="myfile" @change="upload($event.target.name, $event.target.files)" @drop="upload($event.target.name, $event.target.files)">
        <h2>파일을 드래그해서 드랍해주세요.</h2>    
    </div>
</template>

<script>
export default {
    data(){
        return{
            title: '',
            myFile: ''
        }
    }
}
</script>