<template>
<div class="container">
    <div class="row">
        <div class="col s12 m6 offset-m3 ">
            <div class="card">
                <div class="card-content white-text center">
                    <div>
                        <div class="input-field col s12">
                            <input id="title" type="text" class="white-text" v-model="title">
                            <label for="title"> Title</label>
                        </div>
                    </div>
                    <div>
                        <div class="input-field col s12">
                            <textarea id="textarea2" class="materialize-textarea white-text" data-length="120" v-model="task"></textarea>
                            <label for="textarea2"> Task</label>
                        </div>
                    </div>
                    <div style="text-algin right">
                        <a class="waves-effect waves-light btn right-text" v-on:click="addTodo"><i class="material-icons right">send</i>Send</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class='col s4 m4 l4'>
        <div v-for=" (todo, index) in todos" v-bind:key='todo.id' class="card">
            <i v-on:click="close(index,todo)" class="material-icons right white-text">close</i>
            <div class=" card-content white-text">
                <div>
                    <div v-if="!todo.editing" @dblclick="editTodo(todo)" class="todo-item-title">
                        <span class="card-title"> {{todo.title}}</span>
                    </div>
                    <input v-else class="todo-item-edit" type='text' v-model="todo.title" @blur="doneEdit(todo)">
                </div>
                <div>
                    <div v-if="!todo.editing" @dblclick="editTodo(todo)" class="todo-item-task">
                        <p>{{todo.task}}</p>
                        <p style="color:rgba(71, 110, 118, 0.49); text-align: right;">{{todo.date}}</p>
                    </div>
                    <input v-else class="todo-item-edit" type='text' v-model="todo.task" @blur="doneEdit(todo)">
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase'
export default {
    name: 'card',
    data() {
        return {
            title: '',
            task: '',
            idForTodo: 1,
            date: '',
            contentid: null,
            editing: false,
            todos: [

            ]
        }
        
    },
    created () {
        const user = firebase.auth().currentUser;
        const uid = user.uid
        db.collection(uid).orderBy('date').get().then(querySnapshot =>{
            querySnapshot.forEach(doc => {
                const data = {
                    title : doc.data().title,
                    task : doc.data().task,
                    date : doc.data().date,
                    contentid : doc.data().contentid,
                    editing : doc.data().editing,
                    completed : doc.data().completed

                }
                this.todos.push(data)

            })
        })
    },
    methods: {
        addTodo() {
                const user = firebase.auth().currentUser;
                const uid = user.uid
                var d = new Date();
                var NewContentId = Math.floor((Math.random() * 100) + 1)
                if (this.task == '') {
                    alert("You must have a task")
                } else {

                    if (this.title == '') {
                        this.title = 'Task ' + this.idForTodo
                    }

                    db.collection(uid).add({
                        title: this.title,
                        task: this.task,
                        completed: false,
                        editing: false,
                        date: d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear(),
                        contentid: NewContentId
                    })

                    this.todos.push({
                        title: this.title,
                        task: this.task,
                        completed: false,
                        editing: false,
                        date: d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear(),
                        contentid: NewContentId
                    })
                    this.idForTodo++
                    this.title = ''
                    this.task = ''
                }
            },
            close(index, todo) {
                const user = firebase.auth().currentUser;
                const uid = user.uid
                if (confirm('Are you sure?')) {
                    db.collection(uid).where('contentid', '==', todo.contentid).get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                doc.ref.delete();
                                this.todos.splice(index, 1)
                            })
                        })
                }
            },
            editTodo(todo) {
                todo.editing = true
            },
            doneEdit(todo) {
                const user = firebase.auth().currentUser;
                const uid = user.uid
                db.collection(uid).where('contentid', '==', todo.contentid).get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            doc.ref.update({
                                title: todo.title,
                                task: todo.task
                            })
                        })
                    })
                todo.editing = false
            },


        }
        }

</script>

<!--- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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

<!--
#7e6d3c
Garden Weed
#c2a445
Oil Yellow
#e1b580
Cane Sugar
#efbbc3
Chantilly
#f0c0f3
Electric Lavender
#d6c0dc
Thistle 
-->