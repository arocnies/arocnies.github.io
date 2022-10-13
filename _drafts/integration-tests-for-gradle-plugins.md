---
layout: post
title: Integration Tests for Gradle Plugins
---

Custom Gradle plugins unlock the power of organizing and readable configuration of custom build logic. Once a plugin becomes mature enough to leave `buildSrc` and live as a project of its own, integration testing becomes essential.

Plugins still in `buildSrc` benefit from being coupled to their owning project as a use-case. The owning project provides a form of exploration testing--arguably more valuable for the cost than other forms of testing for small specialized projects.

Plugins that have outgrown the benefit of an owning project create a necessity for facade Gradle projects to serve as validating use-cases.

---
NOTES:
- default tests are there, but we want a more flexible, life-like project that still fits in as test.
- what we need: Gradle built-in templating of the test folders.
  - New sources set?
  - Gradle test projects in folder
  - Full gradle project but with a dependency on the owning project
  - Example JUnit code to execute projects and inspect the results
    - All pass
    - Duplicate runs
    - Different Gradle options or versions?
  - Templating the test project files out for multiple small changes (and moving them to tmp folders)
  - Speed of test execution
