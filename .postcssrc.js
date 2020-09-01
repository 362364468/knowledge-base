// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in config.json
    "autoprefixer": {
      remove: false,
      browsers: ['last 2 versions']
    }
  }
}
