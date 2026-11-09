---
layout: default
title: Items
permalink: /database/items/
---
{% assign items = site.data.items %}
{% assign item_count = items | size %}
{% capture item_tags %}{% for item in items %}{% for tag in item.tags %}{{ tag | downcase | strip }}||{% endfor %}{% endfor %}{% endcapture %}
{% assign item_tags = item_tags | split: "||" | uniq | sort %}

<header class="item-page-heading">
  <h1>Items</h1>
</header>

{% if item_count > 0 %}
<section class="item-filter-controls" data-item-controls hidden aria-label="Filter items">
  <div class="item-filter-row">
    <label class="item-name-filter" for="item-name-search">
      <input id="item-name-search" type="search" placeholder="Search..." aria-label="Search items" autocomplete="off" data-item-search>
    </label>
    <button class="item-clear-filters" type="button" data-clear-filters>Clear filters</button>
  </div>
  <fieldset class="item-tag-filters">
    {% for tag in item_tags %}
      {% unless tag == blank %}
    <label class="item-tag-filter" for="item-tag-{{ forloop.index }}">
      <input id="item-tag-{{ forloop.index }}" type="checkbox" value="{{ tag | escape }}" data-tag-filter>
      <span>{{ tag | escape }}</span>
    </label>
      {% endunless %}
    {% endfor %}
  </fieldset>
  <div class="item-browser-status">
    <p data-item-count aria-live="polite"></p>
    <p data-favorite-status aria-live="polite"></p>
  </div>
</section>

<div class="item-grid" data-item-list>
  {% for item in items %}
  <article
    class="item-card"
    data-item-id="{{ item.id | escape }}"
    data-item-name="{{ item.name | downcase | escape }}"
    data-item-tags="{% for tag in item.tags %}{{ tag | downcase | strip | escape }}{% unless forloop.last %}||{% endunless %}{% endfor %}">
    <header class="item-card-header">
      <h2>{{ item.name | escape }}</h2>
      <button class="item-favorite" type="button" aria-label="Add to favorites" aria-pressed="false" data-favorite-button hidden>☆</button>
    </header>
    <div class="item-description">{{ item.description | markdownify }}</div>
    <ul class="item-tags" aria-label="Tags">
      {% for tag in item.tags %}
      <li>{{ tag | escape }}</li>
      {% endfor %}
    </ul>
  </article>
  {% endfor %}
</div>
<p class="item-no-results" data-item-no-results hidden>No items match these filters.</p>
{% else %}
<p class="item-empty-state">No items have been added to the database yet.</p>
{% endif %}

<script src="{{ '/assets/js/items.js' | relative_url }}" defer></script>
