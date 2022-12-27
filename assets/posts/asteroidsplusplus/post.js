function showPreview(container) {
  $(container).find(".preview").prop("hidden", false);
  $(container)
    .find(".content")
    .prop("hidden", true)
    .removeClass("fullscreen-enabled");
  $(container)
    .find("iframe")
    .each(function () {
      $(this).data("src", $(this).attr("src"));
      $(this).attr("src", "");
    });
  updateFullscreenBindings();
}
function showContent(container) {
  $(container).find(".preview").prop("hidden", true);
  $(container).find(".content").prop("hidden", false);
  $(container)
    .find("iframe")
    .each(function () {
      $(this).attr("src", $(this).data("src"));
    });
}
function updateFullscreenBindings() {
  if ($(".fullscreen-enabled").length > 0) {
    $("body").css({ overflow: "hidden" });
    $(document).bind("scroll", function () {
      window.scrollTo(0, 0);
    });
  } else {
    $(document).unbind("scroll");
    $("body").css({ overflow: "visible" });
  }
}

function toggleFullscreen(container) {
  $(container).find(".content").toggleClass("fullscreen-enabled");
  updateFullscreenBindings();
}

function installPreviewContainer() {
  $(".preview-container .preview-open").click(function (e) {
    const container = $(this).closest(".preview-container");
    showContent(container);
  });
  $(".preview-container .preview-close").click(function (e) {
    const container = $(this).closest(".preview-container");
    showPreview(container);
  });
  $(".preview-container .preview-fullscreen").click(function (e) {
    const container = $(this).closest(".preview-container");
    toggleFullscreen(container);
  });
}

$(document).ready(function () {
  installPreviewContainer();
});

