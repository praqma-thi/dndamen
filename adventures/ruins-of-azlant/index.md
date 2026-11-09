---
layout: default
title: Ruins of Azlant
adventure: ruins-of-azlant
---

{% assign adventure = site.data.adventures | where: "slug", page.adventure | first %}
{% assign character_count = adventure.characters | size %}

<header class="adventure-intro">
  <h1>{{ adventure.name }}</h1>
  <div class="adventure-overview">
    <img src="{{ adventure.logo | relative_url }}" alt="{{ adventure.name }} logo">
    <div class="adventure-overview-copy">
      <p>{{ adventure.description }}</p>
      <nav class="adventure-actions" aria-label="Adventure pages">
        <a class="session-logs-link" href="{{ '/adventures/' | append: adventure.slug | append: '/map/' | relative_url }}">Map</a>
        <a class="session-logs-link" href="{{ '/adventures/' | append: adventure.slug | append: '/sessions/' | relative_url }}">Session logs</a>
        <a class="session-logs-link" href="{{ '/adventures/' | append: adventure.slug | append: '/colony/' | relative_url }}">Colony</a>
        <a class="session-logs-link" href="{{ '/adventures/' | append: adventure.slug | append: '/gallery/' | relative_url }}">Gallery</a>
      </nav>
    </div>
  </div>
</header>

<fieldset class="character-browser">
  <legend class="visually-hidden">Choose a player character or NPC</legend>
  {% for character_id in adventure.characters %}
    {% assign character = site.data.characters[character_id] %}
  <input
    class="character-radio"
    type="radio"
    name="selected-character"
    id="character-radio-{{ character.id }}"
    value="{{ character.id }}"
    aria-controls="character-panel-{{ character.id }}"
    {% if forloop.first %}checked{% endif %}>
  {% endfor %}
  {% for npc_id in adventure.npcs %}
    {% assign npc = site.data.npcs[npc_id] %}
  <input
    class="character-radio"
    type="radio"
    name="selected-character"
    id="npc-radio-{{ npc.id }}"
    value="{{ npc.id }}"
    aria-controls="npc-panel-{{ npc.id }}"
    {% if character_count == 0 and forloop.first %}checked{% endif %}>
  {% endfor %}

  <div class="character-pickers">
    {% if character_count > 0 %}
      <section class="picker-category" aria-labelledby="player-picker-title">
        <h2 id="player-picker-title">Player Characters</h2>
        <div class="character-picker">
        {% for character_id in adventure.characters %}
          {% assign character = site.data.characters[character_id] %}
          <label class="character-tab" for="character-radio-{{ character.id }}">
            <img src="{{ character.art.headshot | relative_url }}" alt="" loading="lazy">
            <span>{{ character.name | split: " " | first }}</span>
          </label>
        {% endfor %}
        </div>
      </section>
    {% endif %}

    {% if adventure.npcs.size > 0 %}
    <section class="picker-category" aria-labelledby="npc-picker-title">
      <h2 id="npc-picker-title">NPCs</h2>
      <div class="character-picker">
        {% capture npc_group_labels %}{% for npc_id in adventure.npcs %}{% assign npc = site.data.npcs[npc_id] %}{{ npc.group | strip }}{% unless forloop.last %}|||{% endunless %}{% endfor %}{% endcapture %}
        {% assign npc_groups = npc_group_labels | split: "|||" | uniq %}
        {% for group in npc_groups %}
        <h3 class="npc-group-divider">{{ group | strip | escape }}</h3>
          {% for npc_id in adventure.npcs %}
            {% assign npc = site.data.npcs[npc_id] %}
            {% assign npc_group = npc.group | strip %}
            {% if npc_group == group %}
        <label class="character-tab" for="npc-radio-{{ npc.id }}">
          <img src="{{ npc.art.headshot | relative_url }}" alt="" loading="lazy">
          <span>{{ npc.name | split: " " | first }}</span>
        </label>
            {% endif %}
          {% endfor %}
        {% endfor %}
      </div>
    </section>
    {% endif %}
  </div>

  <div class="character-panels">
  {% for character_id in adventure.characters %}
    {% assign character = site.data.characters[character_id] %}
    {% assign player = site.data.players | where: "id", character.player_id | first %}
    <section
      class="character-panel"
      id="character-panel-{{ character.id }}"
      aria-labelledby="character-name-{{ character.id }}">
      <div class="character-art-frame">
        <img class="character-full-art" src="{{ character.art.full | relative_url }}" alt="{{ character.name }} full character art">
      </div>
      <div class="character-summary">
        <header class="character-summary-header">
          <h3 id="character-name-{{ character.id }}">{{ character.name }}</h3>
          <span class="character-status status-{{ character.status | downcase }}">
            {{ character.status }}
          </span>
        </header>

        <dl class="character-facts">
          <div><dt>Class</dt><dd>{{ character.statblock.class }}</dd></div>
          <div><dt>Subclass</dt><dd>{{ character.statblock.subclass }}</dd></div>
          <div><dt>Level</dt><dd>{{ character.statblock.level }}</dd></div>
          <div><dt>Folk</dt><dd>{{ character.folk }}</dd></div>
          {% if character.subfolk %}
          <div><dt>Subfolk</dt><dd>{{ character.subfolk }}</dd></div>
          {% endif %}
          <div><dt>Player</dt><dd>{{ player.alias }}</dd></div>
        </dl>

        <section class="stat-block" aria-label="Ability scores">
          <h4>Ability Scores</h4>
          <div class="ability-scores">
          {% for attribute in character.statblock.attributes %}
            {% assign modifier = attribute[1] | minus: 10 | divided_by: 2 %}
            {% assign ability_short = attribute[0] | slice: 0, 3 | upcase %}
            {% if attribute[0] == 'luck' %}{% assign ability_short = 'LUK' %}{% endif %}
            <div class="ability-score{% if attribute[0] == 'luck' %} luck-score{% endif %}">
              <span>{{ ability_short }}</span>
              <strong>{{ attribute[1] }}</strong>
              <small>{% if modifier >= 0 %}+{% endif %}{{ modifier }}</small>
            </div>
            {% if forloop.index == 3 %}
            <div class="ability-score max-hp">
              <span>HP</span>
              <strong>{{ character.statblock.max_hp }} <span class="hp-heart" aria-hidden="true">♥</span></strong>
            </div>
            {% endif %}
          {% endfor %}
          </div>
        </section>

        {% if character.deaths.size > 0 %}
        <details class="death-history">
          <summary>Death history</summary>
          <ul>
            {% for death in character.deaths %}
            <li>Died at level {{ death.level }}; killer: {{ death.killer }}.</li>
            {% endfor %}
          </ul>
        </details>
        {% endif %}
      </div>
    </section>
  {% endfor %}
  {% for npc_id in adventure.npcs %}
    {% assign npc = site.data.npcs[npc_id] %}
    <section
      class="character-panel npc-panel"
      id="npc-panel-{{ npc.id }}"
      aria-labelledby="npc-name-{{ npc.id }}">
      <div class="character-art-frame">
        <img class="character-full-art" src="{{ npc.art.full | relative_url }}" alt="{{ npc.name }} full character art">
      </div>
      <div class="character-summary">
        <header class="character-summary-header">
          <h3 id="npc-name-{{ npc.id }}">{{ npc.name }}</h3>
          <span class="character-status status-{{ npc.status | downcase }}">
            {{ npc.status }}
          </span>
        </header>

        <dl class="character-facts npc-facts">
          <div><dt>Folk</dt><dd>{{ npc.folk }}</dd></div>
          {% if npc.subfolk %}
          <div><dt>Subfolk</dt><dd>{{ npc.subfolk }}</dd></div>
          {% endif %}
        </dl>

        <section class="npc-description">
          <h4>{{ npc.role }}</h4>
          <p>{{ npc.description | escape | newline_to_br }}</p>
        </section>
      </div>
    </section>
  {% endfor %}
  </div>

  <style>
    {% for character_id in adventure.characters %}
      {% assign character = site.data.characters[character_id] %}
    #character-radio-{{ character.id }}:checked ~ .character-pickers label[for="character-radio-{{ character.id }}"] {
      color: #eee7d9;
      background: #242f39;
      border-color: #d3b16c;
    }
    #character-radio-{{ character.id }}:checked ~ .character-pickers label[for="character-radio-{{ character.id }}"] img {
      border-color: #d3b16c;
    }
    #character-radio-{{ character.id }}:focus-visible ~ .character-pickers label[for="character-radio-{{ character.id }}"] {
      outline: 2px solid #d3b16c;
      outline-offset: 2px;
    }
    #character-radio-{{ character.id }}:checked ~ .character-panels #character-panel-{{ character.id }} {
      display: grid;
    }
    {% endfor %}
    {% for npc_id in adventure.npcs %}
      {% assign npc = site.data.npcs[npc_id] %}
    #npc-radio-{{ npc.id }}:checked ~ .character-pickers label[for="npc-radio-{{ npc.id }}"] {
      color: #eee7d9;
      background: #242f39;
      border-color: #d3b16c;
    }
    #npc-radio-{{ npc.id }}:checked ~ .character-pickers label[for="npc-radio-{{ npc.id }}"] img {
      border-color: #d3b16c;
    }
    #npc-radio-{{ npc.id }}:focus-visible ~ .character-pickers label[for="npc-radio-{{ npc.id }}"] {
      outline: 2px solid #d3b16c;
      outline-offset: 2px;
    }
    #npc-radio-{{ npc.id }}:checked ~ .character-panels #npc-panel-{{ npc.id }} {
      display: grid;
    }
    {% endfor %}
  </style>
</fieldset>
