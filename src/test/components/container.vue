<script>
export default {
  props: {
    inline: String,
  },
  render() {
    const { inline, $slots } = this;
    const style = { display: inline ? 'inline-block' : 'block' };
    return (
      <div class="custom-container" style={style}>
        {$slots.default}
      </div>
    );
  },
};
</script>
<style scoped>
  .custom-container{
    padding: 15px;
    margin: 15px;
  }
</style>

