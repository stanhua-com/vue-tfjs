<template>
  <div class="content tensor-page">
    <div class="section">
      <div class="section-title">TenSor</div>
      <div class="section-content">
        张量是TensorFlow.js的核心数据结构，它们是向量和矩阵到潜在更高维度的概括。具有适用于标量，1D，2D，3D和4D张量的常见情况的实用程序功能，以及许多用于以对机器学习有用的方式初始化张量的功能
      </div>
    </div>

    <div class="section">
      <div class="section-title">tf.tensor (values, shape?, dtype?)</div>
      <div class="section-content">
        <h3>参数</h3>
        <table>
          <tr>
            <th>参数名称</th>
            <th>类型</th>
            <th>默认值</th>
            <th>必填</th>
            <th>说明</th>
          </tr>
          <tr>
            <td>values</td>
            <td>TypedArray|Array</td>
            <td></td>
            <td>是</td>
            <td>张量的值。 可以是数字的嵌套数组，平面数组或TypedArray。 如果值是字符串，则将它们编码为utf-8并保持为Uint8Array []。</td>
          </tr>
          <tr>
            <td>shape</td>
            <td>number[]</td>
            <td></td>
            <td>否</td>
            <td>张量的形状。 如果未提供，则从值中推断出来。</td>
          </tr>
          <tr>
            <td>dtype</td>
            <td>float32|int32|bool|complex64|string</td>
            <td></td>
            <td>否</td>
            <td>数据类型。</td>
          </tr>
        </table>
        <h3>返回值:tf.Tensor</h3>

        <div class="section-code" v-for="(item, i) in list" :key="i">
          <p>{{ item.desc }}</p>
          <input-box type="textarea" v-model="item.code" disabled></input-box>
          <p>执行结果</p>
          <div class="flex-box">
            <div class="output" :id="'output_'+i"></div>
            <btn type="primary" @click="onExcCode(i)">执行</btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>