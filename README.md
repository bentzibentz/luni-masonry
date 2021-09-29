Luni
=====

Fast and simple javascript plugin to filter elements from a masonry grid.

Installation
---------

```
npm install luni
```

Or download the [latest release](https://github.com/bentzibentz/luni/releases).


Docs
---------

#### Import:

```js
import Luni from 'luni';
import 'luni/dist/luni.min.css';

const luni = new Luni();
```

#### Usage:
1. Create links (a, div, etc.) which will have the attribute `data-luni-link` with a filter value.
2. Wrap your items with container elements (li, div, etc.) which will have the attribute `data-luni-el` with an value corresponding to the filter values, if an item matches multiple filter values you can user comma separated strings like `data-luni-el="car,street"`.
3. Wrap your blocks with a container (ul, div, etc.) that have a className `class="luni-default"` and an id `id="luni"`.
4. To add a filter reset link just add an element with the `data-luni-link="all"` attribute to your links.

```html
<!-- 1st step -->
<ul>
  <li>
    <a data-luni-link="all"> [...] </a>
  </li>
  <li>
    <a data-luni-link="car"> [...] </a>
  </li>
  <li>
    <a data-luni-link="bike"> [...] </a>
  </li>
  <li>
    <a data-luni-link="street"> [...] </a>
  </li>
</ul>

<!-- 3st step -->
<div id="luni" class="luni-default">

  <!-- 2nd step -->
  <div data-luni-el="car"> [...] </div>
  <div data-luni-el="car,street"> [...] </div>
  <div data-luni-el="street"> [...] </div>
  <div data-luni-el="bike,street"> [...] </div>
  <div data-luni-el="car,street"> [...] </div>
  <div data-luni-el="bike"> [...] </div>
</div>
```

Demo
---------

Inspired and based on
---------

Luni is based on the amazing [Isolde](https://github.com/TristanBlg/Isolde) lib. Unfortunately, it looks like the library will not be developed any further since 2018. That's why I decided to adapt the concept and develop it further.

License
-------

Copyright (c) 2021 Fabian Bentz.
Released under the [MIT](LICENSE) license.
