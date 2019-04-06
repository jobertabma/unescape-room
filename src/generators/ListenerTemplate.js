class ListenerTemplate {
  static generate(func) {
    // url should be dynamic
    let script = `
    <script>
      window.onerror = function(error, _url, line) {
        window.parent.postMessage({
          function: 'errorHandler',
          error: error,
          line: line - {number_of_lines}
        }, 'http://localhost:3000');
      }
      window.alert = function(value) { }
      window.confirm = function(value) { return false }
      window.prompt = function(text, defaultText = '') { return '' }
      window.${func} = function(value) {
        window.parent.postMessage({ function: '${func}', value: value }, 'http://localhost:3000');
      };
    </script>
    `;

    return script.replace("{number_of_lines}", script.split("\n").length);
  }
}

export default ListenerTemplate;
