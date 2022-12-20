---
title: Reviving dead code! ☠ (Asteroids++)
date: 2022-12-19 15:49:43 -0400
categories: [Project]
tags: [kotlin, korge, game, learning, web]
author: anies
img_path: /assets/posts/asteroidsplusplus/
thumbnail: /assets/posts/asteroidsplusplus/asteroids-preview.png
---
<link rel="stylesheet" type="text/css" href="/assets/posts/asteroidsplusplus/style.css">
<script src="/assets/posts/asteroidsplusplus/post.js"></script>

<div class="preview-container" id="game">
  <div class="content" hidden="hidden">
    <div class="fullscreen-button"><i class="fa fa-expand fa-2x"></i></div>
    <div class="close-button"><i class="fa fa-window-close fa-2x"></i></div>
    <iframe src="https://arocnies.github.io/Asteroids/"></iframe>
  </div>
  <div class="preview">
    <img src="asteroids-preview.png" alt="Asteroids++">
    <div class="round-button" onclick="showContent('game')"><i class="fa fa-play fa-2x"></i></div>
  </div>
</div>

# This is a ghost! 👻

This is not the software I originally created. The guts were ripped out and sown back too together.
It's a software zombie, a creature reshaped with an updated framework, an undead game.

This is software that died when **a major artifact provider shut down and left town**.
What you see here is the shadow of my original **Asteroids++** game.

# The code

In June 2020, I participated in a GameJam for [KorGE](https://korge.org/), a "Modern Multiplatform Game Engine for Kotlin."
The challenge was to create a game with KorGE in 72 hours. The theme was "Retro".

The classic Asteroids game holds a special place in my coding memories. When I was young and learning to code, I played the original Asteroids game for its physics, graphics, and sounds.
The game's simple mechanics made it one of the first games that I knew I had to create for myself!

I played countless re-implementations created by others and myself for learning to code.
At the time, I was learning via [Scratch](https://scratch.mit.edu/), a **Turtle** programming web tool from the mid 2000s (RIP), and [ActionScript 3](https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html) (Adobe Flash).
Of the many lost Asteroid versions and remixes I made, I vaguely remember adding features such as gravity, fuel, and bouncing borders.

For this retro-themed GameJam, I couldn't resist implementing another Asteroids!

I learned several new tools, including KorGE, particle effects, animations, and other game libraries.
I uploaded my submission to Itch.io within the 72-hour window and had completed my latest implementation of Asteroids, **Asteroids++**.

# Death of the code

How does version controlled code with published artifacts die?

To set the scene, the Asteroids++ repo was on my local machine.
It is built with Gradle, which uses the Gradle Wrapper to check in and version the build-tool settings within the project itself.
All dependency versions have explicit dependencies--in fact, there is only one dependency!
I had published a FatJar to itch.io...
By all means, this repo should be rock solid.

So what happened? **JFrog shut down Bintray and JCenter**

## We have a problem...

After a few years, I wanted to revisit Asteroids++ and share it online.
I planned to clone the repository, build the web artifact via the included KorGE Gradle tasks, and enjoy.

The old Asteroids++ had a single declared dependency. A **buildscript dependency** on an old version KorGE plugin.
The plugin was hosted on JCenter. This was when I first realized there was an issue.

The [shutdown of JCenter](https://www.infoq.com/news/2021/02/jfrog-jcenter-bintray-closure/) was significant because it was widely used in JVM projects.
I've used it in many of my own projects. It was even used for Gradle's examples in their documentation.

I had several options:

**1) Use a local cache of the plugin and Gradle Offline mode** - No luck. My build cache was cleaned.

**2) Switch to MavenCentral instead of JCenter** - Unfortunately, the KorGE plugin used by Asteroids++ was at v1 and not available on MavenCentral.

**3) Extract the dependency from my published FatJar** - Not possible. Buildscript dependencies aren't bundled into the final application.

**4) Port Asteroids++ from KorGE version 1.13 to KorGE version 3.1** - This could work... Two major KorGE versions shouldn't be too hard.

# Resurrecting the code

The code was a _mess_.
I like to say, "We code for humans, not for computers", but whoever (...me) coded this jumble did not follow that philosophy as much as I had hoped.
I take that as a good sign: years later, outside the time constraints, I write cleaner code.

To be fair to myself, even though I would do things differently, it wasn't horrible.
The abstractions were cut precise enough to update KorGE changes such as sounds, key events, and sprites, without having to restructure the code.
As ugly as the code felt, making the upgrade was not hard.

A few new bugs came out of the revived Asteroids++.
The satisfying sounds of the thrusters are gone.
The particle effects changed. Nothing game breaking.

I added CI/CD hooks (GitHub Actions) to publish the web version.

Someday I may reorganize the code--properly refactor the components and add features.
For now, I'm impressed this port did not require larger-cost changes or rewrites.





