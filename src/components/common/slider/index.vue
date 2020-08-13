<template>
  <div class="slider" :class="{'vertical-slider':vertical,'slider-disabled':disabled}" @click="onTouch">
    <div class="slider-bar"></div>
    <div class="slider-handle" @mousedown.stop="onTouch" @touchstart.stop="onTouch">
      <span v-if="tooltip">{{ value }}</span>
    </div>
  </div>
</template>
<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>