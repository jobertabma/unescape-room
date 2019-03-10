class ListenerTemplateGenerator {
  static generate() {
    return `
    <script>
      window.alert = function(value) {
        window.parent.postMessage({ function: 'alert' }, 'http://localhost:3000');
      };
    </script>
    `
  }
}

export default ListenerTemplateGenerator;
