<template>
  <div class="hx-card-task" style="width: 324px">
    <slot name="title">
      <div class="hx-card-task-title">
        <div class="hx-card-task-title-left">
          ID: 12323213
        </div>
        <div class="hx-card-task-title-right">
          ph: 12323
        </div>
      </div>
    </slot>
    <slot name="content">
      <div class="hx-card-task-content">
        <div>12321323</div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 324,
    },
  },
};

</script>
