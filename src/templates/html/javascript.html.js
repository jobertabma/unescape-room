export default `<!DOCTYPE html>
<html>
  <head>
    <title>Hello world</title>
    {listener}
  </head>
  <body>
    Hello, <span id="hello" />

    <script>
      var hello = '{payload}';

      document.getElementById('hello').innerHTML = hello;
    </script>
  </body>
</html>
`;
