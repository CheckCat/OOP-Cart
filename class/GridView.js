class GridView {
    constructor() {
        this._header;
        this._headerClass;
        this._tableClass;
        this._element = 'body';
        this.options;
        this.data;
    }

    /**
     * Method set element
     */

    setElement(element) {
        if (document.querySelector(element)) {
            this._element = element;
            return true;
        }
        return false;
    }

    /**
     * Method set header
     */

    setHeader(header) {
        if (typeof header === 'string' && header.trim() != '') {
            this._header = header.trim();
            return true;
        }
        return false;
    }

    /**
     * Method set headerClass
     */

    setHeaderClass(headerClass) {
        if (typeof headerClass === 'object') {
            this._headerClass = headerClass;
            return true;
        }
        return false;
    }

    /**
     * Method set tableClass
     */

    setTableClass(tableClass) {
        if (typeof tableClass === 'object') {
            this._tableClass = tableClass;
            return true;
        }
        return false;
    }

    /**
     * Method for check option in object of options
     */

    checkOptionAttribute(...criteria) {
        for (let key in this.options) {
            let isFind = 0;
            for (let attribute in this.options[key]) {
                criteria.forEach(item => item === attribute && isFind++);
                if (isFind == criteria.length) return true;
            }
        }
        return false;
    }

    /**
     * Method for create and show GridViewTable
     */

    createHeader() {
        if (this._header) {
            const header = document.createElement('h1');
            header.textContent = this._header;
            this._headerClass && this._headerClass.forEach(cssClass => header.classList.add(cssClass));
            return header;
        }
    }

    createTh() {
        let trHeader = document.createElement('tr');

        for (let key in this.options) {
            let th = document.createElement('th');
            if (this.options[key].needTh) {
                th.textContent = this.options[key].label || key;
            }
            trHeader.append(th);
        }

        return trHeader;
    }

    createTfoot() {
        let trFooter = document.createElement('tr');

        if (this.checkOptionAttribute('tfootIsJoint')) {
            let tfoot = document.createElement('td');
            let key = Object.keys(this.options)[0];
            tfoot.setAttribute('colspan', Object.keys(this.options).length);
            this.options[key].footerClass && tfoot.classList.add(this.options[key].footerClass);
            tfoot.textContent = this.options[key].footnote();
            trFooter.append(tfoot);
        } else {
            for (let key in this.options) {
                let tfoot = document.createElement('td');
                if (this.options[key].needTfoot && this.options[key].footnote()) {
                    tfoot.textContent = this.options[key].footnote();
                }
                trFooter.append(tfoot);
            }
        }

        return trFooter;
    }

    createTr(item) {
        let tr = document.createElement('tr');

        for (let key in this.options) {
            let td = document.createElement('td');

            let value = item[key].content;
            if (this.options[key].value) {
                value = this.options[key].value(item);
            }

            if (this.options[key].isTag) {
                td.innerHTML = value;

                let className = item[key].className;
                let attribute = item[key].attribute;

                if (className) {
                    className.forEach(item => td.children[0].classList.add(item));
                }
                if (attribute) {
                    for (let key in attribute) {
                        td.children[0].setAttribute(key, attribute[key]);
                    }
                }
            } else {
                td.textContent = value;
            }

            tr.append(td);
        }

        return tr;
    }

    renderTable(data) {
        this.setElement(data.element);
        this.setTableClass(data.tableCLass);
        this.setHeaderClass(data.headerClass);
        this.data = data.data;
        this.options = data.options;

        const table = document.createElement('table');
        this._tableClass.forEach(cssClass => {
            table.classList.add(cssClass);
        });

        if (this.setHeader(data.header)) {
            document.querySelector(this._element).append(this.createHeader());
        }

        if (this.checkOptionAttribute('needTh')) {
            table.append(this.createTh());
        }

        this.data.forEach(item => {
            table.append(this.createTr(item));
        });

        if (this.checkOptionAttribute('needTfoot', 'footnote')) {
            table.append(this.createTfoot());
        }

        document.querySelector(this._element).append(table);
    }
}