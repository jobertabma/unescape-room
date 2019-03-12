export default `<!DOCTYPE html>
<html>
  <head>
    <title>Hello world</title>
    {listener}
  </head>
  <body>
    <script>
      window.appData = {
        "{payload}": "Hello world"
      };
    </script>
  </body>
</html>
`;
