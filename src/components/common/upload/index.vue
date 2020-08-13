<template>
  <div class="upload-box" :class="{'drag-upload-box':drag}" @click="uploadChange">
    <img v-if="image" :src="image" />
    <template v-else>
      <p v-if="drag">将文件拖到此处，或<span>点击上传</span></p>
      <i v-else class="icon i-plus"></i>
    </template>
    <input name="imgFile" type="file" :accept="accept" @change="fileChange">
  </div>
</template>
<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>