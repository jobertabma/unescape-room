export default `<!DOCTYPE html>
<html>
  <head>
    <title>Hello world</title>
    {listener}
    <style>
      .banner {
        background-color: {payload};
      }
    </style>
  </head>
  <body>
    Hello, <span class="banner">World</span>
  </body>
</html>
`;
