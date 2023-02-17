
##	v110.0.0-2
*****
+	Add support for AVIF (AV1 Image) animated image (upstream v111).
+	Default to enable `image.avif.sequence.animate_avif_major_branded_images`.
+	Default to enable `image.avif.sequence.enabled`.
+	Remove EME notification message shown when DRM is disabled. (about [DRM][en-wiki/DRM] / [EME][en-wiki/EME])

<br />

##	v110.0.0-1
*****
+	[110.0.0 Firefox Release Notes]
+	Default to disable `devtools.performance.new-panel-onboarding`.

<br />

##	v109.0.1-3
*****
+	Default to disable `devtools.screenshot.audio.enabled`.
+	Default to enable `devtools.popups.debug`.
+	Default to set `media.peerconnection.dtls.version.max` to `772` (TLS v1.3).
+	Default to set `media.videocontrols.picture-in-picture.video-toggle.has-used` to `true`.
+	Default to set `media.videocontrols.picture-in-picture.video-toggle.min-video-secs` to `60`.
+	Fix the screenshot functionality in DevTools.

<br />

##	v109.0.1-2
*****
+	Default to disable OffscreenCanvas for improved performance and compatibility.
+	Fix behavior of function `static nsSize GetDeviceSize`.

<br />

##	v109.0.1-1
*****
+	[109.0.1 Firefox Release Notes]
+	Fix the Performance API (upstream v111) for improved compatibility.

<br />

##	v109.0.0-5
*****
+	Add support for JXL (JPEG XL) still image.
+	Fix behavior of function `static nsCString ImageAcceptHeader`.
+	Reduce the size of source archive significantly.

<br />

##	v109.0.0-4
*****
+	Default to disable `devtools.accessibility.enabled`.
+	Default to disable `layout.word_select.eat_space_to_next_word`.
+	Default to enable `alerts.showFavicons`.
+	Default to enable CRLite and disable OCSP, for improved performance, privacy, and even security.
+	Default to set `security.tls.ech.grease_probability` to `50`, for slightly improved security.
+	Reduce the delay of fullscreen transition perceivably.

<br />

##	v109.0.0-3
*****
+	Default to disable `general.autoScroll`.
+	Default to enable `browser.menu.showViewImageInfo`.
+	Default to enable `browser.preferences.experimental`.
+	Default to remove CJK from list `browser.tabs.secondaryTextUnsupportedLocales`.
+	Default to set `dom.script_loader.delazification.strategy` to `3`.
+	Fix the style in `TopLevelImageDocument.css`.

<br />

##	v109.0.0-2
*****
+	Default to enable `browser.tabs.insertAfterCurrent`.
+	Default to enable `devtools.webconsole.persistlog`.
+	Default to enable `permissions.desktop-notification.notNow.enabled`.
+	Fix behavior of function `uint32_t RuntimeService::ClampedHardwareConcurrency`.
+	Fix behavior of the unified extensions button.
+	Fix the document icon on Windows.

<br />

##	v109.0.0-1
*****
+	[109.0.0 Firefox Release Notes]
+	Default to disable `dom.push.connection.enabled`.
+	Default to disable `webgl.enable-renderer-query`.
+	Default to enable `browser.download.alwaysOpenPanel`.
+	Default to enable `browser.download.useDownloadDir`.
+	Default to enable `browser.urlbar.showSearchTerms.featureGate`.
+	Default to enable WebGL for improved performance and compatibility.
+	Default to set `devtools.selfxss.count` to `5`.
+	Default to set `network.http.useragent.forceVersion` to `108`.
+	Fix behavior of function `nsresult nsScreen::GetAvailRect`.
+	Fix behavior of function `nsresult nsScreen::GetRect`.
+	Fix behavior of function `void nsRFPService::GetSpoofedUserAgent`.

<br />

##	v108.0.2-1
*****
+	[108.0.0 Firefox Release Notes]
+	[108.0.1 Firefox Release Notes]
+	[108.0.2 Firefox Release Notes]
+	Default to enable `dom.security.https_first` and `dom.security.https_only_mode` for improved security.
+	Default to enable `privacy.resistFingerprinting` for improved privacy.
+	Default to enable the dark theme.
+	Fix behavior of function `ColorScheme Document::PreferredColorScheme`.
+	Fix behavior of function `uint32_t PreferredSampleRate`.
+	Fix behavior of function `void nsRFPService::GetSpoofedUserAgent`.

<br />

[108.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/108.0/releasenotes/
[108.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/108.0.1/releasenotes/
[108.0.2 Firefox Release Notes]: https://www.mozilla.org/firefox/108.0.2/releasenotes/
[109.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/109.0/releasenotes/
[109.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/109.0.1/releasenotes/
[110.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/110.0/releasenotes/

[en-wiki/DRM]: https://en.wikipedia.org/w/index.php?curid=18938226
<!-- 18938226  https://en.wikipedia.org/wiki/Digital_rights_management -->

[en-wiki/EME]: https://en.wikipedia.org/w/index.php?curid=42965137
<!-- 42965137  https://en.wikipedia.org/wiki/Encrypted_Media_Extensions -->

