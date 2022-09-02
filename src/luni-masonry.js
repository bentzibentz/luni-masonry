class LuniMasonry {
    constructor({
        parent = document.querySelector('#luni'),
        links = document.querySelectorAll('[data-luni-link]'),
        active = 'is-active',
        margin = 18,
        responsive = {
            1024: {
                columns: 4
            },
            768: {
                columns: 3
            },
            480: {
                columns: 2
            },
            0: {
                columns: 1
            }
        },
        fadeDuration = {
            in: 300,
            out: 50
        }
    } = {}) {
        this.parent = parent;
        this.links = Array.from(links);
        this.active = active;
        this.margin = margin;
        this.responsive = responsive;
        this.fadeDuration = fadeDuration;
        this.elements = Array.from(this.parent.children);
        this.activeElements = this.elements;
        this.columns = 1;
        this.dataLink = 'all';
        this.winWidth = window.innerWidth;

        this.init();
    }

    orderElements() {
        const {parent, activeElements, columns, blocWidth, margin} = this;

        const arrayRectHeight = activeElements.reduce((acc, el, id) => {
            const columnsHeight = this.sumArrHeight(acc, columns);
            const positionX = (id % columns) * (blocWidth + margin);
            const rectHeight = (id - columns >= 0) ? (columnsHeight[id % columns] + (margin * Math.floor(id / columns))) : 0;

            el.style.transform = `translate3d(${positionX}px, ${rectHeight}px, 0)`;

            acc.push(el.offsetHeight);
            return acc;
        }, []);

        const columnsMaxHeight = this.sumArrHeight(arrayRectHeight, columns);
        const parentHeight = Math.max(...columnsMaxHeight) + (margin * (Math.floor(activeElements.length / columns) - 1));
        parent.style.height = `${parentHeight}px`;
    }

    handleFilterClick(ev, element) {
        ev.preventDefault();
        const {links, active} = this;

        if (element.dataset.luniLink === this.dataLink) {
            return;
        }

        this.dataLink = element.dataset.luniLink;
        links.forEach(el => {
            if (el.isEqualNode(element)) {
                el.classList.add(active);
            } else {
                el.classList.remove(active);
            }
        });
        this.filterElements(() => {
            this.orderElements();
        });
    }

    resize() {
        window.addEventListener('resize', () => {
            clearTimeout(window.sortableResize);
            window.sortableResize = setTimeout(() => {
                this.winWidth = window.innerWidth;
                this.setBlockWidth(() => {
                    this.orderElements();
                });
            }, 500);
        });
    }

    init() {
        const {parent, links, active} = this;

        links.forEach((el, id) => {
            if (id === 0) {
                el.classList.add(active);
                this.dataLink = el.dataset.luniLink;
            }

            el.addEventListener('click', ev => {
                this.handleFilterClick(ev, el);
            });
        });

        this.setBlockWidth();

        window.addEventListener('load', () => {
            this.filterElements(() => {
                this.orderElements();
            });
            parent.style.opacity = '1';
        });

        this.resize();
    }

    setBlockWidth(callback) {
        const {parent, elements, margin, responsive} = this;

        this.columns = this.columnsCount(responsive).columns;
        const columns = this.columns;

        this.blocWidth = (parent.clientWidth - (margin * (columns - 1))) / columns;
        const blocWidth = this.blocWidth;

        elements.forEach(el => {
            el.style.width = `${blocWidth}px`;
        });

        if (callback) {
            callback();
        }
    }

    filterElements(callback) {
        const {elements, dataLink, fadeDuration} = this;

        this.activeElements = elements.filter(el => {
            if (dataLink === 'all') {
                this.fadeIn(el, fadeDuration.in);
                return true;
            }

            if (!el.dataset.luniEl.split(',').includes(dataLink)) {
                this.fadeOut(el, fadeDuration.out);
                return false;
            }

            this.fadeIn(el, fadeDuration.in);
            return true;
        });

        if (callback) {
            callback();
        }
    }

    sumArrHeight(arr, col) {
        return arr.reduce((acc, val, id) => {
            const cle = id % col;

            if (!acc[cle]) {
                acc[cle] = 0;
            }

            acc[cle] += val;
            return acc;
        }, []);
    }

    columnsCount(obj) {
        const {winWidth} = this;
        return Object.entries(obj).reduce((acc, val) => {
            return winWidth > val[0] && val[0] >= Math.max(acc.width) ? {width: val[0], columns: val[1].columns} : acc;
        }, {width: 0, columns: 4});
    }

    fadeIn(el, duration = 300, callback = null) {
        let opacity = Number.parseFloat(window.getComputedStyle(el, null).getPropertyValue('opacity'));
        const interval = 16;
        const gap = interval / duration;

        el.style.display = 'block';

        function animation() {
            opacity += gap;

            if (opacity <= 1) {
                el.style.opacity = opacity;
                requestAnimationFrame(animation);
            } else {
                el.style.opacity = '1';
                if (callback) {
                    callback();
                }
            }
        }

        requestAnimationFrame(animation);
    }

    fadeOut(el, duration = 300, callback = null) {
        let opacity = Number.parseFloat(window.getComputedStyle(el, null).getPropertyValue('opacity'));
        const interval = 16;
        const gap = duration ? (interval / duration) : 1;

        function animation() {
            opacity -= gap;

            if (opacity >= 0) {
                el.style.opacity = opacity;
                requestAnimationFrame(animation);
            } else {
                el.style.opacity = '0';
                el.style.display = 'none';

                if (callback) {
                    callback();
                }
            }
        }

        requestAnimationFrame(animation);
    }
}

export default LuniMasonry;
