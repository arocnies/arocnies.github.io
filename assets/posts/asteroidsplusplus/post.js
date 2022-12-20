// --- Fullscreen button
$(document).ready(function() {
  const $fullscreen = $(".fullscreen-button");
  $fullscreen.click(function() {
    $fullscreen.toggleClass("fullscreen-on");
    if ($fullscreen[0].classList.contains('fullscreen-on')) {
      $('body').css({'overflow':'hidden'});
      $(document).bind('scroll',function () {
        window.scrollTo(0,0);
      });
    } else {
      $(document).unbind('scroll');
      $('body').css({'overflow':'visible'});
    }
    return false;
  });

  const $close = $(".close-button");
  $close.click(function() {
    if ($fullscreen[0].classList.contains('fullscreen-on')) {
      $(document).unbind('scroll');
      $('body').css({'overflow':'visible'});
      $fullscreen.toggleClass("fullscreen-on");
    }
    showPreview("game")
    return false;
  });
});

// --- Preview
function showContent(containerId) {
  let container = document.getElementById(containerId);
  let content = container.getElementsByClassName("content")[0];
  let preview = container.getElementsByClassName("preview")[0];

  preview.hidden = true;
  content.hidden = false;


  const $game = $("#" + containerId + " .iframe")[0];
  $game.src += '';
}

function showPreview(containerId) {
  let container = document.getElementById(containerId);
  let content = container.getElementsByClassName("content")[0];
  let preview = container.getElementsByClassName("preview")[0];

  preview.hidden = false;
  content.hidden = true;

  window.getElementById(containerId).getElementsByTagName('iframe')[0].stop();
}
