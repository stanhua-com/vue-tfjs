<template>
  <div :class="{'input-number':true,'disabled-input-number':disabled}">
    <i class="icon i-minus" v-repeat-click="minusClick"></i>
    <input class="input" v-model.number="currentValue" :disabled="disabled" />
    <i class="icon i-plus"" v-repeat-click="plusClick"></i>
  </div>
</template>
<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>