// CMake names object files after their full source path, so the app's native build (which compiles the
// autolinked libraries' codegen) makes folders past Windows' 248-character limit. scripts/build-apk.ps1 sets
// MOBILE_CMAKE_STAGING_DIR to a short folder for that build folder; without it, nothing changes.
const { withAppBuildGradle } = require('expo/config-plugins');

const MARKER = '// with-cmake-staging-dir';

module.exports = function withCmakeStagingDir(config) {
  const dir = process.env.MOBILE_CMAKE_STAGING_DIR;
  if (!dir) return config;
  return withAppBuildGradle(config, (config) => {
    if (!config.modResults.contents.includes(MARKER)) {
      config.modResults.contents += `
${MARKER}
android {
    externalNativeBuild {
        cmake {
            buildStagingDirectory file("${dir.replace(/\\/g, '/')}")
        }
    }
}
`;
    }
    return config;
  });
};
