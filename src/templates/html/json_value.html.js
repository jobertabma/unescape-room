export default `<!DOCTYPE html>
<html>
  <head>
    <title>Hello world</title>
    {listener}
  </head>
  <body>
    <script>
      window.appData = {
        "name": "{payload}"
      };
    </script>
  </body>
</html>
`;
