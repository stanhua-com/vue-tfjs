<template>
  <div class="input-box" :class="inputClass">
    <div v-if="$slots.prepend" class="prepend">
      <slot name="prepend"></slot>
    </div>

    <input v-if="type!=='textarea'" :type="type" v-model="currentValue" class="input" :disabled="disabled"
      :readonly="readonly" :autocomplete="autocomplete" :placeholder="placeholder" :autofocus="autofocus"
      @focus="onFocus" @blur="onBlur" @input="onChange" />

    <textarea v-else v-model="currentValue" class="input" :disabled="disabled" :readonly="readonly"
      :autocomplete="autocomplete" :placeholder="placeholder" :autofocus="autofocus" @focus="onFocus" @blur="onBlur"
      @input="onChange"></textarea>

    <div v-if="clearable&&isClear" class="append" @click="onClear">
      <i class="icon i-clear"></i>
    </div>
    <div v-if="$slots.append" class="append">
      <slot name="append"></slot>
    </div>
  </div>
</template>
<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>