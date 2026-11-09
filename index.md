---
layout: default
title: Home
---

<section class="adventure-library">
  <div class="adventure-grid">
    {% for adventure in site.data.adventures %}
    <a class="adventure-card" href="{{ '/adventures/' | append: adventure.slug | append: '/' | relative_url }}">
      <div class="adventure-card-art">
        <img src="{{ adventure.logo | relative_url }}" alt="">
      </div>
      <div class="adventure-card-copy">
        <h3>{{ adventure.name }}</h3>
      </div>
    </a>
    {% endfor %}
  </div>
</section>

<section class="changelog" aria-labelledby="changelog-title">
  <h2 id="changelog-title">Changelog</h2>
  <ul>
    <li><strong>2026-11-09</strong> — Added colony tech tree</li>
    <li><strong>2026-11-09</strong> — Added external links</li>
    <li><strong>2026-11-09</strong> — Added item database</li>
    <li><strong>2026-11-09</strong> — Added map</li>
    <li><strong>2026-11-08</strong> — Added gallery</li>
    <li><strong>2026-11-07</strong> — Added session logs</li>
    <li><strong>2026-11-07</strong> — Layout redesign</li>
    <li><strong>2026-11-07</strong> — Added level tracking and NPCs</li>
    <li><strong>2026-11-06</strong> — Added Ruins of Azlant</li>
    <li><strong>2026-11-06</strong> — Launch</li>
  </ul>
</section>
