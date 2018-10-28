'use strict';

// populate copyright in footer with current year
const copyrightYear = document.querySelector('.copyright-year');
const now = new Date();
copyrightYear.innerHTML = now.getFullYear();

// google ad tags
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

(function() {
  var gads = document.createElement('script');
  gads.async = true;
  gads.type = 'text/javascript';
  var useSSL = 'https:' == document.location.protocol;
  gads.src = (useSSL ? 'https:' : 'http:') +
  '//www.googletagservices.com/tag/js/gpt.js';
  var node = document.getElementsByTagName('script')[0];
  node.parentNode.insertBefore(gads, node);
})();

googletag.cmd.push(function() {
  googletag.defineSlot('/12523293/Austin_NP/aas_web_default/news/state_regional', [728, 90], 'div-gpt-ad-1403295829614-1').addService(googletag.pubads());
  googletag.defineSlot('/12523293/Austin_NP/aas_web_default/news/state_regional', [300, 250], 'div-gpt-ad-1403295829614-2').addService(googletag.pubads());
  googletag.defineSlot('/12523293/Austin_NP/aas_web_default/news/state_regional', [320, 50], 'div-gpt-ad-1403295829614-3').addService(googletag.pubads());
  googletag.pubads().enableSingleRequest();
  googletag.pubads().enableVideoAds();
  googletag.enableServices();
});

googletag.cmd.push(function() { googletag.display('div-gpt-ad-1403295829614-3'); });
googletag.cmd.push(function() { googletag.display('div-gpt-ad-1403295829614-1'); });
