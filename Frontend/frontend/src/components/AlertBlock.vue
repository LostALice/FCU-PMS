<template>
    <transition name="slide-fade">
        <div class="popup-modal rounded-3 alert-danger" v-if="AlertMessage" @click="modalClicked">
            <div class="alert-danger align-item-center">
                <span>{{ AlertMessage }}</span>
            </div>
        </div>
    </transition>
</template>

<script setup>
    import { onUpdated } from "vue"
    import { ref } from "vue"

    let props = defineProps({
        message: String
    })
    const emit = defineEmits(["closeBlock"])

    const AlertMessage = ref(props.message)

    onUpdated(() => {
        AlertMessage.value = props.message
        if (!AlertMessage.value == "") {
            console.error(AlertMessage.value)
        }
        setTimeout(() => {
            emit("closeBlock")
        }, 3000)
    })

    function modalClicked() {
        emit("closeBlock")
    }
</script>

<style>
    .popup-modal {
        position: fixed;
        bottom: 70px;
        right: 15px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        padding: 20px;
        z-index: 2000;
    }
    .popup-modal:hover {
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }

    .slide-fade-enter-active {
        transition: all 0.5s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.5s ease-out;
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }
</style>