---
layout: default
title: Gallery
adventure: ruins-of-azlant
permalink: /adventures/ruins-of-azlant/gallery/
---
{% assign adventure = site.data.adventures | where: "slug", page.adventure | first %}
{% assign gallery = adventure["art-gallery"] %}
{% assign gallery_count = gallery | size %}

<header class="gallery-heading" id="gallery">
  <p class="eyebrow">{{ adventure.name }}</p>
  <h1>Gallery</h1>
  <a class="adventure-return" href="{{ '/adventures/' | append: adventure.slug | append: '/' | relative_url }}">← Return to adventure</a>
</header>

{% if gallery_count > 0 %}
<div class="art-gallery">
  {% for work in gallery %}
    {% assign image_id = forloop.index %}
  <figure class="gallery-item">
    <a class="gallery-thumbnail" href="#gallery-image-{{ image_id }}" aria-label="View artwork by {{ work.artist | escape }}">
      <img src="{{ work.image | relative_url }}" alt="Artwork by {{ work.artist | escape }}" loading="lazy">
    </a>
    <figcaption>
      {% if work.title %}<span class="gallery-art-title">{{ work.title | escape }}</span>{% endif %}
      <span>By {{ work.artist | escape }}</span>
    </figcaption>
  </figure>
  {% endfor %}
</div>

{% for work in gallery %}
  {% assign image_id = forloop.index %}
<section class="gallery-lightbox" id="gallery-image-{{ image_id }}" aria-label="Artwork by {{ work.artist | escape }}">
  <a class="gallery-lightbox-backdrop" href="#gallery" aria-label="Close expanded artwork"></a>
  <figure>
    <a class="gallery-lightbox-close" href="#gallery">Close <span aria-hidden="true">×</span></a>
    <img src="{{ work.image | relative_url }}" alt="Artwork by {{ work.artist | escape }}">
    <figcaption>
      {% if work.title %}<span class="gallery-art-title">{{ work.title | escape }}</span>{% endif %}
      <span>By {{ work.artist | escape }}</span>
    </figcaption>
  </figure>
</section>
{% endfor %}
{% else %}
<p class="gallery-empty">No artwork has been added to this gallery yet.</p>
{% endif %}
