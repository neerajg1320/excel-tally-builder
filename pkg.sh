mkdir dist/pkg
sudo productbuild --component ./dist/mac-arm64/TallyPad.app /Applications ./dist/pkg/TallyPad-0.4.0-arm64.pkg
sudo productbuild --component ./dist/mac/TallyPad.app /Applications ./dist/pkg/TallyPad-0.4.0.pkg

#sudo productbuild --component ./dist/mac-universal/TallyPad.app ./dist/pkg/TallyPad-0.4.0-universal.pkg
