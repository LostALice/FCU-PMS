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
    import { ref, onUpdated } from "vue";

    let props = defineProps({
        message: String
    })

    const AlertMessage = ref(props.message)

    onUpdated(() => {
        AlertMessage.value = props.message
        setTimeout(() => {
            AlertMessage.value = ""
        }, 3000)
    })

    function modalClicked() {
        AlertMessage.value = ""
    }
</script>

<style>
    .popup-modal {
        position: fixed;
        bottom: 70px;
        right: 15px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        padding: 20px;
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