<template>
  <a class="btn" :class="className" @click="handleClick">
    <slot></slot>
  </a>
</template>
<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>