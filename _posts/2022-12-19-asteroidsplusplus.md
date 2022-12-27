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

<!-- FontAwesome v4 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="preview-container" style="width: 100%; height: 300px;">
  <div class="content" hidden>
    <div class="preview-fullscreen topright blue-hover"><i class="fa fa-expand fa-2x"></i></div>
    <div class="preview-close bottomright blue-hover"><i class="fa fa-window-close fa-2x"></i></div>
    <iframe src="https://arocnies.github.io/Asteroids/"></iframe>
  </div>
  <div class="preview">
    <img src="asteroids-preview.png" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px;">
    <div class="preview-open center blue-hover"><i class="fa fa-play fa-2x"></i></div>
  </div>
</div>

# This code is undead! 🧟

This is not the software I originally created.
This is software that died when **a major artifact provider shut down and left town**.
The guts were ripped out and sown back together.
It's a software zombie--given new life with an updated framework.
What you see here is the undead version of my original **Asteroids++** game.

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

I had several options.

#### Option #1, use a local cache of the plugin and Gradle Offline mode

When building a project with Gradle, all of your dependencies are cached locally.
Since I was still using the same laptop, there was a chance I still had my old cached buildscript dependency to use in offline mode.
Of course, it wasn't that easy. I'd have to find the lost buildscript dependency elsewhere.

#### Option #2, switch to another Maven repository such as MavenCentral

The KorGE plugins used to be published on JCenter. New versions are on MavenCentral.
Unfortunately, the KorGE plugin used by Asteroids++ was at v1 and not available on MavenCentral.

An interesting note that using the same artifact coordinates from a different repository was
one of the security risks with using JCenter.

#### Option #3, extract the dependency from my published FatJar

I was hoping this would be an option before opening the project up and saw the buildscript dependencies.
The KorGE library dependencies were baked into the FatJar I published on itch.io.
But even if I managed to recompile my code using static dependencies,
I would never be able to run the Gradle tasks associated with KorGE.

The whole point was to avoid any major rewrites, fix obvious bugs and create a web-runnable version of the game.
None of that was going to work using JVM class files of the final deliverable.

#### Option #4, port Asteroids++ from KorGE version 1.13 to KorGE version 3.1

This was it. The other options were exhausted at this point.
The hard part of porting this code base is avoiding major refactoring, or worst case, a complete re-write.

KorGE had updated two major version releases. Stuff would break, but
I figured the bugs that caused my original browser build to break may be fixed.

---
# Resurrecting the code

The code was a _mess_.
I like to say, "We code for humans, not for computers", but whoever (...me) coded this jumble did not follow that philosophy as much as I had hoped.
I take that as a good sign: years later, outside the time constraints, I write cleaner code. I fixed several bugs but spending more time restructuring the code was not my goal.

Thankfully, the porting itself was simple.
KorGE's abstractions were precise enough to update sounds, key events, and sprites to the new version without difficulty.

I do wish there were more `@ReplaceWith` annotations and documentation.
Knowing the non-suspending `sound.play()` is replaced with `sound.playNoCancel(PlaybackTimes.ONE)` would have been helpful.
Even without direct documentation,
discovering the fix for errors caused by `sound.play()` was only an autocomplete away.

A few new bugs came out of the revived Asteroids++.
The satisfying sounds of the thrusters are broken in the browser (they work in on the JVM).
The particle effects changed. Nothing game breaking.

I added CI/CD hooks (GitHub Actions) to publish the web version.

Someday I may reorganize the code--properly refactor the components and add features.
For now, I'm impressed this port did not require larger-cost changes or rewrites.
