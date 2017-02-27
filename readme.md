# Bynar
A markdown language that makes automating news articles easy.

## Goals
* A simple syntax based on [Liquid](https://github.com/Shopify/liquid)
* Easy data-binding (i.e., dropping variables in the middle of text)

## Components
### Front matter
A YAML-style leading section that includes configuration variables. For now, the components are:
 
* `data`: Either the data model’s URL (resulting in a  `data` variable, or an object where each key is the data label and the value is the URL
* `insertParagaphs`: Toggles whether to insert  `p` tags at line breaks (default true)

**Example 1:**
```
---
data: https://andrewmcgill.me/assets/data.json
insertParagraphs: false
---
```

**Example 2**
```
---
data: { eels: "https://andrewmcgill.me/assets/data.json", badgers: "http://badgerwatch.com/api/ }
---
```

Data in the url is automatically mapped to the `data` variable.

### Data-binding
Use double brackets to make drop a variable into the flow of text.
`I have {{data.eels}} squirmy eels.`

Use a pipe and formatter to format the data. 
`The biggest eel is exactly {{data.eelLength|numeric(1}} inches long.`

---
## Coming later...

### Conditional text
Bynar uses Liquid-style control flow, centered around `{% if %}`, `{% elsif %}` and `{$ else $}` tags.

```
{% if data.eels >= 10 %}
	Let's just say there are a lot of eels here.
{% elsif data.eels >=1 %}
	There are a scary but managable number of eels present.
{% elsif data.eels == 1 %}
	Just one eel is here! No biggie.
{% else %}
	No eels here! Phew.
{% endif %}
```

Bynar also lets you insert live variables into your conditions.

```
{% if data.eelLength >= 5 %}
	My word, the eel is {{data.eelLength}} inches long!
{% else %}
	That eel is shrimpy.
{% endif %}
```

### Raw HTML/javascript
By default, Bynar wraps single lines in `<p>` tags. If you’d rather it not do that — say, around a `<code>` snippet — just use `<% raw %>` tags. Bynar won’t read convert anything inside there.

```
Here's a code snippet: 

<% raw %>
<code>
  <ul>
    <li>Eel 1</l1>
    <li>Eel 2</l1>
    <li>Eel 3</li>
  </ul>
</code>
<% endraw %>
```

## Goodies
* **Placeholder text:** Wherever possible (and if the front matter tells it to do it), Bynar will drop in placeholder blocks where live data will be loaded to minimize that annoying text-jogging that happens when AJAX-fed text suddenly pops into the DOM.





