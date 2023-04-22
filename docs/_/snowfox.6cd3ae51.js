import{o as l,b as t,l as r,d as a,e as s,m as n,F as u,p as f,f as h}from"./vendor.a4facede.js";import{_ as b}from"./index.a6b65a99.js";const m={class:"md"},g=r('<p>Snowfox is an independent fork of Firefox, with the primary goals of privacy, security, and user freedom.</p><ul><li>Main repository <ul><li><a href="https://github.com/0h7z/Snowfox" target="_blank">0h7z/Snowfox</a> &gt; <a href="https://github.com/0h7z/Snowfox/releases" target="_blank">Releases</a> &gt; <a href="https://github.com/0h7z/Snowfox/releases/latest" target="_blank">Latest release</a></li></ul></li><li>Dev repository <ul><li><a href="https://github.com/Heptazhou/Snowfox" target="_blank">Heptazhou/Snowfox</a> &gt; <a href="https://github.com/Heptazhou/Snowfox/issues" target="_blank">Issues</a> &gt; <a href="https://github.com/Heptazhou/Snowfox/issues/new" target="_blank">New issue</a></li></ul></li></ul><br>',3),w=[g],_={__name:"readme",setup(e,{expose:o}){return o({frontmatter:{}}),(d,p)=>(l(),t("div",m,w))}},k={class:"md"},v=r(`<h2>Requirement</h2><hr><ul><li>Platform <ul><li>x86-64 GNU/Linux</li></ul></li><li>Hardware <ul><li>some good CPU cores</li><li>15GB free RAM at least</li><li>32GB free disk space or more</li></ul></li><li>Software <ul><li><a href="https://aur.archlinux.org/packages/7-zip-full" target="_blank"><code>7z</code></a> (7-zip)</li><li><a href="https://archlinux.org/packages/community/x86_64/docker/" target="_blank"><code>docker</code></a></li><li><a href="https://archlinux.org/packages/community/x86_64/julia/" target="_blank"><code>julia</code></a></li></ul></li></ul><p>PS: If build fails due to OOM killer (SIGKILL) or freezes due to OOM, try</p><ul><li>increase available memory</li><li>increase/enable <a href="https://wiki.archlinux.org/title/Swap" target="_blank">swap</a> (see also <a href="https://wiki.archlinux.org/title/Zram" target="_blank">zram</a>)</li></ul><br><h2>Build</h2><hr><h3>Source</h3><pre class="language-shell"><code class="language-shell"><span class="token function">git</span> clone https://github.com/Heptazhou/Snowfox.git
<span class="token comment"># OR</span>
<span class="token function">git</span> clone https://github.com/0h7z/Snowfox.git

<span class="token builtin class-name">cd</span> Snowfox/Source
julia make.jl check
julia make.jl all clean
</code></pre><h3>Arch</h3><pre class="language-shell"><code class="language-shell"><span class="token function">git</span> clone https://github.com/0h7z/Snowfox.git
<span class="token builtin class-name">cd</span> Snowfox/Arch
<span class="token comment"># WIP</span>
</code></pre><h3>Windows</h3><pre class="language-shell"><code class="language-shell"><span class="token function">git</span> clone https://github.com/0h7z/Snowfox.git
<span class="token builtin class-name">cd</span> Snowfox/Windows
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> snowfox:win-arch -<span class="token operator">&lt;</span> win-arch.dockerfile
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> snowfox:win-base -<span class="token operator">&lt;</span> win-base.dockerfile
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> snowfox:win-make -<span class="token operator">&lt;</span> win-make.dockerfile
<span class="token assign-left variable">id</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> create snowfox:win-make<span class="token variable">)</span></span> <span class="token operator">&amp;&amp;</span> <span class="token function">docker</span> <span class="token function">cp</span> <span class="token parameter variable">-q</span> <span class="token variable">$id</span>:pkg <span class="token builtin class-name">.</span> <span class="token operator">&amp;&amp;</span> <span class="token function">docker</span> <span class="token function">rm</span> <span class="token variable">$id</span>

<span class="token comment"># optional</span>
<span class="token function">docker</span> images
<span class="token function">docker</span> system prune <span class="token punctuation">[</span>-af<span class="token punctuation">]</span>
</code></pre><p>PS: After successful build, the Docker image could be about 30GB.</p><br>`,16),x=[v],D={__name:"manual",setup(e,{expose:o}){return o({frontmatter:{}}),(d,p)=>(l(),t("div",k,x))}},S={class:"md"},y=r('<h2>v112.0.1-1</h2><hr><ul><li><a href="https://www.mozilla.org/firefox/112.0.1/releasenotes/" target="_blank">112.0.1 Firefox Release Notes</a></li><li>Add support for JXL (JPEG XL) animated image (upstream <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1709818" target="_blank">Bug 1709818</a>).</li><li>Add support of color profile for JXL (upstream <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1709814" target="_blank">Bug 1709814</a>).</li><li>Add support of progressive decoding for JXL (upstream <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1709815" target="_blank">Bug 1709815</a>).</li><li>Add support of transparency for JXL (upstream <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1709816" target="_blank">Bug 1709816</a>).</li></ul><br><h2>v112.0.0-1</h2><hr><ul><li><a href="https://www.mozilla.org/firefox/112.0/releasenotes/" target="_blank">112.0.0 Firefox Release Notes</a></li></ul><br><h2>v111.0.1-1</h2><hr><ul><li><a href="https://www.mozilla.org/firefox/111.0.1/releasenotes/" target="_blank">111.0.1 Firefox Release Notes</a></li></ul><br><h2>v111.0.0-3</h2><hr><ul><li>Now build with <code>--with-app-name=snowfox</code> instead of <code>--with-app-name=firefox</code> for Windows.</li><li>Now possible to use <code>private_browsing.exe</code> on Windows.</li></ul><br><h2>v111.0.0-2</h2><hr><ul><li>Default to disable <code>media.eme.showBrowserMessage</code>.</li><li>Default to enable <code>image.avif.force-loop</code>.</li><li>Now possible to restore EME notification message shown when DRM is disabled.</li></ul><br><h2>v111.0.0-1</h2><hr><ul><li><a href="https://www.mozilla.org/firefox/111.0/releasenotes/" target="_blank">111.0.0 Firefox Release Notes</a></li></ul><br><h2>v110.0.1-1</h2><hr><ul><li><a href="https://www.mozilla.org/firefox/110.0.1/releasenotes/" target="_blank">110.0.1 Firefox Release Notes</a></li><li>Rewrite the build script for Windows.</li></ul><br><h2>v110.0.0-2</h2><hr><ul><li>Add support for AVIF (AV1 Image) animated image (upstream v111).</li><li>Default to enable <code>image.avif.sequence.animate_avif_major_branded_images</code>.</li><li>Default to enable <code>image.avif.sequence.enabled</code>.</li><li>Remove EME notification message shown when DRM is disabled. (about <a href="https://en.wikipedia.org/w/index.php?curid=18938226" target="_blank">DRM</a> / <a href="https://en.wikipedia.org/w/index.php?curid=42965137" target="_blank">EME</a>)</li></ul><br><h2>v110.0.0-1</h2><hr><ul><li><a href="https://www.mozilla.org/firefox/110.0/releasenotes/" target="_blank">110.0.0 Firefox Release Notes</a></li><li>Default to disable <code>devtools.performance.new-panel-onboarding</code>.</li></ul><br><h2>v109.0.1-3</h2><hr><ul><li>Default to disable <code>devtools.screenshot.audio.enabled</code>.</li><li>Default to enable <code>devtools.popups.debug</code>.</li><li>Default to set <code>media.peerconnection.dtls.version.max</code> to <code>772</code> (TLS v1.3).</li><li>Default to set <code>media.videocontrols.picture-in-picture.video-toggle.has-used</code> to <code>true</code>.</li><li>Default to set <code>media.videocontrols.picture-in-picture.video-toggle.min-video-secs</code> to <code>60</code>.</li><li>Fix the screenshot functionality in DevTools.</li></ul><br><h2>v109.0.1-2</h2><hr><ul><li>Default to disable OffscreenCanvas for improved performance and compatibility.</li><li>Fix behavior of function <code>static nsSize GetDeviceSize</code>.</li></ul><br><h2>v109.0.1-1</h2><hr><ul><li><a href="https://www.mozilla.org/firefox/109.0.1/releasenotes/" target="_blank">109.0.1 Firefox Release Notes</a></li><li>Fix the Performance API (upstream v111) for improved compatibility.</li></ul><br><h2>v109.0.0-5</h2><hr><ul><li>Add support for JXL (JPEG XL) still image.</li><li>Fix behavior of function <code>static nsCString ImageAcceptHeader</code>.</li><li>Reduce the size of source archive significantly.</li></ul><br><h2>v109.0.0-4</h2><hr><ul><li>Default to disable <code>devtools.accessibility.enabled</code>.</li><li>Default to disable <code>layout.word_select.eat_space_to_next_word</code>.</li><li>Default to enable <code>alerts.showFavicons</code>.</li><li>Default to enable CRLite and disable OCSP, for improved performance, privacy, and even security.</li><li>Default to set <code>security.tls.ech.grease_probability</code> to <code>50</code>, for slightly improved security.</li><li>Reduce the delay of fullscreen transition perceivably.</li></ul><br><h2>v109.0.0-3</h2><hr><ul><li>Default to disable <code>general.autoScroll</code>.</li><li>Default to enable <code>browser.menu.showViewImageInfo</code>.</li><li>Default to enable <code>browser.preferences.experimental</code>.</li><li>Default to remove CJK from list <code>browser.tabs.secondaryTextUnsupportedLocales</code>.</li><li>Default to set <code>dom.script_loader.delazification.strategy</code> to <code>3</code>.</li><li>Fix the style in <code>TopLevelImageDocument.css</code>.</li></ul><br><h2>v109.0.0-2</h2><hr><ul><li>Default to enable <code>browser.tabs.insertAfterCurrent</code>.</li><li>Default to enable <code>devtools.webconsole.persistlog</code>.</li><li>Default to enable <code>permissions.desktop-notification.notNow.enabled</code>.</li><li>Fix behavior of function <code>uint32_t RuntimeService::ClampedHardwareConcurrency</code>.</li><li>Fix behavior of the unified extensions button.</li><li>Fix the document icon on Windows.</li></ul><br><h2>v109.0.0-1</h2><hr><ul><li><a href="https://www.mozilla.org/firefox/109.0/releasenotes/" target="_blank">109.0.0 Firefox Release Notes</a></li><li>Default to disable <code>dom.push.connection.enabled</code>.</li><li>Default to disable <code>webgl.enable-renderer-query</code>.</li><li>Default to enable <code>browser.download.alwaysOpenPanel</code>.</li><li>Default to enable <code>browser.download.useDownloadDir</code>.</li><li>Default to enable <code>browser.urlbar.showSearchTerms.featureGate</code>.</li><li>Default to enable WebGL for improved performance and compatibility.</li><li>Default to set <code>devtools.selfxss.count</code> to <code>5</code>.</li><li>Default to set <code>network.http.useragent.forceVersion</code> to <code>108</code>.</li><li>Fix behavior of function <code>nsresult nsScreen::GetAvailRect</code>.</li><li>Fix behavior of function <code>nsresult nsScreen::GetRect</code>.</li><li>Fix behavior of function <code>void nsRFPService::GetSpoofedUserAgent</code>.</li></ul><br><h2>v108.0.2-1</h2><hr><ul><li><a href="https://www.mozilla.org/firefox/108.0/releasenotes/" target="_blank">108.0.0 Firefox Release Notes</a></li><li><a href="https://www.mozilla.org/firefox/108.0.1/releasenotes/" target="_blank">108.0.1 Firefox Release Notes</a></li><li><a href="https://www.mozilla.org/firefox/108.0.2/releasenotes/" target="_blank">108.0.2 Firefox Release Notes</a></li><li>Default to enable <code>dom.security.https_first</code> and <code>dom.security.https_only_mode</code> for improved security.</li><li>Default to enable <code>privacy.resistFingerprinting</code> for improved privacy.</li><li>Default to enable the dark theme.</li><li>Fix behavior of function <code>ColorScheme Document::PreferredColorScheme</code>.</li><li>Fix behavior of function <code>uint32_t PreferredSampleRate</code>.</li><li>Fix behavior of function <code>void nsRFPService::GetSpoofedUserAgent</code>.</li></ul><br>',72),z=[y],F={__name:"changelog",setup(e,{expose:o}){return o({frontmatter:{}}),(d,p)=>(l(),t("div",S,z))}};const c=e=>(f("data-v-5a64101a"),e=e(),h(),e),R=c(()=>a("h1",{italic:"",regular:""},"Snowfox",-1)),N=c(()=>a("h2",{center:""},"Snowfox Changelog",-1)),A=c(()=>a("h2",{center:""},"Snowfox Build Guide",-1)),I={__name:"snowfox",setup(e){return(o,i)=>(l(),t(u,null,[a("div",null,[R,s(n(_),{smaller:""})]),a("div",null,[N,s(n(F),{smaller:""})]),a("div",null,[A,s(n(D),{smaller:""})])],64))}},P=b(I,[["__scopeId","data-v-5a64101a"]]);export{P as default};
