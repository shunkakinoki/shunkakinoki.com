const entityMap: { [key: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
};

export const sanitizeHtml = (html: string): string => {
  return (
    String(html)
      // eslint-disable-next-line no-useless-escape
      .replace(/[&<>"'\/]/g, key => {
        return entityMap[key];
      })
      .replace("\\n", "<br />")
  );
};
