<p>
  <a href="https://github.com/bentzibentz/luni/releases" target="_blank"><img alt="GitHub release" src="https://img.shields.io/github/v/release/bentzibentz/luni?include_prereleases&style=flat-square"></a>
  <a href="https://npmjs.com/package/luni" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/luni?style=flat-square"></a>
  <a href="https://npmjs.com/package/luni" target="_blank"><img alt="npm" src="https://img.shields.io/npm/dt/luni?style=flat-square"></a>
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/luni?style=flat-square">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/bentzibentz/luni?style=flat-square">
  <img alt="License" src=" https://img.shields.io/github/license/bentzibentz/luni">
</p>

# Luni Masonry

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
import LuniMasonry from 'luni-masonry';
import 'luni-masonry/dist/luni-masonry.min.css';

const luni = new LuniMasonry();
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

#### Change settings:
You can config the LuniMasonry Class settings:
1. `active` set custom active class for selected filter element
2. `margin` set a custom gap size between the elements
3. `responsive` set custom breakpoints and number of columns
4. `fadeDuration` set custom animation durations in milliseconds

Example:
```js
const luni = new LuniMasonry({
    // active class
    active: 'is-activated',
    // in pixels
    margin: 18,
    // for responsive
    responsive: {
        1024: {
            columns: 4,
        },
        980: {
            columns: 3,
        },
        480: {
            columns: 2,
        },
        0: {
            columns: 1,
        },
    },
    // fade in/out duration
    fadeDuration: {
        in: 300,
        out: 50,
    },
});
```

Demo
---------
coming soon…

Inspired and based on
---------

Luni Masonry is based on the amazing [Isolde](https://github.com/TristanBlg/Isolde) lib. Unfortunately, it looks like the library will not be developed any further since 2018. That's why I decided to adapt the concept to develop and improve it further.

License
-------

Copyright (c) 2021 Fabian Bentz.
Released under the [MIT](LICENSE) license.
