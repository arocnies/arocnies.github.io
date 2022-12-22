---
title: Custom HTML previewer (and ChatGPT)
author: anies
date: 2022-12-22 16:28:36 -0400
categories: [Code Snippet]
tags: [web, html, css, js, chatgpt]
thumbnail: /assets/posts/html-previewer/js.png
---
# Needs for an HTML preview

I needed to embed an iframe of my game [Asteroids++]({% post_url 2022-12-19-asteroidsplusplus %}).

Once focused, the app plays sounds, loads resources, and demands a large screen area to be playable.
This kind of app doesn't embed well in an article layout.
This app needs a placeholder with buttons to control the loading and screen setting in order to feel at home.

Since I didn't find any off-the-shelf solutions that solved this problem the way I wanted it, I figured I'd post my version here.

<p class="codepen" data-height="350" data-default-tab="result" data-slug-hash="QWBbGob" data-editable="true" data-user="arocnies" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/arocnies/pen/QWBbGob">
  Preview Container</a> by arocnies (<a href="https://codepen.io/arocnies">@arocnies</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

# Features

The content is probably an `iframe` but it could be any content.

## Displaying Content

The content starts hidden.
The preview is shown with an open (play) button center.
Clicking the open button hides the preview and shows the content.

### Disabling/Re-enabling iframes

IFrames introduce a complication, once they load and run, they keep running even when hidden.

In order to stop the iframe completely, upon closing the content, any child iframes are disabled. The iframes are reloaded when the content is opened.

## Fullscreen

Viewing a game or app in an iframe can be difficult unless the page is designed for that app specifically.
In the blog post format, playing an unoptimized game requires the game window to take over most or all of the view.

The opened content shows a fullscreen button in the top right to toggle fullscreen.

### Scroll Guard

Another complication is introduced if the content, such as a game, uses the arrow-keys or space-bar. This causes the parent page to scroll depending on the scenario.

When fullscreen is enabled, scrolling the parent page is disabled.

**Note:** When viewing through CodePen, the scrolling is only disabled for the CodePen iframe and not this post's page. Fullscreen and scrolling are different in this (inception?) triple nested iframe scenario.

# ChatGPT as a daily driver

ChatGPT has been out for a couple of weeks now.
After messing around with the flashier uses, I've found that it's become a serious productivity tool in my technical work.

I used ChatGPT while creating this previewer. I've had some more impressive examples for showing off ChatGPT, but what I find so interesting about this one is that ChatGPT has become a daily tool for me.

My workflow includes ChatGPT alongside Google (usually opening several tabs of StackOverflow) while I find answers to my questions. ChatGPT doesn't always get it right, but it serves as a more productive pair programmer for answering contextual questions and getting me the right search queries.

It doesn't code for me or even replace Google/StackOverflow. But it does fully replace another programmer working with me on a topic they are more familiar with. Instead of a colleague recommending what I should use to accomplish X, ChatGPT gives me the recommendations accompanied by examples and alternatives.

Instead of refining my problem to my colleagues with context and limitations for them to use their experience to recommend a tool or solution to look up, ChatGPT consumes those limitations and provides new ideas in context.
