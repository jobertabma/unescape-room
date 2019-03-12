class ListenerTemplate {
  static generate(func) {
    // url should be dynamic
    return `
    <script>
      window.${func} = function(value) {
        window.parent.postMessage({ function: '${func}', value: value }, 'http://104.236.178.103');
      };
    </script>
    `
  }
}

export default ListenerTemplate;
