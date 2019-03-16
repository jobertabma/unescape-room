class ListenerTemplate {
  static generate(func) {
    // url should be dynamic
    // 13 should be dynamic
    return `
    <script>
      window.onerror = function(error, _url, line) {
        window.parent.postMessage({
          function: 'errorHandler',
          error: error,
          line: line - 13
        }, 'http://localhost:3000');
      }
      window.${func} = function(value) {
        window.parent.postMessage({ function: '${func}', value: value }, 'http://localhost:3000');
      };
    </script>
    `
  }
}

export default ListenerTemplate;
