const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      browsers: ['last 1 versions'],
    },
    ...(dev ? {} : { 'cssnano': {} }),
  },
};
