/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   },
//   resolver: {
//     assetExts: [
//       ...defaultAssetExts,
//       'md',
//       assetExts.filter(ext => ext !== 'svg'),
//     ],
//     sourceExts: [...sourceExts, 'svg'],
//   },
// };
