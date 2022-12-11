export const ShowObject = ({ object }) => {
  return (
    <pre>
      <code>
        {
          JSON.stringify(
              object,
              null,
              2
          )
        }
      </code>
    </pre>
  );

}