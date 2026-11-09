---
layout: default
title: Colony
adventure: ruins-of-azlant
permalink: /adventures/ruins-of-azlant/colony/
---
{% assign adventure = site.data.adventures | where: "slug", page.adventure | first %}
{% assign colony = site.data["ruins-of-azlant"].colony %}
{% assign categories = colony.categories %}
{% assign state = colony.state %}

<header class="colony-heading">
  <p class="eyebrow">{{ adventure.name }}</p>
  <h1>Colony</h1>
  <a class="adventure-return" href="{{ '/adventures/' | append: adventure.slug | append: '/' | relative_url }}">← Return to adventure</a>
</header>

<section class="colony-bonuses" aria-labelledby="colony-bonuses-title">
  <h2 id="colony-bonuses-title">Current bonuses</h2>
  <dl>
    {% for category in categories %}
      {% assign category_bonus = state.base_bonuses[category.id] | default: 0 %}
      {% for building in colony[category.id] %}
        {% if state.constructed contains building.id %}
          {% assign building_bonus = building.bonuses[category.id] | default: 0 %}
          {% assign category_bonus = category_bonus | plus: building_bonus %}
        {% endif %}
      {% endfor %}
    <div><dt>{{ category.name | escape }}</dt><dd>+{{ category_bonus }}</dd></div>
    {% endfor %}
  </dl>
</section>

<fieldset class="colony-tabs">
  <legend class="visually-hidden">Colony building category</legend>
  {% for category in categories %}
  <input
    class="colony-tab-input"
    type="radio"
    name="colony-category"
    id="colony-tab-{{ category.id }}"
    aria-controls="colony-panel-{{ category.id }}"
    {% if forloop.first %}checked{% endif %}>
  {% endfor %}

  <div class="colony-tab-list">
    {% for category in categories %}
    <label class="colony-tab-label" for="colony-tab-{{ category.id }}">{{ category.name | escape }}</label>
    {% endfor %}
  </div>

  <div class="colony-panels">
    {% for category in categories %}
      {% assign buildings = colony[category.id] %}
    <section class="colony-panel" id="colony-panel-{{ category.id }}" aria-labelledby="colony-tab-{{ category.id }}">
      {% for tier in (0..3) %}
        {% assign tier_has_buildings = false %}
        {% for building in buildings %}
          {% if building.tier == tier %}{% assign tier_has_buildings = true %}{% endif %}
        {% endfor %}
        {% if tier_has_buildings %}
      <section class="colony-tier" aria-label="Tier {{ tier | plus: 1 }}">
        <h3>Tier {{ tier | plus: 1 }}</h3>
        <div class="colony-building-grid">
          {% for building in buildings %}
            {% if building.tier == tier %}
              {% assign is_constructed = false %}
              {% assign is_eligible = true %}
              {% if state.constructed contains building.id %}
                {% assign is_constructed = true %}
              {% endif %}
              {% for requirement_id in building.requires %}
                {% unless state.constructed contains requirement_id %}
                  {% assign is_eligible = false %}
                {% endunless %}
              {% endfor %}
              {% if is_constructed %}
                {% assign building_status = "constructed" %}
                {% assign status_label = "Built" %}
              {% elsif is_eligible %}
                {% assign building_status = "eligible" %}
                {% assign status_label = "Constructable" %}
              {% else %}
                {% assign building_status = "locked" %}
                {% assign status_label = "Locked" %}
              {% endif %}
        <article class="colony-building colony-building-{{ building_status }}">
          <header class="colony-building-header">
            <h4>{{ building.name | escape }}</h4>
            <span class="colony-building-status">{{ status_label }}</span>
          </header>
          <p class="colony-building-cost">{{ building.cost }} BP</p>
          <p>{{ building.description | escape }}</p>
          <ul class="colony-building-bonuses" aria-label="Bonuses">
            {% for bonus in building.bonuses %}
            <li>
              {% if bonus[0] == "choice" %}
                Bonus of choice +{{ bonus[1] }}
              {% else %}
                {{ bonus[0] | capitalize }} +{{ bonus[1] }}
              {% endif %}
            </li>
            {% endfor %}
          </ul>
          {% assign requirement_count = building.requires | size %}
          {% if requirement_count > 0 %}
          <p class="colony-requirements">
            <strong>Requires:</strong>
            {% for requirement_id in building.requires %}
              {% assign requirement_name = requirement_id %}
              {% for lookup_category in categories %}
                {% for lookup_building in colony[lookup_category.id] %}
                  {% if lookup_building.id == requirement_id %}
                    {% assign requirement_name = lookup_building.name %}
                  {% endif %}
                {% endfor %}
              {% endfor %}
              {% unless forloop.first %}, {% endunless %}{{ requirement_name | escape }}
            {% endfor %}
          </p>
          {% endif %}
        </article>
            {% endif %}
          {% endfor %}
        </div>
      </section>
        {% endif %}
      {% endfor %}
    </section>
    {% endfor %}
  </div>
</fieldset>
