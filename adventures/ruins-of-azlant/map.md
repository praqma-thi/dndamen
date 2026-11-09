---
layout: default
title: Map
adventure: ruins-of-azlant
permalink: /adventures/ruins-of-azlant/map/
---
{% assign adventure = site.data.adventures | where: "slug", page.adventure | first %}
{% assign map_data = site.data.maps[page.adventure] %}
{% assign location_count = map_data.locations | size %}

<header class="map-heading">
  <p class="eyebrow">{{ adventure.name }}</p>
  <h1>Map</h1>
  <a class="adventure-return" href="{{ '/adventures/' | append: adventure.slug | append: '/' | relative_url }}">← Return to adventure</a>
</header>

<div class="adventure-map" data-coordinate-readout>
  <img class="adventure-map-image" src="{{ map_data.image | relative_url }}" alt="Map of {{ adventure.name }}">
  <output class="map-coordinate-readout" aria-hidden="true" hidden></output>
  {% for location in map_data.locations %}
    {% assign pin_x = location.x | plus: 0 %}
  <details
    class="map-pin{% if pin_x >= 50 %} map-pin-label-left{% endif %}"
    style="--pin-x: {{ location.x }}%; --pin-y: {{ location.y }}%;">
    <summary class="map-pin-symbol" aria-label="{{ location.name | escape }}">
      {{ location.symbol | default: "📍" | escape }}
      <span class="map-pin-tooltip" aria-hidden="true">
        <strong>{{ location.name | escape }}</strong>
      </span>
    </summary>
    <div class="map-pin-details">
      <h2>{{ location.name | escape }}</h2>
      <p>{{ location.description | escape | newline_to_br }}</p>
    </div>
  </details>
  {% endfor %}
</div>
{% unless location_count > 0 %}
<p class="map-empty">No locations have been pinned to this map yet.</p>
{% endunless %}
<script src="{{ '/assets/js/map-coordinates.js' | relative_url }}" defer></script>
