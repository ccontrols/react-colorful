module.exports = {
  stories: ["./mdx/*.mdx", "./src/**/*.@(mdx|tsx)"],
  siteUrl: `https://omgovich.github.io/react-colorful/`,
  pages: {
    story: {
      tabs: [{ route: "page" }, { route: "test" }],
    },
  },
};
