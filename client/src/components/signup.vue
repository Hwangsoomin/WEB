<template>
    <div>
        <form action="/api/signup" method="post" class="signupform">
        <label for="email">E-MAIL</label>
        <input name="email" type="email" required />
        <br>
        <label for="password">PASSWORD</label>
        <input name="password" type="password" required /><br>
        <label for="name">NAME</label>
        <input name="name" type="text" required /><br>
        <label for="adminCode">ADMIN CODE</label>
        <input name="adminCode" type="text" /><br>
        <button class="btn">SIGNUP!</button>
        </form>
    </div>
</template>
