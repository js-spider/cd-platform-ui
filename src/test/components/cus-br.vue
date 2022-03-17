<script>
export default {
  name: 'Br',
  props: {
    line: {
      type: [String, Number],
      default: 3,
    },
  },
  render() {
    const { line } = this;
    let lineNew;
    if (line < 1) {
      lineNew = 1;
    } else {
      lineNew = line;
    }
    const height = `${lineNew * 10}px`;
    return (
      <div style={{ width: '100%', height }}></div>
    );
  },
};
</script>
