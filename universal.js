const { makeUniversalApp } = require('@electron/universal');
(async () => {
  try {
    const params = {
      x64AppPath:  `${__dirname}/dist/mac/TallyPad.app`,
      arm64AppPath: `${__dirname}/dist/mac-arm64/TallyPad.app`,
      outAppPath: `${__dirname}./dist/universal/TallyPad.app`
    };
    const result = await makeUniversalApp(params);

    console.log('Package Created:result=', result);
  } catch (e) {
    console.log('Error:', e);
  }
})();
