<template>
<div class="container">
    <div class="row">
        <div class="col s12 m6 offset-m3 ">
            <div class="card">
                <div class="card-content white-text center">
                    <span class="card-title">Register</span>
                    <div class="row">
                        <form class="col s12">
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="email" type="email" class="validate" v-model="email">
                                    <label for="email">Email</label>
                                    <span class="helper-text" data-error="wrong" data-success="right"></span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="password" type="password" class="validate" v-model="password">
                            <label for="password">Password</label>
                        </div>
                    </div>
                </div>
                <div class="card-action">
                    <a  v-on:click="register" class="waves-effect waves-light btn">Register</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import firebase from 'firebase';



export default {
    name: 'register',
    data: function(){
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        register: function(e){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
                alert(`Account created for ${user.email}`);
                this.$router.push('/');
            },
            err => {
                alert(err.message);
            })
            e.preventDefault();
        }
    }
}
</script>

<style>
.card-panel,
.card {
    background-color: #66b5c8;
    word-break: break-all;

}

.btn {
    background-color: #7dd0e6
}

p {
    word-break: break-all;
}

input:not([type]):focus:not([readonly]),
input[type=text]:not(.browser-default):focus:not([readonly]),
input[type=password]:not(.browser-default):focus:not([readonly]),
input[type=email]:not(.browser-default):focus:not([readonly]),
input[type=url]:not(.browser-default):focus:not([readonly]),
input[type=time]:not(.browser-default):focus:not([readonly]),
input[type=date]:not(.browser-default):focus:not([readonly]),
input[type=datetime]:not(.browser-default):focus:not([readonly]),
input[type=datetime-local]:not(.browser-default):focus:not([readonly]),
input[type=tel]:not(.browser-default):focus:not([readonly]),
input[type=number]:not(.browser-default):focus:not([readonly]),
input[type=search]:not(.browser-default):focus:not([readonly]),
textarea.materialize-textarea:focus:not([readonly]) {
    border-bottom: 1px solid #ffffff;
    -webkit-box-shadow: 0 1px 0 0 #ffffff;
    box-shadow: 0 1px 0 0 #ffffff;
}

input:not([type]),
input[type=text]:not(.browser-default),
input[type=password]:not(.browser-default),
input[type=email]:not(.browser-default),
input[type=url]:not(.browser-default),
input[type=time]:not(.browser-default),
input[type=date]:not(.browser-default),
input[type=datetime]:not(.browser-default),
input[type=datetime-local]:not(.browser-default),
input[type=tel]:not(.browser-default),
input[type=number]:not(.browser-default),
input[type=search]:not(.browser-default),
textarea.materialize-textarea {
    border-bottom: 1px solid #7dd0e6 !important;
    /* background-color: rgba(71, 110, 118, 0.18); */
}

::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #5f6d6d;
}

:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #b9dedc;
}

::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #b9dedc;
}

.material-icons {
    cursor: pointer;

}

.input-field input[type=text]:focus+label {
    color: #ffffff;
}

textarea.materialize-textarea:focus:not([readonly])+label {
    color: #ffffff !important;
}

.input-field label {
    color: #33606b;
}
</style>
