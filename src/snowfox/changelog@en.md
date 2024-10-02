#	Snowfox Changelog

##	v124.0.2	{#v124.0.2}
*****
+	[124.0.2 Firefox Release Notes]

<br />

##	v124.0.1	{#v124.0.1}
*****
+	[124.0.1 Firefox Release Notes]

<br />

##	v124.0.0	{#v124.0}
*****
+	[124.0.0 Firefox Release Notes]
+	Completely disable bootstrap for Windows build.
+	Default to disable `dom.serviceWorkers.enabled`.
+	Default to set `widget.non-native-theme.scrollbar.style` to `4`.
+	Fix color-scheme for more blank/unstyled pages.
+	Fix layout of page `about:serviceworkers`.

<br />

##	v123.0.1	{#v123.0.1}
*****
+	[123.0.1 Firefox Release Notes]
+	Default to enable `browser.engagement.ctrlTab.has-used`.
+	Default to enable `browser.engagement.downloads-button.has-used`.
+	Default to enable `browser.engagement.home-button.has-used`.
+	Default to enable `browser.engagement.library-button.has-used`.
+	Default to enable `browser.engagement.sidebar-button.has-used`.
+	Default to set `signon.firefoxRelay.feature` to `disabled`.
+	Fix behavior of module `RFPHelper.sys.mjs`.
+	Fix the style in `XMLPrettyPrint.css`.

<br />

##	v123.0.0	{#v123.0}
*****
+	[123.0.0 Firefox Release Notes]
+	Default to enable `devtools.inspector.showAllAnonymousContent`.
+	Fix behavior and layout of page `about:policies`.
+	Fix behavior of module `RFPHelper.sys.mjs`.
+	Fix behavior of module `SessionStore.sys.mjs`.
+	Fix white flashing on opaque image/background loading (upstream [Bug 1556156] & [Bug 1808149]).

<br />

##	v122.0.1	{#v122.0.1}
*****
+	[122.0.1 Firefox Release Notes]
+	Fix color-scheme for transparent iframe(s).

<br />

##	v122.0.0	{#v122.0}
*****
+	[122.0.0 Firefox Release Notes]
+	Fix color-scheme for empty/blank/unstyled pages.

<br />

##	v121.0.1	{#v121.0.1}
*****
+	[121.0.1 Firefox Release Notes]
+	Default to set `media.default_volume` to `0.5`.

<br />

##	v121.0.0	{#v121.0}
*****
+	[121.0.0 Firefox Release Notes]

<br />

##	v120.0.1	{#v120.0.1}
*****
+	[120.0.1 Firefox Release Notes]
+	Default to disable `browser.translations.enable`.
+	Default to set `network.http.referer.XOriginPolicy` to `0` (revert [v119.0.0-1](#v119.0-1)).
+	Fix behavior of function `nsresult nsHttpHandler::Init`.
+	Fix behavior of module `RFPHelper.sys.mjs`.
+	Fix behavior of page `about:preferences`.

<br />

##	v120.0.0	{#v120.0}
*****
+	[120.0.0 Firefox Release Notes]
+	Default to set `image.http.accept` to `image/avif,image/webp,*/*`.
+	Default to set `media.cubeb.force_sample_rate` to `192000`.
+	Default to set `privacy.fingerprintingProtection.overrides` to `+AllTargets,-CSSPrefersColorScheme`.
+	Fix behavior of function `void MediaError::GetMessage` (revert [v118.0.2-1](#v118.0.2-1)).
+	Fix behavior of function `void nsHttpHandler::PrefsChanged`.
+	Fix behavior of module `RFPHelper.sys.mjs`.
+	Fix behavior of page `about:firefoxview-next`.
+	Fix version number towards better consistency.
+	Migrate from `privacy.resistFingerprinting` to `privacy.fingerprintingProtection`.
+	Remove `network.http.useragent.forceVersion` (restored in [v116.0.0-1](#v116.0-1)) due to too much upstream breakage.
+	Remove `privacy.resistFingerprinting.override-color-scheme` (replaced by `-CSSPrefersColorScheme`).

<br />

##	v119.0.1-1	{#v119.0.1-1}
*****
+	[119.0.1 Firefox Release Notes]

<br />

##	v119.0.0-1	{#v119.0-1}
*****
+	[119.0.0 Firefox Release Notes]
+	Default to disable `media.recorder.audio_node.enabled` (revert [v118.0.2-1](#v118.0.2-1)).
+	Default to enable `network.http.referer.hideOnionSource`.
+	Default to set `network.http.referer.XOriginPolicy` to `1`.
+	Fix layout of page `about:policies`.

<br />

##	v118.0.2-2	{#v118.0.2-2}
*****
+	Fix layout of page `about:policies`.
+	Fix support of monochrome mode for `Save to PDF` printer.

<br />

##	v118.0.2-1	{#v118.0.2-1}
*****
+	[118.0.2 Firefox Release Notes]
+	Default to disable `browser.translations.automaticallyPopup`.
+	Default to enable `media.recorder.audio_node.enabled`.
+	Default to set `media.recorder.max_memory` to `8388608`.
+	Fix behavior of function `void MediaError::GetMessage`.

<br />

##	v118.0.1-1	{#v118.0.1-1}
*****
+	[118.0.0 Firefox Release Notes]
+	[118.0.1 Firefox Release Notes]

<br />

##	v117.0.1-1	{#v117.0.1-1}
*****
+	[117.0.1 Firefox Release Notes]
+	Default to set `media.videocontrols.picture-in-picture.video-toggle.min-video-secs` to `10`.
+	Fix metadata of generated PDF (upstream [Bug 1830086]).
<!-- 1840838 needs to be fixed in the future (for macOS) -->

<br />

##	v117.0.0-1	{#v117.0-1}
*****
+	[117.0.0 Firefox Release Notes]
+	Build with official Clang instead of Mozilla Clang for Windows build.
+	Improve the default CJK font list.

<br />

##	v116.0.3-1	{#v116.0.3-1}
*****
+	[116.0.3 Firefox Release Notes]
+	Decrease the precision of BuildID.
+	Improve the default CJK font list.

<br />

##	v116.0.2-1	{#v116.0.2-1}
*****
+	[116.0.1 Firefox Release Notes]
+	[116.0.2 Firefox Release Notes]

<br />

##	v116.0.0-1	{#v116.0-1}
*****
+	[115.0.3 Firefox Release Notes]
+	[116.0.0 Firefox Release Notes]
+	Default to enable `browser.meta_refresh_when_inactive.disabled`.
+	Remove `network.http.useragent.forceRVOnly`.
+	Restore `network.http.useragent.forceVersion` (upstream [Bug 1837343]).

<br />

##	v115.0.2-1	{#v115.0.2-1}
*****
+	[115.0.2 Firefox Release Notes]

<br />

##	v115.0.1-1	{#v115.0.1-1}
*****
+	[114.0.2 Firefox Release Notes]
+	[115.0.0 Firefox Release Notes]
+	[115.0.1 Firefox Release Notes]
+	Improve the workflow for Windows build.

<br />

##	v114.0.1-1	{#v114.0.1-1}
*****
+	[113.0.2 Firefox Release Notes]
+	[114.0.0 Firefox Release Notes]
+	[114.0.1 Firefox Release Notes]
+	Fix layout of page `about:policies`.

<br />

##	v113.0.1-1	{#v113.0.1-1}
*****
+	[113.0.1 Firefox Release Notes]
+	Default to come with the QR code functionality.
+	Default to enable `general.useragent.compatMode.firefox`.
+	Improve the `PDFDocumentProperties` in builtin PDF.js.

<br />

##	v113.0.0-1	{#v113.0-1}
*****
+	[113.0.0 Firefox Release Notes]
+	Fix the broken useragent when `privacy.resistFingerprinting` is disabled.

<br />

##	v112.0.2-3	{#v112.0.2-3}
*****
+	Fix and improve OS integration for Windows install.
+	Fix the `NativeMessagingHosts` problem on Windows.
+	Fix the installer and uninstaller for Windows.

<br />

##	v112.0.2-2	{#v112.0.2-2}
*****
+	Fix the broken `PDFDocumentProperties` in builtin PDF.js.
+	Improve the workflow for Windows build.

<br />

##	v112.0.2-1	{#v112.0.2-1}
*****
+	[112.0.2 Firefox Release Notes]
+	Rewrite the whole build process for Windows (due to [Librewolf-Windows](https://github.com/Heptazhou/Librewolf-Windows) is dead).

<br />

##	v112.0.1-1	{#v112.0.1-1}
*****
+	[112.0.1 Firefox Release Notes]
+	Add support for JXL (JPEG XL) animated image (upstream [Bug 1709818]).
+	Add support of color profile for JXL (upstream [Bug 1709814]).
+	Add support of progressive decoding for JXL (upstream [Bug 1709815]).
+	Add support of transparency for JXL (upstream [Bug 1709816]).

<br />

##	v112.0.0-1	{#v112.0-1}
*****
+	[112.0.0 Firefox Release Notes]
+	Default to set `network.http.useragent.forceRVOnly` to `0`.

<br />

##	v111.0.1-1	{#v111.0.1-1}
*****
+	[111.0.1 Firefox Release Notes]

<br />

##	v111.0.0-3	{#v111.0-3}
*****
+	Now build with `--with-app-name=snowfox` instead of `--with-app-name=firefox` for Windows.
+	Now possible to use `private_browsing.exe` on Windows.

<br />

##	v111.0.0-2	{#v111.0-2}
*****
+	Default to disable `media.eme.showBrowserMessage`.
+	Default to enable `image.avif.force-loop`.
+	Fix behavior of function `nsAVIFDecoder::DecodeResult nsAVIFDecoder::Decode`.
+	Fix behavior of function `uint32_t RuntimeService::ClampedHardwareConcurrency`.
+	Now possible to restore EME notification message shown when DRM is disabled.

<br />

##	v111.0.0-1	{#v111.0-1}
*****
+	[111.0.0 Firefox Release Notes]

<br />

##	v110.0.1-1	{#v110.0.1-1}
*****
+	[110.0.1 Firefox Release Notes]
+	Rewrite the build script for Windows.

<br />

##	v110.0.0-2	{#v110.0-2}
*****
+	Add support for AVIF (AV1 Image) animated image (upstream [v111][Bug 1788119]:[v113][Bug 1825580]).
+	Default to enable `image.avif.sequence.animate_avif_major_branded_images`.
+	Default to enable `image.avif.sequence.enabled`.
+	Remove EME notification message shown when DRM is disabled. (about [DRM][en-wiki/DRM] / [EME][en-wiki/EME])

<br />

##	v110.0.0-1	{#v110.0-1}
*****
+	[110.0.0 Firefox Release Notes]
+	Default to disable `devtools.performance.new-panel-onboarding`.

<br />

##	v109.0.1-3	{#v109.0.1-3}
*****
+	Default to disable `devtools.screenshot.audio.enabled`.
+	Default to enable `devtools.popups.debug`.
+	Default to set `media.peerconnection.dtls.version.max` to `772` (TLS v1.3).
+	Default to set `media.videocontrols.picture-in-picture.video-toggle.has-used` to `true`.
+	Default to set `media.videocontrols.picture-in-picture.video-toggle.min-video-secs` to `60`.
+	Fix the screenshot functionality in DevTools.

<br />

##	v109.0.1-2	{#v109.0.1-2}
*****
+	Default to disable OffscreenCanvas for improved performance and compatibility.
+	Fix behavior of function `static nsSize GetDeviceSize`.

<br />

##	v109.0.1-1	{#v109.0.1-1}
*****
+	[109.0.1 Firefox Release Notes]
+	Fix the Performance API (upstream [v111][Bug 1811567]) for improved compatibility.

<br />

##	v109.0.0-5	{#v109.0-5}
*****
+	Add support for JXL (JPEG XL) still image.
+	Fix behavior of function `static nsCString ImageAcceptHeader`.
+	Reduce the size of source archive significantly.

<br />

##	v109.0.0-4	{#v109.0-4}
*****
+	Default to disable `devtools.accessibility.enabled`.
+	Default to disable `layout.word_select.eat_space_to_next_word`.
+	Default to enable `alerts.showFavicons`.
+	Default to enable CRLite and disable OCSP, for improved performance, privacy, and even security.
+	Default to set `security.tls.ech.grease_probability` to `50`, for slightly improved security.
+	Reduce the delay of fullscreen transition perceivably.

<br />

##	v109.0.0-3	{#v109.0-3}
*****
+	Default to disable `general.autoScroll`.
+	Default to enable `browser.menu.showViewImageInfo`.
+	Default to enable `browser.preferences.experimental`.
+	Default to remove CJK from list `browser.tabs.secondaryTextUnsupportedLocales`.
+	Default to set `dom.script_loader.delazification.strategy` to `3`.
+	Fix the style in `TopLevelImageDocument.css`.

<br />

##	v109.0.0-2	{#v109.0-2}
*****
+	Default to enable `browser.tabs.insertAfterCurrent`.
+	Default to enable `devtools.webconsole.persistlog`.
+	Default to enable `permissions.desktop-notification.notNow.enabled`.
+	Fix behavior of function `uint32_t RuntimeService::ClampedHardwareConcurrency`.
+	Fix behavior of the unified extensions button.
+	Fix the document icon on Windows.

<br />

##	v109.0.0-1	{#v109.0-1}
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

##	v108.0.2-1	{#v108.0.2-1}
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
[110.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/110.0.1/releasenotes/
[111.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/111.0/releasenotes/
[111.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/111.0.1/releasenotes/
[112.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/112.0/releasenotes/
[112.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/112.0.1/releasenotes/
[112.0.2 Firefox Release Notes]: https://www.mozilla.org/firefox/112.0.2/releasenotes/
[113.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/113.0/releasenotes/
[113.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/113.0.1/releasenotes/
[113.0.2 Firefox Release Notes]: https://www.mozilla.org/firefox/113.0.2/releasenotes/
[114.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/114.0/releasenotes/
[114.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/114.0.1/releasenotes/
[114.0.2 Firefox Release Notes]: https://www.mozilla.org/firefox/114.0.2/releasenotes/
[115.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/115.0/releasenotes/
[115.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/115.0.1/releasenotes/
[115.0.2 Firefox Release Notes]: https://www.mozilla.org/firefox/115.0.2/releasenotes/
[115.0.3 Firefox Release Notes]: https://www.mozilla.org/firefox/115.0.3/releasenotes/
[116.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/116.0/releasenotes/
[116.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/116.0.1/releasenotes/
[116.0.2 Firefox Release Notes]: https://www.mozilla.org/firefox/116.0.2/releasenotes/
[116.0.3 Firefox Release Notes]: https://www.mozilla.org/firefox/116.0.3/releasenotes/
[117.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/117.0/releasenotes/
[117.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/117.0.1/releasenotes/
[118.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/118.0/releasenotes/
[118.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/118.0.1/releasenotes/
[118.0.2 Firefox Release Notes]: https://www.mozilla.org/firefox/118.0.2/releasenotes/
[119.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/119.0/releasenotes/
[119.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/119.0.1/releasenotes/
[120.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/120.0/releasenotes/
[120.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/120.0.1/releasenotes/
[121.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/121.0/releasenotes/
[121.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/121.0.1/releasenotes/
[122.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/122.0/releasenotes/
[122.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/122.0.1/releasenotes/
[123.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/123.0/releasenotes/
[123.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/123.0.1/releasenotes/
[124.0.0 Firefox Release Notes]: https://www.mozilla.org/firefox/124.0/releasenotes/
[124.0.1 Firefox Release Notes]: https://www.mozilla.org/firefox/124.0.1/releasenotes/
[124.0.2 Firefox Release Notes]: https://www.mozilla.org/firefox/124.0.2/releasenotes/

[Bug 1556156]: https://bugzilla.mozilla.org/show_bug.cgi?id=1556156
[Bug 1709814]: https://bugzilla.mozilla.org/show_bug.cgi?id=1709814
[Bug 1709815]: https://bugzilla.mozilla.org/show_bug.cgi?id=1709815
[Bug 1709816]: https://bugzilla.mozilla.org/show_bug.cgi?id=1709816
[Bug 1709818]: https://bugzilla.mozilla.org/show_bug.cgi?id=1709818
[Bug 1788119]: https://bugzilla.mozilla.org/show_bug.cgi?id=1788119
[Bug 1808149]: https://bugzilla.mozilla.org/show_bug.cgi?id=1808149
[Bug 1811567]: https://bugzilla.mozilla.org/show_bug.cgi?id=1811567
[Bug 1825580]: https://bugzilla.mozilla.org/show_bug.cgi?id=1825580
[Bug 1830086]: https://bugzilla.mozilla.org/show_bug.cgi?id=1830086
[Bug 1837343]: https://bugzilla.mozilla.org/show_bug.cgi?id=1837343

[en-wiki/DRM]: https://en.wikipedia.org/w/index.php?curid=18938226
<!-- 18938226  https://en.wikipedia.org/wiki/Digital_rights_management -->

[en-wiki/EME]: https://en.wikipedia.org/w/index.php?curid=42965137
<!-- 42965137  https://en.wikipedia.org/wiki/Encrypted_Media_Extensions -->

